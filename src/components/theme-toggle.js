import React, { useContext, useState, useRef } from 'react';
import styled, { css } from 'styled-components';

import { Icon } from '@components';
import { ThemeContext } from '@context';
import { mixins, media } from '@styles';
import { useOnOutsideClick } from '@hooks';

const ToggleContainer = styled.div`
    position: relative;
    width: 54px;
    height: 28px;
    margin-top: 6px;
    margin-left: auto;

    ${media.bp800`
        margin-top: 0;
    `}
`;
const StyledInput = styled.input`
    ${mixins.hideElement}
`;
const StyledLabel = styled.label`
    ${mixins.clickable}
    background-color: transparent;
    touch-action: pan-x;
    display: inline-block;
    position: relative;
    border: 0;
    padding: 0;
    user-select: none;
`;
const ToggleTrack = styled.div`
    width: 52px;
    height: 26px;
    padding: 0;
    border-radius: 30px;
    background-color: var(--color-theme-toggle-background);
    transition: var(--transition);
`;

const sharedSectionStyles = css`
    position: absolute;
    width: 18px;
    height: 18px;
    top: 4px;
    margin-top: auto;
    margin-bottom: auto;
    line-height: 0;
    transition: opacity var(--transition-time) var(--ease);
    color: var(--color-white-1);
`;
const ToggleLeft = styled.div`
    ${sharedSectionStyles}
    left: 5px;
    opacity: 0;

    ${props =>
        props.checked &&
        css`
            opacity: 1;
        `}
`;
const ToggleRight = styled.div`
    ${sharedSectionStyles}
    right: 5px;
    opacity: 1;

    ${props =>
        props.checked &&
        css`
            opacity: 0;
        `}
`;
const ToggleButton = styled.div`
    position: absolute;
    top: 1px;
    left: 1px;
    right: 0;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: var(--color-white-1);
    box-sizing: border-box;
    transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
    transform: translateX(0);

    ${props =>
        props.checked &&
        css`
            transform: translateX(26px);
        `}

    &:focus, 
    &.theme-toggle--focus,
    &:active {
        border: 1px solid var(--color-theme-toggle);
    }

    &:focus,
    &.theme-toggle--focus {
        box-shadow: 0 0 2px 3px var(--color-theme-toggle);
    }

    &:active {
        box-shadow: 0 0 5px 5px var(--color-theme-toggle);
    }
`;

const ThemeToggle = () => {
    const { colorMode, setColorMode } = useContext(ThemeContext);
    const [toggleFocus, setToggleFocus] = useState(false);
    const toggleRef = useRef();
    useOnOutsideClick(toggleRef, toggleFocus, () => setToggleFocus(false));
    const isChecked = colorMode === 'dark-mode';

    if (!colorMode) {
        return null;
    }

    return (
        <ToggleContainer>
            <StyledInput
                type="checkbox"
                id="theme-toggle"
                checked={isChecked}
                onChange={ev => {
                    setColorMode(ev.target.checked ? 'dark-mode' : 'light-mode');
                    setToggleFocus(true);
                }}
            />
            <StyledLabel htmlFor="theme-toggle" ref={toggleRef}>
                <ToggleTrack checked={isChecked}>
                    <ToggleLeft checked={isChecked}>
                        <Icon name="moon" />
                    </ToggleLeft>
                    <ToggleRight checked={isChecked}>
                        <Icon name="sun" />
                    </ToggleRight>
                </ToggleTrack>
                <ToggleButton
                    className={toggleFocus ? 'theme-toggle--focus' : ''}
                    checked={isChecked}
                />
            </StyledLabel>
        </ToggleContainer>
    );
};

export default ThemeToggle;
