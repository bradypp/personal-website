/* eslint-disable react/no-danger */
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import styled from 'styled-components';
import Media from 'react-media';

import { scrollReveal } from '@utils';
import { scrollRevealConfig, github } from '@config';
import { Heading, OutboundLink, CustomList } from '@components';
import { mixins, media } from '@styles';

const AboutContainer = styled.section`
    ${mixins.homeSection}
    position: relative;
    transform-origin: center;
`;
const FlexContainer = styled.div`
    ${mixins.flexBetween};
    align-items: flex-start;

    ${media.bp800`
        align-items: center;
        flex-direction: column;
    `}
`;
const ContentContainer = styled.div`
    width: 60%;
    max-width: 60rem;

    a {
        ${mixins.inlineLink};
    }

    ul {
        margin-top: 2.4rem;

        ${media.bp800`
            margin-bottom: 4rem;
        `}
    }

    ${media.bp800`
        width: 100%;
        max-width: 100%;
    `}
`;
const AvatarContainer = styled.div`
    position: relative;
    width: 40%;
    max-width: 36rem;
    border-radius: 50%;
    margin: 1rem 8rem 0 0;

    ${media.bp1280`
        margin-right: 0rem; 
    `}
    ${media.bp800`
        width: 90%;
        max-width: 50rem;
    `}
`;
const Avatar = styled(Img)`
    position: relative;
    mix-blend-mode: multiply;
    border-radius: 50%;
    transition: var(--transition);
    box-shadow: var(--box-shadow-primary);
    filter: contrast(110%);
`;

const About = ({ data }) => {
    const aboutRef = useRef();
    const { frontmatter, html } = data[0].node;
    const { title, avatar, skills } = frontmatter;

    useEffect(() => {
        scrollReveal.reveal(aboutRef.current, scrollRevealConfig());
    }, []);

    return (
        <AboutContainer ref={aboutRef}>
            <Heading id="about">{title}</Heading>
            <FlexContainer>
                <ContentContainer>
                    <div dangerouslySetInnerHTML={{ __html: html }} />
                    <Media
                        query="(min-width: 441px)"
                        render={() => <CustomList items={skills} columns={3} />}
                    />
                    <Media
                        query="(max-width: 440px)"
                        render={() => <CustomList items={skills} columns={2} />}
                    />
                </ContentContainer>
                <AvatarContainer>
                    <OutboundLink href={github} variant={null} style={{ width: '100%' }}>
                        <Avatar fluid={avatar.childImageSharp.fluid} alt="Avatar" />
                    </OutboundLink>
                </AvatarContainer>
            </FlexContainer>
        </AboutContainer>
    );
};

About.propTypes = {
    data: PropTypes.array.isRequired,
};

export default About;
