import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Anchor } from '@components';

const StyledSection = styled.section`
    width: 100%;
    position: relative;
`;

const Section = forwardRef(({ children, id, ...props }, ref) => (
    <StyledSection ref={ref} {...props}>
        {id && <Anchor id={id} />}
        {children}
    </StyledSection>
));

Section.propTypes = {
    children: PropTypes.node.isRequired,
    id: PropTypes.string,
    className: PropTypes.string,
};

Section.defaultProps = {
    id: undefined,
    className: undefined,
};

export default Section;
