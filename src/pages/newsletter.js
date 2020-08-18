import React from 'react';
import styled from 'styled-components';

import { Layout, NewsletterForm } from '@components';
import { mixins } from '@styles';

const Container = styled.div`
    ${mixins.flexCenter}
    /* width:100%; */
    min-height: inherit;
`;

const NewsletterPage = () => {
    return (
        <Layout
            meta={{
                title: 'Newsletter',
                description: "Sign Up to Paul's newsletter",
                relativeUrl: '/newsletter',
            }}>
            <Container>
                <NewsletterForm />
            </Container>
        </Layout>
    );
};

export default NewsletterPage;
