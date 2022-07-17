const {getDefaultConfig} = require('metro-config');
const {makeMetroConfig} = require('@rnx-kit/metro-config');
const MetroSymlinksResolver = require('@rnx-kit/metro-resolver-symlinks');

module.exports = (async () => {
  const defaultConfig = await getDefaultConfig();
  return makeMetroConfig({
    projectRoot: __dirname,
    // Custom resolver for symlinks.
    resolver: {
      resolveRequest: MetroSymlinksResolver(),
      assetExts: [...defaultConfig.resolver.assetExts, 'bin'],
    },
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          inlineRequires: false,
          experimentalImportSupport: false,
        },
      }),
    },
  });
})();
