import React, { createContext, useState } from 'react';

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
    const [postLocation, setPostLocation] = useState('');

    return (
        <PostContext.Provider
            value={{
                postLocation,
                setPostLocation,
            }}>
            {children}
        </PostContext.Provider>
    );
};
