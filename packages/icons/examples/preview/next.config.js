const { PHASE_PRODUCTION_BUILD } = require('next/constants')

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_PRODUCTION_BUILD) {
    return {
        basePath: '/icons/examples/preview',
        experimental: {
          externalDir: true,
        }
    }
  }

  return defaultConfig;
}
