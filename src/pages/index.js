import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import { Layout, Hero, About, Projects, Contact } from '@components';

const IndexPage = ({ data: propsData }) => {
    const data = useMemo(() => propsData, [propsData]);

    return (
        <Layout isHome>
            <Hero data={data.hero.edges} />
            <About data={data.about.edges} />
            <Projects data={data.projects.edges} />
            <Contact data={data.contact.edges} />
        </Layout>
    );
};

IndexPage.propTypes = {
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
                        buttonText
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
                                fluid(maxWidth: 700, quality: 90, traceSVG: { color: "#09162a" }) {
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
        contact: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/contact/" } }) {
            edges {
                node {
                    frontmatter {
                        title
                        emailText
                    }
                    html
                }
            }
        }
    }
`;
