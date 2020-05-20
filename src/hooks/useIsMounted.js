import { useState, useEffect } from 'react';

const useIsMounted = (interval = 0) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => setIsMounted(true), interval);
        console.log(isMounted);
        return () => {
            clearTimeout(timeout);
            setIsMounted(false);
        };
    }, [interval]);

    return isMounted;
};

export default useIsMounted;
