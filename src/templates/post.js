import React from 'react';
import { graphql, Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Layout, Main } from '@components';

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
            <Main maxWidth="1000px">
                <span className="breadcrumb">
                    <span className="arrow">&larr;</span>
                    <Link to="/pensieve">All memories</Link>
                </span>

                <PostHeader>
                    <h1 className="medium-title">{title}</h1>
                    <p className="subtitle">
                        <time>
                            {new Date(date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </time>
                        <span>&nbsp;&mdash;&nbsp;</span>
                        {tags &&
                            tags.length > 0 &&
                            tags.map((tag, i) => (
                                <Link
                                    key={i}
                                    to={`/pensieve/tags/${kebabCase(tag)}/`}
                                    className="tag">
                                    #{tag}
                                </Link>
                            ))}
                    </p>
                </PostHeader>
                <PostContent dangerouslySetInnerHTML={{ __html: html }} />
            </Main>
        </Layout>
    );
};

export default PostTemplate;

PostTemplate.propTypes = {
    data: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
};
