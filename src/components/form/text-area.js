import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TextAreaAutoSize from 'react-textarea-autosize';

import { mixins } from '@styles';

export const TextAreaContainer = styled.div`
    display: inline-block;
    width: 100%;

    textarea {
        overflow-y: hidden;
        padding: 0.8rem 0.6rem;
        min-height: ${props => `${props.height}rem !important`};
        width: 100%;
        ${mixins.formField};
    }
`;

const TextArea = forwardRef(({ className, invalid, onChange, height, ...props }, ref) => (
    <TextAreaContainer className={className} invalid={invalid} height={height}>
        <TextAreaAutoSize
            onChange={event => onChange(event.target.value, event)}
            inputRef={ref || undefined}
            {...props}
        />
    </TextAreaContainer>
));

TextArea.propTypes = {
    className: PropTypes.string,
    invalid: PropTypes.bool,
    height: PropTypes.number,
    value: PropTypes.string,
    onChange: PropTypes.func,
};

TextArea.defaultProps = {
    className: undefined,
    invalid: false,
    height: 4,
    value: undefined,
    onChange: () => {},
};

export default TextArea;
