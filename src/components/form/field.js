import React from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';
import { Field, getIn } from 'formik';

import Input from './input';
import TextArea from './text-area';
import FieldContainer from './field-container';

const generateField = FormComponent => {
    const FieldComponent = ({
        className,
        label,
        tip,
        submitOnChange,
        name,
        type,
        width,
        fieldId: propsId,
        margin,
        tipLocation,
        customOnChange,
        withErrorMsg,
        variant,
        ...props
    }) => (
        <Field name={name} type={type}>
            {({ field, form }) => {
                const fieldId = propsId || uniqueId('form-field-');
                const error = getIn(form.errors, name);
                const touched = getIn(form.touched, name);

                return (
                    <FieldContainer
                        withErrorMsg={withErrorMsg}
                        variant={variant}
                        className={className}
                        data-testid={name ? `form-field:${name}` : 'form-field'}
                        width={width}
                        margin={margin}
                        name={name}
                        label={label}
                        tip={tip}
                        htmlFor={fieldId}
                        tipLocation={tipLocation}
                        touched={touched}
                        error={error}
                        type={type}>
                        <FormComponent
                            {...field}
                            {...props}
                            variant={variant}
                            type={type}
                            id={fieldId}
                            invalid={error && touched}
                            onChange={value => {
                                form.setFieldValue(name, value);
                                if (customOnChange) customOnChange(value);
                                if (submitOnChange) form.submitForm();
                            }}
                        />
                    </FieldContainer>
                );
            }}
        </Field>
    );

    FieldComponent.propTypes = {
        className: PropTypes.string,
        label: PropTypes.string,
        tip: PropTypes.string,
        name: PropTypes.string,
        submitOnChange: PropTypes.bool,
        type: PropTypes.string,
        width: PropTypes.string,
        fieldId: PropTypes.string,
        margin: PropTypes.string,
        tipLocation: PropTypes.oneOf(['above', 'below']),
        customOnChange: PropTypes.func,
        withErrorMsg: PropTypes.bool,
        variant: PropTypes.oneOf(['default', 'newsletter']),
    };

    FieldComponent.defaultProps = {
        className: undefined,
        label: undefined,
        tip: undefined,
        name: undefined,
        submitOnChange: false,
        type: 'text',
        width: '100%',
        fieldId: undefined,
        margin: undefined,
        tipLocation: 'below',
        customOnChange: undefined,
        withErrorMsg: true,
        variant: 'default',
    };

    return FieldComponent;
};

export default {
    Input: generateField(Input),
    TextArea: generateField(TextArea),
};
