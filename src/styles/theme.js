const theme = {
    colors: {
        white1: '#f4f5f7',
        white2: '#f1f2f4',
        white3: '#e2e4e9',
        white4: '#d3d7df',
        white5: '#c4c9d4',
        greyDark1: '#333',
        greyDark2: '#555',
        greyDark3: '#777',
        greyDark4: '#8993a4',
        greyLight1: '#e7e4e4',
        greyLight2: '#ddd',
        greyLight3: '#ccc',
        highlight: '#ddd',
        link: '#105EB0',
        blue: '#4391E3',
        blueLight: '#d4e4f7',
    },

    fonts: {
        Calibre: 'Calibre, -apple-system, system-ui, Roboto, Segoe UI, Arial, sans-serif',
        SFMono: 'SF Mono, Fira Code, Fira Mono, Roboto Mono, Lucida Console, Monaco, monospace',
    },

    fontSizes: {
        xxs: '1.2rem',
        xs: '1.3rem',
        sm: '1.4rem',
        md: '1.6rem',
        lg: '1.8rem',
        xl: '2.0rem',
        xxl: '2.2rem',
        h3: '3.2rem',
    },

    zIndex: {
        header: 50,
        dropdown: 100,
        modal: 150,
    },

    maxWidth: `120rem`,
    pagePadding: `4.8rem`,
    pagePaddingTablet: `3.2rem`,
    pagePaddingMobile: `1.6rem`,
    headerHeight: `6rem`,

    transition: `all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1)`,
    easing: `cubic-bezier(0.3, 0, 0.4, 1)`,

    borderRadius: '3px',

    hamburgerWidth: 30,
    hamBefore: `top 0.1s ease-in 0.25s, opacity 0.1s ease-in`,
    hamBeforeActive: `top 0.1s ease-out, opacity 0.1s ease-out 0.12s`,
    hamAfter: `bottom 0.1s ease-in 0.25s, transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19)`,
    hamAfterActive: `bottom 0.1s ease-out, transform 0.22s cubic-bezier(0.215, 0.61, 0.355, 1) 0.12s`,
};

export default theme;
