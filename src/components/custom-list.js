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
    grid-row-gap: 1.8rem;
    margin: 0;
    padding: 0;
    overflow: visible;
    list-style: none;

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
        align-items: flex-start;
        min-width: 1.6rem;
        min-height: 1.6rem;

        svg {
            color: var(--color-secondary);
            min-width: 1.6rem;
            min-height: 1.6rem;
            width: 1.6rem;
            height: 1.6rem;
            margin: 0 1.6rem 0 0;
        }

        span {
            height: min-content;
            line-height: 1;
            font-size: var(--font-size-xs);
        }
    }
`;

const CustomList = ({ items, icon, ...props }) => {
    return (
        <ListContainer {...props}>
            {items &&
                items.map(item => (
                    <li key={uuidv4()}>
                        <Icon name={icon} />
                        <span>{item}</span>
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
};

CustomList.defaultProps = {
    className: undefined,
    columns: 1,
    icon: 'arrow-right',
};

export default CustomList;
