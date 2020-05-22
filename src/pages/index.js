import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import { Layout, Hero, About, Projects } from '@components';

const IndexPage = ({ location, data }) => {
    useEffect(() => {
        if (location.hash) {
            const id = location.hash.substring(1); // remove the '#'
            setTimeout(() => {
                const el = document.getElementById(id);
                if (el) {
                    el.scrollIntoView();
                    el.focus();
                }
            }, 0);
        }
    }, [location.hash]);

    return (
        <Layout location={location}>
            <Hero data={data.hero.edges} />
            <About data={data.about.edges} />
            <Projects data={data.projects.edges} />
        </Layout>
    );
};

IndexPage.propTypes = {
    location: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
};

export default IndexPage;

export const pageQuery = graphql`
    {
        hero: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/hero/" } }) {
            edges {
                node {
                    frontmatter {
                        title
                        name
                        subtitle
                        contact
                        wave {
                            childImageSharp {
                                fluid(maxWidth: 200, quality: 90) {
                                    ...GatsbyImageSharpFluid_withWebp
                                }
                            }
                        }
                    }
                }
            }
        }
        about: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/about/" } }) {
            edges {
                node {
                    frontmatter {
                        title
                        skills
                        avatar {
                            childImageSharp {
                                fluid(maxWidth: 700, quality: 90, traceSVG: { color: "#ccc" }) {
                                    ...GatsbyImageSharpFluid_withWebp_tracedSVG
                                }
                            }
                        }
                    }
                    html
                }
            }
        }
        projects: allMarkdownRemark(
            filter: { fileAbsolutePath: { regex: "/projects/" } }
            sort: { fields: [frontmatter___sort], order: ASC }
        ) {
            edges {
                node {
                    frontmatter {
                        overline
                        title
                        images {
                            image {
                                childImageSharp {
                                    fluid(maxWidth: 700, quality: 90, traceSVG: { color: "#ccc" }) {
                                        ...GatsbyImageSharpFluid_withWebp_tracedSVG
                                    }
                                }
                            }
                            alt
                        }
                        tech
                        github
                        external
                    }
                    html
                }
            }
        }
    }
`;
