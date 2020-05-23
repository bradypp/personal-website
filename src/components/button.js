import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link as GatsbyLink } from 'gatsby';

import { buttonStyles } from '@styles';

const StyledButton = styled.button`
    ${buttonStyles}
`;

const StyledLink = styled(GatsbyLink)`
    ${buttonStyles}
`;

const Button = ({ children, as, ...props }) => {
    const Component = as === 'link' ? StyledLink : StyledButton;
    return <Component {...props}>{children}</Component>;
};

Button.propTypes = {
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    onClick: PropTypes.func,
    children: PropTypes.node,
    className: PropTypes.string,
    variant: PropTypes.oneOf(['inline-link', 'primary-button', 'secondary-button']),
    as: PropTypes.oneOf(['link', 'button']),
    type: undefined,
};

Button.defaultProps = {
    to: undefined,
    onClick: undefined,
    className: undefined,
    children: undefined,
    variant: 'primary-button',
    as: 'button',
    type: 'button',
};

export default Button;
