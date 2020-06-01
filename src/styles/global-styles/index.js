import { createGlobalStyle } from 'styled-components';
import slick from 'slick-carousel/slick/slick.css';
import slickTheme from 'slick-carousel/slick/slick-theme.css';

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
  ${slick}
  ${slickTheme}

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
    line-height: 1.5;
    color: var(--color-text-primary-1);
    background: var(--color-background-primary-1);
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

  .slick-slider {
      line-height: 0;
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
    &.big-title {
      font-size: 8rem;
      line-height: 1.1;
      margin: 0;
    }

    &.medium-title {
      font-size: 6rem;
      line-height: 1.1;
      margin: 0;
    }
  }

  .overline {
    color: var(--color-primary);
    font-family: var(--font-family-mono);
    font-size: var(--font-size-md);
    font-weight: normal;
  }

  .subtitle {
    color: var(--color-primary);
    margin: 0 0 2rem 0;
    font-size: var(--font-size-md);
    font-family: var(--font-family-mono);
    font-weight: normal;
    line-height: 1.5;

    a {
      ${mixins.inlineLink};
      line-height: 1.5;
    }
  }

  .breadcrumb {
    display: flex;
    align-items: center;
    margin-bottom: 5rem;
    color: var(--color-primary);

    .arrow {
      display: block;
      margin-right: 1rem;
      padding-top: 0.4rem;
    }
    a {
      ${mixins.inlineLink};
      font-family: var(--font-family-mono);
      font-size: var(--font-size-sm);
      font-weight: bold;
      line-height: 1.5;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }
  }

  img {
    width: 100%;
    max-width: 100%;
    vertical-align: middle;
  }

  img[alt=""],
  img:not([alt]) {
    filter: blur(5px);
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
      font-size: var(--font-size-xs);
      border-radius: var(--border-radius);
      padding: 0.3em 0.5em;
    }  
  }

  ol, ul {
      display: block;
      list-style-type: decimal;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0;
      margin-inline-end: 0;
      padding-inline-start: 4rem;
  }

  ul {
      list-style-type: disc;
  }

  ol {
      list-style-type: decimal;
  }

  blockquote {
    border-left-color: var(--color-primary);
    border-left-style: solid;
    border-left-width: 1px;
    margin-left: 0;
    margin-right: 0;
    padding-left: 2.4rem;

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
