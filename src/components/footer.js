import React from 'react';
import styled, { css } from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'gatsby';

import { mixins, media } from '@styles';
import { socialMedia, navLinks, otherLinks, email } from '@config';
import { Icon, CustomLink } from '@components';

const FooterContainer = styled.footer`
    display: flex;
    align-items: flex-end;
    height: var(--footer-height);
    padding: 0 var(--side-padding) 3.5rem;
    width: 100%;
    font-size: var(--font-size-xs);

    ${media.bp600`
        align-items:flex-end;
        padding-bottom: 4rem;
    `}
`;
const FooterContentContainer = styled.div`
    ${mixins.containAndCenter};
    display: flex;
    justify-content: space-between;
    width: 100%;

    ${media.bp600`
        flex-direction:column-reverse;
        justify-content: flex-end;
        align-items:center;
    `}
`;
const FooterLeftContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;

    span {
        color: var(--color-text-primary-2);
    }

    ${media.bp600`
        align-items:center;
    `}
`;
const FooterRightContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;

    ${media.bp600`
        align-items:center;
        margin-bottom: 3rem;
        font-size: var(--font-size-sm);
    `}
`;
const SocialMediaContainer = styled.ul`
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    margin-left: -1rem;
    margin-bottom: 0.8rem;

    & > li:not(:last-child) {
        margin-right: 0.8rem;
    }

    a {
        padding: 1rem;
        color: var(--color-socials);
        &:hover {
            color: var(--color-socials-hover);
        }
    }

    svg {
        width: 20px;
        height: 20px;
    }

    ${media.bp440`
        & > li:not(:last-child) {
            margin-right: 1.2rem;
        }
        a {
            padding: 1.2rem;
        }
        svg {
            width: 22px;
            height: 22px;
        }
    `}

    ${media.bp600`
        margin-bottom: 3rem;
    `}
`;
const LinksContainer = styled.ul`
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;

    & > *:not(:first-child) {
        margin-left: 2.4rem;
    }

    li,
    button {
        margin-top: 1.2rem;
    }
`;
const sharedLinkStyles = css`
    color: var(--color-text-primary-2);
    transition: var(--transition);
    font-weight: 400;

    &:hover {
        color: var(--color-primary);
    }
`;
const NavLink = styled(Link)`
    ${sharedLinkStyles}
`;
const ToTopButton = styled.button`
    ${sharedLinkStyles}
    display:inline;
    vertical-align: baseline;
`;

const Footer = () => {
    return (
        <FooterContainer>
            <FooterContentContainer>
                <FooterLeftContainer>
                    <SocialMediaContainer>
                        <li>
                            <CustomLink
                                variant="secondary"
                                href={`mailto:${email}`}
                                aria-label="Email">
                                <Icon name="email" />
                            </CustomLink>
                        </li>
                        {socialMedia &&
                            socialMedia.map(({ url, name }) => (
                                // eslint-disable-next-line react/no-array-index-key
                                <li key={uuidv4()}>
                                    <CustomLink variant="secondary" href={url} aria-label={name}>
                                        <Icon name={name} />
                                    </CustomLink>
                                </li>
                            ))}
                    </SocialMediaContainer>
                    <span>{new Date().getFullYear()} Designed & developed by Paul Brady</span>
                </FooterLeftContainer>
                <FooterRightContainer>
                    <LinksContainer>
                        {otherLinks &&
                            otherLinks.map(({ url, name }) => (
                                // eslint-disable-next-line react/no-array-index-key
                                <li key={uuidv4()}>
                                    <NavLink to={url}>{name}</NavLink>
                                </li>
                            ))}
                        <li key={uuidv4()}>
                            <ToTopButton
                                type="button"
                                onClick={() => {
                                    window.scrollTo(0, 0);
                                }}>
                                To Top
                            </ToTopButton>
                        </li>
                    </LinksContainer>
                    <LinksContainer>
                        {navLinks &&
                            navLinks.map(({ url, name }) => (
                                // eslint-disable-next-line react/no-array-index-key
                                <li key={uuidv4()}>
                                    <NavLink to={url}>{name}</NavLink>
                                </li>
                            ))}
                    </LinksContainer>
                </FooterRightContainer>
            </FooterContentContainer>
        </FooterContainer>
    );
};

export default Footer;
