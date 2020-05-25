import React, { createContext, useState, useEffect, useMemo } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [colorMode, rawSetColorMode] = useState(undefined);

    useEffect(() => {
        const initialColorValue = getComputedStyle(document.documentElement).getPropertyValue(
            '--initial-color-mode',
        );
        rawSetColorMode(initialColorValue);
    }, []);

    const contextValue = useMemo(() => {
        const setColorMode = newValue => {
            localStorage.setItem('color-mode', newValue);
            rawSetColorMode(newValue);
        };
        return {
            colorMode,
            setColorMode,
        };
    }, [colorMode, rawSetColorMode]);

    return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};
