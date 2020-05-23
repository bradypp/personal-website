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
`;

const InputElement = styled.input`
    height: 100%;
    width: 100%;
    padding: ${({ hasIcon, iconLocation, height }) =>
        hasIcon
            ? css`
                  ${(iconLocation === 'left' && `1rem 0.6rem 0.6rem ${height}rem`) ||
                  (iconLocation === 'right' && `1rem ${height}rem 0.6rem 0.6rem`)};
              `
            : '1rem 0.6rem 0.6rem'};
    ${mixins.formField};
`;

const Input = forwardRef(({ icon, iconLocation, className, onChange, height, ...props }, ref) => (
    <InputContainer className={className} height={height} iconLocation={iconLocation}>
        {icon && typeof icon === 'string' ? <Icon name={icon} /> : icon}
        <InputElement
            iconLocation={iconLocation}
            hasIcon={!!icon}
            onChange={event => onChange(event.target.value, event)}
            height={height}
            ref={ref}
            {...props}
        />
    </InputContainer>
));

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
};

export default Input;
