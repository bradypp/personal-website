import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

import config from '@config';

const Head = ({ meta }) => {
    const { site } = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        title
                        description
                        siteUrl
                    }
                }
            }
        `,
    );

    const { title, description, siteUrl } = site.siteMetadata;
    const metaTitle = meta.title || title;
    const metaDescription = meta.description || description;

    // TODO: update metadata
    return (
        <Helmet>
            <html lang="en" prefix="og: http://ogp.me/ns#" />
            <title itemProp="name" lang="en">
                {metaTitle}
            </title>
            {/* <link rel="shortcut icon" href={favicon} /> */}
            <link rel="canonical" href={siteUrl} />
            <meta name="description" content={metaDescription} />
            <meta name="keywords" content={config.siteKeywords} />
            {/* <meta name="google-site-verification" content={config.googleVerification} /> */}
            <meta property="og:title" content={metaTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={siteUrl} />
            <meta property="og:site_name" content={metaTitle} />
            {/* <meta property="og:image" content={`${siteUrl}${ogImage}`} /> */}
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:type" content="image/png" />
            <meta property="og:locale" content={config.siteLanguage} />
            <meta itemProp="name" content={metaTitle} />
            <meta itemProp="description" content={metaDescription} />
            {/* <meta itemProp="image" content={`${siteUrl}${ogImage}`} /> */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={siteUrl} />
            <meta name="twitter:site" content={config.twitterHandle} />
            <meta name="twitter:creator" content={config.twitterHandle} />
            <meta name="twitter:title" content={metaTitle} />
            <meta name="twitter:description" content={metaDescription} />
            {/* <meta name="twitter:image" content={`${siteUrl}${ogImage}`} /> */}
            <meta name="twitter:image:alt" content={metaTitle} />
            {/* <link rel="apple-touch-icon" sizes="57x57" href={appleIcon57x57} />
            <link rel="apple-touch-icon" sizes="60x60" href={appleIcon60x60} />
            <link rel="apple-touch-icon" sizes="72x72" href={appleIcon72x72} />
            <link rel="apple-touch-icon" sizes="76x76" href={appleIcon76x76} />
            <link rel="apple-touch-icon" sizes="114x114" href={appleIcon114x114} />
            <link rel="apple-touch-icon" sizes="120x120" href={appleIcon120x120} />
            <link rel="apple-touch-icon" sizes="144x144" href={appleIcon144x144} />
            <link rel="apple-touch-icon" sizes="152x152" href={appleIcon152x152} />
            <link rel="apple-touch-icon" sizes="180x180" href={appleIcon180x180} />
            <link rel="icon" type="image/png" sizes="192x192" href={androidIcon192x192} />
            <link rel="icon" type="image/png" sizes="32x32" href={favicon32x32} />
            <link rel="icon" type="image/png" sizes="96x96" href={favicon96x96} />
            <link rel="icon" type="image/png" sizes="16x16" href={favicon16x16} />
            <meta name="msapplication-TileColor" content={config.navyColor} />
            <meta name="msapplication-TileImage" content={msIcon144x144} /> 
            <meta name="theme-color" content={config.navyColor} /> */}
        </Helmet>
    );
};

Head.propTypes = {
    meta: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
    }),
};

Head.defaultProps = {
    meta: {},
};

export default Head;
