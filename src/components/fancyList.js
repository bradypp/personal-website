import styled from 'styled-components';

import { mixins } from '@styles';

const FancyList = styled.ul`
    li {
        ${mixins.fancyList}
    }
`;

export default FancyList;
