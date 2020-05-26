import { css } from 'styled-components';

import media from '../media';

const theme = css`
    :root {
        --color-blue: #4433ff;
        --color-blue-light: #5847ff;
        --color-blue-dark: #301feb;
        --color-soft-blue: #b3e5fc;
        --color-soft-blue-dark: #03a9f4;
        --color-green: #64ffda;
        --color-green-light: #78ffee;
        --color-green-dark: #27c29d;
        --color-pink: #f4348a;
        --color-soft-pink: #ffa7c4;
        --color-soft-pink-light: #ffbbd8;
        --color-soft-pink-dark: #eb93b0;
        --color-yellow: #ffdc00;
        --color-red: #e13c3c;
        --color-red-light: #f54747;
        --color-white-1: #f4f5f7;
        --color-white-2: #eaebed;
        --color-white-3: #e0e1e3;
        --color-white-4: #d5d6d8;
        --color-white-5: #cbccce;
        --color-navy-1: #09162a;
        --color-navy-2: #132034;
        --color-navy-3: #172a45;
        --color-navy-4: #21344f;
        --color-navy-5: #2b3e59;
        --color-grey-dark-1: #373737;
        --color-grey-dark-2: #525252;
        --color-grey-dark-3: #777;
        --color-grey-light-1: #e7e4e4;
        --color-grey-light-2: #ddd;
        --color-grey-light-3: #ccc;
        --color-grey-light-4: #bbb;

        --color-primary: var(--color-blue);
        --color-primary-light: var(--color-blue-light);
        --color-primary-dark: var(--color-blue-dark);
        --color-secondary: var(--color-pink);
        --color-tertiary: var(--color-yellow);
        --color-background-1: var(--color-white-1);
        --color-background-2: var(--color-white-2);
        --color-text-primary-1: var(--color-grey-dark-1);
        --color-text-primary-2: var(--color-grey-dark-2);
        --color-text-secondary-1: var(--color-background-1);
        --color-text-link: var(--color-primary);
        --color-danger: var(--color-red);
        --color-code-text: var(--color-text-primary-2);
        --color-code-background: var(--color-background-2);
        --color-text-highlight: var(--color-soft-blue);
        --color-field-background: var(--color-white-2);
        --color-field-background-hover: var(--color-white-3);
        --color-field-background-active: var(--color-white-1);
        --color-field-border: var(--color-white-4);
        --color-field-border-hover: var(--color-white-5);
        --color-field-border-active: var(--color-primary);
        --color-border-primary: var(--color-white-5);
        --color-socials: var(--color-text-primary-2);
        --color-socials-hover: var(--color-blue);
        --color-theme-toggle: var(--color-soft-pink);
        --color-card: var(--color-background-1);
        --color-scrollbar: var(--color-grey-light-3);
        --color-scrollbar-active: var(--color-grey-light-4);

        &.dark-mode {
            --color-primary: var(--color-soft-pink);
            --color-primary-light: var(--color-soft-pink-light);
            --color-primary-dark: var(--color-soft-pink-dark);
            --color-secondary: var(--color-green);
            --color-secondary-light: var(--color-green-light);
            --color-secondary-dark: var(--color-green-dark);
            --color-tertiary: var(--color-yellow);
            --color-background-1: var(--color-navy-1);
            --color-background-2: var(--color-navy-3);
            --color-text-primary-1: var(--color-white-1);
            --color-text-primary-2: var(--color-white-2);
            --color-text-secondary-1: var(--color-background-1);
            --color-socials: var(--color-text-primary-2);
            --color-socials-hover: var(--color-green);
            --color-card: var(--color-background-2);
            --color-text-highlight: var(--color-soft-blue-dark);
            --color-danger: var(--color-red-light);
            --color-scrollbar: var(--color-navy-4);
            --color-scrollbar-active: var(--color-navy-5);
            --color-field-background: var(--color-navy-4);
            --color-field-background-hover: var(--color-navy-3);
            --color-field-background-active: var(--color-navy-4);
            --color-field-border: var(--color-navy-3);
            --color-field-border-hover: var(--color-navy-2);
        }

        --fonts-primary: Inter, -apple-system, system-ui, Lato, Segoe UI, Roboto, Arial, sans-serif,
            monospace;
        --fonts-mono: SF Mono, Fira Code, Fira Mono, Lucida Console, Monaco, Consolas, monospace;

        --box-shadow-primary: 0 1px 3px rgba(0, 0, 0, 0.25);

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
        --page-padding: 12rem;
        ${media.bp1040`--page-padding: 8.8rem;`}
        ${media.bp800`--page-padding: 4.8rem;`}
        ${media.bp600`--page-padding: 3.2rem;`}
        ${media.bp440`--page-padding: 2.4rem;`}

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
