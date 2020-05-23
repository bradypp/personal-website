import { css } from 'styled-components/macro';

import { mixins } from '@styles';

const commonStyles = css`
    border-radius: var(--border-radius);
    font-size: var(--font-size-md);
    font-family: var(--fonts-mono);
    font-weight: 500;
    line-height: 1;
    text-decoration: none;
    cursor: pointer;
    transition: var(--transition);
`;

const primary = css`
    ${commonStyles}
    color: var(--color-primary);
    background-color: transparent;
    padding: 1.8rem 2.25rem;
    border: 1px solid var(--color-primary);

    &:hover,
    &:active {
        color: var(--color-white-1);
        background-color: var(--color-primary);
    }
`;

const secondary = css`
    ${commonStyles}
    color: var(--color-white-1);
    background-color: var(--color-primary);
    padding: 1.2rem 1.8rem;
    border: 1px solid var(--color-primary);

    &:hover,
    &:active {
        background-color: var(--color-primary-dark);
    }
`;

const empty = css`
    ${commonStyles}
    padding: 1.2rem 1.8rem;
    background-color: var(--color-background-1);

    &:hover,
    &:active {
        background-color: var(--color-background-3);
    }
`;

const inlineLink = css`
    ${mixins.inlineLink}
`;

const buttonStyles = css`
    ${props => {
        switch (props.variant) {
            case 'primary-button':
                return primary;
            case 'secondary-button':
                return secondary;
            case 'empty-button':
                return empty;
            case 'inline-link':
                return inlineLink;
            default:
                return null;
        }
    }}
`;

export default buttonStyles;
