// TODO: update site config
module.exports = {
    siteTitle: 'Paul Brady',
    siteDescription: 'Personal website',
    siteKeywords: '',
    siteUrl: 'https://paulbrady.dev',
    siteLanguage: 'en',
    googleAnalyticsID: '',
    googleVerification: '',
    name: 'Paul Brady',
    location: 'Manchester, UK',
    email: 'bradypp44@gmail.com', // TODO: update to custom url
    github: 'https://github.com/bradypp',
    twitter: 'https://twitter.com/bradypp',
    socialMedia: [
        {
            name: 'GitHub',
            url: 'https://github.com/bradypp',
        },
        {
            name: 'Linkedin',
            url: '', // TODO
        },
        {
            name: 'Twitter',
            url: 'https://twitter.com/bradypp',
        },
        {
            name: 'Codepen',
            url: '', // TODO
        },
        {
            name: 'Devto',
            url: '', // TODO
        },
    ],
    navLinks: [
        {
            name: 'Home',
            url: '/',
        },
        {
            name: 'About',
            url: '/#about',
        },
        {
            name: 'Projects',
            url: '/#projects',
        },
        {
            name: 'Contact',
            url: '/#contact',
        },
    ],
    scrollRevealConfig: (delay = 200) => ({
        origin: 'bottom',
        distance: '20px',
        duration: 500,
        delay,
        rotate: { x: 0, y: 0, z: 0 },
        opacity: 0,
        scale: 1,
        easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
        mobile: true,
        reset: false,
        useDelay: 'always',
        viewFactor: 0.25,
        viewOffset: { top: 0, right: 0, bottom: 0, left: 0 },
    }),
};
