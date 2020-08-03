/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
// const { kebabCase } = require('lodash');

exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions;

    if (node.internal.type === 'Mdx') {
        const value = createFilePath({ node, getNode, basePath: 'posts' });
        createNodeField({
            // Name of the field you are adding
            name: 'slug',
            // Individual MDX node
            node,
            // Generated value based on filepath with "blog" prefix. you
            // don't need a separating "/" before the value because
            // createFilePath returns a path with the leading "/".
            value: `/blog${value}`,
        });
    }
};

exports.createPages = async ({ actions, graphql, reporter }) => {
    const { createPage } = actions;
    const postTemplate = path.resolve(`src/templates/post.js`);
    // const tagTemplate = path.resolve('src/templates/tag.js');

    const result = await graphql(`
        {
            postsRemark: allMdx(
                filter: { fileAbsolutePath: { regex: "/posts/" } }
                sort: { order: DESC, fields: [frontmatter___date] }
                limit: 1000
            ) {
                edges {
                    node {
                        id
                        fields {
                            slug
                        }
                    }
                }
            }
            tagsGroup: allMdx(limit: 2000) {
                group(field: frontmatter___tags) {
                    fieldValue
                }
            }
        }
    `);

    // Handle errors
    if (result.errors) {
        reporter.panicOnBuild(`Error while running GraphQL query.`);
        return;
    }

    // Create post detail pages
    const posts = result.data.postsRemark.edges;

    posts.forEach(({ node }) => {
        createPage({
            component: postTemplate,
            path: node.fields.slug,
            context: { id: node.id },
        });
    });

    // // Extract tag data from query
    // const tags = result.data.tagsGroup.group;
    // // Make tag pages
    // tags.forEach(tag => {
    //     createPage({
    //         component: tagTemplate,
    //         path: `/blog/tags/${kebabCase(tag.fieldValue)}/`,
    //         context: {
    //             tag: tag.fieldValue,
    //             slug: `/blog/tags/${kebabCase(tag.fieldValue)}/`,
    //         },
    //     });
    // });
};

// https://www.gatsbyjs.org/docs/node-apis/#onCreateWebpackConfig
exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
    // Stop scrollreveal null references to the window on build
    // https://www.gatsbyjs.org/docs/debugging-html-builds/#fixing-third-party-modules
    if (stage === 'build-html') {
        actions.setWebpackConfig({
            module: {
                rules: [
                    {
                        test: /scrollreveal/,
                        use: loaders.null(),
                    },
                ],
            },
        });
    }

    // Allows absolute referencing (e.g. import { Component } from '@components')
    actions.setWebpackConfig({
        resolve: {
            alias: {
                '@components': path.resolve(__dirname, 'src/components'),
                '@config': path.resolve(__dirname, 'src/config'),
                '@assets': path.resolve(__dirname, 'src/assets'),
                '@pages': path.resolve(__dirname, 'src/pages'),
                '@styles': path.resolve(__dirname, 'src/styles'),
                '@utils': path.resolve(__dirname, 'src/utils'),
                '@hooks': path.resolve(__dirname, 'src/hooks'),
                '@content': path.resolve(__dirname, 'src/content'),
                '@context': path.resolve(__dirname, 'src/context'),
            },
        },
    });
};
// /**
//  * Implement Gatsby's Node APIs in this file.
//  *
//  * See: https://www.gatsbyjs.org/docs/node-apis/
//  */

// const path = require('path');
// const { createFilePath } = require('gatsby-source-filesystem');
// // const { kebabCase } = require('lodash');

// exports.onCreateNode = ({ node, actions, getNode }) => {
//     const { createNodeField } = actions;

//     if (node.internal.type === 'Mdx') {
//         const value = createFilePath({ node, getNode, basePath: 'posts' });
//         createNodeField({
//             // Name of the field you are adding
//             name: 'slug',
//             // Individual MDX node
//             node,
//             // Generated value based on filepath with "blog" prefix. you
//             // don't need a separating "/" before the value because
//             // createFilePath returns a path with the leading "/".
//             value: `/blog${value}`,
//         });
//     }
// };

// exports.createPages = async ({ actions, graphql, reporter }) => {
//     const { createPage } = actions;
//     const postTemplate = path.resolve(`src/templates/post.js`);
//     // const tagTemplate = path.resolve('src/templates/tag.js');

//     const result = await graphql(`
//         {
//             postsRemark: allMdx(
//                 filter: { fileAbsolutePath: { regex: "/posts/" } }
//                 sort: { order: DESC, fields: [frontmatter___date] }
//                 limit: 1000
//             ) {
//                 edges {
//                     node {
//                         id
//                         fields {
//                             slug
//                         }
//                     }
//                 }
//             }
//             tagsGroup: allMarkdownRemark(limit: 2000) {
//                 group(field: frontmatter___tags) {
//                     fieldValue
//                 }
//             }
//         }
//     `);

//     // Handle errors
//     if (result.errors) {
//         reporter.panicOnBuild(`Error while running GraphQL query.`);
//         return;
//     }

//     // Create post detail pages
//     const posts = result.data.postsRemark.edges;

//     posts.forEach(({ node }) => {
//         createPage({
//             component: postTemplate,
//             path: node.fields.slug,
//             context: { id: node.id },
//         });
//     });

//     // // Extract tag data from query
//     // const tags = result.data.tagsGroup.group;
//     // // Make tag pages
//     // tags.forEach(tag => {
//     //     createPage({
//     //         component: tagTemplate,
//     //         path: `/blog/tags/${kebabCase(tag.fieldValue)}/`,
//     //         context: {
//     //             tag: tag.fieldValue,
//     //             slug: `/blog/tags/${kebabCase(tag.fieldValue)}/`,
//     //         },
//     //     });
//     // });
// };

// // https://www.gatsbyjs.org/docs/node-apis/#onCreateWebpackConfig
// exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
//     // Stop scrollreveal null references to the window on build
//     // https://www.gatsbyjs.org/docs/debugging-html-builds/#fixing-third-party-modules
//     if (stage === 'build-html') {
//         actions.setWebpackConfig({
//             module: {
//                 rules: [
//                     {
//                         test: /scrollreveal/,
//                         use: loaders.null(),
//                     },
//                 ],
//             },
//         });
//     }

//     // Allows absolute referencing (e.g. import { Component } from '@components')
//     actions.setWebpackConfig({
//         resolve: {
//             alias: {
//                 '@components': path.resolve(__dirname, 'src/components'),
//                 '@config': path.resolve(__dirname, 'src/config'),
//                 '@assets': path.resolve(__dirname, 'src/assets'),
//                 '@pages': path.resolve(__dirname, 'src/pages'),
//                 '@styles': path.resolve(__dirname, 'src/styles'),
//                 '@utils': path.resolve(__dirname, 'src/utils'),
//                 '@hooks': path.resolve(__dirname, 'src/hooks'),
//                 '@content': path.resolve(__dirname, 'src/content'),
//                 '@context': path.resolve(__dirname, 'src/context'),
//             },
//         },
//     });
// };
