var path = require('path');
var defaultConfig = require(path.resolve(__dirname, './default-config'));

module.exports.getUserConfig = () => {
  var conifgFile;
  var config = {};
  try {
    conifgFile = require(path.resolve(process.cwd(), 'ant-docs.config.js'));
    config = require(conifgFile);
  } catch (error) {}

  return config;
};

function deepMerge(from, to) {
  for (var key in from) {
    if (typeof from[key] === 'object') {
      if (to[key]) {
        if (typeof to[key] === 'object') {
          deepMerge(from[key], to[key]);
        } else {
          to[key] = from[key];
        }
      }
    } else {
      to[key] = from[key];
    }
  }

  return to;
}

module.exports.getFinalConfig = function() {
  var config = module.exports.getUserConfig();

  return deepMerge(config, defaultConfig);
};
