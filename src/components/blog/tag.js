import styled from 'styled-components';

import CustomLink from '@components/custom-link';

const Tag = styled(CustomLink)`
    font-family: var(--fonts-mono);
    font-weight: 400;
    &:after {
        display: none;
    }
`;

export default Tag;
