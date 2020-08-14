import { css } from 'styled-components/macro';

import { mixins } from '@styles';

const commonStyles = css`
    ${mixins.clickable}
    border-radius: var(--border-radius);
    font-size: ${props =>
        (props.size === 'medium' && 'var(--font-size-sm)') ||
        (props.size === 'big' && 'var(--font-size-md)')};
    font-family: var(--fonts-primary);
    letter-spacing: 0.06em;
    font-weight: 500;
    line-height: 1;
    text-decoration: none;
    cursor: pointer;
    transition: var(--transition);
`;

const buttonStyles = {
    primary: css`
        ${commonStyles}
        color: var(--color-text-secondary-1);
        background-color: var(--color-primary);
        padding: ${props =>
            (props.size === 'medium' && '1.5rem 2.3rem') ||
            (props.size === 'big' && '1.8rem 2.8rem')};
        box-shadow: 0 0.4rem var(--color-primary-darker);
        margin-bottom: 0.25em;

        &:not(:disabled) {
            &:hover {
                background-color: var(--color-primary-dark);
            }
            &:active {
                background-color: var(--color-primary-darker);
                box-shadow: 0 0.1rem var(--color-primary-darker);
                margin-bottom: 0.05em;
                margin-top: 0.2em;
            }
        }
    `,
    empty: css`
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
    `,
};

export default buttonStyles;
