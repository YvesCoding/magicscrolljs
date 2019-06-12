module.exports = {
  siteMetadata: {
    title: 'Magic Scroll',
    description: '极速开发框架 - 前端',
    author: 'wangyi',
    siteUrl: `https://gitee.com/stylefeng/one-front`,
  },
  plugins: [
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
    // {
    //   resolve: 'gatsby-source-filesystem',
    //   options: {
    //     name: '/blog',
    //     path: `${__dirname}/blog/`,
    //   },
    // },
    {
      resolve: 'gatsby-transformer-remark-antd',
      options: {
        plugins: [
          'gatsby-remark-header-custom-ids',
          'gatsby-remark-img-warpper-p',
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              noInlineHighlight: true,
            },
          },
        ],
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
    `gatsby-mdx`,
  ],
};
