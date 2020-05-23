import styled from 'styled-components';

import { media } from '@styles';

const Heading = styled.h3`
    position: relative;
    display: flex;
    align-items: center;
    margin: 1rem 0 4rem;
    width: 100%;
    white-space: nowrap;
    font-size: var(--font-size-h3);

    &:after {
        content: '';
        display: block;
        height: 1px;
        background-color: var(--color-background-3);
        position: relative;
        top: -0.5rem;
        margin-left: 2rem;
        /* width: 30rem; 
        ${media.bp2400`width: 20rem`};
        ${media.bp1040`width: 100%;`};
        ${media.bp600`margin-left: 1rem;`}; */
    }
`;

export default Heading;
