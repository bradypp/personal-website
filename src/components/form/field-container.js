import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const Container = styled.div`
    width: ${props => props.width || `100%`};
`;

const FieldLabel = styled.label`
    display: block;
    padding-bottom: 0.6rem;
    color: var(--color-text-primary-1);
    font-size: var(--font-size-sm);
    font-weight: 500;
    width: max-content;
`;

const fieldSubtitle = css`
    font-size: var(--font-size-sm);
    line-height: 1;
    font-weight: 400;
`;

const FieldTip = styled.div`
  ${fieldSubtitle}
  padding: ${props => (props.tipLocation === 'below' ? '0.6rem 0 0' : '0 0 1rem')};
    color: var(--color-text-primary-2);
  `;

const FieldError = styled.div`
    ${fieldSubtitle}
    padding-top: 0.6rem;
    color: var(--color-danger);
`;

const FieldContainer = ({
    children,
    label,
    tip,
    touched,
    error,
    name,
    htmlFor,
    tipLocation,
    ...props
}) => {
    const isError = touched && error;
    return (
        <Container data-testid={name ? `form-field:${name}` : 'form-field'} {...props}>
            {label && <FieldLabel htmlFor={htmlFor}>{label}</FieldLabel>}
            {tip && tipLocation === 'above' && <FieldTip tipLocation={tipLocation}>{tip}</FieldTip>}
            {children}
            {!isError && tip && tipLocation === 'below' && (
                <FieldTip tipLocation={tipLocation}>{tip}</FieldTip>
            )}
            {isError && typeof error === 'string' && <FieldError>{error}</FieldError>}
        </Container>
    );
};

FieldContainer.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    label: PropTypes.string,
    tip: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    width: PropTypes.string,
    htmlFor: PropTypes.string,
    tipLocation: PropTypes.string,
    touched: PropTypes.bool,
    error: PropTypes.bool,
};

FieldContainer.defaultProps = {
    className: undefined,
    label: undefined,
    tip: undefined,
    name: undefined,
    type: 'text',
    width: '100%',
    htmlFor: undefined,
    tipLocation: undefined,
    touched: undefined,
    error: undefined,
};

export default FieldContainer;
