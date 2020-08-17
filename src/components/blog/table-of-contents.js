import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

const ContentsContainer = styled.nav`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    position: sticky;
    top: 120px;
    max-height: calc(100vh - 120px);
    overflow: auto;

    h2 {
        font-size: var(--font-size-md);
        text-transform: uppercase;
        letter-spacing: 0.1em;
        width: max-content;
        line-height: 1;
        margin-bottom: 0.8rem;
    }
`;
const commonContentsLinkStyles = css`
    color: var(--color-text-primary-3);
    font-weight: 500;
    transition: var(--transition);
    width: max-content;
    line-height: 1;

    &:hover {
        color: var(--color-text-primary-1);
    }
`;
const ContentsLinkH2 = styled(Link)`
    ${commonContentsLinkStyles}
    font-size: var(--font-size-sm);
    margin-top: 1.6rem;
`;
const H3LinksContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    margin-top: 1rem;
    border-left: 1px solid var(--color-contents-border);

    & > *:first-child {
        margin: 0;
    }
`;
const ContentsLinkH3 = styled(Link)`
    ${commonContentsLinkStyles}
    font-size: var(--font-size-xs);
    padding-left: 1rem;
    margin-top: 1rem;
    padding: 1px 0 1px 0.8rem;
`;

const TableOfContents = ({ tableOfContents, slug }) => {
    return (
        <ContentsContainer>
            <h2>Table of Contents</h2>
            {tableOfContents &&
                [{ url: '', title: 'Introduction' }, ...tableOfContents.items].map(el => {
                    const { url, title, items } = el;
                    return (
                        <React.Fragment key={uuidv4()}>
                            <ContentsLinkH2 to={`${slug}${url}`}>{title}</ContentsLinkH2>
                            {items && (
                                <H3LinksContainer>
                                    {items.map(el => {
                                        const { url, title } = el;
                                        return (
                                            <ContentsLinkH3 key={uuidv4()} to={`${slug}${url}`}>
                                                {title}
                                            </ContentsLinkH3>
                                        );
                                    })}
                                </H3LinksContainer>
                            )}
                        </React.Fragment>
                    );
                })}
        </ContentsContainer>
    );
};

TableOfContents.propTypes = {
    slug: PropTypes.string.isRequired,
    tableOfContents: PropTypes.object,
};
TableOfContents.defaultProps = {
    tableOfContents: undefined,
};

export default TableOfContents;
