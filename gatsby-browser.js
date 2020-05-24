/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import React from 'react';

import { App } from '@components';

export const wrapRootElement = ({ element }) => {
    return <App>{element}</App>;
};
