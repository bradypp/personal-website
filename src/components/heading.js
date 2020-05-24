import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Anchor } from '@components';

const StyledHeading = styled.h3`
    position: relative;
    display: flex;
    align-items: center;
    margin: 1rem 0 4rem;
    width: 100%;
    white-space: nowrap;
    font-size: var(--font-size-h3);

    &:after {
        content: '';
        display: block;
        height: 1px;
        background-color: var(--color-border);
        position: relative;
        top: -0.5rem;
        margin-left: 2rem;
    }
`;

const Heading = forwardRef(({ children, id, ...props }, ref) => (
    <StyledHeading ref={ref} {...props}>
        {id && <Anchor id={id} />}
        {children}
    </StyledHeading>
));

Heading.propTypes = {
    children: PropTypes.node.isRequired,
    id: PropTypes.string,
    className: PropTypes.string,
};

Heading.defaultProps = {
    id: undefined,
    className: undefined,
};

export default Heading;
