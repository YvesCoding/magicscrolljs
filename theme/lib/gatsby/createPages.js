/* eslint-disable no-console */
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * @emails react-core
 */

const { resolve } = require('path');
var { themeConfig } = require('../util').getFinalConfig();

function isHome(path) {
  if (path == '/') return true;

  return themeConfig.locales && Object.keys(themeConfig.locales).indexOf(path) != -1;
}

module.exports = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions;
  // Used to detect and prevent duplicate redirects

  const docsTemplate = resolve(__dirname, '../src/templates/docs.tsx');
  const indexTemplate = resolve(__dirname, '../src/pages/index.tsx');

  // Redirect /index.html to root.
  createRedirect({
    fromPath: '/index.html',
    redirectInBrowser: true,
    toPath: '/',
  });

  const allMdx = await graphql(
    `
      {
        allMdx(limit: 1000) {
          edges {
            node {
              fields {
                slug
                underScoreCasePath
                path
              }
            }
          }
        }
      }
    `
  );

  if (allMdx.errors) {
    console.error(allMdx.errors);

    throw Error(allMdx.errors);
  }
  const redirects = {};

  const edges = allMdx.data.allMdx.edges;
  edges.forEach(edge => {
    const { slug, underScoreCasePath } = edge.node.fields;
    if (!isHome(slug)) {
      const template = docsTemplate;
      const createArticlePage = path => {
        if (underScoreCasePath !== path) {
          redirects[underScoreCasePath] = path;
        }

        return createPage({
          path,
          component: template,
          context: {
            slug,
            // if is docs page
            type: slug.includes('docs/') ? '/docs/' : '/blog/',
          },
        });
      };

      // Register primary URL.
      createArticlePage(slug.replace('/index', ''));
    } else {
      createPage({
        path: slug,
        component: indexTemplate,
        context: {
          slug,
        },
      });
    }
  });

  Object.keys(redirects).map(path =>
    createRedirect({
      fromPath: path,
      redirectInBrowser: true,
      toPath: redirects[path],
    })
  );
};
