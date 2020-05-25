import { useState } from 'react';

const useFocus = (initialFocus = false, id = '') => {
    const [focus, setFocus] = useState(initialFocus);
    const setFocusWithTrueDefault = param => setFocus(typeof param === 'boolean' ? param : true);
    return [
        setFocusWithTrueDefault,
        {
            autoFocus: focus,
            key: `${id}${focus}`,
            onFocus: () => setFocus(true),
            onBlur: () => setFocus(false),
        },
    ];
};

export default useFocus;
