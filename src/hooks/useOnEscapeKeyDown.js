import { useEffect } from 'react';

import { KEY_CODES } from '@utils/constants';

const useOnEscapeKeyDown = (isListening, onEscapeKeyDown) => {
    useEffect(() => {
        const handleKeyDown = event => {
            if (event.keyCode === KEY_CODES.ESCAPE) {
                onEscapeKeyDown();
            }
        };

        if (isListening) {
            document.addEventListener('keydown', handleKeyDown);
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isListening, onEscapeKeyDown]);
};

export default useOnEscapeKeyDown;
