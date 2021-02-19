const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  // 部署应用时的基本 URL
  // 如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。
  // 例如，如果你的应用被部署在 https://www.my-app.com/my-app/，则设置 publicPath 为 /my-app/
  publicPath: process.env.NODE_ENV === 'production' ? '/production/' : '/',
  // build时构建文件的目录 构建时传入 --no-clean 可关闭该行为
  outputDir: '/dist',
  // build时放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  assetsDir: '/static',
  // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
  indexPath: '/',
  // 默认在生成的静态资源文件名中包含 hash 以便更好的控制缓存。
  filenameHashing: false,
  // "多页面"模式下。每个“page”应该有一个对应的 JavaScript 入口文件。其值应该是一个对象，对象的 key 是入口的名字，
  // value 是：一个指定了 entry, template, filename, title 和 chunks 的对象 (除了 entry 之外都是可选的)；或一个指定其 entry 的字符串。
  pages: {
    index: {
      entry: '/src/main.js', // page 的入口
      template: '/index.html', // 模板文件来源
      filename: 'index.html', // 在 dist/index.html 的输出
      title: '主页 Index Page', // 当使用 title 选项时，template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      chunks: ['chunk-vendors', 'chunk-common', 'index'], // 在这个页面中包含的块，默认情况下会包含, 提取出来的通用 chunk 和 vendor chunk。
    },
    // 当使用只有入口的字符串格式时，
    // 模板会被推导为 `public/subpage.html`
    // 并且如果找不到的话，就回退到 `public/index.html`。
    // 输出文件名会被推导为 `subpage.html`。
    subpage: 'src/pages/main.js',
  },
  // 是否在保存的时候使用 `eslint-loader` 进行检查。
  // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码 (在生产构建时禁用 eslint-loader)
  lintOnSave: process.env.NODE_ENV !== 'production',
  // 是否使用包含运行时编译器的 Vue 构建版本
  runtimeCompiler: false,
  // 是否为生产环境构建生成 source map？，设为false打包时不生成.map文件, 以加速生产环境构建
  productionSourceMap: false,

  // babel-loader 默认会跳过 node_modules 依赖。通过这个选项可以显式转译一个依赖。
  // Babel 显式转译列表
  transpileDependencies: [
    /* string or regex */
  ],
  // 调整内部的 webpack 配置。
  // 查阅 https://cli.vuejs.org/guide/webpack.html#simple-configuration
  // 如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中。
  // 如果这个值是一个函数，则会接收被解析的配置作为参数。该函数既可以修改配置并不返回任何东西，也可以返回一个被克隆或合并过的配置版本。
  configureWebpack: (config) => {
    config.resolve = {
      // 配置解析别名
      extensions: ['.js', '.json', '.vue'],
      alias: {
        '@': path.resolve(__dirname, './src'),
        components: path.resolve(__dirname, './src/components'),
      },
    }
  },
  // 对内部的 webpack 配置（比如修改、增加Loader选项）(链式操作)。
  chainWebpack: () => {},
  // CSS 相关选项
  css: {
    // 当为true时，css文件名可省略 module 默认为 false
    modules: true,
    // 是否将组件中的 CSS 提取至一个独立的 CSS 文件中,当作为一个库构建时，你也可以将其设置为 false 免得用户自己导入 CSS
    // 默认生产环境下是 true，开发环境下是 false
    extract: false,
    // 是否为 CSS 开启 source map。设置为 true 之后可能会影响构建的性能
    sourceMap: false,
    //向 CSS 相关的 loader 传递选项(支持 css-loader postcss-loader sass-loader less-loader stylus-loader)
    loaderOptions: {},
  },
  // 配置 webpack-dev-server 行为。
  devServer: {
    port: 6000,
    host: '0.0.0.0',
  },
  // 传递给 PWA 插件的选项。
  // 查阅 https://github.com/vuejs/vue-cli/tree/dev/packages/@vue/cli-plugin-pwa
  pwa: {},
  // 在生产环境下为 Babel 和 TypeScript 使用 `thread-loader`
  // 在多核机器下会默认开启。
  parallel: require('os').cpus().length > 1,
  // 三方插件的选项
  pluginOptions: {
    // ...
  },
}