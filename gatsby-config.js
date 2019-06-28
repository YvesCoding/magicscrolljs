var path = require('path');

function getPlugin(pluginName) {
  return path.resolve(__dirname, `./plugins/${pluginName}/index.js`);
}

module.exports = {
  __experimentalThemes: [`${__dirname}\\theme`],
};
