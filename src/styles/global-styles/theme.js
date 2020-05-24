import { css } from 'styled-components';

import media from '../media';

const theme = css`
    :root {
        --color-blue: #007bff;
        --color-blue-light: #1a88ff;
        --color-blue-dark: #006fe6;
        --color-pink: #ff0a78;
        --color-yellow: #ffdc00;
        --color-white-1: #f4f5f7;
        --color-white-2: #eaebed;
        --color-white-3: #e0e1e3;
        --color-white-4: #d5d6d8;
        --color-white-5: #cbccce;
        --color-navy-1: #f4f5f7;
        --color-navy-2: #eaebed;
        --color-navy-3: #e0e1e3;
        --color-navy-4: #d5d6d8;
        --color-navy-5: #cbccce;
        --color-grey-dark-1: #373737;
        --color-grey-dark-2: #525252;
        --color-grey-dark-3: #777;
        --color-grey-light-1: #e7e4e4;
        --color-grey-light-2: #ddd;
        --color-grey-light-3: #ccc;
        --color-code-text: var(--color-text-primary-2);
        --color-code-background: var(--color-background-2);
        --color-socials: var(--color-text-primary-2);
        --color-border: var(--color-background-5);
        --color-text-highlight: var(--color-tertiary);

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

        --z-index-side: 25;
        --z-index-header: 50;
        --z-index-dropdown: 100;
        --z-index-modal: 150;

        --max-width: 120rem;
        --page-padding: 4.8rem;
        ${media.bp800`--page-padding: 3.2rem;`}
        ${media.bp440`--page-padding: 1.6rem;`}

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

        --header-shadow: rgba(0, 0, 0, 0.25);

        --ham-before: top 0.1s ease-in 0.15s, opacity 0.1s ease-in;
        --ham-before-active: top 0.1s ease-out, opacity 0.1s ease-out;
        --ham-after: bottom 0.1s ease-in 0.15s,
            transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19);
        --ham-after-active: bottom 0.1s ease-out,
            transform 0.22s cubic-bezier(0.215, 0.61, 0.355, 1);
    }
`;

export default theme;
