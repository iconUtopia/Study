# ESLint

## ESLint 简介

ESLint 是一个开源的 JavaScript 代码检查工具，由 Nicholas C. Zakas 于 2013 年 6 月创建。代码检查是一种**静态的分析**，常用于寻找有**问题**的模式或者代码，并且不依赖于具体的**编码风格**。对大多数编程语言来说都会有代码检查，一般来说编译程序会内置检查工具。

JavaScript 是一个动态的弱类型语言，在开发中比较容易出错。因为没有编译程序，为了寻找 JavaScript 代码错误通常需要在执行过程中不断调试。像 ESLint 这样的可以让程序员在编码的过程中发现问题而不是在执行的过程中。

ESLint 的初衷是为了让程序员可以**创建自己的检测规则**。ESLint 的所有规则都被设计成可插入的。ESLint 的默认规则与其他的插件并没有什么区别，规则本身和测试可以依赖于同样的模式。为了便于人们使用，ESLint 内置了一些规则，当然，你可以在使用过程中自定义规则。

ESLint 使用 Node.js 编写，这样既可以有一个快速的运行环境的同时也便于安装。

## 理念

所有都是可拔插的

- 内置规则和自定义规则共用一套规则 API
- 内置的格式化方法和自定义的格式化方法共用一套格式化 API
- 额外的规则和格式化方法能够在运行时指定
- 规则和对应的格式化方法并不强制捆绑使用

每条规则:

- 各自独立
- 可以开启或关闭（没有什么可以被认为“太重要所以不能关闭”）
- 可以将结果设置成警告或者错误

另外:

- ESLint 并不推荐任何编码风格，规则是自由的
- 所有内置规则都是泛化的

项目:

- 通过丰富文档减少沟通成本
- 尽可能的简单透明
- 相信测试的重要性

## <span style="color:red">配置</span>

```JS
module.exports = {
  // 使用此 ESLint 配置文件必填
  root: true,
  // 指定脚本的运行环境。每种环境都有一组特定的预定义全局变量。
  env: {
    // 可用的环境包括: http://eslint.cn/docs/user-guide/configuring 里的 Specifying Environments
    browser: true,
    node: true,
    es6: true,
  },
  // 脚本在执行期间访问的额外的全局变量。
  globals: {
    $: true,
  },
  //此项是用来指定javaScript语言类型和风格，sourceType用来指定js导入的方式，默认是script，此处设置为module，指某块导入方式
  parserOptions: {
    /**
     * ESLint 解析器
     * - Esprima
     * - Babel-ESLint - 一个对Babel解析器的包装，使其能够与 ESLint 兼容。
     * - @typescript-eslint/parser - 将 TypeScript 转换成与 estree 兼容的形式，以便在ESLint中使用。
     */
    parser: 'babel-eslint',
    // 默认设置为 3，5（默认）， 你可以使用 6、7、8、9 或 10 来指定你想要使用的 ECMAScript 版本
    ecmaVersion: 5,
    // 设置为 "script" (默认) 或 "module"（如果你的代码是 ECMAScript 模块)。
    sourceType: 'module',
    ecmaFeatures: {
      // 启用严格模式  (如果 ecmaVersion 是 5 或更高)
      impliedStrict: true,
      // 启用jsx
      jsx: true,
    },
  },
  // 此项是用来提供插件的，插件名称省略了eslint-plugin-，下面这个配置是用来规范html的
  plugins: ['vue'],
  // 添加共享设置,提供给每一个将被执行的规则。
  // settings: {
  //   sharedData: 'Hello',
  // },
  /**
   * 启用的规则及其各自的错误级别。
   * 下面这些rules是用来设置从插件来的规范代码的规则，使用必须去掉前缀eslint-plugin-
   * 主要有如下的设置规则，可以设置字符串也可以设置数字，两者效果一致
   * - "off" -> 0 关闭规则
   * - "warn" -> 1 开启警告规则
   * - "error" -> 2 开启错误规则
   */
  rules: {

  },
    // 所有的规则默认都是禁用的。在配置文件中，使用 "extends": "eslint:recommended" 来启用推荐的规则
  extends: ['standard', 'plugin:vue/essential'],
}
```

## 如何为项目中的不同文件夹配置不同的 ESLint 规则

层叠配置使用离要检测的文件最近的 .eslintrc 文件作为最高优先级，然后才是父目录里的配置文件，等等。如果同一目录下 .eslintrc 和 package.json 同时存在，.eslintrc 优先级高会被使用，package.json 文件将不会被使用。

```
your-project
├── .eslintrc
├── lib
│ └── source.js
└─┬ tests
  ├── .eslintrc
  └── test.js
```

如果在根目录的 package.json 文件中有一个 eslintConfig 字段，其中的配置将使用于所有子目录，但是当 tests 目录下的 .eslintrc 文件中的规则与之发生冲突时，就会覆盖它。

## ESLint 的五种配置方式

配置文件可以写成 `JavaScript`、`YAML`、`JSON`，甚至可以直接配置在`package.json`文件中的

```json
"eslintConfig": {
    "env": {
        "browser": true,
        "node": true
    }
}
```

还可以直接在 JS 文件中用注释书写规则

```js
/* eslint eqeqeq: "off", curly: "error" */
```
