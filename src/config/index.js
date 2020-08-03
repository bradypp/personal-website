module.exports = {
    siteTitle: 'Paul Brady',
    siteDescription:
        "Paul Brady's personal website showcases his work and expertise in web development.",
    siteKeywords:
        'Paul Brady, software engineer, bradypp, front-end, web developer, CSS,JavaScript, React, Manchester',
    siteUrl: 'https://paulbrady.dev',
    siteLanguage: 'en',
    name: 'Paul Brady',
    location: 'Manchester, UK',
    email: 'paul@paulbrady.dev',
    repo: 'https://github.com/bradypp/personal-website',
    github: 'https://github.com/bradypp',
    twitter: 'https://twitter.com/bradypp',
    twitterHandle: '@bradypp',
    mainThemeColor: '#fff',
    socialMedia: [
        {
            name: 'GitHub',
            url: 'https://github.com/bradypp',
        },
        {
            name: 'Twitter',
            url: 'https://twitter.com/bradypp',
        },
        {
            name: 'LinkedIn',
            url: 'https://www.linkedin.com/in/paul-brady-pb/',
        },
        {
            name: 'DevTo',
            url: 'https://dev.to/bradypp',
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
            name: 'Portfolio',
            url: '/#portfolio',
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
