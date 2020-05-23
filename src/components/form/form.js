import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Formik, Form as FormikForm } from 'formik';

import Field from './field';
import FormButtons from './formButtons';

const StyledFormikForm = styled(FormikForm)`
    width: 100%;
    & > *:not(:last-child) {
        margin-bottom: 2rem;
    }

    && > h1,
    && > h2,
    && > h3 {
        margin-bottom: 0.8rem;
    }
`;

const Form = props => <Formik {...props} />;

Form.Element = props => <StyledFormikForm noValidate {...props} />;
Form.Field = Field;
Form.Buttons = FormButtons;

Form.propTypes = {
    validateOnBlur: PropTypes.bool,
};

Form.defaultProps = {
    validateOnBlur: false,
};

export default Form;
