var path = require('path');

module.exports = {
  siteMetadata: {
    title: 'Magic Scroll',
    description: '极速开发框架 - 前端',
    author: 'wangyi',
    siteUrl: `https://gitee.com/stylefeng/one-front`,
  },
  plugins: [
    {
      resolve: 'gatsby-mdx',
      options: {
        extensions: ['.md', '.mdx'],
        globalScope: `
        import Scrollbar from "magic-scroll";

        export default Scrollbar;
      `,
        gatsbyRemarkPlugins: [
          {
            resolve: path.resolve(__dirname, './plugins/gatsby-remark-header-custom-ids/index.js'),
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-less',
      options: {
        javascriptEnabled: true,
      },
    },
    `gatsby-plugin-typescript`,
    {
      resolve: 'gatsby-plugin-antd',
      options: {
        style: true,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: '/docs',
        path: `${__dirname}/docs/`,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-72788897-5',
      },
    },
    `gatsby-plugin-netlify`,
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Magic Scroll',
        short_name: 'Magic Scroll Doc',
        display: 'standalone',
        start_url: './?utm_source=homescreen',
        theme_color: '#002140',
        background_color: '#001529',
        icon: 'src/images/favicon.png',
      },
    },
    `gatsby-plugin-sitemap`,
  ],
};
