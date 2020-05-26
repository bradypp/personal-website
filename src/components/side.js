import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';

import { useIsMounted } from '@hooks';
import { media } from '@styles';

// TODO: media queries to hide on tablets/phones
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

    a {
        &:after {
            display: none;
        }
    }
`;

const Side = ({ children, isHome, orientation }) => {
    const isMounted = useIsMounted(2000, isHome);

    return (
        <SideContainer orientation={orientation}>
            <TransitionGroup component={null}>
                {isMounted && (
                    <CSSTransition classNames={isHome ? 'fade' : ''} timeout={isHome ? 3000 : 0}>
                        {children}
                    </CSSTransition>
                )}
            </TransitionGroup>
        </SideContainer>
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
