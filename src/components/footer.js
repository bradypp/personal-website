import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

import { scrollReveal } from '@utils';
import { mixins, media } from '@styles';
import { scrollRevealConfig, socialMedia, email, repo } from '@config';
import { Icon } from '@components';
import OutboundLink from './outbound-link';

const FooterContainer = styled.footer`
    padding: 3.2rem var(--page-padding) 2.4rem;
    width: 100%;
`;
const FooterContentContainer = styled.footer`
    ${mixins.flexCenterColumn};
    ${mixins.containAndCenter};
    font-size: var(--font-size-xs);

    ${media.bp600`
        flex-direction:column;
    `}
`;
const FooterTopContainer = styled.div`
    ${mixins.flexCenter}
    p,
    a {
        margin: 0;
        padding-left: 0;
        padding-right: 0;
        text-align: center;
    }

    p {
        margin-bottom: 0.6rem;
    }
    margin-bottom: 1rem;
`;
const FooterBottomContainer = styled.ul`
    ${mixins.flexCenter}
    a {
        padding: 1.6rem;
        svg {
            width: 2.2rem;
            height: 2.2rem;
        }
    }
`;

const Footer = ({ isHome }) => {
    const footerRef = useRef();

    useEffect(() => {
        if (isHome) {
            scrollReveal.reveal(footerRef.current, scrollRevealConfig());
        }
    }, [isHome]);

    return (
        <FooterContainer ref={footerRef}>
            <FooterContentContainer>
                <FooterTopContainer>
                    <OutboundLink href={repo} variant="styled-link">
                        <p>Designed & developed by Paul Brady </p>
                        <p>Click here to check out the GitHub repo</p>
                    </OutboundLink>
                </FooterTopContainer>
                <FooterBottomContainer>
                    <li>
                        <OutboundLink variant="styled-link" href={`mailto:${email}`}>
                            <Icon name="Email" />
                        </OutboundLink>
                    </li>
                    {socialMedia &&
                        socialMedia.map(({ url, name }, i) => (
                            // eslint-disable-next-line react/no-array-index-key
                            <li key={`footer-socials-${i}`}>
                                <OutboundLink variant="styled-link" href={url} aria-label={name}>
                                    <Icon name={name} />
                                </OutboundLink>
                            </li>
                        ))}
                </FooterBottomContainer>
            </FooterContentContainer>
        </FooterContainer>
    );
};

export default Footer;
