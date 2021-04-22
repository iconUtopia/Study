# Visual Studio Code 插件

as

### Chinese (Simplified) Language Pack for Visual Studio Code

此中文（简体）语言包为 VS Code 提供本地化界面。

---

## 代码补全

### HTMLHint

html 代码检测

### HTML Snippets

智能提示 HTML 标签，以及标签含义

### HTML CSS Support

智能提示 CSS 类名以及 id

### IntelliSense for CSS class names in HTML

为 HTML 类属性提供 CSS 类名补全。

### Auto Close Tag

自动添加 HTML / XML 关闭标签

### css-auto-prefix

写 CSS 时不再为浏览器前缀发愁

### Auto Rename Tag

修改时自动修改对应的闭合标签

### JavaScript (ES6) code snippets

这个扩展包含了 Vs 代码编辑器的 ES6 语法中的 JavaScript 代码片段(支持 JavaScript 和 TypeScript)。

### JavaScript Snippet Pack

[快速的代码片段包](https://blog.csdn.net/weixin_44713430/article/details/100866242)

###### 配置:

要在键入`</`时自动添加关闭标签，请将以下配置设置为`true`：

```json
"auto-close-tag.SublimeText3Mode": true
```

### CSS-in-JS

在 JS 自动补全中提供 CSS 并将 kebab-case CSS 转换为 camelCase CSS，反之亦然

###### 使用

在 javascript 或 typescript 文件中选择一些文本块，使用 cmd+shift+p 打开命令面板，然后选择转换 CSS-in-JS。或者使用键盘快捷键 cmd+shift+j (Windows 下为 ctrl+shift+j)。

### Axios Snippets

axios 代码片段提示

### jQuery Code Snippets

超过 130 个 jQuery 代码片段用于 JavaScript 代码。只需键入字母'jq'，就可以得到所有可用 jQuery 代码片段的列表。

### Visual Studio IntelliCode

Visual Studio IntelliCode 扩展为 Visual Studio Code 中的 Python，TypeScript / JavaScript 和 Java 开发人员提供了 AI 辅助的开发功能，并基于对代码上下文的理解和机器学习的结合获得了见解。

### Vue 3 Snippets

这个插件基于最新的 Vue 2 及 Vue 3 的 API 添加了 Code Snippets。

---

## 代码调试

### Import Cost

这个扩展将在编辑器内显示导入包的大小。该扩展利用 webpack 与 babili-webpack-plugin，以检测导入的大小。

### Image preview

快速预览 HTML 中的图片

###### 使用

当鼠标移到 html 文档中的图片路径上时，悬浮预览图片，还可跳转到侧边栏文件管理器中或系统文件管理器中

### Path Intellisense

智能补全 html 文件中的文件路径。

### Code Runner

不需要繁琐的“调试”配置，Code Runner 可以快速地以最简洁的方式运行你的任何代码！

###### 运行

1. 键盘快捷键 Ctrl+Alt+N
2. 快捷键 F1 或 Ctrl+Shift+P 调出 命令面板, 然后输入 Run Code
3. 在编辑区右键选择 Run Code
4. 在侧边栏文件管理器中右键你要运行的文件，选择 Run Code
5. 右上角的运行小三角按钮

###### 停止

1. 键盘快捷键 Ctrl+Alt+M
2. 快捷键 F1 或 Ctrl+Shift+P 调出 命令面板, 然后输入 Stop Code Run

###### 配置

```json
"code-runner.runInTerminal": true,//在控制台运行代码，防止乱码和不能输入
"code-runner.executorMap": {
    "javascript": " cls && cd /d $dir && node $fullFileName && pause",
    "python": " cls && cd /d $dir && \"$pythonPath\" -u $fullFileName && pause",
    "bat": " cls && cd /d $dir && $fullFileName"
    /*这是每种语言运行时所执行命令的对应表，因为笔者使用的语言有限，这里只列出了javascript、python和windows批处理的命令，其他语言的命令可自行添加*/
    /*笔者其他博客中可能会有关于对此设置项的添加或删改的内容*/
},
"code-runner.saveFileBeforeRun": true, //运行前自动保存
"code-runner.customCommand": " cls",//这使Ctrl+Alt+K这个快捷键可以快速清空控制台内容
"code-runner.clearPreviousOutput": true,//似乎没啥用，好像是自动清除控制台多余内容，开着吧
"code-runner.respectShebang": false//我是Windows系统所以不需要按shebang来运行
```

### CSS Peek

快速查看定位 CSS 定义非常的方便

###### 使用

按住 ctrl 同时移到鼠标到要查看样式的类上就可以看到该类的定义了。按住 ctrl 键同时点击样式类的名称或者在类的名称上按 F12 键即可跳转到样式的定义。

### Debugger for Chrome

不用打开浏览器的控制台就能进行打断点。

###### 使用

[教程](https://blog.csdn.net/weixin_45295262/article/details/110299445)

### Live Server

实时地使用浏览器预览你的前端页面

###### 使用

在侧边栏文件资源管理器中右键文件选择 Open with Live Server 启动，或打开编辑 html 文件时点击 vscode 下方状态栏右边的 Go Live 启动：

###### 停止

快捷键 F1 或 Ctrl+Shift+P 调出 命令面板, 然后输入 Stop Live Server 以停止 Live Server 服务器。

### open in browser

使用 Alt + B 快捷方式在默认浏览器中打开当前的 html 文件，或 Shift + Alt + B 选择一个浏览器

### REST Client

[REST 客户机允许您发送 HTTP 请求并直接在 Visual Studio 代码中查看响应。](https://blog.csdn.net/weixin_42940467/article/details/114119345)

---

## 格式化

### ESLint

[介绍](https://www.cnblogs.com/jiaoshou/p/12218642.html)
[使用](https://www.cnblogs.com/codexlx/p/14371582.html)

### Prettier - Code formatter

Prettier 是一个固执己见的代码格式化程序。它通过解析代码并使用自己的规则(考虑到最大行长)重新打印代码来实现一致的风格，并在必要时包装代码。

### Vetur

语法高亮、智能感知

---

## 便捷类插件

### 会了吧

### 驼峰翻译助手

### any-rule

### Better Comments

更好辨识的注释色彩

###### 配置：

自定义注释颜色

```json
"better-comments.tags": [
  {
    "tag": "!",
    "color": "#FF2D00",
    "strikethrough": false,
    "backgroundColor": "transparent"
  },
  {
    "tag": "?",
    "color": "#3498DB",
    "strikethrough": false,
    "backgroundColor": "transparent"
  },
  {
    "tag": "//",
    "color": "#474747",
    "strikethrough": true,
    "backgroundColor": "transparent"
  },
  {
    "tag": "todo",
    "color": "#FF8C00",
    "strikethrough": false,
    "backgroundColor": "transparent"
  },
  {
    "tag": "*",
    "color": "#98C379",
    "strikethrough": false,
    "backgroundColor": "transparent"
  }
]
```

### Bracket Pair Colorizer 2

添加括号颜色加以区分

###### 配置

定义用于 着色括号。接受有效的颜色名称，十六进制代码和 rgba()值

```json
"bracket-pair-colorizer-2.colors": [
    "Gold",
    "Orchid",
    "LightSkyBlue"
]
```

### change-case

快速的修改代码的大小写

###### 指令：

- `extension.changeCase.commands`：列出所有变更案例命令，如果仅选择一个单词，则带有预览
- `extension.changeCase.camel`：更改大小写'camel'：转换为字符串，并用下一个字母大写表示分隔符
- `extension.changeCase.constant`：更改大小写“常量”：转换为大写字母，下划线分隔字符串
- `extension.changeCase.dot`：更改大小写的“点”：转换为小写的，句点分隔的字符串
- `extension.changeCase.kebab`：更改大小写“ kebab”：转换为小写字母，用破折号分隔的字符串（参数名的别名）
- `extension.changeCase.lower`：更改大小写为“小写”：转换为小写的字符串
- `extension.changeCase.lowerFirst`：更改大小写“ lowerFirst”：转换为首字母小写的字符串
- `extension.changeCase.no`：转换不带任何大小写的字符串（小写字母，空格分隔）
- `extension.changeCase.param`：更改大小写为'param'：转换为小写字母，用破折号分隔的字符串
- `extension.changeCase.pascal`：更改大小写“
- `extension.changeCase.path`：更改大小写的“路径”：转换为小写，用斜杠分隔的字符串
- `extension.changeCase.sentence`：更改大小写的“句子”：转换为小写的空格分隔的字符串
- `extension.changeCase.snake`：更改大小写“ snake”：转换为小写字母，下划线分隔字符串
- `extension.changeCase.swap`：更改大小写“交换”：转换为字符串，每个字符的大小写取反
- `extension.changeCase.title`：更改大小写“标题”：转换为以空格分隔的字符串，每个单词的第一个字符均大写
- `extension.changeCase.upper`：更改大小写为大写：转换为大写字符串
- `extension.changeCase.upperFirst`：更改大小写为“ upperFirst”：转换为首字母大写的字符串

### clear-console

使用指令`Clear Console Logs`删除活动编辑器中 console.log 的所有实例。

### Code Spell Checker

一个基本的拼写检查程序，可以很好地处理驼峰大小写代码。这个拼写检查器的目标是帮助捕获常见的拼写错误，同时保持低误报的数量。

### colorize

立即在 css / sass / less / postcss / stylus / XML ...文件中可视化 CSS 颜色。

### filesize

左下角显示文件大小的插件

### fix-ctrl-space

在 windows10 环境中，vscode 的显示代码建议快捷键 ctrl+空格被微软拼音占用，并且无法屏蔽。此插件的作用是将 vscode 的显示代码建议的快捷键 ctrl+空格 改为 ctrl+alt+空格

### GitLens — Git supercharged

能显示每一行代码的作者以及提交时间。

### indent-rainbow

这个扩展着色缩进在你的文本前面交替四种不同的颜色在每一步。有些人可能会发现它在为 Nim 或 Python 编写代码时很有帮助。

### Indenticator

视觉上突出当前缩进的深度。这个扩展可以自己使用，但建议使用它与内置的缩进指南(setting editor.renderIndentGuides)一起使用。

这个扩展会在每个缩进上显示细灰线，而这个扩展会在光标当前所在的缩进深度上突出显示缩进。

### javascript console utils

将 vscode-js-console-utils 改为彩色

### lit-html

在 JavaScript 和 TypeScript 标记的模板字符串中添加语法高亮和语言支持，比如 litt -html 和其他框架中使用的。

### Live Share

- 兼容 Visual Studio IDE 和 Visual Studio Code
- 支持微软自家的账号登录和 Github 帐号登录
- 支持项目共享(协作),终端共享(协作),会话共享(协作),日志记录导出

### Markdown All in One

所有你需要 Markdown(键盘快捷键，目录，自动预览和更多)。

### Markdown PDF

这个扩展转换 Markdown 文件到 pdf, html, png 或 jpeg 文件。

### Markdown Preview Enhanced

markdown 预览增强

### px to rem

这是 Visual Studio 代码的扩展，允许您将 px 转换为 rem，反之亦然。

- 将 Alt + Z Px 转换为 rem，然后将 rem 转换为 px。 将选定的文本从 px 转换为 rem，再将 rem 转换为 px。
- Alt + S 要求每 rem 值有一个新的 px。

### RegExp Preview and Editor

基于静态 regexp 的 VSCode 扩展。包括 regexp 表达式预览器和实时预览编辑器。

#### 使用

选中正则代码右键，然后选择 RegExp Preview

### Quokka.js

Quokka.js 是用于快速 JavaScript / TypeScript 原型开发的开发人员生产力工具。 输入时，运行时值将更新并显示在代码旁边的 IDE 中。

###### 使用

先 ctrl+shift+p（MAC shift+cmd+p ）输入 quokka 选择 new javascript

### Trailing Spaces

突出显示尾随空格并立即删除它们！
