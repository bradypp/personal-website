import React, { useEffect } from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';

import { Layout, Hero } from '@components';

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
        <Layout>
            <Hero data={data.hero.edges} />
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
                        subtitle
                        contact
                        projects
                    }
                    html
                }
            }
        }
    }
`;
