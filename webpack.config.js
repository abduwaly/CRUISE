const path = require('path');

module.exports = {
    entry: './src/index.js',
    devServer: {
      contentBase: './dist',
      watchContentBase: true
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'assets'
    },
    module: {
        rules: [{
            test: /\.(scss|css)$/,
            use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader"
            }, {
                loader: "sass-loader"
            }]
        }]
    },

};
