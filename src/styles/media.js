import { css } from 'styled-components';

import { BREAKPOINTS } from '@utils/constants';

const media = Object.keys(BREAKPOINTS).reduce((acc, label) => {
    const emSize = BREAKPOINTS[label] / 16;
    acc[label] = (...args) => css`
        @media (max-width: ${emSize}em) {
            ${css(...args)};
        }
    `;
    return acc;
}, {});

export default media;
