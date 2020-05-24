/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

import React from 'react';
import Terser from 'terser';

import { App } from '@components';

import { COLOR_MODE_KEY, COLORS, INITIAL_COLOR_MODE_CSS_PROP } from '@styles/colors';

const setColorsByTheme = () => {
    const colors = '🌈';
    const colorModeKey = '🔑';
    const colorModeCssProp = '⚡️';

    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const prefersDarkFromMQ = mql.matches;
    const persistedPreference = localStorage.getItem(colorModeKey);

    let colorMode = 'light';

    const hasUsedToggle = typeof persistedPreference === 'string';

    if (hasUsedToggle) {
        colorMode = persistedPreference;
    } else {
        colorMode = prefersDarkFromMQ ? 'dark' : 'light';
    }

    const root = document.documentElement;

    root.style.setProperty(colorModeCssProp, colorMode);

    Object.entries(colors).forEach(([name, colorByTheme]) => {
        const cssVarName = `--color-${name}`;

        root.style.setProperty(cssVarName, colorByTheme[colorMode]);
    });
};

const MagicScriptTag = () => {
    const boundFn = String(setColorsByTheme)
        .replace("'🌈'", JSON.stringify(COLORS))
        .replace('🔑', COLOR_MODE_KEY)
        .replace('⚡️', INITIAL_COLOR_MODE_CSS_PROP);

    let calledFunction = `(${boundFn})()`;

    calledFunction = Terser.minify(calledFunction).code;

    // eslint-disable-next-line react/no-danger
    return <script dangerouslySetInnerHTML={{ __html: calledFunction }} />;
};

/*
  If the user has JS disabled, the injected script will never fire! Inject a `<style>` tag into the head of the document to set default values for all color CSS properties.
*/
const FallbackStyles = () => {
    // TODO
    // Create a string holding each CSS variable:
    /*
    `--color-text: black;
    --color-background: white;`
  */

    const cssVariableString = Object.entries(COLORS).reduce((acc, [name, colorByTheme]) => {
        return `${acc}\n--color-${name}: ${colorByTheme.light};`;
    }, '');

    const wrappedInSelector = `html { ${cssVariableString} }`;

    return <style>{wrappedInSelector}</style>;
};

export const onRenderBody = ({ setPreBodyComponents, setHeadComponents }) => {
    setHeadComponents(<FallbackStyles />);
    setPreBodyComponents(<MagicScriptTag />);
};

export const wrapPageElement = ({ element }) => {
    return <App>{element}</App>;
};
