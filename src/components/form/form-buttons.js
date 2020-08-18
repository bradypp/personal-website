import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from '../button';

const ButtonsContainer = styled.div`
    display: flex;
    justify-content: ${({ align }) =>
        (align === 'left' && 'flex-start') ||
        (align === 'center' && 'center') ||
        (align === 'right' && 'flex-end')};
    align-items: center;

    & > *:not(:last-child) {
        margin-right: 1.6rem;
    }
`;

const StyledButton = styled(Button)`
    font-size: ${props =>
        (props.size === 'medium' && 'var(--font-size-xs)') ||
        (props.size === 'big' && 'var(--font-size-md)')};
    padding: ${props =>
        (props.size === 'medium' && '1.3rem 1.6rem') || (props.size === 'big' && '1.7rem 2.2rem')};
`;

const FormButtons = ({
    withSubmit,
    withReset,
    withCancel,
    onCancel,
    customButtons,
    submitText,
    resetText,
    cancelText,
    isSubmitting,
    size,
    ...props
}) => (
    <ButtonsContainer {...props}>
        {withSubmit && (
            <StyledButton size={size} type="submit" variant="primary" isWorking={isSubmitting}>
                {submitText}
            </StyledButton>
        )}
        {withReset && (
            <StyledButton size={size} type="reset" variant="empty">
                {resetText}
            </StyledButton>
        )}
        {customButtons && customButtons}
        {withCancel && (
            <StyledButton size={size} type="button">
                {cancelText}
            </StyledButton>
        )}
    </ButtonsContainer>
);

FormButtons.propTypes = {
    className: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    withSubmit: PropTypes.bool,
    withReset: PropTypes.bool,
    withCancel: PropTypes.bool,
    onCancel: PropTypes.func,
    customButtons: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    submitText: PropTypes.string,
    resetText: PropTypes.string,
    cancelText: PropTypes.string,
    align: PropTypes.string,
    isSubmitting: PropTypes.bool,
    size: PropTypes.string,
};

FormButtons.defaultProps = {
    className: PropTypes.string,
    withSubmit: true,
    withReset: false,
    withCancel: false,
    onCancel: () => {},
    customButtons: undefined,
    submitText: 'Submit',
    resetText: 'Reset',
    cancelText: 'Cancel',
    align: 'left',
    isSubmitting: false,
    size: 'medium',
};

export default FormButtons;
