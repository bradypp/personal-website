import React from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import { mixins, media } from '@styles';
import { socialMedia, email, repo } from '@config';
import { Icon, CustomLink } from '@components';

const FooterContainer = styled.footer`
    padding: 3.2rem var(--side-padding) 2.4rem;
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
    margin-bottom:0.5rem;

    a {
        padding: 1rem;
    }
    p {
        margin: 0;
        padding: 0;
        text-align: center;
    }
`;
const FooterBottomContainer = styled.ul`
    ${mixins.flexCenter}
    a {
        padding: 1.6rem;
    }

    svg {
        width: 20px;
        height: 20px;
    }
`;

const Footer = () => {
    return (
        <FooterContainer>
            <FooterContentContainer>
                <FooterTopContainer>
                    <CustomLink href={repo} variant="secondary">
                        <p>Designed & developed by Paul Brady </p>
                    </CustomLink>
                </FooterTopContainer>
                <FooterBottomContainer>
                    <li>
                        <CustomLink variant="secondary" href={`mailto:${email}`}>
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
                </FooterBottomContainer>
            </FooterContentContainer>
        </FooterContainer>
    );
};

export default Footer;
