import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Head from '@components/head';
import Header from '@components/header';
import Footer from '@components/footer';
import { GlobalStyles, mixins, theme, media } from '@styles';

const Main = styled.main`
    ${mixins.containAndCenter};
    ${mixins.flexColumnCenter};
    padding: 0 ${theme.pagePadding};
    width: 100%;
    min-height: 100vh;

    ${media.bp800`
        padding: 0 ${theme.pagePaddingTablet};
    `}
    ${media.bp440`
        padding: 0 ${theme.pagePaddingMobile};
    `}

    section {
        padding: 15rem 0;
        width: 100%;
    }
`;

const Layout = ({ children, meta }) => (
    <div id="root">
        <Head meta={meta} />
        <GlobalStyles />
        <Header />
        <Main>{children}</Main>
        <Footer />
    </div>
);

Layout.propTypes = {
    children: PropTypes.node.isRequired,
    meta: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
    }),
};

Layout.defaultProps = {
    meta: undefined,
};

export default Layout;
