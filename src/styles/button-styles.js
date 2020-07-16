import { css } from 'styled-components/macro';

import { mixins } from '@styles';

const commonStyles = css`
    ${mixins.clickable}
    border-radius: var(--border-radius);
    font-size: var(--font-size-sm);
    font-family: var(--fonts-mono);
    font-weight: 600;
    line-height: 1;
    text-decoration: none;
    cursor: pointer;
    transition: var(--transition);
`;

const primary = css`
    ${commonStyles}
    color: var(--color-text-secondary-1);
    background-color: var(--color-primary);
    padding: 1.6rem 2.3rem;
    box-shadow: 0 0.4rem var(--color-primary-darker);
    margin-bottom: 0.25em;

    &:not(:disabled) {
        &:hover {
            background-color: var(--color-primary-light);
            box-shadow: 0 0.4rem var(--color-primary-dark);
        }
        &:active {
            box-shadow: 0 0.1rem var(--color-primary-darker);
            background-color: var(--color-primary-darker);
            margin-bottom: 0.05em;
            margin-top: 0.2em;
        }
    }
`;

const secondary = css`
    ${commonStyles}
    color: var(--color-text-secondary-1);
    background-color: var(--color-primary);
    padding: 1.2rem 1.8rem;
    border: 1px solid var(--color-primary);

    &:not(:disabled) {
        &:hover,
        &:active {
            background-color: var(--color-primary-dark);
            border: 1px solid var(--color-primary-dark);
        }
    }
`;

const empty = css`
    ${commonStyles}
    padding: 1.2rem 1.8rem;
    border: 1px solid var(--color-background-primary-1);
    background-color: var(--color-background-primary-1);
    color: var(--color-text-primary-1);

    &:hover,
    &:active {
        border: 1px solid var(--color-background-primary-2);
        background-color: var(--color-background-primary-2);
    }
`;

const inlineLink = css`
    ${mixins.inlineLink}
`;

const styledLink = css`
    ${mixins.styledLink}
`;

const buttonStyles = css`
    svg {
        color: currentColor;
        fill: currentColor;
    }
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
            case 'styled-link':
                return styledLink;
            default:
                return null;
        }
    }}
`;

export default buttonStyles;
