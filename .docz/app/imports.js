export const imports = {
  'docs/get-started.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "docs-get-started" */ 'docs/get-started.mdx'
    ),
  'docs/Introduction.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "docs-introduction" */ 'docs/Introduction.mdx'
    ),
}
