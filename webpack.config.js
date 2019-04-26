const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = (env) => {
  return {
    mode: env,
    entry: './client/index.js',
    output: {
      path: path.resolve(__dirname, 'public'),
      filename: './index.bundle.js'
    },
    module: {
      rules: [{
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader",
          options: {
            plugins: env !== 'production' ? ["react-hot-loader/babel"] : []
}
        },
        {
          test: /\.css$/,
          use: [{
              loader: 'style-loader'
            },
            {
              loader: 'css-loader',
              options: {
                modules: true
              }
            }
          ]
        }
      ]
    },

    plugins: [new HtmlWebpackPlugin({
      template: 'client/index.html',
      filename: 'index.html',
      inject: 'body'
    })],

    devServer: {
      proxy: {
          '/socket.io': {
              target: 'http://localhost:3000',
              ws: true
          }
      }
    }

  }
};
