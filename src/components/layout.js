import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { mixins } from '@styles';
import { Head, Footer, Header, Social } from '@components';

const Content = styled.div`
    ${mixins.containAndCenter};
    display: flex;
    flex-direction: column;
    padding-top: ${props => (!props.isHome ? '180px' : '0')};
`;
const Main = styled.main`
    width: 100%;
    padding: 0 var(--side-padding);
    min-height: 100vh;
`;

const Layout = ({ children, meta, isHome }) => {
    return (
        <div id="root">
            <Head meta={meta} />
            <Social isHome={isHome} orientation="left" />
            <Header isHome={isHome} />
            <Main>
                <Content id="content" isHome={isHome}>
                    {children}
                </Content>
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
    isHome: PropTypes.bool,
};

Layout.defaultProps = {
    meta: undefined,
    isHome: false,
};

export default Layout;
