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
    font-size: var(--font-size-sm);
    padding: 1.3rem 1.6rem;
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
    ...props
}) => (
    <ButtonsContainer {...props}>
        {withSubmit && (
            <StyledButton type="submit" variant="secondary-button">
                {submitText}
            </StyledButton>
        )}
        {withReset && (
            <StyledButton type="reset" variant="empty-button">
                {resetText}
            </StyledButton>
        )}
        {customButtons && customButtons}
        {withCancel && <StyledButton type="button">{cancelText}</StyledButton>}
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
};

export default FormButtons;
