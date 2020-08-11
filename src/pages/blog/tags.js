import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import kebabCase from 'lodash/kebabCase';
import { v4 as uuidv4 } from 'uuid';
import { graphql, Link } from 'gatsby';

import { Layout, Icon, CustomLink } from '@components';

const Heading = styled.h1`
    margin-bottom: 4rem;
    font-size: var(--font-size-post-title);
    width: 100%;
`;
const TagsList = styled.ul`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 3rem;
    grid-row-gap: 3rem;
    margin: 0;
    padding: 0;
    overflow: visible;
    list-style: none;

    li {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        min-width: 1.6rem;
        min-height: 1.6rem;

        svg {
            color: var(--color-secondary);
            min-width: 1.8rem;
            min-height: 1.8rem;
            width: 1.8rem;
            height: 1.8rem;
            margin: 0 1.6rem 0 0;
        }

        a {
            height: min-content;
            line-height: 1;
            font-size: var(--font-size-lg);
            color: var(--color-text-primary-1);
            transition: var(--transition);

            span {
                font-size: var(--font-size-sm);
                font-family: var(--fonts-mono);
                transition: var(--transition);
                color: var(--color-text-primary-2);
            }

            &:hover {
                color: var(--color-primary);
                span {
                    color: var(--color-primary);
                }
            }
        }
    }
`;

const TagsPage = ({
    data: {
        allMdx: { group: tags },
    },
}) => {
    return (
        <Layout
            meta={{
                title: 'Tags | Paul Brady',
                description: 'Have a look thorough all the tags used on posts',
                relativeUrl: '/blog/tags/',
            }}>
            <Heading>Tags</Heading>
            <TagsList>
                {tags.map(tag => (
                    <li key={uuidv4()}>
                        <Icon name="arrow-right" />
                        <Link to={`/blog/tags/${kebabCase(tag.fieldValue)}/`}>
                            {tag.fieldValue} <span>({tag.totalCount})</span>
                        </Link>
                    </li>
                ))}
            </TagsList>
        </Layout>
    );
};

TagsPage.propTypes = {
    data: PropTypes.array.isRequired,
};

export default TagsPage;

export const pageQuery = graphql`
    {
        allMdx(
            filter: {
                fileAbsolutePath: { regex: "/posts/" }
                frontmatter: { draft: { ne: false } }
            }
        ) {
            group(field: frontmatter___tags) {
                fieldValue
                totalCount
            }
        }
    }
`;
