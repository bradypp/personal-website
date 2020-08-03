import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Side, CustomLink } from '@components';
import { email } from '@config';

const EmailContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    &:after {
        content: '';
        display: block;
        width: 1px;
        height: 9rem;
        margin: 0 auto;
        background-color: var(--color-socials);
    }

    li:last-of-type {
        margin-bottom: 2rem;
    }
`;
const secondaryLink = styled(CustomLink)`
    font-family: var(--fonts-mono);
    font-size: var(--font-size-xxs);
    letter-spacing: 0.1em;
    writing-mode: vertical-rl;
    margin: 2rem auto;
    padding: 1rem;
    color: var(--color-socials);
    transition: var(--transition);

    &:hover {
        transform: translateY(-0.3rem);
        color: var(--color-primary);
    }
`;

const Email = ({ isHome, ...otherProps }) => (
    <Side isHome={isHome} {...otherProps}>
        <EmailContainer>
            <secondaryLink variant={null} href={`mailto:${email}`}>
                {email}
            </secondaryLink>
        </EmailContainer>
    </Side>
);

Email.propTypes = {
    isHome: PropTypes.bool,
};

Email.defaultProps = {
    isHome: false,
};

export default Email;
