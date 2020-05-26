import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';

import { scrollReveal } from '@utils';
import { scrollRevealConfig, github } from '@config';
import { Heading, OutboundLink, CustomList } from '@components';
import { mixins } from '@styles';

const AboutContainer = styled.section`
    ${mixins.homeSection}
    position: relative;
    transform-origin: center;
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
    max-width: 36rem;
    border-radius: 50%;
    margin: 1rem 8rem 0 0;
`;
const Avatar = styled(Img)`
    position: relative;
    mix-blend-mode: multiply;
    border-radius: 50%;
    transition: var(--transition);
    box-shadow: var(--box-shadow-primary);
`;
const SkillsContainer = styled(props => <CustomList {...props} />)`
    margin: 2rem 0 0 0;
`;

const About = ({ data }) => {
    const aboutRef = useRef();
    const { frontmatter, html } = data[0].node;
    const { title, avatar, skills } = frontmatter;

    const [{ xy }, setPosition] = useSpring(() => ({
        st: 0,
        xy: [0, 0],
        config: { mass: 10, tension: 550, friction: 140 },
    }));
    const transition = xy.interpolate(
        (x, y) => `perspective(400px) rotateY(${x / 135}deg) rotateX(${-y / 135}deg)  `,
    );

    useEffect(() => {
        const homePage = document.getElementById('content');
        homePage.addEventListener('mousemove', ({ clientX: x, clientY: y }) =>
            setPosition({ xy: [x - window.innerWidth / 2, y - window.innerHeight / 2] }),
        );
        return homePage.removeEventListener('mousemove', ({ clientX: x, clientY: y }) =>
            setPosition({ xy: [x - window.innerWidth / 2, y - window.innerHeight / 2] }),
        );
    }, [setPosition]);

    useEffect(() => {
        scrollReveal.reveal(aboutRef.current, scrollRevealConfig());
    }, []);

    return (
        <AboutContainer ref={aboutRef}>
            <Heading id="about">{title}</Heading>
            <FlexContainer>
                <ContentContainer>
                    <div dangerouslySetInnerHTML={{ __html: html }} />
                    <SkillsContainer items={skills} columns={3} />
                </ContentContainer>
                <AvatarContainer>
                    <animated.div style={{ transform: transition }}>
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
