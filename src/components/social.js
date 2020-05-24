import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Side, OutboundLink, Icon } from '@components';
import { socialMedia, email } from '@config';
import { mixins } from '@styles';

const List = styled.ul`
    ${mixins.flexColumnCenter}
    height: 100vh;
    padding: 0;
    margin: 0;
    list-style: none;

    &:before,
    &:after {
        content: '';
        display: block;
        width: 1px;
        height: 9rem;
        margin: 0 auto;
        background-color: var(--color-border);
    }

    li:first-of-type {
        margin-top: 2rem;
    }

    li:last-of-type {
        margin-bottom: 2rem;
    }
`;
const StyledLink = styled(OutboundLink)`
    padding: 1rem;
    transition: var(--transition);

    svg {
        width: 1.8rem;
        height: 1.8rem;
        color: var(--color-socials);
    }

    &:hover {
        transform: translateY(-0.3rem);
        svg {
            transition: var(--transition);
            color: var(--color-primary);
        }
    }
`;

const Social = ({ isHome, ...otherProps }) => (
    <Side isHome={isHome} {...otherProps}>
        <List>
            <li>
                <StyledLink variant={null} href={`mailto:${email}`}>
                    <Icon name="Email" />
                </StyledLink>
            </li>
            {socialMedia &&
                socialMedia.map(({ url, name }, i) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <li key={`socials-${i}`}>
                        <StyledLink href={url} aria-label={name}>
                            <Icon name={name} />
                        </StyledLink>
                    </li>
                ))}
        </List>
    </Side>
);

Social.propTypes = {
    isHome: PropTypes.bool,
};

Social.defaultProps = {
    isHome: false,
};

export default Social;
