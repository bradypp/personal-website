import { useState, useEffect } from 'react';

const useIsMounted = (interval = 0, ...conditions) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        if (conditions.length > 0 && !conditions.reduce((acc, el) => el, false)) return;
        const timeout = setTimeout(() => setIsMounted(true), interval);

        return () => clearTimeout(timeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return isMounted;
};

export default useIsMounted;
