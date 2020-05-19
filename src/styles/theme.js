import { css } from 'styled-components';

const theme = css`
    :root {
        --color-primary: #4391e3;
        --color-secondary: #62eccf;

        --color-white-1: #f4f5f7;
        --color-white-2: #e2e4e9;
        --color-white-3: #d5d7dc;

        --color-grey-dark-1: #292929;
        --color-grey-dark-2: #525252;
        --color-grey-dark-3: #777;
        --color-grey-dark-4: #8993a4;

        --color-grey-light-1: #e7e4e4;
        --color-grey-light-2: #ddd;
        --color-grey-light-3: #ccc;

        --color-background-1: var(--color-white-1);
        --color-background-2: var(--color-white-2);

        --color-text-primary-1: var(--color-grey-dark-1);
        --color-text-primary-2: var(--color-grey-dark-2);
        --color-text-secondary-1: var(--color-white-1);
        --color-text-highlight: var(--color-primary);
        --color-text-link: var(--color-primary);

        --color-code-text: var(--color-grey-dark-2);
        --color-code-background: var(--color-grey-light-2);

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
        --z-index-modal: 150;

        --max-width: 120rem;
        --page-padding: 4.8rem;
        --page-padding-tablet: 3.2rem;
        --page-padding-mobile: 1.6rem;
        --header-height: 6rem;

        --transition-time: 0.25s;
        --transition: all var(--transition-time) cubic-bezier(0.645, 0.045, 0.355, 1);
        --easing: cubic-bezier(0.3, 0, 0.4, 1);

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
