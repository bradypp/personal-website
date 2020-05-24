/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

import React from 'react';
import Terser from 'terser';

import { App } from '@components';

import { constants } from '@styles';

const { THEME_COLORS, COLOR_MODE_KEY, INITIAL_COLOR_MODE_CSS_PROP } = constants;

const setColorsByTheme = () => {
    const colors = '🌈';
    const colorModeKey = '🔑';
    const colorModeCssProp = '⚡️';

    const mql = window.matchMedia('(prefers-color-scheme: light)');
    const prefersLightFromMQ = mql.matches;
    const persistedPreference = localStorage.getItem(colorModeKey);

    let colorMode = 'dark';

    const hasUsedToggle = typeof persistedPreference === 'string';

    if (hasUsedToggle) {
        colorMode = persistedPreference;
    } else {
        colorMode = prefersLightFromMQ ? 'light' : 'dark';
    }

    const root = document.documentElement;

    root.style.setProperty(colorModeCssProp, colorMode);

    Object.entries(colors).forEach(([name, colorByTheme]) => {
        const cssVarName = `--color-${name}`;

        root.style.setProperty(cssVarName, colorByTheme[colorMode]);
    });
};

const PreBodyScript = () => {
    const boundFn = String(setColorsByTheme)
        .replace("'🌈'", JSON.stringify(THEME_COLORS))
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
    const themeCssColorVariables = Object.entries(THEME_COLORS).reduce(
        (acc, [name, colorByTheme]) => {
            return `${acc}\n--color-${name}: ${colorByTheme.dark};`;
        },
        '',
    );

    const wrappedInSelector = `html { 
        ${themeCssColorVariables} 
    }`;

    return <style>{wrappedInSelector}</style>;
};

export const onRenderBody = ({ setPreBodyComponents, setHeadComponents }) => {
    setHeadComponents(<FallbackStyles />);
    setPreBodyComponents(<PreBodyScript />);
};

export const wrapPageElement = ({ element }) => {
    return <App>{element}</App>;
};
