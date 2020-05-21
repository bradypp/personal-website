import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Head, Footer, Header, Social, Email } from '@components';
import { GlobalStyles, mixins, media } from '@styles';

const Main = styled.main`
    ${mixins.containAndCenter};
    ${mixins.flexColumnCenter};
    padding: 0 var(--page-padding);
    width: 100%;
    min-height: 100vh;

    ${media.bp800`
        padding: 0 var(--page-padding-tablet);
    `}
    ${media.bp440`
        padding: 0 $var(--page-padding-mobile);
    `}
`;

const Layout = ({ children, meta, location }) => {
    const isHome = location && location.pathname === '/';

    return (
        <div id="root">
            <Head meta={meta} />
            <GlobalStyles />
            <Social isHome={isHome} orientation="left" />
            <Email isHome={isHome} orientation="right" />
            <Header />
            <Main>{children}</Main>
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
