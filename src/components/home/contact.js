import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { scrollReveal } from '@utils';
import { scrollRevealConfig, email } from '@config';
import { mixins, media, Section, Heading } from '@styles';

const StyledContainer = styled(Section)`
    text-align: center;
    max-width: 600px;
    margin: 0 auto 100px;
    a {
        ${mixins.inlineLink};
    }
`;
const StyledHeading = styled(Heading)`
    display: block;
    color: ${colors.green};
    font-size: ${fontSizes.md};
    font-family: ${fonts.SFMono};
    font-weight: normal;
    margin-bottom: 20px;
    justify-content: center;
    ${media.desktop`font-size: ${fontSizes.sm};`};
    &:before {
        bottom: 0;
        font-size: ${fontSizes.sm};
        ${media.desktop`font-size: ${fontSizes.smish};`};
    }
    &:after {
        display: none;
    }
`;
const StyledTitle = styled.h4`
    margin: 0 0 20px;
    font-size: 60px;
    ${media.desktop`font-size: 50px;`};
    ${media.tablet`font-size: 40px;`};
`;
const StyledEmailLink = styled.a`
    ${mixins.bigButton};
    margin-top: 50px;
`;

const Contact = ({ data }) => {
    const { frontmatter, html } = data[0].node;
    const { title } = frontmatter;

    const $contactRef = useRef(null);

    useEffect(() => {
        scrollReveal.reveal($contactRef.current, scrollRevealConfig());
    }, []);

    return (
        <StyledContainer id="contact" ref={$contactRef}>
            <StyledTitle>{title}</StyledTitle>
            <div dangerouslySetInnerHTML={{ __html: html }} />
            <StyledEmailLink
                href={`mailto:${email}`}
                target="_blank"
                rel="nofollow noopener noreferrer">
                Say Hello
            </StyledEmailLink>
        </StyledContainer>
    );
};

Contact.propTypes = {
    data: PropTypes.array.isRequired,
};

export default Contact;
