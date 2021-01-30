const path = require("path");

const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports =  {
  entry: "./src/index.jsx",
  output: {
    publicPath: "/",
    path: path.resolve(__dirname, 'dist'),
    filename: "main.js",
  },
  resolve: {
    alias: {
      "@src": path.resolve("./src"),
      "@components": path.resolve("./src/components"),
      "@helpers": path.resolve("./src/helpers")
    },
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(jsx?|jsx?)$/,
        exclude: /node_module/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: ["html-loader"]
      },
      {
        test: /\.(css|scss)$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(svg|png|jpg|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "img"
          }
        }
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    host: "0.0.0.0",
    port: 9000,
    hot: true,
    inline: true,
    compress: true,
    historyApiFallback: true,
    disableHostCheck: true,
    watchContentBase: true,
    watchOptions: {
      poll: true
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CaseSensitivePathsPlugin(),
    new HtmlWebpackPlugin({
        template: "./public/index.html",
    }),
  ]
};