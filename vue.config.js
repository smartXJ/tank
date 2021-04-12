// vue.config.js
module.exports = {
  pluginOptions: {
    electronBuilder: {
      // List native deps here if they don't work
      externals: ['my-native-dep'],
      // If you are using Yarn Workspaces, you may have multiple node_modules folders
      // List them all here so that VCP Electron Builder can find them
      nodeModulesPath: ['../../node_modules', './node_modules'],
      nodeIntegration: true
      // preload: 'src/preload.js'
    }
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          // less 全局变量
          // 主色
          '@primary-color': '#fb7299',
          '@link-color': '#fb7299'
        }
      }
    }
  }
}