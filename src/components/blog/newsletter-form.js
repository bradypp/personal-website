import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import * as Yup from 'yup';
import axios from 'axios';

import { Form } from '@components';
import { mixins } from '@styles';

const NewsletterOuterContainer = styled.div`
    width: 100vw;
    background-color: var(--color-background-secondary-1);
    border-radius: var(--border-radius);
    margin-top: ${props => (props.isPost ? '10rem' : 0)};
`;

const NewsletterInnerContainer = styled.div`
    ${mixins.containAndCenter}
    width: 800px;
    padding: 12rem 0;

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
        & > *:not(:last-child) {
            margin-right: 2.8rem;
        }
        & > *:first-child {
            width: 60%;
        }
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
    isPost: true,
};

export default NewsletterForm;
