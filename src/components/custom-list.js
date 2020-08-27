import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import { Icon } from '@components';
import { media } from '@styles';

const ListContainer = styled.ul`
    && {
        display: grid;
        grid-template-columns: repeat(${props => props.columns || 1}, 1fr);
        grid-column-gap: 1.6rem;
        grid-row-gap: ${props => props.rowGap};
        margin: ${props => (props.isPost ? '1.1em 0' : 0)};
        padding: ${props => (props.isPost ? '0 0 0 3rem' : 0)};
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
            padding: 0;

            svg {
                color: var(--color-secondary);
                width: 1.05em;
                height: 1.05em;
            }

            p {
                margin-top: 1.1em;
                margin-bottom: 0;
            }

            p:first-of-type {
                margin: 0;
            }
        }
    }
`;

const IconWrapper = styled.span`
    margin: 0 1.5rem 0 0;
    transform: ${props => {
        switch (props.fontSize) {
            case '2xs':
            case 'xs':
            case 'sm':
                return `translateY(-2px)`;
            case 'md':
            case 'lg':
            case 'xl':
            case '2xl':
            case '3xl':
                return `translateY(-1px)`;
            default:
                return `none`;
        }
    }};
`;

const CustomList = ({ className, items, icon, columns, rowGap, fontSize, isPost }) => {
    return (
        <ListContainer
            className={className}
            columns={columns}
            rowGap={rowGap}
            fontSize={fontSize}
            isPost={isPost}>
            {items &&
                items.map(item => (
                    <li key={uuidv4()}>
                        <IconWrapper fontSize={fontSize}>
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
    isPost: PropTypes.bool,
};

CustomList.defaultProps = {
    className: undefined,
    columns: 1,
    icon: 'arrow-right',
    rowGap: '1rem',
    fontSize: 'md',
    isPost: false,
};

export default CustomList;
