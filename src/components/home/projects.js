import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import styled, { css } from 'styled-components';
import Media from 'react-media';
import { v4 as uuidv4 } from 'uuid';

import { scrollRevealConfig } from '@config';
import scrollReveal from '@utils/scrollReveal';
import { BREAKPOINTS } from '@utils/constants';
import { Icon, CustomLink, Heading } from '@components';
import { mixins, media } from '@styles';

const tagMargin = '1.7rem';
const contentMobile = css`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
`;

const ProjectsContainer = styled.section`
    ${mixins.homeSection};
    ${mixins.flexCenter};
    flex-direction: column;
    align-items: flex-start;
`;
const ContentContainer = styled.div`
    position: relative;
    grid-column: 1 / 2;
    grid-row: 1 / -1;
    justify-self: start;

    ${media.bp800`
        ${contentMobile}
    `}
`;
const Overline = styled.h4`
    font-size: var(--font-size-tiny);
    font-weight: normal;
    color: var(--color-primary);
    padding-top: 0;

    ${media.bp1040`
        margin-bottom: 0.4rem;
    `}
`;
const ProjectName = styled.h5`
    font-size: 2.8rem;
    margin-bottom: 2rem;

    & a {
        color: var(--color-text-primary-1);
    }

    ${media.bp1040`
        margin-bottom: 1.6rem;
    `}
`;
const Description = styled.div`
    position: relative;
    padding: 2.4rem;
    font-size: var(--font-size-sm);
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow-primary);
    z-index: 5;
    background-color: var(--color-background-secondary-1);
    margin-bottom: 2.5rem;

    p:last-of-type {
        margin: 0;
    }
    a {
        ${mixins.primaryLink};
    }

    ${media.bp1040`
        padding: 2.2rem;
        margin-bottom: 1.5rem;
    `}
    ${media.bp800`
        padding: 1.6rem;
        font-size: var(--font-size-md);
    `}
    ${media.bp440`
        padding:0;
        background: none;
        box-shadow: none;
    `}
`;
const TechList = styled.ul`
    position: relative;
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin-bottom: 0.8rem;
    list-style: none;

    li {
        font-family: var(--fonts-mono);
        font-size: var(--font-size-2xs);
        margin-right: ${tagMargin};
        margin-bottom: 0.8rem;
        white-space: nowrap;
        color: var(--color-text-primary-2);

        &:last-of-type {
            margin-right: 0;
        }

        ${media.bp800`
            font-size: var(--font-size-xs);
            margin-bottom: 0.6rem;
        `}
    }

    ${media.bp800`
        margin-bottom: -0.6rem;
    `}
`;
const LinksContainer = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    margin-left: -1rem;
    overflow: visible;
`;
const IconLink = styled(props => <CustomLink variant="secondary" {...props} />)`
    &&:first-of-type {
        margin-right: 0.5rem;
    }

    && svg {
        width: 22px;
        height: 22px;
    }

    ${media.bp800`
        && svg {
            width: 24px;
            height: 24px;
        }
    `}
`;
const ImgLinkContainer = styled(props => <CustomLink {...props} />)`
    width: 600px;
    max-width: calc(100vw - 2 * var(--side-padding));
    max-height: ${props => props.maxHeight || 'auto'};
    box-shadow: var(--box-shadow-primary);
    border-radius: var(--border-radius);
    overflow: hidden;
    position: relative;
    border-radius: var(--border-radius);
    max-width: 100%;
    grid-column: 2 / -1;
    justify-self: end;
    z-index: 1;
    

    ${media.bp1440`
        width: 530px;
    `}
    ${media.bp1280`
        width: 460px;
    `}
    ${media.bp1040`
        width: 400px;
    `}
    ${media.bp800`
        width: calc(100vw - 2 * var(--side-padding));
        margin-bottom: 1.5rem;
    `}
`;
const StyledImg = styled(Img)`
    width: 100%;
    max-width: 100%;
    vertical-align: middle;
    border-radius: var(--border-radius);
    position: relative;
    mix-blend-mode: multiply;

    ${media.bp800`
        object-fit: cover;
        height: 100%;
    `}
`;
const ProjectContainer = styled.div`
    display: grid;
    grid-gap: 3rem;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    margin-bottom: 10rem;
    
    ${media.bp1280`
        grid-gap: 2.2rem;
        margin-bottom: 8rem;
    `}
    ${media.bp1040`
        grid-gap: 1.6rem;
    `}
    ${media.bp800`
        ${contentMobile}
        margin-bottom: 6rem;
    `}

    &:last-of-type {
        margin-bottom: 0;
    }

    &:nth-of-type(odd) {
        ${ContentContainer} {
            grid-column: 2 / -1;
            text-align: right;
            justify-self: end;

            ${media.bp800`
                ${contentMobile}
                text-align:left;
            `}
        }
        ${ImgLinkContainer} {
            grid-column: 1 / 2;
            justify-self: start;
        }
        ${TechList} {
            justify-content: flex-end;
            li {
                margin-left: ${tagMargin};
                margin-right: 0;
            }

            ${media.bp800`
                justify-content: flex-start;
                li {
                    margin-left: 0;
                    margin-right: ${tagMargin};
                }
            `}
        }
        ${LinksContainer} {
            justify-content: flex-end;
            margin-left: 0;
            margin-right: -1rem;

            ${media.bp800`
                justify-content: flex-start;
                margin-left: -1rem;
            `}
        }
    }
`;

const Projects = ({ data }) => {
    const headingRef = useRef();
    const projectRef = useRef([]);
    const imageRef = useRef();

    useEffect(() => {
        scrollReveal.reveal(headingRef.current, scrollRevealConfig(100));
        projectRef.current.forEach(ref => scrollReveal.reveal(ref, scrollRevealConfig()));
    }, []);

    return (
        <ProjectsContainer>
            <Heading id="portfolio" ref={headingRef}>
                Portfolio
            </Heading>
            {data &&
                data.map(({ node }, i) => {
                    const { frontmatter, html } = node;
                    const { overline, external, title, tech, github, images } = frontmatter;

                    return (
                        <ProjectContainer
                            key={uuidv4()}
                            ref={el => {
                                projectRef.current[i] = el;
                            }}>
                            <ContentContainer>
                                <Overline>{overline}</Overline>
                                <ProjectName>
                                    {external ? (
                                        <CustomLink
                                            variant={null}
                                            href={external}
                                            aria-label="Demo">
                                            {title}
                                        </CustomLink>
                                    ) : (
                                        title
                                    )}
                                </ProjectName>
                                <Description dangerouslySetInnerHTML={{ __html: html }} />
                                <Media
                                    query={`(min-width: ${BREAKPOINTS.bp800 + 1}px)`}
                                    render={() => (
                                        <>
                                            {tech && (
                                                <TechList>
                                                    {tech.map(tech => (
                                                        <li key={uuidv4()}>{tech}</li>
                                                    ))}
                                                </TechList>
                                            )}
                                            <LinksContainer>
                                                {github && (
                                                    <IconLink
                                                        href={github}
                                                        aria-label="GitHub Repo">
                                                        <Icon name="GitHub" />
                                                    </IconLink>
                                                )}
                                                {external && (
                                                    <IconLink href={external} aria-label="Demo">
                                                        <Icon name="external" />
                                                    </IconLink>
                                                )}
                                            </LinksContainer>
                                        </>
                                    )}
                                />
                            </ContentContainer>
                            <ImgLinkContainer href={external || github || '#'} variant={null}>
                                <StyledImg
                                    ref={imageRef}
                                    fluid={images[0].image.childImageSharp.fluid}
                                    alt={images[0].alt || `${title}-image-${i}`}
                                />
                            </ImgLinkContainer>
                            <Media
                                query={`(max-width: ${BREAKPOINTS.bp800}px)`}
                                render={() => (
                                    <>
                                        {tech && (
                                            <TechList>
                                                {tech.map(tech => (
                                                    <li key={uuidv4()}>{tech}</li>
                                                ))}
                                            </TechList>
                                        )}
                                        <LinksContainer>
                                            {github && (
                                                <IconLink href={github} aria-label="GitHub Repo">
                                                    <Icon name="GitHub" />
                                                </IconLink>
                                            )}
                                            {external && (
                                                <IconLink href={external} aria-label="Demo">
                                                    <Icon name="external" />
                                                </IconLink>
                                            )}
                                        </LinksContainer>
                                    </>
                                )}
                            />
                        </ProjectContainer>
                    );
                })}
        </ProjectsContainer>
    );
};

Projects.propTypes = {
    data: PropTypes.array.isRequired,
};

export default Projects;
