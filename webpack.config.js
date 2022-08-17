const path = require("path");
const fs = require("fs");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

let htmlFiles = [];
let directories = ["src"];
while (directories.length > 0) {
  var directory = directories.pop();
  var dirContents = fs
    .readdirSync(directory)
    .map((file) => path.join(directory, file));

  htmlFiles.push(...dirContents.filter((file) => file.endsWith(".html")));
  directories.push(
    ...dirContents.filter((file) => fs.statSync(file).isDirectory())
  );
}

module.exports = {
  entry: ["./src/index.js"],
  output: {
    path: __dirname + "/build",
  },

  devServer: {
    open: true,
  },

  module: {
    rules: [
      {
        test: /\.html$/i,
        use: "html-loader",
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(jpg|png)$/i,
        type: "asset/resource",
        generator: {
          filename: "images/[name]-[hash][ext]",
        },
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin(),
    new FaviconsWebpackPlugin("./src/favicon.png"),

    ...htmlFiles.map(
      (htmlFile) =>
        new HtmlWebpackPlugin({
          template: htmlFile,
          filename: htmlFile.replace(path.normalize("src/"), ""),
        })
    ),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new HtmlMinimizerPlugin(),
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            "default",
            {
              discardComments: { removeAll: true },
            },
          ],
        },
      }),
    ],
  },
};
