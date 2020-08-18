import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import { Icon } from '@components';
import { media } from '@styles';

const ListContainer = styled.ul`
    display: grid;
    grid-template-columns: repeat(${props => props.columns || 1}, 1fr);
    grid-column-gap: 1.6rem;
    grid-row-gap: ${props => props.rowGap};
    margin: 0;
    padding: 0;
    overflow: visible;
    list-style: none;
    font-size: ${props => `var(--font-size-${props.fontSize})`};

    ${media.bp800`
        ${props =>
            props.columns > 3 &&
            css`
                grid-template-columns: repeat(3, 1fr);
            `}
    `}
    ${media.bp440`
        ${props =>
            props.columns > 2 &&
            css`
                grid-template-columns: repeat(2, 1fr);
            `}
    `}

    li {
        display: flex;
        align-items: baseline;

        svg {
            color: var(--color-secondary);
            width: 1.05em;
            height: 1.05em;
        }
    }
`;

const IconWrapper = styled.span`
    margin: 0 1.6rem 0 0;
    transform: translateY(-1px);
`;

const CustomList = ({ className, items, icon, columns, rowGap, fontSize }) => {
    return (
        <ListContainer className={className} columns={columns} rowGap={rowGap} fontSize={fontSize}>
            {items &&
                items.map(item => (
                    <li key={uuidv4()}>
                        <IconWrapper>
                            <Icon name={icon} />
                        </IconWrapper>
                        {typeof item === 'string' ? <span>{item}</span> : item}
                    </li>
                ))}
        </ListContainer>
    );
};

CustomList.propTypes = {
    items: PropTypes.array.isRequired,
    icon: PropTypes.string,
    className: PropTypes.string,
    columns: PropTypes.number,
    rowGap: PropTypes.string,
    fontSize: PropTypes.string,
};

CustomList.defaultProps = {
    className: undefined,
    columns: 1,
    icon: 'arrow-right',
    rowGap: '1rem',
    fontSize: 'md',
};

export default CustomList;
