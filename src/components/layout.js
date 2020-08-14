import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { mixins, media } from '@styles';
import { Footer, Meta, Social, Header } from '@components';

const Content = styled.div`
    ${mixins.containAndCenter};
    ${mixins.flexColumnCenter};
    padding-top: ${props => (!props.isHome ? '180px' : '0')};

    ${media.bp1040`
        padding-top: ${props => (!props.isHome ? '150px' : '0')};
    `}
    ${media.bp440`
        padding-top: ${props => (!props.isHome ? '120px' : '0')};
    `}
`;
const Main = styled.main`
    width: 100%;
    padding: 0 var(--side-padding);
    min-height: 100vh;
`;

const Layout = ({ children, isHome, meta }) => {
    return (
        <div id="root">
            <Social isHome={isHome} orientation="left" />
            <Meta isHome={isHome} meta={meta} />
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
    isHome: PropTypes.bool,
    meta: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        relativeUrl: PropTypes.string,
        ogImage: PropTypes.string,
    }),
};

Layout.defaultProps = {
    isHome: false,
    meta: undefined,
};

export default Layout;
