import React, { createContext, useState, useEffect, useMemo } from 'react';

import { COLORS, COLOR_MODE_KEY, INITIAL_COLOR_MODE_CSS_PROP } from '@styles/colors';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [colorMode, rawSetColorMode] = useState(undefined);

    useEffect(() => {
        const root = window.document.documentElement;

        // Because colors matter so much for the initial page view a lot of work is done the work in gatsby-ssr.js. That way it can happen before the React component tree mounts.
        const initialColorValue = root.style.getPropertyValue(INITIAL_COLOR_MODE_CSS_PROP);

        rawSetColorMode(initialColorValue);
    }, []);

    const contextValue = useMemo(() => {
        const setColorMode = newValue => {
            const root = window.document.documentElement;

            localStorage.setItem(COLOR_MODE_KEY, newValue);

            Object.entries(COLORS).forEach(([name, colorByTheme]) => {
                const cssVarName = `--color-${name}`;

                root.style.setProperty(cssVarName, colorByTheme[newValue]);
            });

            rawSetColorMode(newValue);
        };

        return {
            colorMode,
            setColorMode,
        };
    }, [colorMode, rawSetColorMode]);

    return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};
