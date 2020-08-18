import { css } from 'styled-components';

// https://www.gatsbyjs.org/packages/gatsby-remark-prismjs
const PrismStyles = css`
    :root {
        --color-prism-background: #e3eef8;
        --color-prism-line-highlight: #d3e6f7;
        --color-prism-blue: #0f7cd0;
        --color-prism-purple: #703dd6;
        --color-prism-green: #39a514;
        --color-prism-highlight-accent: var(--color-primary);
        --color-prism-yellow: #ed7445;
        --color-prism-orange: #dc55bf;
        --color-prism-red: #e54f58;
        --color-prism-grey: #9196a2;

        &.dark-mode {
            --color-prism-background: #112340;
            --color-prism-line-highlight: #1d2d50;
            --color-prism-blue: #59d4ed;
            --color-prism-purple: #c3a6ff;
            --color-prism-green: #bae67e;
            --color-prism-highlight-accent: var(--color-secondary);
            --color-prism-yellow: #fed583;
            --color-prism-orange: #ff966c;
            --color-prism-red: #ef6b73;
            --color-prism-grey: #a2aabc;
        }
    }

    /**
    * Add back the container background-color, border-radius, padding, margin and overflow that's removed from <pre>.
    */
    .gatsby-highlight {
        color: var(--color-text-primary-1);
        background-color: var(--color-prism-background);
        border-radius: var(--border-radius);
        margin: 2em 0;
        padding: 1.25em;
        overflow: auto;
        position: relative;
        font-family: var(--fonts-mono);
        font-size: var(--font-size-md);
    }

    .gatsby-highlight code[class*='language-'],
    .gatsby-highlight pre[class*='language-'] {
        color: var(--color-text-primary-2);
        height: auto !important;
        font-weight: 500;
        line-height: 1.5;
        white-space: pre;
        word-spacing: normal;
        word-break: normal;
        word-wrap: normal;
        tab-size: 2;
        hyphens: none;
    }
    .gatsby-highlight pre[class*='language-'].line-numbers {
        padding-left: 2.8em;
    }

    /**
  * Remove the default PrismJS theme background-color, border-radius, margin,
  * padding and overflow.
  * 1. Make the element just wide enough to fit its content.
  * 2. Always fill the visible space in .gatsby-highlight.
  * 3. Adjust the position of the line numbers
  */
    .gatsby-highlight pre[class*='language-'] {
        background-color: transparent;
        margin: 0;
        padding: 0;
        overflow: initial;
        float: left; /* 1 */
        min-width: 100%; /* 2 */
        padding-top: 2em;
    }

    /* File names */
    .gatsby-code-title {
        padding: 1em 1.5em;
        font-family: var(--fonts-mono);
        font-size: var(--font-size-xs);
        font-weight: 500;
        background-color: var(--color-prism-background);
        color: var(--color-prism-grey);
        border-top-left-radius: var(--border-radius);
        border-top-right-radius: var(--border-radius);
        border-bottom: 1px solid var(--color-prism-line-highlight);

        & + .gatsby-highlight {
            margin-top: 0;
            border-top-left-radius: 0;
            border-top-right-radius: 0;
        }
    }

    /* Line highlighting */
    .gatsby-highlight-code-line {
        display: block;
        background-color: var(--color-prism-line-highlight);
        border-left: 2px solid var(--color-prism-highlight-accent);
        padding-left: calc(1em + 2px);
        padding-right: 1em;
        margin-right: -1.25em;
        margin-left: -1.25em;
    }

    /* Language badges */
    .gatsby-highlight pre[class*='language-']::before {
        background: var(--color-prism-line-highlight);
        color: var(--color-text-primary-2);
        font-size: var(--font-size-sm);
        font-family: var(--fonts-mono);
        font-weight: 500;
        line-height: 1.5;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        border-radius: 0 0 var(--border-radius) var(--border-radius);
        position: absolute;
        top: 0;
        left: 1.25rem;
        padding: 0.25rem 0.75rem;
    }
    .gatsby-highlight pre[class='language-javascript']::before {
        content: 'js';
    }
    .gatsby-highlight pre[class='language-js']::before {
        content: 'js';
    }
    .gatsby-highlight pre[class='language-jsx']::before {
        content: 'jsx';
    }
    .gatsby-highlight pre[class='language-graphql']::before {
        content: 'GraphQL';
    }
    .gatsby-highlight pre[class='language-html']::before {
        content: 'html';
    }
    .gatsby-highlight pre[class='language-css']::before {
        content: 'css';
    }
    .gatsby-highlight pre[class='language-mdx']::before {
        content: 'mdx';
    }
    .gatsby-highlight pre[class='language-shell']::before {
        content: 'shell';
    }
    .gatsby-highlight pre[class='language-sh']::before {
        content: 'sh';
    }
    .gatsby-highlight pre[class='language-bash']::before {
        content: 'bash';
    }
    .gatsby-highlight pre[class='language-yaml']::before {
        content: 'yaml';
    }
    .gatsby-highlight pre[class='language-markdown']::before {
        content: 'md';
    }
    .gatsby-highlight pre[class='language-json']::before,
    .gatsby-highlight pre[class='language-json5']::before {
        content: 'json';
    }
    .gatsby-highlight pre[class='language-diff']::before {
        content: 'diff';
    }
    .gatsby-highlight pre[class='language-text']::before {
        content: 'text';
    }
    .gatsby-highlight pre[class='language-flow']::before {
        content: 'flow';
    }

    /* Prism Styles */
    .token {
        display: inline;
    }
    .token.comment,
    .token.block-comment,
    .token.prolog,
    .token.doctype,
    .token.cdata {
        color: var(--color-prism-grey);
    }
    .token.punctuation {
        color: var(--color-prism-grey);
    }
    .token.namespace,
    .token.deleted {
        color: var(--color-prism-red);
    }
    .token.function-name,
    .token.function,
    .token.class-name,
    .token.constant,
    .token.symbol {
        color: var(--color-prism-yellow);
    }
    .token.attr-name,
    .token.operator,
    .token.rule {
        color: var(--color-prism-orange);
    }
    .token.keyword,
    .token.boolean,
    .token.number,
    .token.property {
        color: var(--color-prism-purple);
    }
    .token.tag,
    .token.selector,
    .token.important,
    .token.atrule,
    .token.builtin,
    .token.entity,
    .token.url {
        color: var(--color-prism-blue);
    }
    .token.string,
    .token.char,
    .token.attr-value,
    .token.regex,
    .token.variable,
    .token.inserted {
        color: var(--color-prism-green);
    }
    .token.important,
    .token.bold {
        font-weight: bold;
    }
    .token.italic {
        font-style: italic;
    }
    .token.entity {
        cursor: help;
    }
    .namespace {
        opacity: 0.7;
    }
`;

export default PrismStyles;
