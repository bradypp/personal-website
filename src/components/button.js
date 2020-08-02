import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link as GatsbyLink } from 'gatsby';

import { buttonStyles } from '@styles';
import { Spinner, Icon } from '@components';

const StyledButton = styled.button`
    ${buttonStyles}
`;
const StyledLink = styled(GatsbyLink)`
    ${buttonStyles}
`;
const ButtonText = styled.span`
    padding: ${({ withPadding, iconLocation }) =>
        withPadding ? (iconLocation === 'left' ? '0 0 0 0.7rem' : '0 0.7rem 0 0') : '0'};
`;
const ButtonSpinner = styled(props => <Spinner {...props} />).attrs({
    size: 2,
})`
    padding-right: 0.5rem;
    border-top-color: #666;
`;

const Button = ({
    children,
    disabled,
    isWorking,
    icon,
    iconLocation,
    type: propsType,
    as,
    onClick,
    ...props
}) => {
    const Component = as === 'button' ? StyledButton : StyledLink;

    let type;
    if (propsType) {
        type = propsType;
    } else {
        type = as === 'button' ? 'button' : null;
    }

    const renderedIcon = (
        <>{!isWorking && icon && typeof icon === 'string' ? <Icon name={icon} /> : icon}</>
    );

    const handleClick = e => {
        if (!disabled && !isWorking && onClick) {
            onClick(e);
        }
    };

    return (
        <Component onClick={handleClick} type={type} disabled={disabled || isWorking} {...props}>
            {isWorking && <ButtonSpinner />}
            {iconLocation === 'left' && renderedIcon}
            <ButtonText withPadding={icon || isWorking} iconLocation={iconLocation}>
                {children}
            </ButtonText>
            {iconLocation === 'right' && renderedIcon}
        </Component>
    );
};

Button.propTypes = {
    to: PropTypes.string,
    onClick: PropTypes.func,
    children: PropTypes.node,
    className: PropTypes.string,
    variant: PropTypes.oneOf(['inline-link', 'button-primary', 'button-secondary', 'button-empty']),
    as: PropTypes.oneOf(['link', 'button']),
    type: PropTypes.string,
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    iconLocation: PropTypes.string,
    disabled: PropTypes.bool,
    isWorking: PropTypes.bool,
};

Button.defaultProps = {
    to: undefined,
    onClick: undefined,
    className: undefined,
    children: undefined,
    variant: 'button-primary',
    as: 'button',
    type: undefined,
    icon: undefined,
    iconLocation: 'left',
    disabled: false,
    isWorking: false,
};

export default Button;
