const path = require("path");

const OUT_DIR = path.resolve(__dirname, "resources/lambda/deployment");

module.exports = {
  entry: {
    index: path.resolve(__dirname, "index.js"),
  },
  externals: ["aws-sdk"],
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].js",
    library: "[name]",
    libraryTarget: "umd",
  },
  target: "node",
  mode: "production",
};
