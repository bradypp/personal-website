import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { graphql } from 'gatsby';

import { Layout, Posts } from '@components';

const Heading = styled.h1`
    margin-bottom: 2rem;
`;
const Subtitle = styled.p`
    font-family: var(--fonts-mono);
    margin-bottom: 8rem;
    color: var(--color-primary);
`;
// const TagsContainer = styled.section`
//     flex: 1;
// `;
// const TagsTitle = styled.h2`
//     font-size: var(--font-size-lg);
// `;
// const Tags = styled.div`
//     display: flex;
//     flex-wrap: wrap;

//     & > * {
//         margin: 0 1rem 0.5rem 0;
//     }
// `;

// TODO: Add load more button
const BlogPage = ({ data }) => {
    const posts = data?.allMdx?.edges;
    const subtitle = 'Your dose of web dev related goodness';
    return (
        <Layout
            meta={{
                title: 'Blog | Paul Brady',
                description:
                    "Check out Paul's blog posts covering all things web dev related including JavaScript, CSS, React and more!",
                relativeUrl: '/blog/',
            }}>
            <Heading>Blog</Heading>
            <Subtitle>{subtitle}</Subtitle>
            <Posts posts={posts} />
        </Layout>
    );
};

BlogPage.propTypes = {
    data: PropTypes.object.isRequired,
};

export default BlogPage;

export const pageQuery = graphql`
    {
        allMdx(
            limit: 20
            filter: { fileAbsolutePath: { regex: "/posts/" }, frontmatter: { draft: { ne: true } } }
            sort: { fields: [frontmatter___date], order: DESC }
        ) {
            edges {
                node {
                    excerpt(pruneLength: 300, truncate: true)
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                        subtitle
                        date(formatString: "MMMM Do, YYYY")
                        tags
                    }
                }
            }
        }
    }
`;
