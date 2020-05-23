import { css } from 'styled-components';

const theme = css`
    :root {
        --color-primary: #007bff;
        --color-primary-light: #1a88ff;
        --color-primary-dark: #006fe6;
        --color-secondary: #ff0a78;
        --color-tertiary: #ffdc00;
        --color-danger: #e13c3c;

        --color-white-1: #f4f5f7;
        --color-white-2: #f0f2f4;
        --color-white-3: #e6e8ea;
        --color-white-4: #d3d9de;
        --color-white-5: #c4ccd4;

        --color-grey-dark-1: #373737;
        --color-grey-dark-2: #525252;
        --color-grey-dark-3: #777;

        --color-grey-light-1: #e7e4e4;
        --color-grey-light-2: #ddd;
        --color-grey-light-3: #ccc;

        --color-background-1: var(--color-white-1);
        --color-background-2: var(--color-white-2);
        --color-background-3: var(--color-white-3);
        --color-background-4: var(--color-white-4);
        --color-background-5: var(--color-white-5);

        --color-text-primary-1: var(--color-grey-dark-1);
        --color-text-primary-2: var(--color-grey-dark-2);
        --color-text-secondary-1: var(--color-white-1);
        --color-text-highlight: var(--color-tertiary);
        --color-text-link: var(--color-primary);

        --color-code-text: var(--color-grey-dark-2);
        --color-code-background: var(--color-grey-light-2);

        --color-side: var(--color-grey-dark-2);

        --box-shadow-primary: 0 1px 3px rgba(0, 0, 0, 0.25);

        --fonts-primary: Calibre, -apple-system, system-ui, Roboto, Segoe UI, Arial, sans-serif,
            monospace;
        --fonts-mono: SF Mono, Fira Code, Fira Mono, Roboto Mono, Lucida Console, Monaco, monospace;

        --font-size-xxs: 1.2rem;
        --font-size-xs: 1.3rem;
        --font-size-sm: 1.4rem;
        --font-size-md: 1.6rem;
        --font-size-lg: 1.8rem;
        --font-size-xl: 2rem;
        --font-size-xxl: 2.2rem;
        --font-size-h3: 3.2rem;

        --z-index-header: 50;
        --z-index-dropdown: 100;
        --z-index-side: 125;
        --z-index-modal: 150;

        --max-width: 120rem;
        --page-padding: 4.8rem;
        --page-padding-tablet: 3.2rem;
        --page-padding-mobile: 1.6rem;
        --header-height: 6rem;

        --ease: cubic-bezier(0.3, 0, 0.4, 1);
        --ease-in-cubic: cubic-bezier(0.55, 0.055, 0.675, 0.19);
        --ease-out-cubic: cubic-bezier(0.215, 0.61, 0.355, 1);
        --ease-in-out-cubic: cubic-bezier(0.215, 0.61, 0.355, 1);
        --ease-in-expo: cubic-bezier(0.95, 0.05, 0.795, 0.035);
        --ease-out-expo: cubic-bezier(0.19, 1, 0.22, 1);
        --ease-in-out-expo: cubic-bezier(0.19, 1, 0.22, 1);
        --ease-in-back: cubic-bezier(0.6, -0.28, 0.735, 0.045);
        --ease-out-back: cubic-bezier(0.175, 0.885, 0.32, 1.275);
        --ease-in-out-back: cubic-bezier(0.68, -0.55, 0.265, 1.55);

        --transition-time: 0.25s;
        --transition: all var(--transition-time) var(--ease);

        --border-radius: 3px;

        --hamburger-width: 30px;
        --ham-before: top 0.1s ease-in 0.25s, opacity 0.1s ease-in;
        --ham-before-active: top 0.1s ease-out, opacity 0.1s ease-out 0.12s;
        --ham-after: bottom 0.1s ease-in 0.25s,
            transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19);
        --ham-after-active: bottom 0.1s ease - out,
            transform 0.22s cubic - bezier(0.215, 0.61, 0.355, 1) 0.12s;
    }
`;

export default theme;
