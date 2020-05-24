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

const Button = ({ children, variant, type: propsType, as, ...props }) => {
    const Component = as === 'link' ? StyledLink : StyledButton;
    const type = propsType || variant === 'button' ? 'button' : null;
    return (
        <Component variant={variant} type={type} {...props}>
            {children}
        </Component>
    );
};

Button.propTypes = {
    to: PropTypes.string,
    onClick: PropTypes.func,
    children: PropTypes.node,
    className: PropTypes.string,
    variant: PropTypes.oneOf(['inline-link', 'primary-button', 'secondary-button', 'empty-button']),
    as: PropTypes.oneOf(['link', 'button']),
    type: PropTypes.string,
};

Button.defaultProps = {
    to: undefined,
    onClick: undefined,
    className: undefined,
    children: undefined,
    variant: 'primary-button',
    as: 'button',
    type: undefined,
};

export default Button;
