import React, { Component } from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import Media from 'react-media';

import { throttle } from '@utils/javascript';
import { KEY_CODES, BREAKPOINTS } from '@utils/constants';
import { navLinks } from '@config';
import { Menu, ThemeToggle, Icon, Logo, ClientOnly } from '@components';
import { mixins, media } from '@styles';

const navHeight = 100;
const navScrollHeight = 70;
const hamburgerWidth = '3rem';

const HeaderContainer = styled(motion.header)`
    ${mixins.flexBetween};
    position: fixed;
    top: 0;

    background-color: ${props => {
        if (props.isHome) {
            return props.scrollDirection === 'none'
                ? 'transparent'
                : 'var(--color-background-secondary-1)';
        }
        return 'var(--color-background-primary-1)';
    }};
    transition: transform 0.3s var(--ease), box-shadow 0.3s var(--ease), height 0.3s var(--ease);
    z-index: var(--z-index-header);
    filter: none !important;
    pointer-events: auto !important;
    user-select: auto !important;
    padding: 0 3.2rem;
    width: 100%;
    height: ${props =>
        props.scrollDirection === 'none' ? `${navHeight}px` : `${navScrollHeight}px`};
    box-shadow: ${props =>
        props.scrollDirection === 'up' ? `0 1rem 3rem -1rem var(--header-shadow)` : 'none'};
    transform: translateY(
        ${props => (props.scrollDirection === 'down' ? `-${navScrollHeight}px` : '0px')}
    );

    ${media.bp600`
        padding: 0 var(--side-padding);
    `}
`;
const NavContainer = styled.nav`
    ${mixins.flexBetween};
    position: relative;
    width: 100%;
`;
const Hamburger = styled.div`
    ${mixins.flexCenter};
    ${mixins.clickable};
    overflow: visible;
    margin: 0 -1.2rem 0 0;
    padding: 1.5rem;
    transition-timing-function: linear;
    transition-duration: 0.15s;
    transition-property: opacity, filter;
    text-transform: none;
    color: inherit;
    border: 0;
    background-color: transparent;
    z-index: calc(var(--z-index-header) + 1);

    ${media.bp800`
        margin-left: 10%;
    `}
`;
const HamburgerBox = styled.div`
    position: relative;
    display: inline-block;
    width: ${hamburgerWidth};
    height: 2.4rem;
`;
const HamburgerContent = styled.div`
    background-color: ${props =>
        props.isMenuOpen ? 'var(--color-white-1)' : 'var(--color-text-primary-1)'};
    position: absolute;
    width: ${hamburgerWidth};
    height: 2px;
    border-radius: var(--border-radius);
    top: 50%;
    left: 0;
    right: 0;
    transform: rotate(${props => (props.isMenuOpen ? `45deg` : `0deg`)});

    transition: transform 0.15s
            cubic-bezier(
                ${props =>
                    props.isMenuOpen ? `0.215, 0.61, 0.355, 1` : `0.55, 0.055, 0.675, 0.19`}
            ),
        background-color 0.22s ease;

    &:before,
    &:after {
        content: '';
        display: block;
        background-color: ${props =>
            props.isMenuOpen ? 'var(--color-white-1)' : 'var(--color-text-primary-1)'};
        position: absolute;
        left: auto;
        right: 0;
        width: ${hamburgerWidth};
        height: 2px;
        transition: transform 0.15s ease;
        border-radius: 0.4rem;
    }
    &:before {
        width: ${props => (props.isMenuOpen ? `100%` : `120%`)};
        top: ${props => (props.isMenuOpen ? `0` : `-1rem`)};
        opacity: ${props => (props.isMenuOpen ? 0 : 1)};
        transition: ${props =>
            props.isMenuOpen ? 'var(--ham-before-active)' : 'var(--ham-before)'};
    }
    &:after {
        width: ${props => (props.isMenuOpen ? `100%` : `80%`)};
        bottom: ${props => (props.isMenuOpen ? `0` : `-1rem`)};
        transform: rotate(${props => (props.isMenuOpen ? `-90deg` : `0`)});
        transition: ${props => (props.isMenuOpen ? 'var(--ham-after-active)' : 'var(--ham-after)')};
    }
`;
const LinksList = styled.ul`
    ${mixins.flexCenter};
    align-items: baseline;
    padding: 0;
    margin: 0;
    list-style: none;

    li {
        margin-right: 2rem;
    }
`;
const StyledLink = styled(Link)`
    font-family: var(--fonts-primary);
    font-size: var(--font-size-2xs);
    padding: 1.2rem 1rem;
    font-weight: 600;
    color: var(--color-text-primary-1);

    &:hover {
        transition: all 0.2s var(--ease);
        color: var(--color-primary);
    }
`;
const StyledLogo = styled(props => <Logo {...props} />)`
    margin-right: 2rem;
`;

class Header extends Component {
    state = {
        // eslint-disable-next-line react/destructuring-assignment
        isMounted: !this.props.isHome,
        isMenuOpen: false,
        scrollDirection: 'none',
        lastDistanceFromTop: 10,
    };

    componentDidMount() {
        setTimeout(() => {
            this.setState(
                {
                    isMounted: true,
                    scrollDirection: window && window.pageYOffset > 0 ? 'down' : 'none',
                },
                () => {
                    window.addEventListener('scroll', throttle(this.handleScroll));
                    window.addEventListener('resize', throttle(this.handleResize));
                    window.addEventListener('keydown', e => this.handleKeydown(e));
                },
            );
        }, 100);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', throttle(this.handleScroll));
        window.removeEventListener('resize', throttle(this.handleResize));
        window.removeEventListener('keydown', e => this.handleKeydown(e));
    }

    toggleMenu = () => {
        const { isMenuOpen } = this.state;
        this.setState({ isMenuOpen: !isMenuOpen });
    };

    handleScroll = () => {
        const { isMounted, isMenuOpen, scrollDirection, lastDistanceFromTop } = this.state;
        const distanceFromTopRequired = 0;
        const distanceFromTop = window.scrollY;

        if (
            !isMounted ||
            Math.abs(lastDistanceFromTop - distanceFromTop) <= distanceFromTopRequired ||
            isMenuOpen
        ) {
            return;
        }

        if (distanceFromTop <= distanceFromTopRequired) {
            this.setState({ scrollDirection: 'none' });
        } else if (distanceFromTop > lastDistanceFromTop && distanceFromTop > navHeight) {
            if (scrollDirection !== 'down') {
                this.setState({ scrollDirection: 'down' });
            }
        } else if (distanceFromTop + window.innerHeight < document.body.scrollHeight) {
            if (scrollDirection !== 'up') {
                this.setState({ scrollDirection: 'up' });
            }
        }

        this.setState({ lastDistanceFromTop: distanceFromTop });
    };

    handleResize = () => {
        const { isMenuOpen } = this.state;
        if (window.innerWidth > 800 && isMenuOpen) {
            this.toggleMenu();
        }
    };

    handleKeydown = e => {
        const { isMenuOpen } = this.state;
        if (isMenuOpen && e.keyCode === KEY_CODES.ESCAPE) {
            this.toggleMenu();
        }
    };

    render() {
        const { isMounted, isMenuOpen, scrollDirection } = this.state;
        const { isHome } = this.props;

        const variants = {
            hidden: {
                opacity: 0,
            },
            visible: {
                opacity: 1,
                transition: {
                    delay: 0.2,
                    duration: 0.8,
                },
            },
        };

        return (
            isMounted && (
                <HeaderContainer
                    scrollDirection={scrollDirection}
                    isHome={isHome}
                    aria-hidden={scrollDirection === 'down'}
                    initial={isHome ? 'hidden' : 'visible'}
                    animate="visible"
                    variants={variants}>
                    <Media
                        query={`(min-width: ${BREAKPOINTS.bp800 + 1}px)`}
                        render={() => (
                            <NavContainer>
                                <LinksList>
                                    <li>
                                        <StyledLogo to="/" aria-label="Home">
                                            <Icon name="logo" />
                                        </StyledLogo>
                                    </li>
                                    {navLinks.map(({ url, name }) => (
                                        <li key={uuidv4()}>
                                            <StyledLink to={url} aria-label={name}>
                                                {name}
                                            </StyledLink>
                                        </li>
                                    ))}
                                </LinksList>
                                <ThemeToggle />
                            </NavContainer>
                        )}
                    />
                    <Media
                        query={`(max-width: ${BREAKPOINTS.bp800}px)`}
                        render={() => (
                            <>
                                <StyledLogo to="/" aria-label="Home">
                                    <Icon name="logo" />
                                </StyledLogo>
                                <ThemeToggle />
                                <Hamburger onClick={this.toggleMenu}>
                                    <HamburgerBox>
                                        <HamburgerContent isMenuOpen={isMenuOpen} />
                                    </HamburgerBox>
                                </Hamburger>
                                <Menu
                                    isMenuOpen={isMenuOpen}
                                    toggleMenu={this.toggleMenu}
                                    aria-label="Menu Toggle"
                                />
                            </>
                        )}
                    />
                </HeaderContainer>
            )
        );
    }
}
Header.propTypes = {
    isHome: PropTypes.bool.isRequired,
};

export default Header;
