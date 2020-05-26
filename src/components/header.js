import React, { Component } from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { js, constants } from '@utils';
import { navLinks } from '@config';
import { Menu, ThemeToggle } from '@components';
import { mixins } from '@styles';
import Media from 'react-media';

const navHeight = 100;
const navScrollHeight = 60;
const hamburgerWidth = '3rem';

const HeaderContainer = styled.header`
    ${mixins.flexBetween};
    position: fixed;
    top: 0;
    background-color: var(--color-background-1);
    transition: transform var(--transition-time) var(--ease),
        box-shadow var(--transition-time) var(--ease), height var(--transition-time) var(--ease);
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
`;
const NavContainer = styled.nav`
    ${mixins.flexCenterRight}
    position: relative;
    width: 100%;
    color: var(--color-text-primary-2);
    font-family: var(--fonts-mono);
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
`;
const HamburgerBox = styled.div`
    position: relative;
    display: inline-block;
    width: ${hamburgerWidth};
    height: 2.4rem;
`;
const HamburgerContent = styled.div`
    background-color: var(--color-primary);
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
            ${props => (props.isMenuOpen ? `0.215, 0.61, 0.355, 1` : `0.55, 0.055, 0.675, 0.19`)}
        );

    &:before,
    &:after {
        content: '';
        display: block;
        background-color: var(--color-primary);
        position: absolute;
        left: auto;
        right: 0;
        width: ${hamburgerWidth};
        height: 2px;
        transition-timing-function: ease;
        transition-duration: 0.15s;
        transition-property: transform;
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
    ${mixins.flexBetween};
    padding: 0;
    margin: 0;
    list-style: none;
`;
const ListItem = styled.li`
    margin-right: 2rem;
    position: relative;
    font-size: var(--font-size-md);
    font-family: var(--fonts-primary);
`;
const StyledLink = styled(Link)`
    padding: 1.2rem 1rem;
    font-weight: 500;
    color: var(--color-text-primary-1);

    &:hover {
        transition: var(--transition);
        color: var(--color-primary);
    }
`;

class Header extends Component {
    state = {
        // eslint-disable-next-line react/destructuring-assignment
        isMounted: !this.props.isHome,
        isMenuOpen: false,
        scrollDirection: 'none',
        lastDistanceFromTop: 0,
    };

    componentDidMount() {
        setTimeout(() => {
            this.setState(
                {
                    isMounted: true,
                    scrollDirection: window && window.pageYOffset > 0 ? 'down' : 'none',
                },
                () => {
                    window.addEventListener('scroll', () => js.throttle(this.handleScroll()));
                    window.addEventListener('resize', () => js.throttle(this.handleResize()));
                    window.addEventListener('keydown', e => this.handleKeydown(e));
                },
            );
        }, 100);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', () => this.handleScroll());
        window.removeEventListener('resize', () => this.handleResize());
        window.removeEventListener('keydown', e => this.handleKeydown(e));
    }

    toggleMenu = () => {
        const { isMenuOpen } = this.state;
        this.setState({ isMenuOpen: !isMenuOpen });
    };

    handleScroll = () => {
        const { isMounted, isMenuOpen, scrollDirection, lastDistanceFromTop } = this.state;
        const distanceFromTopRequired = 5;
        const distanceFromTop = window.scrollY;
        if (
            !isMounted ||
            Math.abs(lastDistanceFromTop - distanceFromTop) <= distanceFromTopRequired ||
            isMenuOpen
        ) {
            return;
        }

        if (distanceFromTop < distanceFromTopRequired) {
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
        if (isMenuOpen && e.keyCode === constants.KEY_CODES.ESCAPE) {
            this.toggleMenu();
        }
    };

    render() {
        const { isMounted, isMenuOpen, scrollDirection } = this.state;
        const { isHome } = this.props;
        const timeout = isHome ? 3000 : 0;
        const fadeClass = isHome ? 'fade' : '';
        const fadeDownClass = isHome ? 'fadedown' : '';

        const desktopLinks = [
            ...navLinks.map(({ url, name }, i) => (
                <CSSTransition
                    key={`header-link-${i}`}
                    classNames={fadeDownClass}
                    timeout={timeout}>
                    <ListItem style={{ transitionDelay: `${i * 100}ms` }}>
                        <StyledLink
                            onClick={() =>
                                setTimeout(() => {
                                    const { scrollDirection } = this.state;
                                    if (scrollDirection !== 'none')
                                        this.setState({
                                            scrollDirection: 'down',
                                        });
                                }, 100)
                            }
                            to={url}>
                            {name}
                        </StyledLink>
                    </ListItem>
                </CSSTransition>
            )),
            <CSSTransition
                key="header-toggle"
                classNames={fadeDownClass}
                timeout={timeout}
                onEntered={() => {
                    document.getElementById('toggle-animation-container').style.transitionDelay =
                        '0s';
                }}>
                <div
                    id="toggle-animation-container"
                    style={{ transitionDelay: `${navLinks.length * 100}ms` }}>
                    <ThemeToggle />
                </div>
            </CSSTransition>,
        ];

        return (
            <HeaderContainer scrollDirection={scrollDirection}>
                <Media
                    query="(min-width: 801px)"
                    render={() => (
                        <NavContainer>
                            <LinksList>
                                <TransitionGroup component={null}>
                                    {isMounted && desktopLinks.length > 0 && desktopLinks}
                                </TransitionGroup>
                            </LinksList>
                        </NavContainer>
                    )}
                />
                <Media
                    query="(max-width: 800px)"
                    render={() => (
                        <>
                            <TransitionGroup component={null}>
                                {isMounted && (
                                    <CSSTransition classNames={fadeClass} timeout={timeout}>
                                        <ThemeToggle />
                                    </CSSTransition>
                                )}
                            </TransitionGroup>
                            <TransitionGroup component={null}>
                                {isMounted && (
                                    <CSSTransition classNames={fadeClass} timeout={timeout}>
                                        <Hamburger onClick={this.toggleMenu}>
                                            <HamburgerBox>
                                                <HamburgerContent isMenuOpen={isMenuOpen} />
                                            </HamburgerBox>
                                        </Hamburger>
                                    </CSSTransition>
                                )}
                            </TransitionGroup>
                            <Menu isMenuOpen={isMenuOpen} toggleMenu={this.toggleMenu} />
                        </>
                    )}
                />
            </HeaderContainer>
        );
    }
}

Header.propTypes = {
    isHome: PropTypes.bool.isRequired,
};

export default Header;
