/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');
const config = require('./src/config');

const remarkPlugins = [
    {
        // https://www.gatsbyjs.org/packages/gatsby-remark-external-links
        resolve: 'gatsby-remark-external-links',
        options: {
            target: '_blank',
            rel: 'nofollow noopener noreferrer',
        },
    },
    //  IMPORTANT: this must be ahead of gatsby-remark-images
    {
        resolve: `gatsby-remark-relative-images`,
    },
    {
        // https://www.gatsbyjs.org/packages/gatsby-remark-images
        resolve: 'gatsby-remark-images',
        options: {
            maxWidth: 1200,
            quality: 90,
            withWebp: true,
            linkImagesToOriginal: false,
            tracedSVG: { color: '#09162a' },
        },
    },
    {
        resolve: `gatsby-remark-autolink-headers`,
        options: {
            className: `header-autolink`,
            icon: ``,
            maintainCase: false,
            removeAccents: true,
            elements: [`h2`, `h3`],
        },
    },
    {
        // IMPORTANT: this must be ahead of other plugins that use code blocks
        // https://www.gatsbyjs.org/packages/gatsby-remark-code-titles/
        resolve: 'gatsby-remark-code-titles',
    },
    {
        // https://www.gatsbyjs.org/packages/gatsby-remark-prismjs
        resolve: `gatsby-remark-prismjs`,
        options: {
            // Class prefix for <pre> tags containing syntax highlighting;
            // defaults to 'language-' (e.g. <pre class="language-js">).
            // If your site loads Prism into the browser at runtime,
            // (e.g. for use with libraries like react-live),
            // you may use this to prevent Prism from re-processing syntax.
            // This is an uncommon use-case though;
            // If you're unsure, it's best to use the default value.
            classPrefix: 'language-',
            // This is used to allow setting a language for inline code
            // (i.e. single backticks) by creating a separator.
            // This separator is a string and will do no white-space
            // stripping.
            // A suggested value for English speakers is the non-ascii
            // character '›'.
            inlineCodeMarker: null,
            // This lets you set up language aliases.  For example,
            // setting this to '{ sh: "bash" }' will let you use
            // the language "sh" which will highlight using the
            // bash highlighter.
            aliases: {},
            // This toggles the display of line numbers globally alongside the code.
            // To use it, add the following line in gatsby-browser.js
            // right after importing the prism color scheme:
            //  require("prismjs/plugins/line-numbers/prism-line-numbers.css")
            // Defaults to false.
            // If you wish to only show line numbers on certain code blocks,
            // leave false and use the {numberLines: true} syntax below
            showLineNumbers: false,
            // If setting this to true, the parser won't handle and highlight inline
            // code used in markdown i.e. single backtick code like `this`.
            noInlineHighlight: false,
            // This adds a new language definition to Prism or extend an already
            // existing language definition. More details on this option can be
            // found under the header "Add new language definition or extend an
            // existing language" below.
            languageExtensions: [
                {
                    language: 'superscript',
                    extend: 'javascript',
                    definition: {
                        superscript_types: /(SuperType)/,
                    },
                    insertBefore: {
                        function: {
                            superscript_keywords: /(superif|superelse)/,
                        },
                    },
                },
            ],
            // Customize the prompt used in shell output
            // Values below are default
            prompt: {
                user: 'root',
                host: 'localhost',
                global: false,
            },
        },
    },
    'gatsby-remark-responsive-iframe',
    'gatsby-remark-smartypants',
    {
        resolve: `gatsby-remark-copy-linked-files`,
        options: {
            destinationDir: `static/files`,
            ignoreFileExtensions: [`png`, `jpg`, `jpeg`, `bmp`, `tiff`, `webp`],
        },
    },
];

module.exports = {
    siteMetadata: {
        title: config.siteTitle,
        siteUrl: config.siteUrl,
        description: config.siteDescription,
        keywords: config.siteKeywords,
        language: config.siteLanguage,
    },
    // To avoid CORS while developing Netlify Functions locally
    // See https://www.gatsbyjs.org/docs/api-proxy/#advanced-proxying
    developMiddleware: app => {
        app.use(
            '/.netlify/functions/',
            createProxyMiddleware({
                target: 'http://localhost:9000',
                pathRewrite: {
                    '/.netlify/functions/': '',
                },
            }),
        );
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-styled-components`,
        `gatsby-plugin-sharp`,
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sitemap`,
        `gatsby-plugin-robots-txt`,
        {
            resolve: `gatsby-plugin-feed`,
            options: {
                query: `
                    {
                      site {
                        siteMetadata {
                            siteUrl,
                            description,
                            keywords,
                            language,
                        }
                      }
                    }
                  `,
                feeds: [
                    {
                        serialize: ({ query: { site, allMdx } }) => {
                            const data = allMdx.edges.map(edge => {
                                const { siteUrl } = site.siteMetadata;
                                const { slug } = edge.node.fields;

                                const postUrl = `${siteUrl}${slug}`;

                                let html;
                                const disclaimer = `<div style="margin-top: 50px; font-style: italic;"><strong><a href="${postUrl}">View the original post</a>.</strong></div><br /><br />`;

                                html = edge.node.html
                                    .replace(/href="\//g, `href="${siteUrl}/`)
                                    .replace(/src="\//g, `src="${siteUrl}/`)
                                    .replace(/"\/static\//g, `"${siteUrl}/static/`)
                                    .replace(/,\s*\/static\//g, `,${siteUrl}/static/`);

                                html = disclaimer + html;

                                return {
                                    ...edge.node.frontmatter,
                                    description: edge.node.excerpt,
                                    date: edge.node.frontmatter.date,
                                    url: postUrl,
                                    guid: postUrl,
                                    custom_elements: [{ 'content:encoded': html }],
                                };
                            });

                            return data;
                        },
                        query: `
                    {
                      allMdx(
                        limit: 1000,
                        filter: {
                            fileAbsolutePath: { regex: "/content/posts/" }
                            frontmatter: { draft: { ne: true } }
                        }
                        sort: { fields: [frontmatter___date], order: DESC }
                      ) {
                        edges {
                            node {
                                html
                                excerpt(pruneLength: 200, truncate: true)
                                fields {
                                    slug
                                }
                                frontmatter {
                                    title
                                    date(formatString: "MMMM Do, YYYY")
                                }
                            }
                        }
                      }
                    }
                  `,
                        output: '/rss.xml',
                        title: "Paul Brady's blog",
                    },
                ],
            },
        },
        `gatsby-plugin-netlify`,
        {
            resolve: `gatsby-plugin-mdx`,
            options: {
                extensions: [`.mdx`],
                gatsbyRemarkPlugins: remarkPlugins,
            },
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `PaulBrady`,
                short_name: `PaulBrady`,
                start_url: `/`,
                background_color: `#fff`,
                theme_color: `#fff`,
                display: `minimal-ui`,
                icon: `./src/assets/images/favicons/android-chrome-512x512.png`,
                icons: [
                    {
                        src: `/favicons/android-chrome-192x192.png`,
                        sizes: `192x192`,
                        type: `image/png`,
                    },
                    {
                        src: `/favicons/android-chrome-512x512.png`,
                        sizes: `512x512`,
                        type: `image/png`,
                    },
                    {
                        src: `/favicons/android-chrome-512x512.png`,
                        sizes: `512x512`,
                        type: `image/png`,
                        purpose: 'any maskable',
                    },
                ],
            },
        },
        //  IMPORTANT: this must be after gatsby-plugin-manifest
        `gatsby-plugin-offline`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: path.join(__dirname, 'src', 'assets', 'images'),
            },
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/src/content`,
                name: 'content',
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `hero`,
                path: `${__dirname}/src/content/home/hero`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `about`,
                path: `${__dirname}/src/content/home/about`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `projects`,
                path: `${__dirname}/src/content/home/projects`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `contact`,
                path: `${__dirname}/src/content/home/contact`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `blog`,
                path: `${__dirname}/src/content/blog`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `newsletter`,
                path: `${__dirname}/src/content/newsletter`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `tags`,
                path: `${__dirname}/src/content/tags`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `posts`,
                path: `${__dirname}/src/content/posts`,
            },
        },
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: remarkPlugins,
            },
        },
        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
                trackingId: process.env.GOOGLE_ANALYTICS_ID,
                cookieExpires: 63072000, // 2 years
            },
        },
    ],
};
