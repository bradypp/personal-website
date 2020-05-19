import styled from 'styled-components';

const FancyList = styled.ul`
    li {
        position: relative;
        padding-left: 3rem;
        margin-bottom: 1rem;
        font-size: var(--font-size-lg);
        &:before {
            content: '▹';
            position: absolute;
            left: 0;
            color: var(--color-primary);
        }
    }
`;

export default FancyList;
