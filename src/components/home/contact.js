import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as Yup from 'yup';

import { scrollReveal } from '@utils';
import { scrollRevealConfig, email } from '@config';
import { Heading, OutboundLink, Form } from '@components';
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

    ${media.bp440`
        flex-direction: column;
        align-items:flex-start;
    `}
`;
const FormContainer = styled.div`
    flex: 5;
    margin-top: 2rem;
    ${media.bp600`
        flex:3;
    `}
    ${media.bp440`
        width:100%;
    `}
`;
const Socials = styled.div`
    flex: 3;
    margin-bottom: 5%;

    ${media.bp1040`
        flex: 2;
    `}
    ${media.bp600`
        flex: 0;
        min-width: 12rem;
        margin:0;
    `}
`;
const MiddleText = styled.span`
    flex: 1;
    font-weight: 600;
    color: var(--color-text-primary-2);
    margin-bottom: 5%;
    text-align: center;
    ${media.bp600`
        padding: 2rem;
        flex:0;
    `}
    ${media.bp440`
        padding: 4rem;
        margin:0;
        align-self:center;
    `}
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
        message: Yup.string().trim().required('Please enter your message').lowercase(),
    });

    return (
        <ContactContainer ref={contactRef}>
            <Heading id="contact">{title}</Heading>
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
                        onSubmit={(values, form) => {
                            form.submitForm(values);
                            form.resetForm();
                        }}>
                        <Form.Element name="contact" method="POST" data-netlify="true">
                            <Form.Field.Input label="Name" name="name" />
                            <Form.Field.Input label="Email" name="email" />
                            <Form.Field.Input label="Subject" name="subject" />
                            <Form.Field.TextArea height={20} label="Message" name="message" />
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
