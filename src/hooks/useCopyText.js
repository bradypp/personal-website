import { useState } from 'react';
import { copyToClipboard } from '@utils/browser';

const useCopyText = () => {
    const [isCopied, setCopied] = useState(false);
    const handleCopy = textToCopy => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        copyToClipboard(textToCopy);
    };
    return [isCopied, handleCopy];
};

export default useCopyText;
