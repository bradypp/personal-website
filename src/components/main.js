import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { mixins } from '@styles';

const StyledMain = styled.main`
    ${mixins.flexColumnCenter};
    ${mixins.containAndCenter};
    min-height: 100vh;
    padding: 180px 0;
`;

const Main = ({ children, ...props }) => <StyledMain {...props}>{children}</StyledMain>;

Main.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
};

Main.defaultProps = {
    className: undefined,
};

export default Main;
