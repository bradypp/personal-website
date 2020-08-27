import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';

import { Layout, NewsletterForm } from '@components';
import { mixins } from '@styles';

const Container = styled.div`
    ${mixins.flexCenter}
    min-height: inherit;
`;

const NewsletterPage = ({ data }) => {
    const {
        pageData: {
            frontmatter: { ogImage },
        },
    } = data;
    return (
        <Layout
            meta={{
                title: 'Newsletter',
                description: "Sign Up to Paul's newsletter",
                relativeUrl: '/newsletter',
                ogImage: ogImage?.childImageSharp?.fixed?.src,
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
                ogImage {
                    childImageSharp {
                        fixed(width: 1200, height: 630) {
                            src
                        }
                    }
                }
            }
        }
    }
`;
