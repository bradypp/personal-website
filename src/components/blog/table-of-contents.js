import React, { useContext } from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import { PostContext } from '@context';

const ContentsContainer = styled.aside`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    position: sticky;
    top: 148px;
    max-height: calc(100vh - 148px);
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
    color: ${props =>
        props.currentLocation ? 'var(--color-primary)' : 'var(--color-text-primary-2)'};
    font-weight: 500;
    transition: var(--transition);
    width: max-content;
    line-height: 1;

    &:hover {
        color: ${props =>
            props.currentLocation ? 'var(--color-primary)' : 'var(--color-text-primary-1)'};
    }
`;
const ContentsLinkH2 = styled(Link)`
    ${commonContentsLinkStyles}
    font-size: var(--font-size-sm);
    margin-top: 1.6rem;
`;
const ContentsLinkH3 = styled(Link)`
    ${commonContentsLinkStyles}
    font-size: var(--font-size-xs);
    margin-left: 0.8rem;
    margin-top: 1rem;
`;

const TableOfContents = ({ tableOfContents, slug }) => {
    const { postLocation } = useContext(PostContext);
    return (
        <ContentsContainer>
            <h2>Table of Contents</h2>
            {tableOfContents &&
                [{ url: '#', title: 'Introduction' }, ...tableOfContents.items].map(el => {
                    const { url, title, items } = el;
                    return (
                        <React.Fragment key={uuidv4()}>
                            <ContentsLinkH2
                                currentLocation={
                                    `#${postLocation}` === url || postLocation === title
                                }
                                to={`${slug}${url}`}>
                                {title}
                            </ContentsLinkH2>
                            {items &&
                                items.map(el => {
                                    const { url, title } = el;
                                    return (
                                        <ContentsLinkH3
                                            key={uuidv4()}
                                            currentLocation={`#${postLocation}` === url}
                                            to={`${slug}${url}`}>
                                            {title}
                                        </ContentsLinkH3>
                                    );
                                })}
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
