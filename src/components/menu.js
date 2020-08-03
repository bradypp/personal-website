import React, { useEffect } from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { motion, useAnimation } from 'framer-motion';

import { Icon, CustomLink } from '@components';
import { navLinks, socialMedia, email } from '@config';
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
    visibility: ${props => (props.isMenuOpen ? 'visible' : 'hidden')};
    opacity: ${props => (props.isMenuOpen ? 1 : 0)};
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
    padding-top: 2rem;
    justify-content: space-between;
    height: 100%;
`;
const NavContainer = styled.nav`
    ${mixins.flexBetween};
    height: 100%;
    flex-direction: column;
    text-align: center;
    justify-content: center;
`;
const NavList = styled.ul`
    padding: 0;
    margin: 0;
    list-style: none;
    width: 100%;
`;
const NavListItem = styled(motion.li)`
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
    font-size: var(--font-size-3xl);
    color: var(--color-white-1);
    width: 100%;

    &:hover {
        color: var(--color-soft-pink);
    }
`;
const SocialsContainer = styled(motion.ul)`
    ${mixins.flexCenter};
    list-style: none;
    bottom: 2rem;
`;
const SocialsLink = styled(CustomLink)`
    padding: 2rem;

    svg {
        width: 20px;
        height: 20px;
        color: var(--color-white-1);
    }

    &:hover {
        svg {
            transition: var(--transition);
            color: var(--color-soft-pink);
        }
    }

    ${media.bp384`
        padding: 1.6rem;
        svg{
            width: 20px;
            height: 20px;
        }
    `}
`;
const Menu = ({ isMenuOpen, toggleMenu }) => {
    const navControls = useAnimation();
    const socialsControls = useAnimation();
    const handleMenuClick = e => {
        const { target } = e;
        const isLink = target.hasAttribute('href');
        const isNotMenu = target.classList && target.classList[0].includes('MenuContainer');

        if (isLink || isNotMenu) {
            toggleMenu();
        }
    };

    const socials = [{ url: `mailto:${email}`, name: 'email' }, ...socialMedia];

    const variants = {
        navHidden: {
            opacity: 0,
            y: 50,
            transition: { duration: 0.6 },
        },
        navVisible: i => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.1, duration: 0.4 },
        }),
        socialsHidden: {
            opacity: 0,
            transition: { duration: 0.6 },
        },
        socialsVisible: {
            opacity: 1,
            transition: { delay: socials.length * 0.1 + 0.2, duration: 0.6 },
        },
    };

    useEffect(() => {
        if (isMenuOpen) {
            navControls.start('navVisible');
            socialsControls.start('socialsVisible');
        } else {
            navControls.start('navHidden');
            socialsControls.start('socialsHidden');
        }
    }, [navControls, socialsControls, isMenuOpen]);

    return (
        <MenuContainer
            isMenuOpen={isMenuOpen}
            onClick={handleMenuClick}
            aria-hidden={!isMenuOpen}
            tabIndex={isMenuOpen ? 1 : -1}>
            <SidebarContainer>
                <ContentContainer>
                    <NavContainer>
                        <NavList>
                            {/*  TODO: Remove home */}
                            {navLinks.map(({ url, name }, i) => (
                                <NavListItem
                                    key={uuidv4()}
                                    custom={i}
                                    initial="navHidden"
                                    variants={variants}
                                    animate={navControls}>
                                    <StyledLink to={url}>{name}</StyledLink>
                                </NavListItem>
                            ))}
                        </NavList>
                    </NavContainer>
                    <SocialsContainer
                        initial="socialsHidden"
                        variants={variants}
                        animate={socialsControls}>
                        {socials.map(({ url, name }) => (
                            <li key={uuidv4()}>
                                <SocialsLink href={url} aria-label={name} variant={null}>
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
};

export default Menu;
