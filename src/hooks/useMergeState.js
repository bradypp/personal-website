import { useState, useCallback } from 'react';
import { isFunction } from 'lodash';

const useMergeState = initialState => {
    const [state, setState] = useState(initialState || {});

    const mergeState = useCallback(newState => {
        if (isFunction(newState)) {
            setState(state => ({ ...state, ...newState(state) }));
        } else {
            setState(state => ({ ...state, ...newState }));
        }
    }, []);

    return [state, mergeState];
};

export default useMergeState;
