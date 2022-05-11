module.exports = {
  outputDir: 'build',
  productionSourceMap: false,
  runtimeCompiler: true,
  css: {
    extract: true,
  },
  transpileDependencies: ['vuex-persist', 'primevue'],
  pluginOptions: {
    svgSprite: {
      dir: 'src/assets/static',
      test: /\.(svg)(\?.*)?$/,
      loaderOptions: {
        extract: false,
        spriteFilename: 'img/icons.svg',
      },
      pluginOptions: {
        plainSprite: true,
      },
    },
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'langs',
      enableLegacy: false,
      runtimeOnly: false,
      compositionOnly: true,
      fullInstall: true,
    },
  },
  chainWebpack: (config) => {
    config.module.rule('svg-sprite').use('svgo-loader').loader('svgo-loader');
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap((options) => {
        options.compilerOptions = {};
        options.compilerOptions.isCustomElement = (tag) => tag === 'message-view';
        return options;
      });
  },
};
