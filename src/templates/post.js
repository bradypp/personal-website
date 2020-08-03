import React from 'react';
import { graphql, Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import { Layout, Icon } from '@components';

const PostHeader = styled.header`
    margin-bottom: 5rem;
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
const BreadCrumb = styled(Link)`
    display: flex;
    align-items: center;
    margin-bottom: 4rem;
    color: var(--color-primary);
    font-family: var(--font-family-mono);
    font-size: var(--font-size-xs);
    font-weight: bold;
    line-height: 1.5;
    text-transform: uppercase;
    letter-spacing: 0.1em;

    svg {
        display: block;
        margin-right: 1rem;
        height: 2rem;
        width: 2rem;
    }
`;
const Title = styled.h1`
    font-size: var(--font-size-h1);
    margin: 0;
    line-height: 1.2;
`;
const Subtitle = styled.p`
    color: var(--color-primary);
    margin: 0 0 2rem 0;
    font-size: var(--font-size-md);
    font-family: var(--fonts-mono);
    font-weight: normal;
    line-height: 1.5;
`;
const Tag = styled(Link)`
    margin-right: 1rem;
    line-height: 1.5;
`;

export const pageQuery = graphql`
    query PostQuery($id: String!) {
        mdx(id: { eq: $id }) {
            body
            excerpt(pruneLength: 200, truncate: true)
            frontmatter {
                title
                subtitle
                date(formatString: "MMMM Do, YYYY")
                tags
            }
        }
    }
`;

const PostTemplate = ({ data }) => {
    const { frontmatter, body, excerpt } = data.mdx;
    const { title, subtitle, date, tags } = frontmatter;

    const shortcodes = { Icon };

    return (
        <Layout>
            <div>
                <BreadCrumb to="/blog">
                    <Icon name="arrow-left" />
                    All Posts
                </BreadCrumb>
                <PostHeader>
                    <Title>{title}</Title>
                    <Subtitle>
                        <time>{date}</time>
                        <span>&nbsp;&mdash;&nbsp;</span>
                        {tags &&
                            tags.length > 0 &&
                            tags.map(tag => (
                                <Tag key={uuidv4()} to={`/tags/${kebabCase(tag)}/`}>
                                    #{tag}
                                </Tag>
                            ))}
                    </Subtitle>
                </PostHeader>
                <PostContent>
                    <MDXProvider components={shortcodes}>
                        <MDXRenderer>{body}</MDXRenderer>
                    </MDXProvider>
                </PostContent>
            </div>
        </Layout>
    );
};

PostTemplate.propTypes = {
    data: PropTypes.object.isRequired,
};

export default PostTemplate;
