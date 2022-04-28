module.exports = {
  outputDir: 'build',
  productionSourceMap: false,
  runtimeCompiler: true,
  css: {
    extract: true,
  },
  transpileDependencies: ['vuex-persist', 'primevue'],
};
