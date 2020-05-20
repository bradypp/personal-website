import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';

import { useIsMounted } from '@hooks';
import { media } from '@styles';

const SideContainer = styled.div`
    width: 4rem;
    position: fixed;
    bottom: 0;
    left: ${props => (props.orientation === 'left' ? '4rem' : 'auto')};
    right: ${props => (props.orientation === 'left' ? 'auto' : '4rem')};
    z-index: var(--z-index-side);
    color: var(--color-text-primary-2);
    ${media.bp1280`right: 2.5rem;`};
    ${media.bp800`display: none;`};
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
