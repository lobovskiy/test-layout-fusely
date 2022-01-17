const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: 'development',
  entry: './src/js/index.js',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  watch: false,

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    new CopyPlugin({
      patterns: [
        { from: 'src/favicon.png', to: 'favicon.png' },
      ],
    }),
  ],

  module: {
    rules: [
      {
        test: /\.html/,
        loader: 'html-loader',
        options: {
          sources: {
            list: [
              {
                tag: "img",
                attribute: "src",
                type: "src",
              },
              {
                // Tag name
                tag: "link",
                // Attribute name
                attribute: "href",
                // Type of processing, can be `src` or `scrset`
                type: "src",
                // Allow to filter some attributes
                filter: (tag, attribute, attributes, resourcePath) => {
                  // The `tag` argument contains a name of the HTML tag.
                  // The `attribute` argument contains a name of the HTML attribute.
                  // The `attributes` argument contains all attributes of the tag.
                  // The `resourcePath` argument contains a path to the loaded HTML file.

                  if (!/stylesheet/i.test(attributes.rel)) {
                    return false;
                  }

                  if (
                    attributes.type &&
                    attributes.type.trim().toLowerCase() !== "text/css"
                  ) {
                    return false;
                  }

                  return true;
                },
              },
            ]
          }
        }
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { sourceMap: false } }
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/img/[hash].[ext]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/font/[hash].[ext]'
        }
      },
    ],
  },
};