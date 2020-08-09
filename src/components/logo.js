import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'gatsby';
import styled from 'styled-components';

import { Icon } from '@components';

const StyledLink = styled(Link).attrs({ to: '/' })`
    width: 5.5rem;
    height: 5.5rem;

    svg {
        .logo-border {
            transition: all 0.2s var(--ease);
            stroke: var(--color-text-primary-1);
        }
        .logo-text {
            transition: all 0.2s var(--ease);
            fill: var(--color-text-primary-1);
        }

        &:hover {
            fill: var(--color-logo-hover);

            .logo-border {
                stroke: var(--color-primary);
            }
            .logo-text {
                fill: var(--color-primary);
            }
        }
    }
`;

const Logo = ({ className }) => {
    return (
        <StyledLink className={className}>
            <Icon name="logo" />
        </StyledLink>
    );
};

Logo.propTypes = {
    className: PropTypes.string,
};

Logo.defaultProps = {
    className: PropTypes.string,
};

export default Logo;
