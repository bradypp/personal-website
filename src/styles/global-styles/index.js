import { createGlobalStyle } from 'styled-components';

import theme from './theme';
import fontFaces from './fonts';
import normalizeStyles from './normalize-styles';
import base from './base';
import prismStyles from './prism-styles';

const GlobalStyles = createGlobalStyle`
  ${fontFaces};
  ${normalizeStyles};
  ${theme};
  ${base};
  ${prismStyles};
`;

export default GlobalStyles;
