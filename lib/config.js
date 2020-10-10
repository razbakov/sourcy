import path from "path";

const userConfigPath = "sourcy.config.js";

const defaultConfigPath = path.join(
  __dirname,
  "/../lib/config/default.config.js"
);

function resolvePath(filePath) {
  if (filePath[0] === "~") {
    return path.join(process.env.HOME, filePath.slice(1));
  }

  return path.resolve(filePath);
}

function loadConfig() {
  const userConfig = require(resolvePath(userConfigPath));
  const defaultConfig = require(defaultConfigPath);
  const config = { ...defaultConfig, ...userConfig };

  config.sources = config.sources.map((source) => ({
    ...source,
    output: resolvePath(source.output),
  }));

  config.credentialsPath = resolvePath(config.credentialsPath);
  config.tokenPath = resolvePath(config.tokenPath);

  return config;
}

export default loadConfig;
