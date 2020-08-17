import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'gatsby';

import { Icon } from '@components';

export const PostStyles = css`
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        margin: 1.5em 0 0.5em;
    }

    p,
    ul,
    ol {
        font-size: var(--font-size-lg);
    }

    p {
        margin: 1em 0;
        line-height: 1.5;
    }

    ol,
    ul {
        display: block;
        list-style-type: decimal;
        margin-block-start: 1em;
        margin-block-end: 1em;
        margin-inline-start: 0;
        margin-inline-end: 0;
        padding-inline-start: 4rem;

        li {
            padding-left: 0.3em;
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

        p {
            font-style: italic;
            font-size: var(--font-size-xl);
        }
    }

    h2,
    h3 {
        &:hover {
            a {
                opacity: 1;
            }
        }
    }
`;

const AnchorLink = styled(Link)`
    position: absolute;
    transform: translateX(-115%);
    opacity: 0;
    svg {
        width: 20px;
        height: 20px;
    }
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
            <AnchorLink to={`#${id}`} aria-label={`${children[1].toLowerCase()} anchor link`}>
                <Icon name="anchor" />
            </AnchorLink>
            {children}
        </Heading>
    );
};

export const h2 = generateHeading('h2');
export const h3 = generateHeading('h3');
