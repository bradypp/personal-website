import React from 'react';
import PropTypes from 'prop-types';

import Head from '@components/head';
import Header from '@components/header';
import Footer from '@components/footer';
import { GlobalStyle } from '@styles';

const Layout = ({ children, meta }) => (
    <div id="root">
        <Head meta={meta} />
        <GlobalStyle />
        <Header />
        <main>{children}</main>
        <Footer />
    </div>
);

Layout.propTypes = {
    children: PropTypes.node.isRequired,
    meta: PropTypes.object,
};

Layout.defaultProps = {
    meta: undefined,
};

export default Layout;
