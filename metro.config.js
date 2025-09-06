const { getDefaultConfig } = require("expo/metro-config");

module.exports = (() => {
  const config = getDefaultConfig(__dirname);
  // add 'mid' so require('../../assets/midi/foo.mid') works
  config.resolver.assetExts.push("mid", "wav", "csv");
  return config;
})();
