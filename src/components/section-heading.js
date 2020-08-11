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
        background-color: var(--color-border-primary);
        position: relative;
        margin-left: 2rem;
    }
`;

const SectionHeading = forwardRef(({ children, id, ...props }, ref) => (
    <StyledHeading ref={ref} {...props}>
        {id && <Anchor id={id} />}
        {children}
    </StyledHeading>
));

SectionHeading.propTypes = {
    children: PropTypes.node.isRequired,
    id: PropTypes.string,
    className: PropTypes.string,
};

SectionHeading.defaultProps = {
    id: undefined,
    className: undefined,
};

export default SectionHeading;
