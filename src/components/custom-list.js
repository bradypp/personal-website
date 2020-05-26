import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { uniqueId } from 'lodash';

import { mixins } from '@styles';
import { Icon } from '@components';

const ListContainer = styled.ul`
    ${mixins.customList(3)}
`;

const CustomList = ({ items, icon, ...props }) => {
    return (
        <ListContainer {...props}>
            {items &&
                items.map(item => (
                    <li key={uniqueId('list-item-')}>
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
    icon: 'ArrowRight',
};

export default CustomList;
