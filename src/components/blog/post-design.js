import React, { useEffect, useContext, useCallback, useRef } from 'react';
import { css } from 'styled-components';
import { useInView } from 'react-intersection-observer';

import { PostContext } from '@context';

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
`;

const generateHeading = heading => ({ children, ...props }) => {
    const { setPostLocation } = useContext(PostContext);
    const ref = useRef();

    const [inViewRef, inView] = useInView({
        /* Optional options */
        threshold: 0,
        triggerOnce: false,
    });

    const setRef = useCallback(
        node => {
            // eslint-disable-next-line no-param-reassign
            ref.current = node;
            inViewRef(node);
        },
        [inViewRef, ref],
    );

    useEffect(() => {
        if (inView) {
            setPostLocation(ref.current.id);
        }
    }, [inView, setPostLocation]);

    if (heading === 'H2') {
        return (
            <h2 ref={setRef} {...props}>
                {children}
            </h2>
        );
    }
    if (heading === 'H3') {
        return (
            <h3 ref={setRef} {...props}>
                {children}
            </h3>
        );
    }
};

export const H2 = generateHeading('H2');
export const H3 = generateHeading('H3');
