import { css } from 'styled-components/macro';

import { mixins } from '@styles';

const primaryButton = css`
    color: var(--color-primary);
    background-color: transparent;
    border: 1.5px solid var(--color-primary);
    border-radius: var(--border-radius);
    padding: 1.8rem 2.25rem;
    font-size: var(--font-size-md);
    font-family: var(--fonts-mono);
    font-weight: 500;
    line-height: 1;
    text-decoration: none;
    cursor: pointer;
    transition: var(--transition);

    &:hover {
        color: var(--color-white-1);
        background-color: var(--color-primary);
    }
`;

const inlineLink = css`
    ${mixins.inlineLink}
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
