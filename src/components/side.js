import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';

import { media } from '@styles';

const SideContainer = styled.div`
    width: 4rem;
    position: fixed;
    bottom: 0;
    right: 4rem;
    z-index: var(--z-index-side);
    color: var(--color-text-primary-2);
    ${media.bp1280`right: 2.5rem;`};
    ${media.bp800`display: none;`};
`;

const Side = ({ children, isHome }) => {
    const [isMounted, setIsMounted] = useState(!isHome);

    useEffect(() => {
        if (!isHome) {
            return;
        }
        const timeout = setTimeout(() => setIsMounted(true), 2000);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <SideContainer>
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
    isHome: PropTypes.bool,
};

Side.defaultProps = {
    isHome: false,
};

export default Side;
