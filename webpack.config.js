const path = require('path');

module.exports = {
  // other webpack configuration...
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    https:true
    // other devServer options...
  },
};
