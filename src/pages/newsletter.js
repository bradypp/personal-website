import React from 'react';
import styled from 'styled-components';

import { Layout, NewsletterForm } from '@components';
import ogImage from '@assets/images/newsletter-og-image.png';
import { mixins } from '@styles';

const Container = styled.div`
    ${mixins.flexCenter}
    min-height: inherit;
`;

const NewsletterPage = () => {
    return (
        <Layout
            meta={{
                title: 'Newsletter',
                description: "Sign Up to Paul's newsletter",
                relativeUrl: '/newsletter',
                ogImage,
            }}>
            <Container>
                <NewsletterForm />
            </Container>
        </Layout>
    );
};

export default NewsletterPage;
