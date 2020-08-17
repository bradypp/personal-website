import React from 'react';
import { graphql, Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import { Layout, Tag, Date, TableOfContents, NewsletterForm, CustomList } from '@components';
import * as PostDesign from '@components/blog/post-design';

const PostHeader = styled.header`
    margin-bottom: 2rem;
    display: flex;
    flex-direction: column;
    align-items: ${props => (props.alignCenter ? 'center' : 'flex-start')};
    justify-content: flex-start;
    align-self: ${props => (props.alignCenter ? 'center' : 'flex-start')};
`;
const Title = styled.h1`
    font-size: var(--font-size-post-title);
    margin-bottom: 0.5rem;
    line-height: 1.25;
`;
const DateTagsContainer = styled.div`
    color: var(--color-text-primary-1);
    font-size: var(--font-size-sm);
    font-family: var(--fonts-mono);
    font-weight: normal;
    line-height: 1.5;
`;
const Subtitle = styled.p`
    color: var(--color-text-primary-2);
    font-style: italic;
    font-size: var(--font-size-3xl);
    line-height: 1.4;
    font-weight: 300;
    margin-bottom: 1rem;
`;
const PostContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    width: 100%;
    margin-bottom: 3rem;
`;
const PostContent = styled.article`
    ${PostDesign.PostStyles}
    margin-right: 10rem;
    width: 760px;
`;
const BottomTagsContainer = styled.div`
    font-size: var(--font-size-xs);
    font-family: var(--fonts-mono);
    font-weight: normal;
    line-height: 1.5;
`;
const MorePostsContainer = styled.div`
    width: 100%;
`;
const MorePostsTitle = styled.h2`
    font-size: var(--font-size-4xl);
`;
const MorePostsLink = styled(Link)`
    color: var(--color-text-primary-1);
    font-size: var(--font-size-lg);

    &:hover {
        color: var(--color-primary);
    }
`;

// TODO: add posts in a series/collection to the subtitle with a link to a series/collection page & recommended posts
// TODO: make an aside component for info, success & danger
const PostTemplate = ({ data }) => {
    const { frontmatter, body, fields, tableOfContents } = data.postData;
    const { title, subtitle, description, date, tags, ogImage, withContents = true } = frontmatter;
    const { slug } = fields;

    const alignCenter = tableOfContents.items.length === 0 || !withContents;

    const tagsArray =
        tags?.length > 0 &&
        tags.map(tag => (
            <>
                <Tag key={uuidv4()} to={`/blog/tags/${kebabCase(tag)}/`}>
                    #{tag}
                </Tag>{' '}
            </>
        ));

    const recommendedPosts = data?.recommendedPostsMdx?.edges;
    const latestPosts = data?.latestPostsMdx?.edges;

    const recommendedPostsIds = recommendedPosts?.map(el => el.node.id);
    const latestPostsIds = latestPosts?.map(el => el.node.id);

    const filteredLatestPostsIds = latestPostsIds?.filter(el => !recommendedPostsIds.includes(el));
    const filteredLatestPosts = latestPosts?.filter(el =>
        filteredLatestPostsIds.includes(el.node.id),
    );

    const morePosts = [...recommendedPosts, ...filteredLatestPosts].slice(0, 3).map(post => {
        const {
            fields: { slug },
            frontmatter: { title },
        } = post.node;
        return <MorePostsLink to={slug}>{title}</MorePostsLink>;
    });

    const shortCodes = {
        h2: PostDesign.h2,
        h3: PostDesign.h3,
    };

    return (
        <Layout
            meta={{
                title,
                description,
                ogImage: ogImage.childImageSharp.fluid.src,
                relativeUrl: slug,
            }}>
            <PostHeader alignCenter={alignCenter}>
                <Title>{title}</Title>
                {subtitle && <Subtitle>{subtitle}</Subtitle>}
                <DateTagsContainer>
                    <Date date={date} />
                    {tags?.length > 0 && [<span>&nbsp;&mdash;&nbsp;</span>, tagsArray]}
                </DateTagsContainer>
            </PostHeader>
            <PostContainer>
                <PostContent>
                    <MDXProvider components={shortCodes}>
                        <MDXRenderer>{body}</MDXRenderer>
                    </MDXProvider>
                </PostContent>
                {!alignCenter && tableOfContents && (
                    <TableOfContents slug={slug} tableOfContents={tableOfContents} />
                )}
            </PostContainer>
            {morePosts?.length > 0 && (
                <MorePostsContainer>
                    <MorePostsTitle>Continue reading...</MorePostsTitle>
                    <CustomList items={morePosts} />
                </MorePostsContainer>
            )}
            <NewsletterForm />
        </Layout>
    );
};

PostTemplate.propTypes = {
    data: PropTypes.object.isRequired,
};

export default PostTemplate;

// TODO: test queries
export const pageQuery = graphql`
    query PostQuery($id: String!, $tags: [String]) {
        postData: mdx(id: { eq: $id }) {
            body
            tableOfContents
            fields {
                slug
            }
            frontmatter {
                title
                description
                subtitle
                date(formatString: "MMMM Do, YYYY")
                tags
                withContents
                ogImage {
                    childImageSharp {
                        fluid(maxWidth: 800, quality: 90) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
            }
        }
        recommendedPostsMdx: allMdx(
            limit: 3
            filter: {
                fileAbsolutePath: { regex: "/content/posts/" }
                frontmatter: { draft: { ne: true }, tags: { in: $tags } }
                id: { ne: $id }
            }
            sort: { fields: [frontmatter___date], order: DESC }
        ) {
            edges {
                node {
                    id
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                    }
                }
            }
        }
        latestPostsMdx: allMdx(
            limit: 3
            filter: {
                fileAbsolutePath: { regex: "/content/posts/" }
                frontmatter: { draft: { ne: true } }
                id: { ne: $id }
            }
            sort: { fields: [frontmatter___date], order: DESC }
        ) {
            edges {
                node {
                    id
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                    }
                }
            }
        }
    }
`;
