import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import styled, { css } from 'styled-components';
import * as Yup from 'yup';
import axios from 'axios';

import { Form } from '@components';
import { mixins, media } from '@styles';

const NewsletterOuterContainer = styled.div`
    background-color: var(--color-background-secondary-1);
    border-radius: var(--border-radius);
    padding: 12rem 18rem;

    ${media.bp1280`
        padding: 12rem 14rem;
    `}
    ${media.bp1040`
        padding: 12rem 10rem;
    `}
    ${media.bp800`
        width: 100vw;

    `}
    ${media.bp600`
        padding: 10rem 6rem;
    `}
    ${media.bp440`
        padding: 6rem 4rem;
    `}
    ${media.bp384`
        padding: 6rem 3rem;
    `}

    ${props =>
        props.isPost &&
        css`
            width: 100vw;
            margin-top: 10rem;
            padding: 12rem 0;
        `}
`;

const NewsletterInnerContainer = styled.div`
    ${mixins.containAndCenter}
    max-width: 850px;

    h2 {
        font-size: var(--font-size-h3);
        margin-bottom: 3rem;
    }

    p {
        margin-bottom: 3rem;
        font-size: var(--font-size-xl);
        font-weight: 500;
    }

    form {
        display: flex;
        margin-top: 4rem;

        & > * {
            margin-bottom: 0 !important;
        }

        & > *:not(:last-child) {
            margin-right: 3rem;
        }

        & > *:first-child {
            width: 60%;
        }

        ${media.bp800`
            flex-direction: column;

            & > *:not(:last-child) {
                margin-right: 0;
                margin-bottom: 4rem !important;
            }

            & > *:first-child {
                width: 100%;
            }
        `}
    }
`;

const NewsletterForm = ({ isPost }) => {
    const {
        markdownRemark: {
            frontmatter: { title },
            html,
        },
    } = useStaticQuery(graphql`
        {
            markdownRemark(fileAbsolutePath: { regex: "/content/newsletter/" }) {
                frontmatter {
                    title
                }
                html
            }
        }
    `);

    const defaultSubmitText = 'Sign Up!';
    const [submitText, setSubmitText] = useState(defaultSubmitText);

    const validation = Yup.object().shape({
        first_name: Yup.string().trim().required('Please enter your first name'),
        email_address: Yup.string()
            .trim()
            .email('Please enter a valid email address')
            .required('Please enter your email')
            .lowercase(),
    });

    return (
        <NewsletterOuterContainer isPost={isPost}>
            <NewsletterInnerContainer>
                <h2>{title}</h2>
                <div dangerouslySetInnerHTML={{ __html: html }} />
                <Form
                    initialValues={{
                        first_name: '',
                        email_address: '',
                    }}
                    validationSchema={validation}
                    onSubmit={async (values, form) => {
                        // Done using Netlify lambda functions
                        try {
                            form.setSubmitting(true);
                            await axios.post(
                                '/.netlify/functions/newsletter-subscribe',
                                JSON.stringify(values),
                            );
                            form.setSubmitting(false);
                            form.resetForm();
                            setSubmitText('Thank You!');
                            setTimeout(() => {
                                setSubmitText(defaultSubmitText);
                            }, 3000);
                        } catch (err) {
                            setSubmitText('Something Went Wrong!');
                            setTimeout(() => {
                                setSubmitText(defaultSubmitText);
                            }, 3000);
                            if (process.env.NODE_ENV === 'development') {
                                console.error(err.message);
                            }
                        }
                    }}>
                    {({ isSubmitting }) => (
                        <Form.Element>
                            <Form.Field.Input
                                label="First Name"
                                name="first_name"
                                height={4}
                                variant="newsletter"
                                withErrorMsg={false}
                            />
                            <Form.Field.Input
                                label="Email"
                                name="email_address"
                                height={4}
                                variant="newsletter"
                                withErrorMsg={false}
                            />
                            <Form.Buttons
                                isSubmitting={isSubmitting}
                                submitText={submitText}
                                size="big"
                            />
                        </Form.Element>
                    )}
                </Form>
            </NewsletterInnerContainer>
        </NewsletterOuterContainer>
    );
};

NewsletterForm.propTypes = {
    isPost: PropTypes.bool,
};
NewsletterForm.defaultProps = {
    isPost: false,
};

export default NewsletterForm;
