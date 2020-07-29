// /**
//  * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
//  *
//  * See: https://www.gatsbyjs.org/docs/ssr-apis/
//  */

import React from 'react';
import Terser from 'terser';

import App from './src/components/app';

const setColorTheme = () => {
    const colorModeKey = 'color-mode';
    const colorModeCssProp = '--initial-color-mode';

    const mql = window.matchMedia('(prefers-color-scheme: light)');
    const prefersLightFromMQ = mql.matches;
    const persistedPreference = localStorage.getItem(colorModeKey);

    let colorMode = 'dark-mode';
    const hasUsedToggle = typeof persistedPreference === 'string';

    if (hasUsedToggle) {
        colorMode = persistedPreference;
    } else {
        colorMode = prefersLightFromMQ ? 'light-mode' : 'dark-mode';
    }

    const root = document.documentElement;
    root.style.setProperty(colorModeCssProp, colorMode);
    root.classList.add(colorMode);
};

const PreBodyScript = () => {
    const boundFn = String(setColorTheme);
    const preBodyScript = Terser.minify(`(${boundFn})();`).code;
    return (
        <script
            dangerouslySetInnerHTML={{
                __html: preBodyScript,
            }}
        />
    );
};

export const onRenderBody = ({ setPreBodyComponents }) => {
    setPreBodyComponents(<PreBodyScript />);
};

export const wrapPageElement = ({ element }) => {
    return <App>{element}</App>;
};
