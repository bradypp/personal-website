import React from 'react';

import { ThemeProvider, PostProvider } from '@context';
import { GlobalStyles } from '@styles';

const App = ({ children }) => {
    return (
        <ThemeProvider>
            <PostProvider>
                <GlobalStyles />
                {children}
            </PostProvider>
        </ThemeProvider>
    );
};

export default App;
