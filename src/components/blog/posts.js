import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import kebabCase from 'lodash/kebabCase';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'gatsby';

import { Icon, Tag, Date } from '@components';
import { mixins, media } from '@styles';

const PostsContainer = styled.section`
    display: grid;
    grid-template-columns: repeat(2, 50%);
    grid-gap: 2rem;
    margin-bottom: 8rem;

    ${media.bp800`
        grid-template-columns: 100%;
        margin-bottom: 4rem;
    `}
`;
const PostContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background-color: var(--color-background-secondary-1);
    padding: 3rem;
    border-radius: var(--border-radius);
    color: var(--color-text-primary-1);
    min-height: 300px;
    width: 100%;
`;
const PostTitle = styled.h3`
    font-size: var(--font-size-5xl);
    transition: var(--transition);
    margin: 0;
    color: var(--color-text-primary-1);
    &:hover {
        color: var(--color-primary);
    }
`;
const PostSubtitle = styled.p`
    margin-bottom: 0.5rem;
    font-style: italic;
    font-weight: 300;
    font-size: var(--font-size-xl);
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

    &:hover {
        svg {
            transform: translateX(5px);
        }
    }
`;

const Posts = ({ posts }) => {
    return (
        <PostsContainer>
            {[...posts, ...posts].map(post => {
                const { excerpt, fields, frontmatter } = post.node;
                const { title, subtitle, date, tags } = frontmatter;
                const { slug } = fields;
                return (
                    <PostContainer key={uuidv4()}>
                        <Link to={slug}>
                            <PostTitle>{title}</PostTitle>
                        </Link>
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
    );
};

Posts.propTypes = {
    posts: PropTypes.array.isRequired,
};

export default Posts;
