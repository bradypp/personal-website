import React from 'react';

import { ThemeProvider } from '@context';
import { GlobalStyles } from '@styles';

const App = ({ children }) => {
    return (
        <ThemeProvider>
            <GlobalStyles />
            {children}
        </ThemeProvider>
    );
};

export default App;
