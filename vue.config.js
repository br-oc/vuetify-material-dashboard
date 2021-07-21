module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:8085',
        changeOrigin: true,
        secure: false,
        logLevel: 'debug',
      },
    },
    disableHostCheck: true,
  },

  transpileDependencies: ['vuetify'],

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false,
    },
  },
}
