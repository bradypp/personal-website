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
    color: var(--color-primary);
    background-color: transparent;
    padding: 2rem 2.2rem;
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
    border: 1px solid var(--color-background-1);
    background-color: var(--color-background-1);
    color: var(--color-text-primary-1);

    &:hover,
    &:active {
        border: 1px solid var(--color-background-2);
        background-color: var(--color-background-2);
    }
`;

const inlineLink = css`
    ${mixins.inlineLink}
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
            default:
                return null;
        }
    }}
`;

export default buttonStyles;
