import React, { createContext, useState, useMemo } from 'react';

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
    const [postLocation, setPostLocation] = useState('');
    const contextValue = useMemo(
        () => ({
            postLocation,
            setPostLocation,
        }),
        [postLocation],
    );

    return <PostContext.Provider value={contextValue}>{children}</PostContext.Provider>;
};
