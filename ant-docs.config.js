module.exports = {
  base: '/',
  themeConfig: {
    repo: 'YvesCoding/magic-scroll',
    docsRepo: 'yvesCoding/magicscrolljs',
    docsDir: 'docs',
    docsBranch: 'temp',
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
          '/guide/': genSidebarConfig('Guide'),
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
          '/guide/': genSidebarConfig('指南'),
        },
      },
    },
  },
};
function genSidebarConfig(title) {
  return [{ title, collapsable: false, children: ['', 'getting-started'] }];
}
