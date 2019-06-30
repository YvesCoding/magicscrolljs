module.exports = {
  base: '/',
  themeConfig: {
    repo: 'YvesCoding/magic-scroll',
    docsRepo: 'yvesCoding/magicscrolljs',
    docsDir: 'docs',
    docsBranch: 'master',
    locales: {
      '/': {
        label: 'English',
        selectText: 'Languages',
        editLinkText: 'Edit this page on GitHub',
        lastUpdated: 'Last Updated', // string | boolean
        nav: [
          {
            text: 'Guide',
            link: '/guide/',
          },
        ],
        sidebar: {
          '/guide/': genSidebarConfig(),
        },
      },
      '/zh': {
        label: '简体中文',
        selectText: '选择语言',
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdated: '上次更新', // string | boolean
        nav: [
          {
            text: '指南',
            link: '/zh/guide/',
          },
        ],
        sidebar: {
          '/guide/': genSidebarConfig('Guide'),
        },
      },
    },
  },
};
