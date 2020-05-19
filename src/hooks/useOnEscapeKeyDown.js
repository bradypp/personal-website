import { useEffect } from 'react';
import { keyCodes } from 'shared/constants';

const useOnEscapeKeyDown = (isListening, onEscapeKeyDown) => {
    useEffect(() => {
        const handleKeyDown = event => {
            if (event.keyCode === keyCodes.ESCAPE) {
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
