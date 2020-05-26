import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import styled from 'styled-components';
import Slider from 'react-slick';

import { scrollRevealConfig } from '@config';
import { scrollReveal } from '@utils';
import { Icon, OutboundLink, Heading } from '@components';
import { mixins, media } from '@styles';

const tagMargin = '1.6rem';

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
  /* TODO
  ${media.thone`
    grid-column: 1 / -1;
    padding: 40px 40px 30px;
    z-index: 5;
  `};
  ${media.phablet`padding: 30px 25px 20px;`};
  */
`;
const Overline = styled.h4`
    font-size: var(--font-size-xxs);
    font-weight: normal;
    color: var(--color-primary);
    padding-top: 0;
    letter-spacing: -0.2px;
`;
const ProjectName = styled.h5`
    font-size: 2.8rem;
    margin: 0 0 2rem;
    & a {
        color: var(--color-text-primary-1);
    }
`;
const Description = styled.div`
    position: relative;
    padding: 2.5rem;
    font-size: var(--font-size-md);
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow-primary);
    z-index:5;
    background-color: var(--color-card);
    /* TODO
    ${media.thone`
    background-color: transparent;
    padding: 20px 0;
    box-shadow: none;
  `}; */
    p {
        margin: 0;
    }
    a {
        ${mixins.inlineLink};
    }
`;
const TechList = styled.ul`
    position: relative;
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin: 2.5rem 0 1rem;
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
    margin-top: 1rem;
    margin-left: -1rem;
    a {
        padding: 1rem;
        color: var(--color-socials);
        svg {
            width: 2.2rem;
            height: 2.2rem;
        }

        &:hover {
            transition: var(--transition);
            color: var(--color-socials-hover);
        }
    }
`;
const StyledImg = styled(Img)`
    width: 100%;
    max-width: 100%;
    vertical-align: middle;
    border-radius: var(--border-radius);
    position: relative;
    mix-blend-mode: multiply;
    /* TODO
    ${media.tablet`
    object-fit: cover;
    width: auto;
    height: 100%;
    `}; */
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

    .slick-slider {
        line-height: 0;
    }
`;
const StyledImgContainer = styled.div`
    position: relative;
    border-radius: var(--border-radius);
    /* TODO
    ${media.tablet`height: 100%;`}; */
    /* ${media.thone`
    grid-column: 1 / -1;
    opacity: 0.25;
  `}; */
`;
const ProjectContainer = styled.div`
    display: grid;
    grid-gap: 3rem;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    margin-bottom: 10rem;
    /* TODO
    ${media.thone`
    margin-bottom: 7rem;
  `}; */

    &:last-of-type {
        margin-bottom: 0;
    }

    &:nth-of-type(odd) {
        ${ContentContainer} {
            grid-column: 2 / -1;
            text-align: right;
            /* TODO
            ${media.thone`
        grid-column: 1 / -1;
        padding: 4rem 4rem 3rem;
      `}; */
            /* TODO ${media.phablet`padding: 3rem 2.5rem 2rem;`}; */
        }
        ${TechList} {
            justify-content: flex-end;
            li {
                margin-left: ${tagMargin};
                margin-right: 0;
            }
        }
        ${LinksContainer} {
            justify-content: flex-end;
            margin-left: 0;
            margin-right: -1rem;
        }
        ${CarouselContainer} {
            grid-column: 1 / 2;
            /* TODO
            ${media.tablet`height: 100%;`};
            ${media.thone`
        grid-column: 1 / -1;
        opacity: 0.25;
      `}; */
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
                                        {images.map(({ image, alt }) => (
                                            <StyledImgContainer>
                                                <StyledImg
                                                    ref={imageRef}
                                                    fluid={image.childImageSharp.fluid}
                                                    alt={alt || `${title}-image-${i}`}
                                                />
                                            </StyledImgContainer>
                                        ))}
                                    </Slider>
                                </CarouselContainer>
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
