import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Icon, OutboundLink } from '@components';
import { navLinks, socialMedia } from '@config';
import { mixins, media } from '@styles';

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

    .fadeleft-enter {
        transition: opacity 700ms var(--ease), transform 700ms var(--ease);
    }

    .fadeleft-enter-active {
        transition: opacity 700ms var(--ease), transform 700ms var(--ease);
    }
`;
const SidebarContainer = styled.aside`
    background-color: var(--color-menu-background);
    padding: 5rem;
    width: 50vw;
    height: 100%;
    position: relative;
    right: 0;
    margin-left: auto;
    box-shadow: -1rem 0 3rem -1.5rem var(--header-shadow);

    ${media.bp600`
        width: 75vw;
        padding: 2.5rem;
    `};
    ${media.bp440`width: 80vw;`};
`;
const ContentContainer = styled.div`
    ${mixins.flexColumnCenter};
    padding-top: 8rem;
    justify-content: space-between;
    height: 100%;
`;
const NavContainer = styled.nav`
    ${mixins.flexBetween};
    width: 100%;
    flex-direction: column;
    text-align: center;
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
    ${media.bp440`
      margin: 0 auto 2.4rem;
    `};
    ${media.bp384`
      margin: 0 auto 1.8rem;
    `};
`;
const StyledLink = styled(Link)`
    padding: 1.6rem;
    font-weight: 500;
    font-size: var(--font-size-xxl);
    color: var(--color-white-1);
    width: 100%;

    &:hover {
        color: var(--color-soft-pink);
    }
`;
const SocialsContainer = styled.ul`
    ${mixins.flexCenter};
    list-style: none;
    bottom: 2rem;
`;
const SocialsLink = styled(OutboundLink)`
    padding: 2rem;
    transition: var(--transition);

    svg {
        width: 2.2rem;
        height: 2.2rem;
        color: var(--color-white-1);
    }

    &:hover {
        transform: translateY(-0.3rem);
        svg {
            transition: var(--transition);
            color: var(--color-soft-pink);
        }
    }
`;
const Menu = ({ isMenuOpen, toggleMenu, logo: Logo }) => {
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
                <ContentContainer>
                    <Logo
                        className={`${isMenuOpen ? 'fadeleft-enter-active' : 'fadeleft-enter'}`}
                        style={{
                            color: 'var(--color-white-1)',
                            marginRight: 0,
                        }}
                    />
                    <NavContainer>
                        <NavList>
                            {navLinks &&
                                navLinks.map(({ url, name }, i) => (
                                    <NavListItem
                                        key={`menu-nav-${i}`}
                                        className={`${
                                            isMenuOpen ? 'fadeleft-enter-active' : 'fadeleft-enter'
                                        }`}>
                                        <StyledLink to={url}>{name}</StyledLink>
                                    </NavListItem>
                                ))}
                        </NavList>
                    </NavContainer>
                    <SocialsContainer>
                        {socialMedia &&
                            socialMedia.map(({ url, name }, i) => (
                                <li key={`menu-socials-${i}`}>
                                    <SocialsLink
                                        className={`${
                                            isMenuOpen ? 'fadeleft-enter-active' : 'fadeleft-enter'
                                        }`}
                                        href={url}
                                        aria-label={name}
                                        variant={null}>
                                        <Icon name={name} />
                                    </SocialsLink>
                                </li>
                            ))}
                    </SocialsContainer>
                </ContentContainer>
            </SidebarContainer>
        </MenuContainer>
    );
};

Menu.propTypes = {
    isMenuOpen: PropTypes.bool.isRequired,
    toggleMenu: PropTypes.func.isRequired,
    logo: PropTypes.object.isRequired,
};

export default Menu;
