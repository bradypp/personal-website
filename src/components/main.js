import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { mixins } from '@styles';

const StyledMain = styled.main`
    ${mixins.flexColumnCenter};
    max-width: ${props => props.maxWidth};
    margin: 0 auto;
    width: 100%;
    min-height: 100vh;
`;
const Container = styled.div`
    width: 100%;
    padding: 0 var(--page-padding);
`;

const Main = ({ children, maxWidth, ...props }) => (
    <Container id="content" {...props}>
        <StyledMain maxWidth={maxWidth}>{children}</StyledMain>
    </Container>
);

Main.propTypes = {
    children: PropTypes.node.isRequired,
    maxWidth: PropTypes.string,
};

Main.defaultProps = {
    maxWidth: 'var(--max-width)',
};

export default Main;
