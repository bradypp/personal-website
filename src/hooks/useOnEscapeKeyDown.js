import { useEffect } from 'react';
import { constants } from '@utils';

const useOnEscapeKeyDown = (isListening, onEscapeKeyDown) => {
    useEffect(() => {
        const handleKeyDown = event => {
            if (event.keyCode === constants.keyCodes.ESCAPE) {
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
