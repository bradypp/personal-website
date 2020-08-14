import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { Icon } from '@components';
import { mixins } from '@styles';

const InputContainer = styled.div`
    position: relative;
    height: ${props => `${props.height}rem`};
    width: 100%;
    border-radius: var(--border-radius);
    svg {
        position: absolute;
        font-size: ${props => `${props.height / 1.8}rem`};
        pointer-events: none;
        ${({ iconLocation }) =>
            (iconLocation === 'left' &&
                css`
                    top: ${props => `${props.height / 4.2}rem`};
                    left: ${props => `${props.height / 4.2}rem`};
                `) ||
            (iconLocation === 'right' &&
                css`
                    top: ${props => `${props.height / 4.2}rem`};
                    right: ${props => `${props.height / 4.2}rem`};
                `)}
    }
    input {
        position: relative;
        ${props =>
            (props.variant === 'default' && mixins.formField) ||
            (props.variant === 'newsletter' &&
                css`
                    background-color: var(--color-background-secondary-1);
                    border-bottom: 3px solid var(--color-newsletter-field-border);
                    font-size: var(--font-size-xl);
                    color: var(--color-text-primary-1);

                    &:focus,
                    &:active {
                        border-bottom: 3px solid var(--color-newsletter-field-border-active);
                    }

                    ${props =>
                        props.invalid &&
                        css`
                            &,
                            &:invalid,
                            &:focus {
                                border-bottom: 3px solid var(--color-danger) !important;
                            }
                        `};
                `)}
    }
`;

const InputElement = styled.input`
    height: 100%;
    width: 100%;
    padding: ${({ hasIcon, iconLocation, height }) =>
        hasIcon
            ? css`
                  ${(iconLocation === 'left' && `0.8rem 0.6rem 0.8rem ${height}rem`) ||
                  (iconLocation === 'right' && `0.8rem  ${height}rem 0.8rem  0.6rem `)};
              `
            : '0.8rem 0.6rem'};
`;

const Input = forwardRef(
    ({ icon, iconLocation, className, onChange, height, variant, invalid, ...props }, ref) => {
        return (
            <InputContainer
                className={className}
                height={height}
                iconLocation={iconLocation}
                invalid={invalid}
                variant={variant}>
                {icon && typeof icon === 'string' ? <Icon name={icon} /> : icon}
                <InputElement
                    iconLocation={iconLocation}
                    hasIcon={!!icon}
                    onChange={event => onChange(event.target.value, event)}
                    height={height}
                    invalid={invalid}
                    ref={ref}
                    {...props}
                />
            </InputContainer>
        );
    },
);

Input.propTypes = {
    className: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    type: PropTypes.string,
    icon: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.node]),
    iconLocation: PropTypes.oneOf(['left', 'right']),
    height: PropTypes.number,
    fontSize: PropTypes.string,
    invalid: PropTypes.bool,
    onChange: PropTypes.func,
    variant: PropTypes.oneOf(['default', 'newsletter']),
};

Input.defaultProps = {
    className: undefined,
    value: undefined,
    type: 'text',
    icon: undefined,
    iconLocation: 'left',
    height: 3.2,
    fontSize: undefined,
    invalid: false,
    onChange: () => {},
    variant: 'default',
};

export default Input;
