import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Side, OutboundLink, Icon } from '@components';
import { socialMedia, email } from '@config';
import { mixins, media } from '@styles';

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
        height: 70px;
        margin: 0 auto;
        background-color: var(--color-border-primary);

        ${media.bp1440`
            height: 60px;
        `}
    }

    li:first-of-type {
        margin-top: 1rem;
    }

    li:last-of-type {
        margin-bottom: 1rem;
    }

    li {
        svg {
            width: 22px;
            height: 22px;
        }
        ${media.bp2400`
        svg {
            width: 20px;
            height: 20px;
        }
    `}
    }
`;

const Social = ({ isHome, ...otherProps }) => (
    <Side isHome={isHome} {...otherProps}>
        <List>
            <li>
                <OutboundLink variant="styled-link" href={`mailto:${email}`}>
                    <Icon name="Email" />
                </OutboundLink>
            </li>
            {socialMedia &&
                socialMedia.map(({ url, name }, i) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <li key={`socials-${i}`}>
                        <OutboundLink href={url} aria-label={name} variant="styled-link">
                            <Icon name={name} />
                        </OutboundLink>
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
