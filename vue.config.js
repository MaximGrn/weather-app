const path = require('path');

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        App: path.resolve(__dirname, './src'),
        Icons: path.resolve(__dirname, './src/assets/icons'),
        Images: path.resolve(__dirname, './src/assets/images'),
        Styles: path.resolve(__dirname, './src/assets/styles'),
        Components: path.resolve(__dirname, './src/components'),
        Constants: path.resolve(__dirname, './src/constants'),
        Pages: path.resolve(__dirname, './src/pages'),
        Store: path.resolve(__dirname, './src/store'),
        Router: path.resolve(__dirname, './src/router'),
        Utils: path.resolve(__dirname, './src/utils'),
        Directives: path.resolve(__dirname, './src/directives'),
        Services: path.resolve(__dirname, './src/services'),
      },
    },
    devtool: 'source-map',
  },
};
