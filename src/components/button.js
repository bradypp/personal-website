import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Spinner, Icon } from '@components';
import { buttonStyles } from '@styles';

const StyledButton = styled.button`
    svg {
        color: currentColor;
        fill: currentColor;
    }

    ${props => {
        switch (props.variant) {
            case 'primary':
                return buttonStyles.primary;
            case 'empty':
                return buttonStyles.empty;
            default:
                return null;
        }
    }}
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
    type,
    onClick,
    size,
    ...props
}) => {
    const renderedIcon = (
        <>{!isWorking && icon && typeof icon === 'string' ? <Icon name={icon} /> : icon}</>
    );

    const handleClick = e => {
        if (!disabled && !isWorking && onClick) {
            onClick(e);
        }
    };

    return (
        <StyledButton
            size={size}
            onClick={handleClick}
            type={type}
            disabled={disabled || isWorking}
            {...props}>
            {isWorking && <ButtonSpinner />}
            {iconLocation === 'left' && renderedIcon}
            <ButtonText withPadding={icon || isWorking} iconLocation={iconLocation}>
                {children}
            </ButtonText>
            {iconLocation === 'right' && renderedIcon}
        </StyledButton>
    );
};

Button.propTypes = {
    to: PropTypes.string,
    onClick: PropTypes.func,
    children: PropTypes.node,
    className: PropTypes.string,
    variant: PropTypes.oneOf(['primary', 'secondary', 'empty']),
    type: PropTypes.string,
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    iconLocation: PropTypes.string,
    disabled: PropTypes.bool,
    isWorking: PropTypes.bool,
    size: PropTypes.oneOf(['medium', 'big']),
};

Button.defaultProps = {
    to: undefined,
    onClick: undefined,
    className: undefined,
    children: undefined,
    variant: 'primary',
    type: 'button',
    icon: undefined,
    iconLocation: 'left',
    disabled: false,
    isWorking: false,
    size: 'medium',
};

export default Button;
