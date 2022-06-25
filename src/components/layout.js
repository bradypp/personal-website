import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { mixins, media } from '@styles';
import { Footer, Meta, Social, Header } from '@components';

const Content = styled.div`
    ${mixins.containAndCenter};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding-top: ${props => (!props.isHome ? '170px' : '0')};
    min-height: inherit;

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
    min-height: calc(100vh - var(--footer-height));
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
