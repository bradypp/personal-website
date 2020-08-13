import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { graphql } from 'gatsby';

import { Layout, Posts } from '@components';
import { media } from '@styles';

const Heading = styled.h1`
    margin-bottom: 2rem;
`;
const Subtitle = styled.p`
    font-family: var(--fonts-mono);
    margin-bottom: 8rem;
    color: var(--color-primary);
    text-align: center;

    ${media.bp800`
        margin-bottom: 4rem;
    `};
`;
// const TagsContainer = styled.section`
//     flex: 1;
// `;
// const TagsTitle = styled.h2`
//     font-size: var(--font-size-xl);
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
    const { postsMdx, pageData } = data;
    const { title, subtitle, description, relativeUrl } = pageData.frontmatter;

    return (
        <Layout
            meta={{
                title,
                description,
                relativeUrl,
            }}>
            <Heading>{title}</Heading>
            <Subtitle>{subtitle}</Subtitle>
            <Posts posts={postsMdx.edges} />
        </Layout>
    );
};

BlogPage.propTypes = {
    data: PropTypes.object.isRequired,
};

export default BlogPage;

export const pageQuery = graphql`
    {
        postsMdx: allMdx(
            limit: 20
            filter: {
                fileAbsolutePath: { regex: "/content/posts/" }
                frontmatter: { draft: { ne: false } }
            }
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
        pageData: markdownRemark(fileAbsolutePath: { regex: "/content/blog/" }) {
            frontmatter {
                title
                subtitle
                description
                relativeUrl
            }
        }
    }
`;
