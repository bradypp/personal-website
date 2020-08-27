import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { graphql } from 'gatsby';

import { Layout, Posts, CustomLink } from '@components';

const Heading = styled.h1`
    align-self: flex-start;
    margin-bottom: 4rem;
`;
// const Subtitle = styled.p`
//     align-self: flex-start;
//     font-family: var(--fonts-mono);
//     margin-bottom: 8rem;
//     color: var(--color-primary);
//     text-align: center;

//     ${media.bp800`
//         margin-bottom: 4rem;
//     `};
// `;
const NoPostsMessage = styled.div`
    p {
        margin-bottom: 1rem;
        text-align: center;

        &:last-child {
            font-size: var(--font-size-xs);
        }
    }
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
    const { title, description, relativeUrl, ogImage } = pageData.frontmatter;

    return (
        <Layout
            meta={{
                title,
                description,
                relativeUrl,
                ogImage: ogImage?.childImageSharp?.fixed?.src,
            }}>
            <Heading>{title}</Heading>
            {postsMdx.edges.length > 0 ? (
                <Posts posts={postsMdx.edges} />
            ) : (
                <NoPostsMessage>
                    <p>Stay tuned! My first post will arrive very soon.</p>
                    <p>
                        (Check out a demo post <CustomLink to="/blog/post-demo">here</CustomLink>)
                    </p>
                </NoPostsMessage>
            )}
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
                frontmatter: { draft: { ne: true } }
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
        }
        pageData: markdownRemark(fileAbsolutePath: { regex: "/content/blog/" }) {
            frontmatter {
                title
                description
                relativeUrl
            }
        }
    }
`;
