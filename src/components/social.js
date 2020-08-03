import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import { Side, CustomLink, Icon } from '@components';
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

        ${media.bp1280`
            height: 60px;
        `}
    }

    li:first-of-type {
        margin-top: 1.1rem;
    }

    li:last-of-type {
        margin-bottom: 1.1rem;
    }

    li {
        a {
            padding: 1.1rem;
        }
        svg {
            width: 20px;
            height: 20px;
        }
    }
`;

const Social = ({ isHome, ...otherProps }) => (
    <Side isHome={isHome} {...otherProps}>
        <List>
            <li>
                <CustomLink variant="secondary" href={`mailto:${email}`}>
                    <Icon name="email" />
                </CustomLink>
            </li>
            {socialMedia &&
                socialMedia.map(({ url, name }) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <li key={uuidv4()}>
                        <CustomLink href={url} aria-label={name} variant="secondary">
                            <Icon name={name} />
                        </CustomLink>
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
