import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Img from 'gatsby-image';

import { twitter } from '@config';
import { mixins } from '@styles';
import { CustomLink } from '@components';
import { useIsMounted } from '@hooks';

const margin = '8vh';

const Section = styled.section`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    min-height: 100vh;
`;
const TitleContainer = styled.div`
    ${mixins.flexCenter};
    margin-bottom: ${margin};
`;
const Title = styled.h2`
    font-size: 5rem;
    font-weight: 300;
    margin: 0;
`;
const Name = styled.a`
    font-weight: 500;
    position: relative;
    transition: var(--transition);
    padding: 0.2rem;
    color: var(--color-text-primary-1);

    &:after {
        content: '';
        display: block;
        width: 100%;
        height: 0.3rem;
        position: absolute;
        bottom: 0.28em;
        left: 0;
        z-index: -1;
        background: linear-gradient(45deg, var(--color-primary), var(--color-primary));
        transition: var(--transition);
    }

    &:hover {
        color: var(--color-text-secondary-1);
        &:after {
            bottom: 0.1em;
            height: 100%;
        }
    }
`;
const Subtitle = styled.h3`
    font-size: 4rem;
    font-weight: 300;
    margin-bottom: ${margin};
`;
const WaveEmojiContainer = styled.div`
    width: 4rem;
    height: 100%;
    margin: 0 0 1.2rem 2.4rem;
    ${mixins.clickable}

    ${props =>
        props.isAnimated &&
        css`
            animation: 1s wave;
        `}

    @keyframes wave {
        from {
            transform: none;
        }
        15% {
            transform: translate3d(-20%, 0, 0) rotate3d(0, 0, 1, -10deg);
        }
        30% {
            transform: translate3d(10%, 0, 0) rotate3d(0, 0, 1, 7deg);
        }
        45% {
            transform: translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -10deg);
        }
        60% {
            transform: translate3d(10%, 0, 0) rotate3d(0, 0, 1, 5deg);
        }
        75% {
            transform: translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -2deg);
        }
        to {
            transform: none;
        }
    }
`;

const Hero = ({ data }) => {
    const isMounted = useIsMounted(1000);
    const [isWaveAnimated, setIsWaveAnimated] = useState(false);

    const { frontmatter } = data[0].node;
    const { title, name, wave, subtitle, contact } = frontmatter;

    useEffect(() => {
        if (!isMounted) return;
        const timeout = setTimeout(() => setIsWaveAnimated(true), 500);
        return () => clearTimeout(timeout);
    }, [isMounted]);
    useEffect(() => {
        if (!isWaveAnimated) return;
        const timeout = setTimeout(() => setIsWaveAnimated(false), 1000);
        return () => clearTimeout(timeout);
    }, [isWaveAnimated]);

    const handleAnimation = () => !isWaveAnimated && setIsWaveAnimated(true);

    const items = [
        <TitleContainer style={{ transitionDelay: '100ms' }}>
            <Title>
                {`${title} `}{' '}
                <Name href={twitter} target="_blank" rel="noopener noreferrer nofollow">
                    {name}
                </Name>
            </Title>
            <WaveEmojiContainer
                isAnimated={isWaveAnimated}
                onMouseEnter={handleAnimation}
                onClick={handleAnimation}>
                <Img fluid={wave.childImageSharp.fluid} alt="wave emoji" />
            </WaveEmojiContainer>
        </TitleContainer>,
        <Subtitle style={{ transitionDelay: '200ms' }}>{subtitle}</Subtitle>,
        <div style={{ transitionDelay: '300ms' }}>
            <CustomLink variant="primary-button" to="/#">
                {contact}
            </CustomLink>
        </div>,
    ];
    return (
        <Section>
            <TransitionGroup component={null}>
                {isMounted &&
                    items.map((item, i) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <CSSTransition key={`hero-${i}`} classNames="fadeup" timeout={3000}>
                            {item}
                        </CSSTransition>
                    ))}
            </TransitionGroup>
        </Section>
    );
};

Hero.propTypes = {
    data: PropTypes.array.isRequired,
};

export default Hero;
