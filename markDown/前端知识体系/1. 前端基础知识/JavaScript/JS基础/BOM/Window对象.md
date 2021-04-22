# Window 浏览器对象模型

## 浏览器对象模型（Browser Object Model(BOM)）允许 JavaScript 与浏览器对话

不存在浏览器对象模型（BOM）的官方标准。

现代的浏览器已经（几乎）实现了 JavaScript 交互相同的方法和属性，因此它经常作为 BOM 的方法和属性被提到。

## Window 对象

所有浏览器都支持 Window 对象。它代表浏览器的窗口。

所有全局的 JavaScript 对象，函数和属性自动成为 window 对象的成员。

全局变量是 Window 对象的属性。

全局函数是 Window 对象的方法。

## Window 对象属性

| 属性                  | 描述                                                                                         |
| :-------------------- | :------------------------------------------------------------------------------------------- |
| window.closed         | 返回窗口是否已被关闭。                                                                       |
| window.defaultStatus  | 设置或返回窗口状态栏中的默认文本。                                                           |
| window.document       | 对 Document 对象的只读引用。                                                                 |
| window.frames         | 返回窗口中所有命名的框架。该集合是 Window 对象的数组，每个 Window 对象在窗口中含有一个框架。 |
| window.history        | 对 History 对象的只读引用。                                                                  |
| window.innerHeight    | 返回窗口的文档显示区的高度。                                                                 |
| window.innerWidth     | 返回窗口的文档显示区的宽度。                                                                 |
| window.localStorage   | 在浏览器中存储 key/value 对。没有过期时间。                                                  |
| window.length         | 设置或返回窗口中的框架数量。                                                                 |
| window.location       | 用于窗口或框架的 Location 对象。                                                             |
| window.name           | 设置或返回窗口的名称。                                                                       |
| window.navigator      | 对 Navigator 对象的只读引用。                                                                |
| window.opener         | 返回对创建此窗口的窗口的引用。                                                               |
| window.outerHeight    | 返回窗口的外部高度，包含工具条与滚动条。                                                     |
| window.outerWidth     | 返回窗口的外部宽度，包含工具条与滚动条。                                                     |
| window.pageXOffset    | 设置或返回当前页面相对于窗口显示区左上角的 X 位置。                                          |
| window.pageYOffset    | 设置或返回当前页面相对于窗口显示区左上角的 Y 位置。                                          |
| window.parent         | 返回父窗口。                                                                                 |
| window.screen         | 对 Screen 对象的只读引用。                                                                   |
| window.screenLeft     | 返回相对于屏幕窗口的 x 坐标                                                                  |
| window.screenTop      | 返回相对于屏幕窗口的 y 坐标                                                                  |
| window.screenX        | 返回相对于屏幕窗口的 x 坐标                                                                  |
| window.sessionStorage | 在浏览器中存储 key/value 对。 在关闭窗口或标签页之后将会删除这些数据。                       |
| window.screenY        | 返回相对于屏幕窗口的 y 坐标                                                                  |
| window.self           | 返回对当前窗口的引用。等价于 Window 属性。                                                   |
| window.status         | 设置窗口状态栏的文本。                                                                       |
| window.top            | 返回最顶层的父窗口。                                                                         |

## Window 对象方法

| 方法                      | 描述                                                              |
| :------------------------ | :---------------------------------------------------------------- |
| window.alert()            | 显示带有一段消息和一个确认按钮的警告框。                          |
| window.atob()             | 解码一个 base-64 编码的字符串。                                   |
| window.btoa()             | 创建一个 base-64 编码的字符串。                                   |
| window.blur()             | 把键盘焦点从顶层窗口移开。                                        |
| window.clearInterval()    | 取消由 setInterval() 设置的 timeout。                             |
| window.clearTimeout()     | 取消由 setTimeout() 方法设置的 timeout。                          |
| window.close()            | 关闭浏览器窗口。                                                  |
| window.confirm()          | 显示带有一段消息以及确认按钮和取消按钮的对话框。                  |
| window.createPopup()      | 创建一个 pop-up 窗口。                                            |
| window.focus()            | 把键盘焦点给予一个窗口。                                          |
| window.getSelection()     | 返回一个 Selection 对象，表示用户选择的文本范围或光标的当前位置。 |
| window.getComputedStyle() | 获取指定元素的 CSS 样式。                                         |
| window.matchMedia()       | 该方法用来检查 media query 语句，它返回一个 MediaQueryList 对象。 |
| window.moveBy()           | 可相对窗口的当前坐标把它移动指定的像素。                          |
| window.moveTo()           | 把窗口的左上角移动到一个指定的坐标。                              |
| window.open()             | 打开一个新的浏览器窗口或查找一个已命名的窗口。                    |
| window.print()            | 打印当前窗口的内容。                                              |
| window.prompt()           | 按照指定的像素调整窗口的大小。                                    |
| window.resizeTo()         | 把窗口的大小调整到指定的宽度和高度。                              |
| window.scrollBy()         | 按照指定的像素值来滚动内容。                                      |
| window.scrollTo()         | 把内容滚动到指定的坐标。                                          |
| window.setInterval()      | 按照指定的周期（以毫秒计）来调用函数或计算表达式。                |
| window.setTimeout()       | 在指定的毫秒数后调用函数或计算表达式。                            |
| window.stop()             | 停止页面载入。                                                    |
