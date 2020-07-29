import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

import favicon from '@images/favicons/favicon.ico';
import androidIcon192x192 from '@images/favicons/android-chrome-192x192.png';
import androidIcon512x512 from '@images/favicons/android-chrome-512x512.png';
import favicon32x32 from '@images/favicons/favicon-32x32.png';
import favicon16x16 from '@images/favicons/favicon-16x16.png';
import msTile150x150 from '@images/favicons/mstile-150x150.png';
import ogImage from '@images/og-image.png';
import { twitterHandle, mainThemeColor } from '@config';

const Head = meta => {
    const { site } = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        title
                        description
                        siteUrl
                        keywords
                        language
                    }
                }
            }
        `,
    );

    const { title, description, siteUrl, keywords, language } = site.siteMetadata;

    const metaTitle = meta.title || title;
    const metaDescription = meta.description || description;
    const metaKeywords = meta.keywords || keywords;
    const metaOgImage = meta.ogImage || ogImage;
    const metaPageUrl = `${siteUrl}${meta.relativeUrl || ''}`;

    return (
        <Helmet>
            <html lang={language} />
            <title itemProp="name" lang={language}>
                {metaTitle}
            </title>
            <link rel="canonical" href={metaPageUrl} />
            <link rel="shortcut icon" href={favicon} />
            <meta itemProp="name" content={metaTitle} />
            <meta itemProp="description" content={metaDescription} />
            <meta itemProp="image" content={metaOgImage} />
            <meta name="description" content={metaDescription} />
            <meta name="keywords" content={metaKeywords} />
            <meta property="og:title" content={metaTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={metaPageUrl} />
            <meta property="og:site_name" content={metaTitle} />
            <meta property="og:image" content={metaOgImage} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:type" content="image/png" />
            <meta property="og:locale" content={language} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={siteUrl} />
            <meta name="twitter:site" content={twitterHandle} />
            <meta name="twitter:creator" content={twitterHandle} />
            <meta name="twitter:title" content={metaTitle} />
            <meta name="twitter:description" content={metaDescription} />
            <meta name="twitter:image" content={metaOgImage} />
            <meta name="twitter:image:alt" content={metaTitle} />
            <link rel="icon" type="image/png" sizes="192x192" href={androidIcon192x192} />
            <link rel="icon" type="image/png" sizes="512x512" href={androidIcon512x512} />
            <link rel="icon" type="image/png" sizes="32x32" href={favicon32x32} />
            <link rel="icon" type="image/png" sizes="16x16" href={favicon16x16} />
            <meta name="msapplication-TileColor" content={mainThemeColor} />
            <meta name="msapplication-TileImage" content={msTile150x150} />
            <meta name="theme-color" content={mainThemeColor} />
            <meta
                name="google-site-verification"
                content={process.env.GOOGLE_ANALYTICS_VERIFICATION}
            />
        </Helmet>
    );
};

Head.propTypes = {
    meta: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        keywords: PropTypes.string,
        relativeUrl: PropTypes.string,
        ogImage: PropTypes.string,
    }),
};

Head.defaultProps = {
    meta: {},
};

export default Head;
