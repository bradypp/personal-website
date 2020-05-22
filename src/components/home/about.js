import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import styled, { css } from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import { scrollReveal } from '@utils';
import { scrollRevealConfig, github } from '@config';
import { Heading, Icon } from '@components';
import { mixins } from '@styles';

const AboutContainer = styled.section`
    ${mixins.homeSection}
    position: relative;
    height: 70rem;
`;
const FlexContainer = styled.div`
    ${mixins.flexBetween};
    align-items: flex-start;
`;
const StyledContent = styled.div`
    width: 60%;
    max-width: 60rem;

    a {
        ${mixins.inlineLink};
    }
`;
const AvatarLinkContainer = styled.div`
    position: relative;
    width: 40%;
    max-width: 34rem;
    margin-left: 6rem;
`;
const Avatar = styled(Img)`
    position: relative;
    mix-blend-mode: multiply;
    border-radius: 50%;
    transition: var(--transition);
`;
const AvatarLink = styled.a`
    width: 100%;
    position: relative;
    border-radius: 50%;
    margin-left: -2rem;
    box-shadow: var(--box-shadow-primary);
`;
const SkillsContainer = styled.ul`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-row-gap: 2rem;
    overflow: hidden;
    padding: 0;
    margin: 2rem 0 0 0;
    list-style: none;

    li {
        display: flex;
        align-items: center;

        svg {
            color: var(--color-primary);
            min-width: 1rem;
            min-height: 1rem;
            width: 1rem;
            height: 1rem;
            margin: 0 1.8rem 0.5rem 0;
        }

        span {
            height: min-content;
            line-height: 1;
            font-size: var(--font-size-lg);
        }
    }
`;

const About = ({ data }) => {
    const revealContainer = useRef();

    const { frontmatter, html } = data[0].node;
    const { title, avatar, skills } = frontmatter;

    useEffect(() => {
        scrollReveal.reveal(revealContainer.current, scrollRevealConfig());
    }, []);

    return (
        <AboutContainer id="about" ref={revealContainer}>
            <Heading>{title}</Heading>
            <FlexContainer>
                <StyledContent>
                    <div dangerouslySetInnerHTML={{ __html: html }} />
                    <SkillsContainer>
                        {skills &&
                            skills.map(skill => (
                                <li key={uuidv4()}>
                                    <Icon name="Diamond" />
                                    <span>{skill}</span>
                                </li>
                            ))}
                    </SkillsContainer>
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
