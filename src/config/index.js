module.exports = {
    siteTitle: 'Paul Brady | Software Engineer',
    siteDescription:
        "Paul Brady's personal website showcases his work and expertise in web development.",
    siteKeywords:
        'Paul Brady, software engineer, bradypp, front-end, full-stack, web developer, CSS, JavaScript, TypeScript, React, Manchester',
    siteUrl: 'https://paulbrady.dev',
    siteLanguage: 'en',
    name: 'Paul Brady',
    location: 'Manchester, UK',
    email: 'contact@paulbrady.dev',
    repo: 'https://github.com/bradypp/personal-website',
    github: 'https://github.com/bradypp',
    twitter: 'https://twitter.com/bradypp',
    linkedin: 'https://linkedin.com/in/bradypp',
    twitterHandle: '@bradypp',
    mainThemeColor: '#fff',
    rss: '/rss.xml',
    socialMedia: [
        {
            name: 'Twitter',
            url: 'https://twitter.com/bradypp',
        },
        {
            name: 'GitHub',
            url: 'https://github.com/bradypp',
        },
        {
            name: 'LinkedIn',
            url: 'https://www.linkedin.com/in/bradypp/',
        },
        // {
        //     name: 'Discord',
        //     url: 'https://discord.com/users/358253719483187202',
        // },
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
        // {
        //     name: 'Blog',
        //     url: '/blog',
        // },
        {
            name: 'Contact',
            url: '/#contact',
        },
    ],
    otherLinks: [
        {
            name: 'Newsletter',
            url: '/newsletter',
        },
        {
            name: 'RSS',
            url: '/rss.xml',
        },
    ],
    scrollRevealConfig: (delay = 300) => ({
        origin: 'bottom',
        distance: '25px',
        duration: 500,
        delay,
        rotate: { x: 0, y: 0, z: 0 },
        opacity: 0,
        scale: 1,
        easing: 'ease-out',
        mobile: true,
        reset: false,
        useDelay: 'always',
        viewFactor: 0.25,
        viewOffset: { top: 0, right: 0, bottom: 0, left: 0 },
    }),
};
