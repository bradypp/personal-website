import { createGlobalStyle } from 'styled-components/macro';
import theme from './theme';
import media from './media';
import mixins from './mixins';
import fontFaces from './fonts';
import normalizeStyles from './normalizeStyles';

const { colors, fontSizes, fonts } = theme;

const GlobalStyle = createGlobalStyle`
  ${fontFaces};
  ${normalizeStyles};

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
    font-family: ${fonts.Calibre};
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 1.3;
    color: #ccc;
    background: #f7f7f7;
    min-height: 100vh;

    &.hidden {
      overflow: hidden;
    }
    &.blur {
      overflow: hidden;
      #root > #content > * {
        filter: blur(5px) brightness(0.7);
        transition: ${theme.transition};
        pointer-events: none;
        user-select: none;
      }
    }
  }

  ::selection {
    background-color: ${colors.highlight};
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

  img {
    width: 100%;
    max-width: 100%;
    vertical-align: middle;
  }

  svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
    vertical-align: middle;

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
    transition: ${theme.transition};

    &:focus,
    &:active {
      outline: none;
    }

    &:disabled {
      opacity: 0.7;
      cursor: default;
    }
  }

  [role="button"], button, a {
    ${mixins.clickable}
  }
  
  [role="button"], button {
    cursor: pointer;
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
    line-height: 1;
  }

  a {
    display: inline-block;
    text-decoration: none;
    text-decoration-skip-ink: auto;
    color: inherit;
    position: relative;

    &:hover,
    &:focus {
      color: ${colors.link};
    }
  }

  input, textarea {
    &::placeholder {
      opacity: 0.5;
      font-style: italic;
      font-size: 0.9em;
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

    ${'' /* & > a {
      ${mixins.inlineLink};
    } */}

    ${
        '' /* & > code {
      background-color: ${colors.lightNavy};
      color: ${colors.offWhite};
      font-size: ${fontSizes.sm};
      border-radius: ${theme.borderRadius};
      padding: 0.3em 0.5em;
    } */
    }
  }

  ul {
    padding: 0;
    margin: 0;
    list-style: none;

    &.fancy-list {
      li {
        position: relative;
        padding-left: 3rem;
        margin-bottom: 1rem;
        font-size: 1.8rem;
        &:before {
          content: '▹';
          position: absolute;
          left: 0;
        }
      }
    }
  }

  blockquote {
    border-left-color: #ccc;
    border-left-style: solid;
    border-left-width: 1px;
    margin-left: 0px;
    margin-right: 0px;
    padding-left: 1.5rem;

    p {
      font-style: italic;
      font-size: 2.4rem;
    }
  }

  hr {
    background-color: #ccc;
    height: 0.1rem;
    border-width: 0px;
    border-style: initial;
    border-color: initial;
    border-image: initial;
    margin: 1rem;
  }

  code {
    font-family: ${fonts.SFMono};
    font-size: 1.5rem;
  }

  .subtitle {
    color: #ddd;
    margin: 0 0 2rem 0;
    font-size: 1.5rem;
    font-family: ${fonts.SFMono};
    font-weight: normal;
    line-height: 1.5;
  }

  .gatsby-image-outer-wrapper {
    height: 100%;
  }
`;

export default GlobalStyle;
