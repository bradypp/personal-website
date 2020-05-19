import { useState } from 'react';
import { browser } from 'shared/utils';

const useCopyText = textToCopy => {
    const [isCopied, setCopied] = useState(false);
    const handleCopy = () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        browser.copyToClipboard(textToCopy);
    };
    return [isCopied, handleCopy];
};

export default useCopyText;
