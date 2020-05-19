const getTextContentsFromHtmlString = html => {
    const el = document.createElement('div');
    el.innerHTML = html;
    return el.textContent;
};

const copyToClipboard = value => {
    const $textarea = document.createElement('textarea');
    $textarea.value = value;
    document.body.appendChild($textarea);
    $textarea.select();
    document.execCommand('copy');
    document.body.removeChild($textarea);
};

const isFocusedElementEditable = () =>
    !!document.activeElement.getAttribute('content-editable') ||
    ['TEXTAREA', 'INPUT'].includes(document.activeElement.tagName);

export default {
    getTextContentsFromHtmlString,
    copyToClipboard,
    isFocusedElementEditable,
};
