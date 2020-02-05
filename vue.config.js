module.exports = {
  runtimeCompiler: true,
  css: {
    loaderOptions: {
      sass: {
        prependData: '\n          @import "@/styles/_global.scss";\n        '
      }
    }
  },
  outputDir: 'build'
}
