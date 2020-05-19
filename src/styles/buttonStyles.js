import { css } from 'styled-components/macro';

const primaryButton = css`
    color: var(--color-primary);
    background-color: transparent;
    border: 1.5px solid var(--color-primary);
    border-radius: var(--border-radius);
    padding: 1.8rem 2.25rem;
    font-size: var(--font-size-sm);
    font-family: var(--fonts-mono);
    font-weight: 500;
    line-height: 1;
    text-decoration: none;
    cursor: pointer;
    transition: var(--transition);
    &:hover,
    &:focus,
    &:active {
        color: var(--color-white-1);
        background-color: var(--color-primary);
    }
    &:after {
        display: none !important;
    }
`;

const inlineLink = css`
    display: inline-block;
    text-decoration: none;
    text-decoration-skip-ink: auto;
    position: relative;
    transition: var(--color-transition);
    cursor: pointer;
    color: var(--color-text-link);
    &:hover,
    &:focus,
    &:active {
        color: var(--color-text-link);
        outline: 0;
        &:after {
            width: 100%;
        }
        & > * {
            color: var(--color-text-link) !important;
            transition: var(--transition);
        }
    }
    &:after {
        content: '';
        display: block;
        width: 0;
        height: 1px;
        position: relative;
        bottom: 0.37em;
        background-color: var(--color-text-link);
        transition: var(--transition);
        opacity: 0.5;
    }
`;

const buttonStyles = css`
    ${props => {
        switch (props.variant) {
            case 'primary-button':
                return primaryButton;
            case 'inline-link':
                return inlineLink;
            default:
                return null;
        }
    }}
`;

export default buttonStyles;
