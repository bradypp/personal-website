const config = require('./src/config');

module.exports = {
    siteMetadata: {
        title: config.siteTitle,
        siteUrl: config.siteUrl,
        description: config.siteDescription,
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-styled-components`,
        `gatsby-plugin-sharp`,
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sitemap`,
        `gatsby-plugin-robots-txt`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `PaulBrady`,
                short_name: `PaulBrady`,
                start_url: `/`,
                // background_color: ``, // TODO
                // theme_color: ``, // TODO
                display: `minimal-ui`,
                // icon: `src/images/logo.png`, // TODO
            },
        },
        `gatsby-plugin-offline`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`,
            },
        },
        // TODO: uncomment and install plugin
        // {
        //   resolve: `gatsby-plugin-google-analytics`,
        //   options: {
        //     trackingId: config.googleAnalyticsID,
        //   },
        // },
    ],
};
