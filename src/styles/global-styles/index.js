import { createGlobalStyle } from 'styled-components';

import media from '../media';
import theme from './theme';
import mixins from '../mixins';
import fontFaces from './fonts';
import normalizeStyles from './normalize-styles';
import transitionStyles from './transition-styles';
import prismStyles from './prism-styles';

const GlobalStyles = createGlobalStyle`
  ${fontFaces};
  ${normalizeStyles};
  ${theme};

  *,
  *:before,
  *:after {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
  }

  html,
  body, 
  #root {
    width: 100%;
    max-width: 100%;
  }

  html {
    box-sizing: border-box;
    touch-action: manipulation;
    font-size: 68.75%;
    
    ${media.bp2400`
        font-size: 62.5%;
    `}
    ${media.bp1280`
        font-size: 56.25%;
    `}
    ${media.bp800`
        font-size: 50%;
    `}
  }

  body {
    overflow-x: hidden;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-family: var(--fonts-primary);
    font-size: var(--font-size-md);
    font-weight: 400;
    line-height: 1.3;
    color: var(--color-text-primary-1);
    background: var(--color-background-1);
    min-height: 100vh;

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

  ::selection {
    background-color:  var(--color-text-highlight);
  }

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

  img {
    width: 100%;
    max-width: 100%;
    vertical-align: middle;
  }

  svg {
    width: 100%;
    height: 100%;
    vertical-align: middle;
    display: inline-block;

    &:before{
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

  [role="button"], button, a, input, select, textarea {
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

  [role="button"], button {
  }
  
  [role="button"], button {
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
    color:  var(--color-text-link);
    position: relative;
    transition: var(--color-transition);
  }

  input, textarea {
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
      background-color:  var(--color-code-background);
      color: var(--color-code-text);
      font-size: var(--font-size-sm);
      border-radius: var(--border-radius);
      padding: 0.3em 0.5em;
    }  
  }

  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  blockquote {
    border-left-color: var(--color-primary);
    border-left-style: solid;
    border-left-width: 0.01rem;
    margin-left: 0;
    margin-right: 0;
    padding-left: 1.5rem;

    p {
      font-style: italic;
      font-size: 2.4rem;
    }
  }

  code {
    font-family: var(--fonts-mono);
    font-size: var(--font-size-md);
  }

  .gatsby-image-outer-wrapper {
    height: 100%;
  }

  ${transitionStyles};
  ${prismStyles};
`;

export default GlobalStyles;
