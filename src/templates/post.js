import React from 'react';
import { graphql, Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import {
    Layout,
    Tag,
    Date,
    TableOfContents,
    NewsletterForm,
    CustomList,
    CustomLink,
} from '@components';
import { media } from '@styles';
import * as PostDesign from '@components/blog/post-design';

const PostHeader = styled.header`
    margin-bottom: 5rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    align-self: flex-start;
    max-width: var(--post-max-width);

    ${props =>
        !props.withSidebar &&
        css`
            align-self: center;
        `}
`;
const Title = styled.h1`
    line-height: 1.25;
    margin-bottom: 1.5rem;
`;
const DateTagsContainer = styled.div`
    color: var(--color-text-primary-1);
    font-size: var(--font-size-md);
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
    margin-bottom: 1.5rem;
`;
const PostContainer = styled.div`
    display: flex;
    justify-content: ${props => (props.withSidebar ? 'flex-start' : 'center')};
    width: 100%;
    margin-bottom: 3rem;
`;
const PostContent = styled.article`
    ${PostDesign.PostStyles}

    margin-right: 9rem;
    max-width: var(--post-max-width);
    width: 100%;

    & > *:first-child {
        margin-top:0;
    }

    ${media.bp1280` 
        margin-right: 7rem;
    `}
    ${media.bp1040` 
        margin-right: 0;
    `}

    ${props =>
        !props.withSidebar &&
        css`
            margin-right: 0;
        `}
`;
// const BottomTagsContainer = styled.div`
//     font-size: var(--font-size-xs);
//     font-family: var(--fonts-mono);
//     font-weight: normal;
//     line-height: 1.5;
// `;
const MorePostsContainer = styled.div`
    width: 100%;

    ${props =>
        !props.withSidebar &&
        css`
            max-width: var(--post-max-width);
            align-self: center;
        `}
`;
const MorePostsTitle = styled.h2`
    font-size: var(--font-size-4xl);
`;
const MorePostsLink = styled(Link)`
    color: var(--color-text-primary-1);

    &:hover {
        color: var(--color-primary);
    }
`;

// TODO: add posts in a series/collection to the subtitle with a link to a series/collection page & recommended posts
// TODO: make an aside component for info, success & danger
const PostTemplate = ({ data }) => {
    const { frontmatter, body, fields, tableOfContents } = data.postData;
    const {
        title,
        subtitle,
        description,
        date,
        tags,
        ogImage,
        withContents: frontmatterWithContents = true,
        contentsDepth,
        withDate = true,
    } = frontmatter;
    const { slug } = fields;
    console.log(withDate);
    const withContents = tableOfContents?.items?.length > 0 && frontmatterWithContents;

    const tagsArray =
        tags?.length > 0 &&
        tags.map(tag => (
            <React.Fragment key={uuidv4()}>
                <Tag to={`/blog/tags/${kebabCase(tag)}/`}>#{tag}</Tag>{' '}
            </React.Fragment>
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
        h4: PostDesign.h4,
        CustomList: PostDesign.StyledCustomList,
        a: CustomLink,
    };

    return (
        <Layout
            meta={{
                title,
                description,
                ogImage: ogImage?.childImageSharp?.fixed?.src,
                relativeUrl: slug,
            }}>
            <PostHeader withSidebar={withContents}>
                <Title>{title}</Title>
                {subtitle && <Subtitle>{subtitle}</Subtitle>}
                <DateTagsContainer>
                    {withDate && (
                        <>
                            <Date date={date} />
                            <span> &mdash; </span>
                        </>
                    )}
                    {tagsArray?.length > 0 && tagsArray}
                </DateTagsContainer>
            </PostHeader>
            <PostContainer withSidebar={withContents}>
                <PostContent withSidebar={withContents}>
                    <MDXProvider components={shortCodes}>
                        <MDXRenderer>{body}</MDXRenderer>
                    </MDXProvider>
                </PostContent>
                {withContents && (
                    <TableOfContents
                        slug={slug}
                        tableOfContents={tableOfContents}
                        contentsDepth={contentsDepth}
                    />
                )}
            </PostContainer>
            {morePosts?.length > 0 && (
                <MorePostsContainer withSidebar={withContents}>
                    <MorePostsTitle>Continue reading...</MorePostsTitle>
                    <CustomList items={morePosts} isPost fontSize="lg" />
                </MorePostsContainer>
            )}
            <NewsletterForm isPost />
        </Layout>
    );
};

PostTemplate.propTypes = {
    data: PropTypes.object.isRequired,
};

export default PostTemplate;

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
                withDate
                contentsDepth
                ogImage {
                    childImageSharp {
                        fixed(width: 1200, height: 630) {
                            src
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
