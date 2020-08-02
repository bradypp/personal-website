import { css } from 'styled-components';

import mixins from '../mixins';
import media from '../media';

const base = css`
    *,
    *:before,
    *:after {
        margin: 0;
        padding: 0;
        box-sizing: inherit;
    }

    html,
    body {
        width: 100%;
        max-width: 100%;
        overflow-x: hidden;
    }

    html {
        box-sizing: border-box;
        touch-action: manipulation;

        font-size: 62.5%;

        ${'' /* 1rem = 9px */}
        ${media.bp800`
        font-size: 56.25%; 
    `}
    }

    body {
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        font-family: var(--fonts-primary);
        font-size: var(--font-size-md);
        font-weight: 400;
        line-height: 1.5;
        color: var(--color-text-primary-1);
        background: var(--color-background-primary-1);
        min-height: 100vh;
        transition: var(--transition);

        &.hidden {
            overflow: hidden;
        }
        &.blur {
            overflow: hidden;
            #content > * {
                filter: blur(5px) brightness(0.7);
                transition: var(--transition);
                pointer-events: none;
                user-select: none;
            }
        }
    }

    ${mixins.customScrollbar({
        color: 'var(--color-scrollbar)',
        width: '12px',
        activeColor: 'var(--color-scrollbar-active)',
    })}

    #root {
        ${mixins.flexColumnCenter}
        min-height: 100vh;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        font-weight: 600;
        margin: 0 0 1rem 0;
    }

    h1 {
        font-size: var(--font-size-h1);
        line-height: 1.2;
    }
    h2 {
        font-size: var(--font-size-h2);
        line-height: 1.3;
    }
    h3 {
        font-size: var(--font-size-h3);
        line-height: 1.4;
    }
    h4 {
        font-size: var(--font-size-lg);
    }
    h5 {
        font-size: var(--font-size-md);
    }
    h6 {
        font-size: var(--font-size-sm);
    }

    img {
        width: 100%;
        max-width: 100%;
        vertical-align: middle;
    }

    img[alt=''],
    img:not([alt]) {
        filter: blur(5px);
    }

    svg {
        width: 100%;
        height: 100%;
        vertical-align: middle;
        display: inline-block;

        &:before {
            speak: none;
            font-style: normal;
            font-weight: normal;
            font-variant: normal;
            text-transform: none;
            line-height: 1;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
    }

    [role='button'],
    button,
    a,
    input,
    select,
    textarea {
        outline: none;
        border: 0;
        border-radius: 0;
        transition: var(--transition);

        &:focus,
        &:active {
            outline: none;
        }

        &:disabled {
            opacity: 0.7;
            cursor: default;
        }
    }

    [role='button'],
    button {
        ${mixins.clickable}
        background: none;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        vertical-align: middle;
        white-space: nowrap;
        appearance: none;
        overflow: hidden;
        position: relative;
        width: min-content;
        appearance: none;
    }

    a {
        display: inline-block;
        text-decoration: none;
        text-decoration-skip-ink: auto;
        color: var(--color-text-link);
        position: relative;
        font-weight: 500;
    }

    input,
    textarea {
        &::placeholder {
            opacity: 0.5;
            font-style: italic;
        }

        &:focus,
        &:active {
            &::placeholder {
                opacity: 0.4;
            }
        }
    }

    p {
        margin: 0 0 1.5rem 0;

        & > a {
            ${mixins.inlineLink};
        }

        & > code {
            background-color: var(--color-code-background);
            color: var(--color-code-text);
            font-size: var(--font-size-xs);
            border-radius: var(--border-radius);
            padding: 0.3em 0.5em;
        }
    }

    ul {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    code {
        font-family: var(--fonts-mono);
        font-size: var(--font-size-md);
    }

    .gatsby-image-outer-wrapper {
        height: 100%;
    }
`;

export default base;
