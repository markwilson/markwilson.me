module.exports = function override(config, env) {
  config.plugins = config.plugins.filter((plugin) => {
    return !["ManifestPlugin", "GenerateSW"].includes(plugin.constructor.name);
  });

  config.entry = {
    loader: "./src/loader.tsx",
  };

  return config;
};
