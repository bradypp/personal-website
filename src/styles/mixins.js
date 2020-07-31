import { css } from 'styled-components';
import Color from 'color';

import media from './media';

const mixins = {
    darken: (colorValue, amount = '0.05') => Color(colorValue).darken(amount).string(),
    lighten: (colorValue, amount = '0.05') => Color(colorValue).lighten(amount).string(),
    rgba: (colorValue, opacity = '0.05') => Color(colorValue).alpha(opacity).string(),
    customScrollbar: (config = {}) => css`
        &::-webkit-scrollbar {
            width: ${config.width || '8px'};
        }
        &::-webkit-scrollbar-track {
            background: var(--color-background-secondary-1);
        }
        &::-webkit-scrollbar-thumb {
            border-radius: 10rem;
            background-color: ${config.color || '#eee'};

            &:active {
                background-color: ${config.activeColor || config.color || '#eee'};
            }
        }
    `,
    backgroundImage: imageURL => css`
        background-image: url("${imageURL}");
        background-position: 50% 50%;
        background-repeat: no-repeat;
        background-size: cover;
        background: #fff;
    `,
    placeholderColor: colorValue => css`
        ::-webkit-input-placeholder {
            color: ${colorValue} !important;
            opacity: 0.8 !important;
        }
        :-moz-placeholder {
            color: ${colorValue} !important;
            opacity: 0.8 !important;
        }
        ::-moz-placeholder {
            color: ${colorValue} !important;
            opacity: 0.8 !important;
        }
        :-ms-input-placeholder {
            color: ${colorValue} !important;
            opacity: 0.8 !important;
        }
    `,
    translate: (left = 0, top = 0) => css`
        transform: translate(${left}px, ${top}px);
    `,
    gridLayout: (columnNumber, gridGap, columnWidth) => css`
        display: grid;
        grid-template-columns: repeat(
            ${columnNumber || '16'},
            ${columnWidth || 'minmax(min-content, 1fr)'}
        );
        grid-gap: ${gridGap || '1.6rem'};
    `,
    containAndCenter: css`
        max-width: var(--max-width);
        margin: 0 auto;
        width: 100%;
    `,
    flexCenter: css`
        display: flex;
        justify-content: center;
        align-items: center;
    `,
    flexCenterRight: css`
        display: flex;
        justify-content: flex-end;
        align-items: center;
    `,
    flexCenterLeft: css`
        display: flex;
        justify-content: flex-start;
        align-items: center;
    `,
    flexBetween: css`
        display: flex;
        justify-content: space-between;
        align-items: center;
    `,
    flexColumnCenter: css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    `,
    inlineFlexCenter: css`
        display: inline-flex;
        justify-content: center;
        align-items: center;
    `,
    clearfix: css`
        &:after {
            content: '';
            display: table;
            clear: both;
        }
    `,
    engulf: css`
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;
    `,
    overflowEllipsis: css`
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding-right: 1px;
    `,
    scrollableY: css`
        overflow-x: hidden;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
    `,
    clickable: css`
        cursor: pointer;
        user-select: none;
    `,
    hardwareAccelerate: css`
        transform: translateZ(0);
    `,
    inlineLink: css`
        &:after {
            content: '';
            display: block;
            width: 0;
            height: 1px;
            position: absolute;
            bottom: 2px;
            right: 50%;
            background-color: var(--color-text-link);
            transition: var(--transition);
            opacity: 0;
        }

        &:hover {
            color: var(--color-text-link);
            outline: 0;

            &:after {
                opacity: 1;
                right: 0;
                width: 100%;
                height: 1px;
            }

            & > * {
                color: var(--color-text-link) !important;
                transition: var(--transition);
            }
        }
    `,
    styledLink: css`
        padding: 1rem;
        transition: var(--transition);
        color: var(--color-socials);

        &:hover {
            color: var(--color-socials-hover);
            transition: var(--transition);
        }
    `,
    homeSection: css`
        width: 100%;
        height: fit-content;
        padding-top: 100px;
        padding-bottom: 100px;

        h3 {
            &:after {
                width: 30%;
                ${media.bp800`width: 100%;`};
            }
        }

        ${media.bp1040`
            padding-top: 80px;
            padding-bottom: 80px;
        `}
        ${media.bp800`
            padding-top: 60px;
            padding-bottom: 60px;
        `}
        ${media.bp440`
            padding-top: 40px;
            padding-bottom: 40px;
        `}
    `,
    formField: css`
        border-radius: var(--border-radius);
        color: var(--color-text-primary-1);
        background-color: var(--color-field-background);
        border: 1.5px solid var(--color-field-border);

        &:hover {
            background-color: var(--color-field-background-hover);
            border: 1.5px solid var(--color-field-border-hover);
        }

        &:focus,
        &:active {
            background-color: var(--color-field-background-active);
        }

        ${props =>
            props.invalid &&
            css`
                &,
                &:invalid,
                &:focus {
                    border: 1.5px solid var(--color-danger) !important;
                }
            `};
    `,
    hideElement: css`
        position: absolute;
        pointer-events: none;
        visibility: hidden;
        opacity: 0;
    `,
};

export default mixins;
