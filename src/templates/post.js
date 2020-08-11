import React from 'react';
import { graphql } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import { Layout, Tag, Date } from '@components';

const PostHeader = styled.header`
    margin-bottom: 5rem;
    align-self: flex-start;
`;
const PostContent = styled.div`
    margin-bottom: 10rem;
    width: 100%;

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        margin: 2em 0 1em;
    }

    p {
        margin: 1em 0;
        line-height: 1.5;
    }

    ol,
    ul {
        display: block;
        list-style-type: decimal;
        margin-block-start: 1em;
        margin-block-end: 1em;
        margin-inline-start: 0;
        margin-inline-end: 0;
        padding-inline-start: 4rem;
    }

    ul {
        list-style-type: disc;
    }

    ol {
        list-style-type: decimal;
    }

    blockquote {
        border-left-color: var(--color-primary);
        border-left-style: solid;
        border-left-width: 1px;
        margin-left: 0;
        margin-right: 0;
        padding-left: 2.4rem;

        p {
            font-style: italic;
            font-size: 24px;
        }
    }
`;
const Title = styled.h1`
    font-size: var(--font-size-post-title);
    margin-bottom: 0.5rem;
    line-height: 1.25;
`;
const DateTagsContainer = styled.div`
    color: var(--color-text-primary-1);
    font-size: var(--font-size-xs);
    font-family: var(--fonts-mono);
    font-weight: normal;
    margin-bottom: 0.5rem;
    line-height: 1.5;
`;
const Subtitle = styled.p`
    color: var(--color-text-primary-2);
    font-style: italic;
    font-size: var(--font-size-xl);
    font-weight: 300;
    margin-bottom: 0.8rem;
`;

// TODO: add link to dev.to & tags list to bottom of post
// TODO: add newsletter box, twitter share, keep reading links, & contents
const PostTemplate = ({ data }) => {
    const { frontmatter, body, fields } = data?.mdx;
    const { title, subtitle, description, date, tags, og_image } = frontmatter;

    const shortCodes = {};

    return (
        <Layout
            meta={{
                title: `${title} | Paul Brady`,
                description,
                ogImage: og_image.childImageSharp.fluid.src,
                relativeUrl: fields.slug,
            }}>
            <PostHeader>
                <Title>{title}</Title>
                {subtitle && <Subtitle>{subtitle}</Subtitle>}
                <DateTagsContainer>
                    <Date date={date} />
                    <span>&nbsp;&mdash;&nbsp;</span>
                    {tags &&
                        tags.length > 0 &&
                        tags.map(tag => (
                            <Tag key={uuidv4()} to={`/blog/tags/${kebabCase(tag)}/`}>
                                #{tag}
                            </Tag>
                        ))}
                </DateTagsContainer>
            </PostHeader>
            <PostContent>
                <MDXProvider components={shortCodes}>
                    <MDXRenderer>{body}</MDXRenderer>
                </MDXProvider>
            </PostContent>
        </Layout>
    );
};

PostTemplate.propTypes = {
    data: PropTypes.object.isRequired,
};

export default PostTemplate;

export const pageQuery = graphql`
    query PostQuery($id: String!) {
        mdx(id: { eq: $id }) {
            body
            fields {
                slug
            }
            frontmatter {
                title
                description
                subtitle
                date(formatString: "MMMM Do, YYYY")
                tags
                og_image {
                    childImageSharp {
                        fluid(maxWidth: 800, quality: 90) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
            }
        }
    }
`;
