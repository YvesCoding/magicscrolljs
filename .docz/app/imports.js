export const imports = {
  'docs/index.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "docs-index" */ 'docs/index.mdx'
    ),
  'docs/test.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "docs-test" */ 'docs/test.mdx'
    ),
}
