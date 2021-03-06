const path = require("path");
const config = new (require('webpack-chain'))()

config.context(path.resolve(__dirname, ".")) //webpack上下文目录为项目根目录
.entry("app") //入口文件名称为app
  .add("./src/main.ts") //入口文件为./src/main.ts
  .end()
.output
  .path(path.join(__dirname, "./dist")) //webpack输出的目录为根目录的dist目录
  .filename("[name].[hash:8].js") //打包出来的bundle名称为[name].[contenthash:8].js
  .publicPath("./") //publicpath配置为"./"
  .end()
.resolve
  .extensions//配置以.js等结尾的文件当模块使用的时候都可以省略后缀
    .add("js").add(".jsx").add(".ts").add(".tsx").add(".vue")
    .end()
  .end()
.module
  .rule("type-script")
    .test(/\.tsx?$/) //loader加载的条件是ts或tsx后缀的文件
    .use("ts-loader")
      .loader("ts-loader")
      .options({ //ts-loader相关配置
        transpileOnly: true,
        appendTsSuffixTo: ['\\.vue$']
      })
      .end()
    .end()
  .rule("vue")
    .test(/\.vue$/)// 匹配.vue文件
      .use("vue-loader")
      .loader("vue-loader")
      .end()
    .end()
  .end()
.plugin("vue-loader-plugin")
  .use(require("vue-loader").VueLoaderPlugin, [])
  .end()
.devServer
  .host("192.168.113.154")
  .port(8891) //当前端口号
  // .hot(true) //热载
  .open(true) //开启页面
// .end()
  

module.exports = config.toConfig();