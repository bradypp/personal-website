import React from 'react';
import { graphql, Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import { Layout, Tag, Date } from '@components';
import * as PostDesign from '@components/blog/post-design';
import { media } from '@styles';

const PostHeader = styled.header`
    margin-bottom: 5rem;
    display: flex;
    flex-direction: column;
    align-items: ${props => (props.alignCenter ? 'center' : 'flex-start')};
    justify-content: flex-start;
    align-self: ${props => (props.alignCenter ? 'center' : 'flex-start')};

    ${media.bp1040`
        margin-bottom: 3rem;
    `}
    ${media.bp440`
        margin-bottom: 2rem;
    `}
`;
const Title = styled.h1`
    font-size: var(--font-size-post-title);
    margin-bottom: 0.8rem;
    line-height: 1.25;
`;
const DateTagsContainer = styled.div`
    color: var(--color-text-primary-1);
    font-size: var(--font-size-xs);
    font-family: var(--fonts-mono);
    font-weight: normal;
    line-height: 1.5;
`;
const Subtitle = styled.p`
    color: var(--color-text-primary-2);
    font-style: italic;
    font-size: var(--font-size-xl);
    font-weight: 300;
    margin-bottom: 1rem;
`;
const PostContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    width: 100%;
`;
const ContentsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
`;
const PostContent = styled.div`
    margin-bottom: 10rem;
    width: 800px;
    ${PostDesign.PostStyles}
`;

// TODO: add link to dev.to & tags list to bottom of post
// TODO: add newsletter box, twitter share, keep reading links, & contents
const PostTemplate = ({ data }) => {
    const { frontmatter, body, fields, tableOfContents } = data.mdx;
    const { title, subtitle, description, date, tags, ogImage, withContents = true } = frontmatter;
    const { slug } = fields;

    const shortCodes = {};

    const TableOfContents = () => {
        return (
            <ContentsContainer>
                <h2>Table of Contents</h2>
                {tableOfContents.items.map(el => {
                    console.log(el);
                    return (
                        <div>
                            <Link to={`${slug}${el.url}`}>{el.title}</Link>
                            {/* {el.map} */}
                        </div>
                    );
                })}
            </ContentsContainer>
        );
    };

    const alignCenter = tableOfContents.items.length === 0 || !withContents;
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
            <PostContainer>
                <PostContent>
                    <MDXProvider components={shortCodes}>
                        <MDXRenderer>{body}</MDXRenderer>
                    </MDXProvider>
                </PostContent>
                {tableOfContents.items.length !== 0 && withContents && (
                    <TableOfContents data={tableOfContents.items} />
                )}
            </PostContainer>
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
    }
`;
