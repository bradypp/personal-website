import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as Yup from 'yup';

import { scrollReveal } from '@utils';
import { scrollRevealConfig, email } from '@config';
import { Heading, OutboundLink, Form } from '@components';
import { mixins } from '@styles';

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
    width: 100%;
`;
const FormContainer = styled.div`
    flex: 3;
`;
const Socials = styled.div`
    flex: 2;
    margin-bottom: 5%;
`;
const MiddleText = styled.span`
    padding: 8rem;
    font-weight: 500;
    color: var(--color-text-primary-2);
    margin-bottom: 5%;
`;

const Contact = ({ data }) => {
    const { frontmatter, html } = data[0].node;
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
        subject: Yup.string().trim().required('Please enter a subject'),
        message: Yup.string().trim().required('Please enter your message').lowercase(),
    });

    return (
        <ContactContainer ref={contactRef}>
            <Heading id="contact">{title}</Heading>
            <HTMLContainer dangerouslySetInnerHTML={{ __html: html }} />
            <FlexContainer>
                <FormContainer>
                    <Form
                        validateOnChange={false}
                        initialValues={{
                            name: '',
                            email: '',
                            subject: '',
                            message: '',
                        }}
                        validationSchema={validation}
                        onSubmit={async (values, form) => {
                            // Done using Netlify lambda functions
                            // See https://dev.to/char_bone/using-netlify-lambda-functions-to-send-emails-from-a-gatsbyjs-site-3pnb
                            try {
                                await fetch('./netlify/functions/sendEmail', {
                                    method: 'POST',
                                    body: JSON.stringify(values),
                                });
                                form.resetForm();
                            } catch (err) {
                                console.error(err);
                            }
                        }}>
                        <Form.Element>
                            <Form.Field.Input label="Name" name="name" />
                            <Form.Field.Input label="Email" name="email" />
                            <Form.Field.Input label="Subject" name="subject" />
                            <Form.Field.TextArea height={18} label="Message" name="message" />
                            <Form.Buttons withReset submitText="Send Message" />
                        </Form.Element>
                    </Form>
                </FormContainer>
                <MiddleText>or</MiddleText>
                <Socials>
                    <OutboundLink href={`mailto:${email}`} variant="primary-button">
                        {emailText}
                    </OutboundLink>
                </Socials>
            </FlexContainer>
        </ContactContainer>
    );
};

Contact.propTypes = {
    data: PropTypes.array.isRequired,
};

export default Contact;
