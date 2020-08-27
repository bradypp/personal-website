import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';

import { Layout, NewsletterForm } from '@components';
import { mixins } from '@styles';

const Container = styled.div`
    ${mixins.flexCenter}
    min-height: inherit;
`;

const NewsletterPage = ({ pageData }) => {
    const {
        frontmatter: { ogImage },
    } = pageData;
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

export const pageQuery = graphql`
    {
        pageData: markdownRemark(fileAbsolutePath: { regex: "/content/newsletter/" }) {
            frontmatter {
                ogImage
            }
        }
    }
`;
