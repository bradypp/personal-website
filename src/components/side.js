import React, { useState, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { useIsMounted } from '@hooks';
import { media } from '@styles';

const SideContainer = styled.div`
    width: 4rem;
    position: fixed;
    bottom: 0;
    left: ${props => (props.orientation === 'left' ? '3rem' : 'auto')};
    right: ${props => (props.orientation === 'left' ? 'auto' : '3rem')};
    z-index: var(--z-index-side);
    color: var(--color-text-primary-2);

    ${media.bp1040`
    left: ${props => (props.orientation === 'left' ? '2rem' : 'auto')};
    right: ${props => (props.orientation === 'left' ? 'auto' : '2rem')};
    `};

    ${media.bp800`
        display: none;
    `};

    &.fade-in {
        animation: 0.8s fadeIn;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    &.fade-out {
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.8s var(--ease), visibility 0.8s var(--ease);
    }
`;

const Side = ({ children, isHome, orientation }) => {
    const [isVisible, setIsVisible] = useState(
        typeof window !== 'undefined' && window.pageYOffset > window.innerHeight * 0.5,
    );
    const isMounted = useIsMounted(2000, isHome);

    const handleScroll = () => {
        setIsVisible(
            typeof window !== 'undefined' && window.pageYOffset > window.innerHeight * 0.5,
        );
    };

    useLayoutEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        isMounted && (
            <SideContainer
                className={isMounted ? (isVisible ? 'fade-in' : 'fade-out') : ''}
                orientation={orientation}>
                {children}
            </SideContainer>
        )
    );
};

Side.propTypes = {
    children: PropTypes.node.isRequired,
    orientation: PropTypes.string,
    isHome: PropTypes.bool,
};

Side.defaultProps = {
    orientation: 'right',
    isHome: false,
};

export default Side;
