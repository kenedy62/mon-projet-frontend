

const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false, // 🛠️ Disables blocking linter compilation failures

  pluginOptions: {
    vuetify: {
      // Keep your existing configurations here
    }
  }
})
