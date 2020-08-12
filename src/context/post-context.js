import React, { createContext, useState } from 'react';

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
    const [postLocation, setPostLocation] = useState(undefined);

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
