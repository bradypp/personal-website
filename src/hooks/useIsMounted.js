import { useState, useEffect } from 'react';

const useIsMounted = (delay = 0, shouldMountConditions = []) => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        const shouldMountConditionsArr = [shouldMountConditions].flat();

        if (
            shouldMountConditionsArr.length > 0 &&
            !shouldMountConditionsArr.reduce((acc, el) => el, false)
        )
            return;
        const timeout = setTimeout(() => setIsMounted(true), delay);

        return () => clearTimeout(timeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return isMounted;
};

export default useIsMounted;
