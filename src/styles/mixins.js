import { css } from 'styled-components';
import Color from 'color';

const mixins = {
    darken: (colorValue, amount = '0.05') => Color(colorValue).darken(amount).string(),
    lighten: (colorValue, amount = '0.05') => Color(colorValue).lighten(amount).string(),
    rgba: (colorValue, opacity = '0.05') => Color(colorValue).alpha(opacity).string(),
    customScrollbar: (config = {}) => css`
        &::-webkit-scrollbar {
            width: ${config.width || 8}px;
        }
        &::-webkit-scrollbar-track {
            background: none;
        }
        &::-webkit-scrollbar-thumb {
            border-radius: 10rem;
            background-color: ${config.color || '#eee'};
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
        max-width: 1100px;
        margin: 0 auto;
        width: 100%;
    `,
    flexCenter: css`
        display: flex;
        justify-content: center;
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
    link: css`
        display: inline-block;
        text-decoration: none;
        text-decoration-skip-ink: auto;
        color: inherit;
        position: relative;
        transition: var(--color-transition);
        cursor: pointer;
        &:hover,
        &:active,
        &:focus {
            color: var(--color-text-link);
            outline: 0;
        }
    `,
    inlineLink: css`
        display: inline-block;
        text-decoration: none;
        text-decoration-skip-ink: auto;
        position: relative;
        transition: var(--color-transition);
        cursor: pointer;
        color: var(--color-text-link);
        &:hover,
        &:focus,
        &:active {
            color: var(--color-text-link);
            outline: 0;
            &:after {
                width: 100%;
            }
            & > * {
                color: var(--color-text-link) !important;
                transition: var(--color-transition);
            }
        }
        &:after {
            content: '';
            display: block;
            width: 0;
            height: 1px;
            position: relative;
            bottom: 0.37em;
            background-color: var(--color-text-link);
            transition: var(--color-transition);
            opacity: 0.5;
        }
    `,
};

export default mixins;
