import { useState } from 'react';
import { browser } from '@utils';

const useCopyText = () => {
    const [isCopied, setCopied] = useState(false);
    const handleCopy = textToCopy => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        browser.copyToClipboard(textToCopy);
    };
    return [isCopied, handleCopy];
};

export default useCopyText;
