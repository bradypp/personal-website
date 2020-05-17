const theme = {
    colors: {
        highlight: 'rgba(41, 61, 90, 0.99)',
        link: '',
    },

    fonts: {
        Calibre: 'Calibre, -apple-system, system-ui, Roboto, Segoe UI, Arial, sans-serif',
        SFMono: 'SF Mono, Fira Code, Fira Mono, Roboto Mono, Lucida Console, Monaco, monospace',
    },

    easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    transition: 'all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1)',

    borderRadius: '3px',

    hamburgerWidth: 30,
    hamBefore: `top 0.1s ease-in 0.25s, opacity 0.1s ease-in`,
    hamBeforeActive: `top 0.1s ease-out, opacity 0.1s ease-out 0.12s`,
    hamAfter: `bottom 0.1s ease-in 0.25s, transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19)`,
    hamAfterActive: `bottom 0.1s ease-out, transform 0.22s cubic-bezier(0.215, 0.61, 0.355, 1) 0.12s`,
};

export default theme;
