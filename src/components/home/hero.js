import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

import { twitter } from '@config';
import { mixins, media } from '@styles';
import { CustomLink } from '@components';
import { useIsMounted } from '@hooks';
import { HEADER } from '@utils/constants';
import wave from '@assets/images/wave.png';

const margin = '12vh';

const HeroContainer = styled.section`
    ${mixins.homeSection}
    align-self: center;
    padding: 0 var(--side-padding);
    width: 100vw;
    height: 100vh;
    background-image: linear-gradient(
        var(--color-background-secondary-1),
        var(--color-background-primary-1)
    );
`;
const ContentContainer = styled.div`
    ${mixins.containAndCenter};
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    padding-top: ${HEADER.TOP_HEIGHT / 2}px;
`;
const TitleContainer = styled(motion.div)`
    ${mixins.flexCenter};
    margin-bottom: ${margin};
`;
const Title = styled.h2`
    font-size: 4.4rem;
    font-weight: 300;
    margin: 0;

    ${media.bp1280`
        font-size: 4rem;
    `}
    ${media.bp440`
        font-size: 3.8rem;
    `}
`;
const Name = styled.div`
    position: relative;
    transition: var(--transition);
    overflow: visible;
    font-weight: 500;
    position: relative;
    transition: var(--transition);
    padding: 0.2rem;
    color: var(--color-text-primary-1);
`;
const Subtitle = styled(motion.h3)`
    font-size: var(--font-size-h3);
    font-weight: 300;
    margin-bottom: ${margin};

    ${media.bp1280`
        font-size: 3rem;
    `}
    ${media.bp440`
        font-size: 2.6rem;
    `}
`;
const ButtonContainer = styled(motion.div)`
    font-size: var(--font-size-h3);
    font-weight: 300;
    height: min-content;
    display: flex;
    align-items: flex-end;

    & > * {
        margin-right: 1.6rem;
    }
`;
const WaveEmojiContainer = styled.div`
    width: 4.4rem;
    margin: 0 0 0 2.4rem;
    ${mixins.clickable}

    ${props =>
        props.isAnimated &&
        css`
            animation: 1s wave;
        `}

    ${media.bp440`
        margin: 0 0 0 1.5rem;
    `}

    ${media.bp388`
        width: 4rem;
        margin: 0 0 0 1.2rem;
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

    const { frontmatter } = data;
    const { title, name, subtitle, buttonText } = frontmatter;

    const handleWaveAnimation = () => {
        if (!isWaveAnimated) {
            setIsWaveAnimated(true);
            setTimeout(() => setIsWaveAnimated(false), 1000);
        }
    };

    useEffect(() => {
        if (!isMounted) return;
        handleWaveAnimation();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted]);

    const variants = {
        hidden: {
            opacity: 0,
            y: 25,
        },
        visible: i => ({
            opacity: 1,
            y: 0,
            transition: {
                ease: 'easeOut',
                delay: 0.4 + i * 0.15,
                duration: 0.5,
            },
        }),
    };

    return (
        <HeroContainer>
            <ContentContainer>
                <TitleContainer custom={0} initial="hidden" animate="visible" variants={variants}>
                    <Title>
                        {title}{' '}
                        <CustomLink href={twitter} variant={null}>
                            <Name>{name}</Name>
                        </CustomLink>
                    </Title>

                    {wave && (
                        <WaveEmojiContainer
                            isAnimated={isWaveAnimated}
                            onMouseEnter={handleWaveAnimation}
                            onClick={handleWaveAnimation}>
                            <img src={wave} alt="wave emoji" />
                        </WaveEmojiContainer>
                    )}
                </TitleContainer>
                <Subtitle custom={1} initial="hidden" animate="visible" variants={variants}>
                    {subtitle}
                </Subtitle>
                <ButtonContainer custom={2} initial="hidden" animate="visible" variants={variants}>
                    <CustomLink variant="button-primary" to="/#portfolio">
                        {buttonText}
                    </CustomLink>
                </ButtonContainer>
            </ContentContainer>
        </HeroContainer>
    );
};

Hero.propTypes = {
    data: PropTypes.object.isRequired,
};

export default Hero;
