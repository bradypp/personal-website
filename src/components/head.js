import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

import favicon from '@assets/images/favicons/favicon.ico';
import androidIcon192x192 from '@assets/images/favicons/android-chrome-192x192.png';
import androidIcon512x512 from '@assets/images/favicons/android-chrome-512x512.png';
import favicon16x16 from '@assets/images/favicons/favicon-16x16.png';
import favicon32x32 from '@assets/images/favicons/favicon-32x32.png';
import favicon96x96 from '@assets/images/favicons/favicon-96x96.png';
import favicon128x128 from '@assets/images/favicons/favicon-128x128.png';
import favicon196x196 from '@assets/images/favicons/favicon-196x196.png';
import msTile144x144 from '@assets/images/favicons/mstile-144x144.png';
import msTile150x150 from '@assets/images/favicons/mstile-150x150.png';
import msTile70x70 from '@assets/images/favicons/mstile-70x70.png';
import msTile310x150 from '@assets/images/favicons/mstile-310x150.png';
import msTile310x310 from '@assets/images/favicons/mstile-310x310.png';
import appleIcon57x57 from '@assets/images/favicons/apple-touch-icon-57x57.png';
import appleIcon60x60 from '@assets/images/favicons/apple-touch-icon-60x60.png';
import appleIcon72x72 from '@assets/images/favicons/apple-touch-icon-72x72.png';
import appleIcon76x76 from '@assets/images/favicons/apple-touch-icon-76x76.png';
import appleIcon114x114 from '@assets/images/favicons/apple-touch-icon-114x114.png';
import appleIcon120x120 from '@assets/images/favicons/apple-touch-icon-120x120.png';
import appleIcon144x144 from '@assets/images/favicons/apple-touch-icon-144x144.png';
import appleIcon152x152 from '@assets/images/favicons/apple-touch-icon-152x152.png';
import ogImage from '@assets/images/og-image.png';
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
                {meta.title}
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
            <link rel="icon" type="image/png" sizes="96x96" href={favicon96x96} />
            <link rel="icon" type="image/png" sizes="128x128" href={favicon128x128} />
            <link rel="icon" type="image/png" sizes="196x196" href={favicon196x196} />
            <meta name="msapplication-TileColor" content={mainThemeColor} />
            <meta name="msapplication-TileImage" content={msTile144x144} />
            <meta name="msapplication-square70x70logo" content={msTile70x70} />
            <meta name="msapplication-square150x150logo" content={msTile150x150} />
            <meta name="msapplication-wide310x150logo" content={msTile310x150} />
            <meta name="msapplication-square310x310logo" content={msTile310x310} />
            <link rel="apple-touch-icon-precomposed" sizes="57x57" href={appleIcon57x57} />
            <link rel="apple-touch-icon-precomposed" sizes="60x60" href={appleIcon60x60} />
            <link rel="apple-touch-icon-precomposed" sizes="72x72" href={appleIcon72x72} />
            <link rel="apple-touch-icon-precomposed" sizes="76x76" href={appleIcon76x76} />
            <link rel="apple-touch-icon-precomposed" sizes="114x114" href={appleIcon114x114} />
            <link rel="apple-touch-icon-precomposed" sizes="120x120" href={appleIcon120x120} />
            <link rel="apple-touch-icon-precomposed" sizes="144x144" href={appleIcon144x144} />
            <link rel="apple-touch-icon-precomposed" sizes="152x152" href={appleIcon152x152} />
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
