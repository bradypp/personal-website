/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import React from 'react';

import { App } from '@components';

// if (typeof window !== 'undefined') {
//     // eslint-disable-next-line global-require
//     require('smooth-scroll')('a[href*="#"]', {
//         speed: 1500,
//         speedAsDuration: true,
//         easing: 'easeInOutCubic',
//     });
// }

export const wrapRootElement = ({ element }) => {
    return <App>{element}</App>;
};
