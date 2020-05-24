import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Head, Footer, Header, Social } from '@components';
import { mixins } from '@styles';

const Main = styled.main`
    width: 100%;
    min-height: 100vh;
    ${mixins.pagePadding}
`;
const Content = styled.div`
    ${mixins.containAndCenter};
    ${mixins.flexColumnCenter};
`;

const Layout = ({ children, meta, location }) => {
    const isHome = location && location.pathname === '/';

    return (
        <div id="root">
            <Head meta={meta} />
            <Social isHome={isHome} orientation="left" />
            <Header isHome={isHome} />
            <Main>
                <Content id="content">{children}</Content>
            </Main>
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
