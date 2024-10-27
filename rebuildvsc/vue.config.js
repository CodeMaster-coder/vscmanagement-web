const path = require("path");
module.exports = {
  
  // 全局路径
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        "~mock": path.resolve(__dirname, "mock"),
      },
    },
  },}
