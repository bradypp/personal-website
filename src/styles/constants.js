const THEME_COLORS = {
    [`primary`]: {
        light: 'var(--color-blue)',
        dark: '#007bff',
    },
    [`primary-light`]: {
        light: 'var(--color-blue-light)',
        dark: 'var(--color-blue-light)',
    },
    [`primary-dark`]: {
        light: 'var(--color-blue-dark)',
        dark: 'var(--color-blue-dark)',
    },
    [`secondary`]: {
        light: 'var(--color-pink)',
        dark: 'var(--color-pink)',
    },
    [`tertiary`]: {
        light: 'var(--color-yellow)',
        dark: 'var(--color-yellow)',
    },
    [`background-1`]: {
        light: 'var(--color-white-1)',
        dark: 'var(--color-navy-1)',
    },
    [`background-2`]: {
        light: 'var(--color-white-2)',
        dark: 'var(--color-navy-2)',
    },
    [`background-3`]: {
        light: 'var(--color-white-3)',
        dark: 'var(--color-navy-3)',
    },
    [`background-4`]: {
        light: 'var(--color-white-4)',
        dark: 'var(--color-navy-4)',
    },
    [`background-5`]: {
        light: 'var(--color-white-5)',
        dark: 'var(--color-navy-5)',
    },
    [`text-primary-1`]: {
        light: 'var(--color-grey-dark-1)',
        dark: 'var(--color-white-1)',
    },
    [`text-primary-2`]: {
        light: 'var(--color-grey-dark-2)',
        dark: 'var(--color-white-2)',
    },
    [`text-link`]: {
        light: 'var(--color-primary)',
        dark: 'var(--color-secondary)',
    },
};

const COLOR_MODE_KEY = 'color-mode';
const INITIAL_COLOR_MODE_CSS_PROP = '--initial-color-mode';

export default {
    THEME_COLORS,
    COLOR_MODE_KEY,
    INITIAL_COLOR_MODE_CSS_PROP,
};
