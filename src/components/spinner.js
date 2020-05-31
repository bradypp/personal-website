import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import { mixins } from '@styles';

const SpinnerContainer = styled.div`
    ${mixins.flexCenter}
    height: 100%;
    width: 100%;
`;

const StyledSpinner = styled.div`
    display: inline-block;
    width: ${({ size }) => `${size}rem`};
    height: ${({ size }) => `${size}rem`};
    border-radius: 50%;
    border: ${({ size }) => `${size / 11}rem solid #fff`};
    border-top-color: #999;
    animation: spin 0.8s var(--ease) infinite;

    @keyframes spin {
        to {
            -webkit-transform: rotate(360deg);
        }
    }
    @-webkit-keyframes spin {
        to {
            -webkit-transform: rotate(360deg);
        }
    }
`;

const Spinner = ({ className, ...props }) => (
    <SpinnerContainer className={className}>
        <StyledSpinner {...props} />
    </SpinnerContainer>
);

Spinner.propTypes = {
    size: PropTypes.string,
    className: PropTypes.string,
    variant: PropTypes.string,
};

Spinner.defaultProps = {
    size: 4.5,
    className: undefined,
    variant: 'primary',
};

export default Spinner;
