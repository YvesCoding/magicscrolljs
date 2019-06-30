var path = require('path');
module.exports.getUserConfig = () => {
  var conifgFile;
  try {
    conifgFile = require(path.resolve(process.cwd(), 'ant-docs.config.js'));
  } catch (error) {
    conifgFile = {};
  }
};
