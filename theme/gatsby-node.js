var path = require('path');

function resolve(pn) {
  return path.resolve(__dirname, pn);
}

exports.createPages = require(resolve('./gatsby/createPages'));
exports.onCreateNode = require(resolve('./gatsby/onCreateNode'));
exports.onCreatePage = require(resolve('./gatsby/onCreatePage'));
exports.onCreateWebpackConfig = require(resolve('./gatsby/onCreateWebpackConfig'));
