import styled from 'styled-components';

import { theme } from '@styles';

const FancyList = styled.ul`
    li {
        position: relative;
        padding-left: 3rem;
        margin-bottom: 1rem;
        font-size: ${theme.fontSizes.lg};
        &:before {
            content: '▹';
            position: absolute;
            left: 0;
            color: ${theme.colors.blueLight};
        }
    }
`;

export default FancyList;
