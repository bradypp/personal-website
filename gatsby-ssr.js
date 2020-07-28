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

const setCrispChat = () => {
    if (
        window.document.location.pathname === '/' ||
        window.document.location.pathname === '/contact'
    ) {
        window.$crisp = [];
        window.CRISP_WEBSITE_ID = '003cdd6c-4b7e-47c7-81a7-febaea842c51';
        (() => {
            const d = document;
            const s = d.createElement('script');
            s.src = 'https://client.crisp.chat/l.js';
            s.async = 1;
            d.getElementsByTagName('head')[0].appendChild(s);
        })();
    }
};

const PreBodyScript = () => {
    const boundThemeFn = String(setColorTheme);
    const boundChatFn = String(setCrispChat);
    const preBodyThemeScript = Terser.minify(`(${boundThemeFn})();`).code;
    const preBodyChatScript = Terser.minify(`(${boundChatFn})()`).code;
    return (
        <>
            <script
                dangerouslySetInnerHTML={{
                    __html: preBodyThemeScript,
                }}
            />
            <script
                dangerouslySetInnerHTML={{
                    __html: preBodyChatScript,
                }}
            />
        </>
    );
};

export const onRenderBody = ({ setPreBodyComponents }) => {
    setPreBodyComponents(<PreBodyScript />);
};

export const wrapPageElement = ({ element }) => {
    return <App>{element}</App>;
};
