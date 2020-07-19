module.exports = function override(config, env) {
  config.plugins = config.plugins.filter((plugin) => {
    return !["ManifestPlugin", "GenerateSW"].includes(plugin.constructor.name);
  });

  return config;
};
