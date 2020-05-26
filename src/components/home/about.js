import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { useSpring, animated } from 'react-spring';

import { scrollReveal } from '@utils';
import { scrollRevealConfig, github } from '@config';
import { Heading, Icon, OutboundLink } from '@components';
import { mixins } from '@styles';

const AboutContainer = styled.section`
    ${mixins.homeSection}
    position: relative;
`;
const FlexContainer = styled.div`
    ${mixins.flexBetween};
    align-items: flex-start;
`;
const ContentContainer = styled.div`
    width: 60%;
    max-width: 60rem;

    a {
        ${mixins.inlineLink};
    }
`;
const AvatarContainer = styled.div`
    position: relative;
    width: 40%;
    max-width: 38rem;
    border-radius: 50%;
    transform: translate(-6rem);
`;
const Avatar = styled(Img)`
    position: relative;
    mix-blend-mode: multiply;
    border-radius: 50%;
    transition: var(--transition);
    box-shadow: var(--box-shadow-primary);
    margin-left: -5rem;
`;
const SkillsContainer = styled.ul`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 1.6rem;
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
            margin: 0 1.8rem 0 0;
        }

        span {
            height: min-content;
            line-height: 1;
            font-size: var(--font-size-sm);
        }
    }
`;

const About = ({ data }) => {
    const aboutRef = useRef();

    const [animateProps, setPosition] = useSpring(() => ({
        xy: [0, 0],
        config: { mass: 10, tension: 550, friction: 140 },
    }));
    const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2];
    const transition = (x, y) => `translate3d(${x / 50}px,${y / 50}px,0)`;

    const { frontmatter, html } = data[0].node;
    const { title, avatar, skills } = frontmatter;

    useEffect(() => {
        scrollReveal.reveal(aboutRef.current, scrollRevealConfig());
    }, []);

    return (
        <AboutContainer
            ref={aboutRef}
            onMouseMove={({ clientX: x, clientY: y }) => setPosition({ xy: calc(x, y) })}>
            <Heading id="about">{title}</Heading>
            <FlexContainer>
                <ContentContainer>
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
                </ContentContainer>
                <AvatarContainer>
                    <animated.div style={{ transform: animateProps.xy.interpolate(transition) }}>
                        <OutboundLink href={github} variant={null} style={{ width: '100%' }}>
                            <Avatar fluid={avatar.childImageSharp.fluid} alt="Avatar" />
                        </OutboundLink>
                    </animated.div>
                </AvatarContainer>
            </FlexContainer>
        </AboutContainer>
    );
};

About.propTypes = {
    data: PropTypes.array.isRequired,
};

export default About;
