import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import { media } from '@styles';

const SideBarContainer = styled.aside`
    position: sticky;
    top: 120px;
    max-height: calc(100vh - 120px);
    overflow: visible;
    display: block;

    ${media.bp1040` 
        display: none;
    `}
`;
const ContentsContainer = styled.nav`
    display: block;

    h2 {
        font-size: var(--font-size-md);
        text-transform: uppercase;
        letter-spacing: 0.1em;
        line-height: 1.4;
        margin-bottom: 0.8rem;
    }
`;
const commonContentsLinkStyles = css`
    display: block;
    color: var(--color-text-primary-3);
    font-size: var(--font-size-sm);
    font-weight: 500;
    transition: var(--transition);
    line-height: 1.5;

    &:hover {
        color: var(--color-text-primary-1);
    }
`;
const ContentsLinkH2 = styled(Link)`
    ${commonContentsLinkStyles}
    margin-top: 0.8rem;
`;
const commonContentsContainerStyles = css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    margin-top: 0.4rem;
    border-left: 1px solid var(--color-contents-border);

    & > *:first-child {
        margin: 0;
    }
`;
const H3LinksContainer = styled.div`
    ${commonContentsContainerStyles}
`;
const ContentsLinkH3 = styled(Link)`
    ${commonContentsLinkStyles}
    margin-top: 0.4rem;
    padding: 1px 0 1px 1.2rem;
`;
const H4LinksContainer = styled.div`
    ${commonContentsContainerStyles}
    margin-left: 1.2rem;
`;

const TableOfContents = ({ tableOfContents, contentsDepth: propsContentsDepth, slug }) => {
    const contentsDepth = propsContentsDepth || 2;
    return (
        <SideBarContainer>
            <ContentsContainer>
                <h2>Table of Contents</h2>
                {tableOfContents &&
                    [{ url: '', title: 'Introduction' }, ...tableOfContents.items].map(el => {
                        const { url, title, items } = el;
                        return (
                            <React.Fragment key={uuidv4()}>
                                <ContentsLinkH2 to={`${slug}${url}`}>{title}</ContentsLinkH2>
                                {items && contentsDepth > 1 && (
                                    <H3LinksContainer>
                                        {items.map(el => {
                                            const { url, title, items } = el;
                                            return (
                                                <React.Fragment key={uuidv4()}>
                                                    <ContentsLinkH3 to={`${slug}${url}`}>
                                                        {title}
                                                    </ContentsLinkH3>
                                                    {items && contentsDepth > 2 && (
                                                        <H4LinksContainer>
                                                            {items.map(el => {
                                                                const { url, title } = el;
                                                                return (
                                                                    <React.Fragment key={uuidv4()}>
                                                                        <ContentsLinkH3
                                                                            to={`${slug}${url}`}>
                                                                            {title}
                                                                        </ContentsLinkH3>
                                                                    </React.Fragment>
                                                                );
                                                            })}
                                                        </H4LinksContainer>
                                                    )}
                                                </React.Fragment>
                                            );
                                        })}
                                    </H3LinksContainer>
                                )}
                            </React.Fragment>
                        );
                    })}
            </ContentsContainer>
        </SideBarContainer>
    );
};

TableOfContents.propTypes = {
    slug: PropTypes.string.isRequired,
    tableOfContents: PropTypes.object,
    contentsDepth: PropTypes.number,
};
TableOfContents.defaultProps = {
    tableOfContents: undefined,
    contentsDepth: undefined,
};

export default TableOfContents;
