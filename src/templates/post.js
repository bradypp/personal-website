import React from 'react';
import { graphql, Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Layout, Main, Icon } from '@components';
import { mixins, media } from '@styles';

const StyledMain = styled(Main)`
    max-width: 800px;
    align-items: flex-start;
`;
const PostHeader = styled.header`
    margin-bottom: 5rem;
    .tag {
        margin-right: 1rem;
    }
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
    ${mixins.inlineLink};
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
        height: 20px;
        width: 20px;
    }
`;
const Title = styled.h1`
    font-size: var(--font-size-h1);
    line-height: 1.1;
    margin: 0;
    line-height: 1.2;
`;
const Subtitle = styled.p`
    color: var(--color-primary);
    margin: 0 0 2rem 0;
    font-size: var(--font-size-md);
    font-family: var(--font-family-mono);
    font-weight: normal;
    line-height: 1.5;

    a {
        ${mixins.inlineLink};
        line-height: 1.5;
    }
`;

export const pageQuery = graphql`
    query($path: String!) {
        markdownRemark(frontmatter: { slug: { eq: $path } }) {
            html
            frontmatter {
                title
                description
                date
                slug
                tags
            }
        }
    }
`;

const PostTemplate = ({ data, location }) => {
    const { frontmatter, html } = data.markdownRemark;
    const { title, date, tags } = frontmatter;

    return (
        <Layout location={location}>
            <StyledMain>
                <BreadCrumb to="/posts">
                    <Icon name="ArrowLeft" />
                    All Posts
                </BreadCrumb>
                <PostHeader>
                    <Title>{title}</Title>
                    <Subtitle>
                        <time>
                            {new Date(date).toLocaleDateString('en-UK', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                            })}
                        </time>
                        <span>&nbsp;&mdash;&nbsp;</span>
                        {tags &&
                            tags.length > 0 &&
                            tags.map((tag, i) => (
                                <Link
                                    key={`post-tag-${i}`}
                                    to={`/tags/${kebabCase(tag)}/`}
                                    className="tag">
                                    #{tag}
                                </Link>
                            ))}
                    </Subtitle>
                </PostHeader>
                <PostContent dangerouslySetInnerHTML={{ __html: html }} />
            </StyledMain>
        </Layout>
    );
};

export default PostTemplate;

PostTemplate.propTypes = {
    data: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
};
