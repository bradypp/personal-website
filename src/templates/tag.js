import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { graphql } from 'gatsby';

import { Layout, Posts, CustomLink } from '@components';

const HeadingContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4rem;
    width: 100%;

    a {
        height: max-content;
    }

    h1 {
        margin: 0;
    }
`;

const Tag = ({ pageContext, data }) => {
    const posts = data?.allMdx?.edges;
    const { relativeUrl, tag } = pageContext;
    return (
        <Layout
            meta={{
                title: tag,
                description: `Check out all the posts with tag ${tag} by Paul Brady`,
                relativeUrl,
            }}>
            <HeadingContainer>
                <h1>{pageContext.tag}</h1>
                <CustomLink to="/blog/tags">View all tags</CustomLink>
            </HeadingContainer>
            <Posts posts={posts} />
        </Layout>
    );
};

Tag.propTypes = {
    data: PropTypes.object.isRequired,
    pageContext: PropTypes.object.isRequired,
};

export default Tag;

export const pageQuery = graphql`
    query($tag: String!) {
        allMdx(
            limit: 20
            filter: {
                fileAbsolutePath: { regex: "/content/posts/" }
                frontmatter: { draft: { ne: true }, tags: { in: [$tag] } }
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
    }
`;
