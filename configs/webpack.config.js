const webpack = require('webpack');
const path = require('path');
const dotenv = require('dotenv');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

dotenv.config();

const {
  NODE_ENV = 'development',
  DEV_SERVER_PORT,
} = process.env;

const isProduction = NODE_ENV === 'production';

module.exports = {
  mode: NODE_ENV,
  entry: './src/index.tsx',
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      { 
        test: /\.([cm]?ts|tsx)$/i, 
        loader: "ts-loader" 
      },
      { 
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          "sass-loader",
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                config: path.resolve(__dirname, './postcss.config.js'),
              },
            },
          },
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].[chunkhash].css',
      ignoreOrder: true,
    }),
    new webpack.DefinePlugin({
      "process.env.CLIENT_BASE_URL": JSON.stringify(process.env.CLIENT_BASE_URL),
      "process.env.API_LOGIN": JSON.stringify(process.env.API_LOGIN),
      "process.env.API_PASSWORD": JSON.stringify(process.env.API_PASSWORD),
    }),
  ],
  output: {
    path: path.join(__dirname, '../', 'dist'),
    filename: 'index.js',
  },
  devServer: isProduction ? {} : {
    static: {
      directory: path.join(__dirname, '../', 'dist'),
    },
    hot: true,
    port: DEV_SERVER_PORT || 1111,
  },
};