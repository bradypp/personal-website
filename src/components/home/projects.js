import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import styled from 'styled-components';

import { scrollRevealConfig } from '@config';
import { scrollReveal } from '@utils';
import { Icon, OutboundLink, Heading } from '@components';
import { mixins, media } from '@styles';

const tagMargin = '1.5rem';

const ProjectsContainer = styled.section`
    ${mixins.homeSection}
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
    font-size: var(--font-size-xs);
    font-weight: normal;
    color: var(--color-primary);
    font-family: var(---fonts-mono);
    margin-top: 10px;
    padding-top: 0;
`;
const ProjectName = styled.h5`
    font-size: 2.8rem;
    margin: 0 0 2rem;
    & a {
        color: var(--color-text-primary-1);
    }
`;
const StyledDescription = styled.div`
    position: relative;
    padding: 2.5rem;
    font-size: var(--font-size-lg);
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow-primary);
    z-index:5;
    background-color: var(--color-background-1);
    /* TODO
    ${media.thone`
    background-color: transparent;
    padding: 20px 0;
    box-shadow: none;
    &:hover {
      box-shadow: none;
    }
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
        svg {
            color: var(--color-text-primary-2);
            width: 2.2rem;
            height: 2.2rem;
        }

        &:hover {
            svg {
                transition: var(--transition);
                color: var(--color-primary);
            }
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
    box-shadow: var(--box-shadow-primary);
    /* TODO
    ${media.tablet`
    object-fit: cover;
    width: auto;
    height: 100%;
  `}; */
`;
const StyledImgContainer = styled.a`
    grid-column: 2 / -1;
    grid-row: 1 / -1;
    position: relative;
    z-index: 1;
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
        ${StyledImgContainer} {
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
    const $headingRef = useRef(null);
    const $projectRef = useRef([]);

    useEffect(() => {
        scrollReveal.reveal($headingRef.current, scrollRevealConfig());
        $projectRef.current.forEach((ref, i) =>
            scrollReveal.reveal(ref, scrollRevealConfig(i * 100)),
        );
    }, []);

    return (
        <ProjectsContainer id="projects">
            <Heading ref={$headingRef}>Projects</Heading>
            {data &&
                data.map(({ node }, i) => {
                    const { frontmatter, html } = node;
                    const { overline, external, title, tech, github, images } = frontmatter;

                    return (
                        <ProjectContainer
                            key={`project-${i}`}
                            ref={el => {
                                $projectRef.current[i] = el;
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
                                <StyledDescription dangerouslySetInnerHTML={{ __html: html }} />
                                {tech && (
                                    <TechList>
                                        {tech.map((tech, i) => (
                                            <li key={`tech-${i}`}>{tech}</li>
                                        ))}
                                    </TechList>
                                )}
                                <LinksContainer>
                                    {github && (
                                        <a
                                            href={github}
                                            target="_blank"
                                            rel="nofollow noopener noreferrer"
                                            aria-label="GitHub Link">
                                            <Icon name="GitHub" />
                                        </a>
                                    )}
                                    {external && (
                                        <a
                                            href={external}
                                            target="_blank"
                                            rel="nofollow noopener noreferrer"
                                            aria-label="External Link">
                                            <Icon name="External" />
                                        </a>
                                    )}
                                </LinksContainer>
                            </ContentContainer>
                            <StyledImgContainer
                                href={external || github || '#'}
                                target="_blank"
                                rel="nofollow noopener noreferrer">
                                <StyledImg
                                    fluid={images[0].image.childImageSharp.fluid}
                                    alt={images[0].alt || `${title}-image-${i}`}
                                />
                            </StyledImgContainer>
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
