const HtmlWebpackPlugin = require("html-webpack-plugin");

const multipleEntry = require("react-app-rewire-multiple-entry")([
  {
    entry: "src/404.tsx",
    template: "public/404.html",
    outPath: "/404.html",
  },
]);

module.exports = {
  webpack: (config, env) => {
    config.plugins = config.plugins.filter((plugin) => {
      return !["ManifestPlugin", "GenerateSW"].includes(
        plugin.constructor.name
      );
    });

    multipleEntry.addMultiEntry(config);

    return config;
  },
};
