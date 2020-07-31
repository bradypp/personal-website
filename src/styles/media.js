import { css } from 'styled-components';

const sizes = {
    bp2400: 2400, // Huge monitor
    bp1760: 1760, // Medium monitor
    bp1440: 1440, // Large laptop
    bp1280: 1280, // Small laptop
    bp1040: 1040, // Tablet landscape
    bp920: 920, // Large tablet portrait
    bp800: 800, // Tablet portrait
    bp600: 600, // Large phone
    bp440: 440, // Normal phone
    bp384: 384, // Small phone
};

const media = Object.keys(sizes).reduce((acc, label) => {
    const emSize = sizes[label] / 16;
    acc[label] = (...args) => css`
        @media (max-width: ${emSize}em) {
            ${css(...args)};
        }
    `;
    return acc;
}, {});

export default media;
