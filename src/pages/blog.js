import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import kebabCase from 'lodash/kebabCase';
import { v4 as uuidv4 } from 'uuid';
import { graphql, Link } from 'gatsby';

import { Layout, Icon, Tag, Date } from '@components';
import { mixins } from '@styles';

const Title = styled.h1`
    font-size: 6rem;
    margin-bottom: 2rem;
`;
const Subtitle = styled.p`
    font-family: var(--fonts-mono);
    margin-bottom: 8rem;
    color: var(--color-primary);
`;
const PostsContainer = styled.section`
    display: grid;
    grid-template-columns: repeat(2, 50%);
    grid-gap: 2rem;
    margin-bottom: 8rem;
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
const PostContainer = styled(Link)`
    ${mixins.clickable};
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background-color: var(--color-background-secondary-1);
    padding: 3rem;
    border-radius: var(--border-radius);
    color: var(--color-text-primary-1);
    min-height: 300px;
    width: 100%;

    &:hover {
        h3 {
            color: var(--color-primary);
        }
        svg {
            transform: translateX(5px);
        }
    }
`;
const PostTitle = styled.h3`
    font-size: var(--font-size-4xl);
    transition: var(--transition);
    margin: 0;
`;
const PostSubtitle = styled.p`
    margin-bottom: 0.5rem;
    font-style: italic;
    font-weight: 300;
    font-size: var(--font-size-lg);
    color: var(--color-text-primary-2);
`;
const PostDateTags = styled.div`
    color: var(--color-text-primary-1);
    margin: 0 0 2rem 0;
    font-size: var(--font-size-xs);
    font-family: var(--fonts-mono);
    font-weight: normal;
    line-height: 1.5;
`;
const PostExcerpt = styled.p`
    font-size: var(--font-size-sm);
    font-weight: 400;
`;
const ReadMoreLink = styled(Link)`
    ${mixins.flexCenterLeft}
    color: var(--color-primary);
    width: max-content;
    margin-top: auto;

    span {
        font-size: var(--font-size-sm);
        font-weight: 600;
        margin-right: 0.5rem;
    }

    svg {
        margin-top: 2px;
        transition: var(--transition);
        width: 16px;
        height: 16px;
    }
`;

// TODO: Add newsletter sign up
const BlogPage = ({ data }) => {
    const posts = data?.allMdx?.edges;
    const title = 'Blog';
    const subtitle = 'Your regular dose of web dev goodness';
    return (
        <Layout meta={{ title: `${title} | Paul Brady` }}>
            <Title>Blog</Title>
            <Subtitle>{subtitle}</Subtitle>
            <PostsContainer>
                {[...posts, ...posts, ...posts, ...posts].map(post => {
                    const { excerpt, fields, frontmatter } = post.node;
                    const { title, subtitle, date, tags } = frontmatter;
                    const { slug } = fields;
                    return (
                        <PostContainer to={slug} key={uuidv4()}>
                            <PostTitle>{title}</PostTitle>
                            {subtitle && <PostSubtitle>{subtitle}</PostSubtitle>}
                            <PostDateTags>
                                <Date date={date} />
                                <span> &ndash; </span>
                                {tags.map(tag => (
                                    <Tag
                                        to={`/tags/${kebabCase(tag)}/`}
                                        key={uuidv4()}>{`#${tag}`}</Tag>
                                ))}
                            </PostDateTags>
                            <PostExcerpt>{excerpt}</PostExcerpt>
                            <ReadMoreLink to={slug}>
                                <span>Read More</span>
                                <Icon name="arrow-right" />
                            </ReadMoreLink>
                        </PostContainer>
                    );
                })}
            </PostsContainer>
        </Layout>
    );
};

BlogPage.propTypes = {
    data: PropTypes.object.isRequired,
};

export default BlogPage;

// TODO: set draft ne: true
export const pageQuery = graphql`
    {
        allMdx(
            filter: {
                fileAbsolutePath: { regex: "/posts/" }
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
    }
`;
