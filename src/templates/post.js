import React, { useEffect, useContext, useCallback, useRef } from 'react';
import { graphql } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { useInView } from 'react-intersection-observer';

import { PostContext } from '@context';
import { Layout, Tag, Date, TableOfContents, NewsletterForm } from '@components';
import * as PostDesign from '@components/blog/post-design';
import { mixins } from '@styles';

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
`;
const PostContent = styled.article`
    margin-bottom: 10rem;
    margin-right: 10rem;
    width: 760px;
    ${PostDesign.PostStyles}
`;

const PostTemplate = ({ data }) => {
    const headerRef = useRef();
    const { setPostLocation } = useContext(PostContext);
    const { frontmatter, body, fields, tableOfContents } = data.mdx;
    const { title, subtitle, description, date, tags, ogImage, withContents = true } = frontmatter;
    const { slug } = fields;

    const shortCodes = {
        h2: PostDesign.H2,
        h3: PostDesign.H3,
    };

    const alignCenter = tableOfContents.items.length === 0 || !withContents;

    const [inViewRef, inView] = useInView({
        /* Optional options */
        threshold: 0,
        triggerOnce: false,
    });

    const setRef = useCallback(
        node => {
            // eslint-disable-next-line no-param-reassign
            headerRef.current = node;
            inViewRef(node);
        },
        [inViewRef, headerRef],
    );

    useEffect(() => {
        if (inView) {
            setPostLocation('');
        }
    }, [inView, setPostLocation]);

    return (
        <Layout
            meta={{
                title,
                description,
                ogImage: ogImage.childImageSharp.fluid.src,
                relativeUrl: slug,
            }}>
            <PostHeader ref={setRef} alignCenter={alignCenter}>
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
                {!alignCenter && tableOfContents && (
                    <TableOfContents slug={slug} tableOfContents={tableOfContents} />
                )}
            </PostContainer>
            <NewsletterForm />
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
