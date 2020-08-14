/* eslint-disable react/no-danger */
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import styled from 'styled-components';
import Media from 'react-media';

import scrollReveal from '@utils/scrollReveal';
import { BREAKPOINTS } from '@utils/constants';
import { scrollRevealConfig, github } from '@config';
import { SectionHeading, CustomLink, CustomList } from '@components';
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
const Description = styled.div`
    padding-right: 1rem;

    ${media.bp800`
        padding-right: 0;
    `}
`;
const ContentContainer = styled.div`
    width: 60%;
    max-width: 60rem;

    a {
        ${mixins.primaryLink};
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
const AvatarLinkContainer = styled(props => <CustomLink {...props} />)`
    position: relative;
    width: 40%;
    max-width: 36rem;
    border-radius: 50%;
    margin: 1rem 80px 0 0;

    ${media.bp1440`
        margin-right: 0; 
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
    const { frontmatter, html } = data;
    const { title, avatar, skills } = frontmatter;

    useEffect(() => {
        scrollReveal.reveal(aboutRef.current, scrollRevealConfig());
    }, []);

    return (
        <AboutContainer ref={aboutRef}>
            <SectionHeading id="about">{title}</SectionHeading>
            <FlexContainer>
                <ContentContainer>
                    <Description dangerouslySetInnerHTML={{ __html: html }} />
                    <CustomList items={skills} columns={3} />
                </ContentContainer>
                <AvatarLinkContainer href={github} variant={null} style={{ width: '100%' }}>
                    <Avatar fluid={avatar.childImageSharp.fluid} alt="Avatar" />
                </AvatarLinkContainer>
            </FlexContainer>
        </AboutContainer>
    );
};

About.propTypes = {
    data: PropTypes.object.isRequired,
};

export default About;
