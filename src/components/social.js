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
        height: 8rem;
        margin: 0 auto;
        background-color: var(--color-border-primary);

        ${media.bp1280`
            height: 7rem;
        `}
        ${media.bp1040`
            height: 6rem;
        `}
    }

    li:first-of-type {
        margin-top: 2rem;
    }

    li:last-of-type {
        margin-bottom: 2rem;
    }

    li {
        a {
            ${media.bp1040`
                padding: 0.8rem;
            `}
        }
        svg {
            width: 2rem;
            height: 2rem;
        }
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
