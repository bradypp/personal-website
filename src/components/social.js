import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import { Side, OutboundLink, Icon } from '@components';
import { socialMedia, email } from '@config';

const StyledList = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0;
    margin: 0;
    list-style: none;

    &:after {
        content: '';
        display: block;
        width: 1px;
        height: 9rem;
        margin: 0 auto;
        background-color: var(--color-side);
    }

    li:last-of-type {
        margin-bottom: 2rem;
    }
`;
const StyledLink = styled(OutboundLink)`
    padding: 1rem;
    &:hover,
    &:focus {
        transform: translateY(-0.3rem);
        svg {
            transition: var(--transition);
            color: var(--color-primary);
        }
    }
    svg {
        width: 1.8rem;
        height: 1.8rem;
        color: var(--color-side);
    }
`;

const Social = ({ isHome, ...otherProps }) => (
    <Side isHome={isHome} {...otherProps}>
        <StyledList>
            <StyledLink variant={null} href={`mailto:${email}`}>
                <Icon name="Email" />
            </StyledLink>
            {socialMedia &&
                socialMedia.map(({ url, name }, i) => (
                    <li key={`socials-${i}`}>
                        <StyledLink href={url} aria-label={name} variant={null}>
                            <Icon name={name} />
                        </StyledLink>
                    </li>
                ))}
        </StyledList>
    </Side>
);

Social.propTypes = {
    isHome: PropTypes.bool,
};

Social.defaultProps = {
    isHome: false,
};

export default Social;
