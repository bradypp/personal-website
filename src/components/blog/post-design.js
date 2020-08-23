import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

import { Icon, CustomList } from '@components';
import { media } from '@styles';

export const PostStyles = css`
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        margin: 1.6em 0 0.65em;
    }

    h2 {
        font-weight: 400;
    }

    h2,
    h3,
    h4 {
        &:hover {
            a {
                opacity: 1;
            }
        }
    }

    p,
    ul,
    ol {
        font-size: var(--font-size-lg);
        line-height: 1.55em;
    }

    p {
        margin: 1.1em 0;
    }

    ol,
    ul {
        display: block;
        margin-block-start: 1em;
        margin-block-end: 1em;
        margin-inline-start: 0;
        margin-inline-end: 0;
        padding-inline-start: 4rem;

        li {
            padding-left: 0.3em;
            padding-bottom: 0.3em;
        }
    }

    ul {
        list-style-type: disc;
    }

    ol {
        list-style-type: decimal;
    }

    blockquote {
        border-left-color: var(--color-primary);
        border-left-style: solid;
        border-left-width: 2px;
        margin-left: 0;
        margin-right: 0;
        padding-left: 2.4rem;
        font-style: italic;
        font-size: var(--font-size-xl);
    }
`;

const AnchorLink = styled.a`
    position: absolute;
    transform: translateX(-100%);
    opacity: 0;
    padding-right: 8px;
    svg {
        width: 22px;
        height: 22px;
        margin-bottom: 2px;
    }

    ${media.bp600`
        display: none;
    `}
`;
const Anchor = styled.div`
    position: absolute;
    margin-top: -100px;
`;

const generateHeading = Heading => ({ children, ...props }) => {
    const [id, setId] = useState();
    const ref = useRef();

    useEffect(() => {
        if (!id && ref.current) {
            setId(ref.current.id);
            ref.current.removeAttribute('id');
        }
    }, [id]);

    return (
        <Heading ref={ref} style={{ position: 'relative' }} {...props}>
            <Anchor id={id} />
            <AnchorLink href={`#${id}`} aria-label={`${children[1].toLowerCase()} anchor link`}>
                <Icon name="anchor" />
            </AnchorLink>
            {children}
        </Heading>
    );
};

export const h2 = generateHeading('h2');
export const h3 = generateHeading('h3');
export const h4 = generateHeading('h4');

export const StyledCustomList = props => {
    const { items, fontSize } = props;
    return <CustomList isPost fontSize={fontSize || 'lg'} items={items} rowGap="1em" />;
};
