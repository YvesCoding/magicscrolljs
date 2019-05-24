export default {
  title: "My Cool Project",
  theme: "docz-theme-magic-scroll",
  description: "This is my awesome documentation",
  themeConfig: {
    colors: {
      primary: "tomato",
    },
  },
  menu: ["Introduction", "Get Started"],
  modifyBundlerConfig: config => {
    config.resolve.extensions.push(".scss")
    config.module.rules.push({
      test: /\.scss$/,
      use: ["style-loader", "css-loader", "sass-loader"],
    })

    return config
  },
}
