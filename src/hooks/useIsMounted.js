import { useState, useEffect } from 'react';

const useIsMounted = (interval = 0, ...conditions) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        if (conditions.length > 0 && !conditions.reduce((acc, el) => el, false)) return;
        const timeout = setTimeout(() => setIsMounted(true), interval);

        return () => {
            clearTimeout(timeout);
            setIsMounted(false);
        };
    }, []);

    return isMounted;
};

export default useIsMounted;
