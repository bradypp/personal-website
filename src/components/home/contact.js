import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as Yup from 'yup';
import axios from 'axios';

import scrollReveal from '@utils/scrollReveal';
import { scrollRevealConfig, email } from '@config';
import { SectionHeading, CustomLink, Form } from '@components';
import { mixins, media } from '@styles';

const ContactContainer = styled.section`
    ${mixins.homeSection};
    ${mixins.flexCenter};
    flex-direction: column;
    align-items: flex-start;
`;
const HTMLContainer = styled.div`
    & > *:last-child {
        margin-bottom: 2.4rem;
    }
`;
const FlexContainer = styled.div`
    ${mixins.flexCenter};
    justify-content: space-between;
    width: 100%;

    ${media.bp600`
        flex-direction: column;
        align-items:flex-start;
    `}
`;
const FormContainer = styled.div`
    flex: 2;
    margin-top: 2rem;
    ${media.bp600`
        flex:3;
        width:100%;
    `}
`;
const Socials = styled.div`
    display: flex;
    justify-content: flex-start;
    flex: 1;
    margin-bottom: 5%;
    text-align: center;

    ${media.bp600`
        flex: 0;
        a {
            white-space:nowrap;
        }
        margin:0;
        width: 100%;
        a {
            width: 100%;
        }
    `}
`;
const MiddleText = styled.span`
    flex: 1;
    font-weight: 600;
    color: var(--color-text-primary-2);
    margin-bottom: 5%;
    text-align: center;
    ${media.bp600`
        flex:0;
        padding: 4rem;
        margin:0;
        align-self:center;
    `}
`;

const Contact = ({ data }) => {
    const [submitText, setSubmitText] = useState('Send Message');
    const { frontmatter, html } = data;
    const { title, emailText } = frontmatter;

    const contactRef = useRef();

    useEffect(() => {
        scrollReveal.reveal(contactRef.current, scrollRevealConfig());
    }, []);

    const validation = Yup.object().shape({
        name: Yup.string().trim().required('Please enter your name'),
        email: Yup.string()
            .trim()
            .email('Please enter a valid email address')
            .required('Please enter your email')
            .lowercase(),
        message: Yup.string().trim().required('Please enter your message'),
    });

    return (
        <ContactContainer ref={contactRef}>
            <SectionHeading id="contact">{title}</SectionHeading>
            <HTMLContainer dangerouslySetInnerHTML={{ __html: html }} />
            <FlexContainer>
                <FormContainer>
                    <Form
                        initialValues={{
                            name: '',
                            email: '',
                            subject: '',
                            message: '',
                        }}
                        validationSchema={validation}
                        onSubmit={async (values, form) => {
                            // Done using Netlify lambda functions
                            try {
                                form.setSubmitting(true);
                                await axios.post(
                                    '/.netlify/functions/sendEmail',
                                    JSON.stringify(values),
                                );
                                form.setSubmitting(false);
                                form.resetForm();
                                setSubmitText('Message Sent!');
                                setTimeout(() => {
                                    setSubmitText('Send Message');
                                }, 3000);
                            } catch (err) {
                                setSubmitText('Message Unsuccessful');
                                setTimeout(() => {
                                    setSubmitText('Send Message');
                                }, 3000);
                            }
                        }}>
                        {({ isSubmitting }) => (
                            <>
                                <Form.Element>
                                    <Form.Field.Input label="Name" name="name" />
                                    <Form.Field.Input label="Email" name="email" />
                                    <Form.Field.Input label="Subject" name="subject" />
                                    <Form.Field.TextArea
                                        height={20}
                                        label="Message"
                                        name="message"
                                    />
                                    <Form.Buttons
                                        isSubmitting={isSubmitting}
                                        withReset
                                        submitText={submitText}
                                    />
                                </Form.Element>
                            </>
                        )}
                    </Form>
                </FormContainer>
                <MiddleText>or</MiddleText>
                <Socials>
                    <CustomLink href={`mailto:${email}`} variant="button-primary">
                        {emailText}
                    </CustomLink>
                </Socials>
            </FlexContainer>
        </ContactContainer>
    );
};

Contact.propTypes = {
    data: PropTypes.array.isRequired,
};

export default Contact;
