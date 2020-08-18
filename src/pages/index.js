import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import { Layout, Hero, About, Projects, Contact } from '@components';

const IndexPage = ({ data: propsData }) => {
    const { hero, about, projects, contact } = useMemo(() => propsData, [propsData]);

    return (
        <Layout isHome>
            <Hero data={hero} />
            <About data={about} />
            <Projects data={projects.edges} />
            <Contact data={contact} />
        </Layout>
    );
};

IndexPage.propTypes = {
    data: PropTypes.object.isRequired,
};

export default IndexPage;

export const pageQuery = graphql`
    {
        hero: markdownRemark(fileAbsolutePath: { regex: "/content/home/hero/" }) {
            frontmatter {
                title
                name
                subtitle
                buttonText
            }
        }
        about: markdownRemark(fileAbsolutePath: { regex: "/content/home/about/" }) {
            frontmatter {
                title
                skills
                avatar {
                    childImageSharp {
                        fluid(maxWidth: 700, quality: 90, traceSVG: { color: "#09162a" }) {
                            ...GatsbyImageSharpFluid_withWebp_tracedSVG
                        }
                    }
                }
            }
            html
        }
        projects: allMarkdownRemark(
            filter: { fileAbsolutePath: { regex: "/content/home/projects/" } }
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
                                    fluid(
                                        maxWidth: 700
                                        quality: 90
                                        traceSVG: { color: "#09162a" }
                                    ) {
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
        contact: markdownRemark(fileAbsolutePath: { regex: "/content/home/contact/" }) {
            frontmatter {
                title
                emailText
            }
            html
        }
    }
`;
