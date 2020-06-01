import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Head, Footer, Header, Social } from '@components';

const Content = styled.div`
    width: 100%;
    padding: 0 var(--side-padding);
`;

const Layout = ({ children, meta, location }) => {
    const isHome = location && location.pathname === '/';

    return (
        <div id="root">
            <Head meta={meta} />
            <Social isHome={isHome} orientation="left" />
            <Header isHome={isHome} />
            <Content id="content">{children}</Content>
            <Footer />
        </div>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
    meta: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
    }),
    location: PropTypes.object,
};

Layout.defaultProps = {
    meta: undefined,
    location: undefined,
};

export default Layout;
