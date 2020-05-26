import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import styled, { css } from 'styled-components';
import Slider from 'react-slick';
import Media from 'react-media';

import { scrollRevealConfig } from '@config';
import { scrollReveal } from '@utils';
import { Icon, OutboundLink, Heading } from '@components';
import { mixins, media } from '@styles';

const tagMargin = '1.6rem';
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

    ${media.bp800`
        ${contentMobile}
    `}
`;
const Overline = styled.h4`
    font-size: var(--font-size-xxs);
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
        margin-bottom: 1rem;
    `}
`;
const Description = styled.div`
    position: relative;
    padding: 2.4rem;
    font-size: var(--font-size-md);
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow-primary);
    z-index: 5;
    background-color: var(--color-card);
    margin-bottom: 2.5rem;
    p {
        margin: 0;
    }
    a {
        ${mixins.inlineLink};
    }

    ${media.bp1040`
        padding: 2.2rem;
    `}
    ${media.bp800`
        padding: 1.6rem;
    `}
`;
const TechList = styled.ul`
    position: relative;
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin-bottom: 1rem;
    list-style: none;

    li {
        font-family: var(--fonts-mono);
        font-size: var(--font-size-xs);
        margin-right: ${tagMargin};
        margin-bottom: 0.8rem;
        white-space: nowrap;
        color: var(--color-text-primary-2);

        &:last-of-type {
            margin-right: 0;
        }
    }
`;
const LinksContainer = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    margin-left: -1rem;
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
        width: auto;
        height: 100%;
    `}
`;
const CarouselContainer = styled.div`
    width: 60rem;
    max-width: calc(100vw - 2 * var(--page-padding));
    overflow: hidden;
    max-height: ${props => props.maxHeight};
    grid-column: 2 / -1;
    grid-row: 1 / -1;
    position: relative;
    box-shadow: var(--box-shadow-primary);

    ${media.bp1280`
        width: 54rem; 
    `}
    ${media.bp1040`
        width: 46rem; 
    `}
    ${media.bp800`
        width: 100rem; 
        margin-bottom: 1.6rem;
    `}
`;
const StyledImgContainer = styled.div`
    position: relative;
    border-radius: var(--border-radius);
`;
const ProjectContainer = styled.div`
    display: grid;
    grid-gap: 3rem;
    grid-template-columns: 1fr 1fr;
    align-items: start;
    margin-bottom: 10rem;
    
    ${media.bp1280`
        grid-gap: 2.2rem;
    `}
    ${media.bp1040`
        grid-gap: 1.6rem;
        margin-bottom: 8rem;
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

            ${media.bp800`
                ${contentMobile}
                text-align:left;
            `}
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
            `}
        }
        ${CarouselContainer} {
            grid-column: 1 / 2;
            
        }
    }
`;

const Projects = ({ data }) => {
    const headingRef = useRef();
    const projectRef = useRef([]);
    const imageRef = useRef();

    useEffect(() => {
        scrollReveal.reveal(headingRef.current, scrollRevealConfig());
        projectRef.current.forEach((ref, i) =>
            scrollReveal.reveal(ref, scrollRevealConfig(i * 100)),
        );
    }, []);

    return (
        <ProjectsContainer>
            <Heading id="projects" ref={headingRef}>
                Projects
            </Heading>
            {data &&
                data.map(({ node }, i) => {
                    const { frontmatter, html } = node;
                    const { overline, external, title, tech, github, images } = frontmatter;

                    return (
                        <ProjectContainer
                            key={`project-${i}`}
                            ref={el => {
                                projectRef.current[i] = el;
                            }}>
                            <ContentContainer>
                                <Overline>{overline}</Overline>
                                <ProjectName>
                                    {external ? (
                                        <OutboundLink
                                            variant={null}
                                            href={external}
                                            aria-label="External Link">
                                            {title}
                                        </OutboundLink>
                                    ) : (
                                        title
                                    )}
                                </ProjectName>
                                <Description dangerouslySetInnerHTML={{ __html: html }} />
                                <Media
                                    query="(min-width: 801px)"
                                    render={() => (
                                        <>
                                            {tech && (
                                                <TechList>
                                                    {tech.map((tech, i) => (
                                                        <li key={`tech-${i}`}>{tech}</li>
                                                    ))}
                                                </TechList>
                                            )}
                                            <LinksContainer>
                                                {github && (
                                                    <OutboundLink
                                                        variant="styled-link"
                                                        href={github}
                                                        aria-label="GitHub Link">
                                                        <Icon name="GitHub" />
                                                    </OutboundLink>
                                                )}
                                                {external && (
                                                    <OutboundLink
                                                        variant="styled-link"
                                                        href={external}
                                                        aria-label="External Link">
                                                        <Icon name="External" />
                                                    </OutboundLink>
                                                )}
                                            </LinksContainer>
                                        </>
                                    )}
                                />
                            </ContentContainer>
                            <OutboundLink href={external || github || '#'} variant={null}>
                                <CarouselContainer>
                                    <Slider
                                        {...{
                                            arrows: false,
                                            dots: false,
                                            infinite: true,
                                            speed: 800,
                                            autoplay: true,
                                            autoplaySpeed: 5000,
                                            fade: true,
                                            cssEase: 'ease',
                                        }}>
                                        {images.map(({ image, alt }, i) => (
                                            <StyledImgContainer key={`project-image-${title}-${i}`}>
                                                <StyledImg
                                                    ref={imageRef}
                                                    fluid={image.childImageSharp.fluid}
                                                    alt={alt || `${title}-image-${i}`}
                                                />
                                            </StyledImgContainer>
                                        ))}
                                    </Slider>
                                </CarouselContainer>
                                <Media
                                    query="(max-width: 800px)"
                                    render={() => (
                                        <>
                                            {tech && (
                                                <TechList>
                                                    {tech.map((tech, i) => (
                                                        <li key={`tech-${i}`}>{tech}</li>
                                                    ))}
                                                </TechList>
                                            )}
                                            <LinksContainer>
                                                {github && (
                                                    <OutboundLink
                                                        variant={null}
                                                        href={github}
                                                        aria-label="GitHub Link">
                                                        <Icon name="GitHub" />
                                                    </OutboundLink>
                                                )}
                                                {external && (
                                                    <OutboundLink
                                                        variant={null}
                                                        href={external}
                                                        aria-label="External Link">
                                                        <Icon name="External" />
                                                    </OutboundLink>
                                                )}
                                            </LinksContainer>
                                        </>
                                    )}
                                />
                            </OutboundLink>
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
