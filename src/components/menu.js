import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { navLinks } from '@config';
import { mixins, media } from '@styles';

// TODO: change background color and text color to dark mode version

const MenuContainer = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100vh;
    z-index: 10;
    outline: 0;
    transition: var(--transition);
    transform: translateX(${props => (props.isMenuOpen ? 0 : 100)}vw);
    visibility: ${props => (props.isMenuOpen ? 'visible' : 'hidden')};
    display: none;
    ${media.bp800`display: block;`};
`;
const SidebarContainer = styled.aside`
    ${mixins.flexCenter};
    flex-direction: column;
    background-color: var(--color-background-2);
    padding: 5rem;
    width: 50vw;
    height: 100%;
    position: relative;
    right: 0;
    margin-left: auto;
    font-family: var(--fonts-mono);
    box-shadow: -1rem 0 3rem -1.5rem var(--header-shadow);
    ${media.bp600`padding: 2.5rem;`};
    ${media.bp440`width: 75vw;`};
    ${media.bp384`padding: 1.5rem;`};
`;
const NavContainer = styled.nav`
    ${mixins.flexBetween};
    width: 100%;
    flex-direction: column;
    text-align: center;
    color: var(--color-text-primary-2);
`;
const NavList = styled.ul`
    padding: 0;
    margin: 0;
    list-style: none;
    width: 100%;
`;
const NavListItem = styled.li`
    margin: 0 auto 3rem;
    position: relative;
    font-size: var(--font-size-lg);
    ${media.bp600`
      margin: 0 auto 1rem;
    `};
`;
const StyledLink = styled(Link)`
    padding: 0.3rem 2rem 2rem;
    font-weight: 600;
    color: var(--color-text-primary-2);
    width: 100%;

    &:hover {
        color: var(--color-primary);
    }
`;
const Menu = ({ isMenuOpen, toggleMenu }) => {
    const handleMenuClick = e => {
        const { target } = e;
        const isLink = target.hasAttribute('href');
        const isNotMenu = target.classList && target.classList[0].includes('MenuContainer');

        if (isLink || isNotMenu) {
            toggleMenu();
        }
    };

    return (
        <MenuContainer
            isMenuOpen={isMenuOpen}
            onClick={handleMenuClick}
            aria-hidden={!isMenuOpen}
            tabIndex={isMenuOpen ? 1 : -1}>
            <SidebarContainer>
                <NavContainer>
                    <NavList>
                        {navLinks &&
                            navLinks.map(({ url, name }, i) => (
                                <NavListItem key={`menu-link-${i}`}>
                                    <StyledLink to={url}>{name}</StyledLink>
                                </NavListItem>
                            ))}
                    </NavList>
                </NavContainer>
            </SidebarContainer>
        </MenuContainer>
    );
};

Menu.propTypes = {
    isMenuOpen: PropTypes.bool.isRequired,
    toggleMenu: PropTypes.func.isRequired,
};

export default Menu;