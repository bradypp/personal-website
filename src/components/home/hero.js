import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Img from 'gatsby-image';

import { twitter } from '@config';
import { mixins, media } from '@styles';
import { Button, OutboundLink } from '@components';
import { useIsMounted } from '@hooks';

const margin = '11vh';

const HeroContainer = styled.section`
    ${mixins.homeSection}
    margin-bottom: -10rem;
    padding-left: var(--page-padding);
    padding-right: var(--page-padding);
    width: 100vw;
    background: var(--color-background-secondary-1);
    background-image: linear-gradient(
        var(--color-background-secondary-1),
        var(--color-background-primary-1)
    );
`;
const ContentContainer = styled.div`
    ${mixins.containAndCenter};
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;

    ${media.bp800`
        padding-top: 70px;
    `}
`;
const TitleContainer = styled.div`
    ${mixins.flexCenter};
    margin-bottom: ${margin};

    &.fadeup-enter,
    &.fadeup-enter-active {
        transition-delay: 100ms;
    }
`;
const Title = styled.h2`
    font-size: 4.4rem;
    font-weight: 300;
    margin: 0;

    a:after {
        height: 2px !important;
    }

    ${media.bp440`
        font-size: 3.6rem;
    `}
`;
const Name = styled.div`
    position: relative;
    transition: var(--transition);
    overflow: visible;

    span {
        position: absolute;
        top: 0;
        left: 0;
        font-weight: 500;
        position: relative;
        transition: var(--transition);
        padding: 0.2rem;
        color: var(--color-text-primary-1);
        z-index: 1;
    }

    /* &:after {
        content: '';
        display: block;
        width: 100%;
        height: 0.3rem;
        position: absolute;
        bottom: 0;
        left: 0;
        transition: var(--transition);
        background: var(--color-primary);
        overflow: visible;
        z-index: 0;
    }

    &:hover {
        span {
            color: var(--color-white-1);
        }
        &:after {
            height: 100%;
        }
    } */
`;
const Subtitle = styled.h3`
    font-size: var(--font-size-h3);
    font-weight: 300;
    margin-bottom: ${margin};

    &.fadeup-enter,
    &.fadeup-enter-active {
        transition-delay: 200ms;
    }

    ${media.bp440`
        font-size: 2.4rem;
    `}
`;
const ButtonContainer = styled.h3`
    font-size: var(--font-size-h3);
    font-weight: 300;
    margin-bottom: ${margin};

    &.fadeup-enter,
    &.fadeup-enter-active {
        transition-delay: 300ms;
    }
`;
const WaveEmojiContainer = styled.div`
    width: 4.4rem;
    height: 100%;
    margin: 0 0 0 2.4rem;
    ${mixins.clickable}

    ${props =>
        props.isAnimated &&
        css`
            animation: 1s wave;
        `}

    ${media.bp440`
        margin: 0 0 0 1.8rem;
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
        <TitleContainer>
            <Title>
                {`${title} `}{' '}
                <OutboundLink href={twitter}>
                    <Name>
                        <span>{name}</span>
                    </Name>
                </OutboundLink>
            </Title>
            <WaveEmojiContainer
                isAnimated={isWaveAnimated}
                onMouseEnter={handleAnimation}
                onClick={handleAnimation}>
                <Img fluid={wave.childImageSharp.fluid} alt="wave emoji" />
            </WaveEmojiContainer>
        </TitleContainer>,
        <Subtitle>{subtitle}</Subtitle>,
        <ButtonContainer>
            <Button as="link" variant="primary-button" to="/#contact">
                {contact}
            </Button>
        </ButtonContainer>,
    ];
    return (
        <HeroContainer>
            <ContentContainer>
                <TransitionGroup component={null}>
                    {isMounted &&
                        items.map((item, i) => (
                            // eslint-disable-next-line react/no-array-index-key
                            <CSSTransition key={`hero-${i}`} classNames="fadeup" timeout={3000}>
                                {item}
                            </CSSTransition>
                        ))}
                </TransitionGroup>
            </ContentContainer>
        </HeroContainer>
    );
};

Hero.propTypes = {
    data: PropTypes.array.isRequired,
};

export default Hero;
