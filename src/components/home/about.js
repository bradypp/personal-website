import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import styled from 'styled-components';

import { scrollReveal } from '@utils';
import { scrollRevealConfig, github } from '@config';
import { Heading } from '@components';
import { mixins } from '@styles';

const AboutContainer = styled.section`
    position: relative;
    height: 70rem;
`;
const FlexContainer = styled.div`
    ${mixins.flexBetween};
    align-items: flex-start;
`;
const StyledContent = styled.div`
    width: 60%;
    max-width: 48rem;

    a {
        ${mixins.inlineLink};
    }
`;
const AvatarLinkContainer = styled.div`
    position: relative;
    width: 40%;
    max-width: 30rem;
    margin-left: 6rem;
`;
const Avatar = styled(Img)`
    position: relative;
    mix-blend-mode: multiply;
    filter: grayscale(100%) contrast(115%);
    border-radius: var(--border-radius);
    transition: var(--transition);
`;
const AvatarLink = styled.a`
    ${mixins.boxShadow};
    width: 100%;
    position: relative;
    border-radius: var(--border-radius);
    margin-left: -2rem;

    &:hover {
        background: transparent;
        margin-left: -2.25rem;
        margin-top: -0.25rem;
        &:after {
            top: 0.65rem;
            left: 0.65rem;
        }
        ${Avatar} {
            filter: none;
            mix-blend-mode: normal;
        }
    }

    &:before,
    &:after {
        content: '';
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: var(--border-radius);
        transition: var(--transition);
    }
    &:before {
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: var(--color-background-1);
        mix-blend-mode: screen;
    }
    &:after {
        border: 10px solid var(--color-primary);
        top: 0.4rem;
        left: 0.4rem;
        z-index: -1;
    }
`;

const About = ({ data }) => {
    const revealContainer = useRef(null);

    const { frontmatter, html } = data[0].node;
    const { title, avatar } = frontmatter;

    useEffect(() => scrollReveal.reveal(revealContainer.current, scrollRevealConfig()), []);

    return (
        <AboutContainer id="about" ref={revealContainer}>
            <Heading>{title}</Heading>
            <FlexContainer>
                <StyledContent>
                    <div dangerouslySetInnerHTML={{ __html: html }} />
                </StyledContent>
                <AvatarLinkContainer>
                    <AvatarLink href={github} target="_blank" rel="noopener noreferrer nofollow">
                        <Avatar fluid={avatar.childImageSharp.fluid} alt="Avatar" />
                    </AvatarLink>
                </AvatarLinkContainer>
            </FlexContainer>
        </AboutContainer>
    );
};

About.propTypes = {
    data: PropTypes.array.isRequired,
};

export default About;
