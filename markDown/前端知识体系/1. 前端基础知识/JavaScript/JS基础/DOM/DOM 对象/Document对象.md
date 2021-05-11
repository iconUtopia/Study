# Document 对象

当浏览器载入 HTML 文档，它就会成为 **Document 对象**。Document 对象是 HTML 文档的根节点。Document 对象使我们可以从脚本中对 HTML 页面中的所有元素进行访问。

> Document 对象是 Window 对象的一部分，可通过 window.document 属性对其进行访问。

## 属性和方法

| 方法      | 描述 |
| :-------- | :--- |
| document. |      |

### 查找 HTML 元素

| 方法                                  | 描述                         |
| :------------------------------------ | :--------------------------- |
| document.getElementById(id)           | 通过元素 id 来查找元素       |
| document.getElementsByTagName(name)   | 通过标签名来查找元素         |
| document.getElementsByClassName(name) | 通过类名来查找元素           |
| document.getElementsByName()          | 返回带有指定名称的对象集合。 |

### 添加和删除元素

| 方法                            | 描述             |
| :------------------------------ | :--------------- |
| document.createElement(element) | 创建 HTML 元素   |
| document.removeChild(element)   | 删除 HTML 元素   |
| document.appendChild(element)   | 添加 HTML 元素   |
| document.replaceChild(element)  | 替换 HTML 元素   |
| document.write(text)            | 写入 HTML 输出流 |

### Document 对象集合

| 集合                | 描述                                     |
| :------------------ | :--------------------------------------- |
| document.all[ ]     | 返回对文档中所有 HTML 元素的引用。       |
| document.anchors[ ] | 返回对文档中所有 Anchor 对象的引用。     |
| document.forms[ ]   | 返回对文档中所有 Form 对象引用。         |
| document.images[ ]  | 返回对文档中所有 Image 对象引用。        |
| document.links[ ]   | 返回对文档中所有 Area 和 Link 对象引用。 |

### Document 对象属性

| 属性                         | 描述                                                                         |
| :--------------------------- | :--------------------------------------------------------------------------- |
| document.body                | 提供对 `<body>` 元素的直接访问。对于定义了框架集的文档，该属性引用最外层的。 |
| document.cookie              | 设置或返回与当前文档有关的所有 cookie。                                      |
| document.domain              | 返回当前文档的域名。                                                         |
| document.lastModified        | 返回文档被最后修改的日期和时间。                                             |
| document.referrer            | 返回载入当前文档的文档的 URL。                                               |
| document.title               | 返回当前文档的标题。                                                         |
| document.URL                 | 返回当前文档的 URL。                                                         |
| document.baseURI             | 返回文档的绝对基础 URI                                                       |
| document.documentURI         | 设置或返回文档的位置                                                         |
| document.activeElement       | 返回当前获取焦点元                                                           |
| document.doctype             | 返回与文档相关的文档类型声明 (DTD)                                           |
| document.documentElement     | 返回文档的根节点                                                             |
| document.documentMode        | 返回用于通过浏览器渲染文档的模式                                             |
| document.domain              | 返回当前文档的域名                                                           |
| document.embeds              | 返回文档中所有嵌入的内容（embed）集合                                        |
| document.forms               | 返回对文档中所有 Form 对象引用。                                             |
| document.implementation      | 返回处理该文档的 DOMImplementation 对象。                                    |
| document.inputEncoding       | 返回用于文档的编码方式（在解析时）                                           |
| document.lastModified        | 返回文档被最后修改的日期和时间。                                             |
| document.readyState          | 返回文档状态 (载入中……)                                                      |
| document.scripts             | 返回页面中所有脚本的集合。                                                   |
| document.strictErrorChecking | 设置或返回是否强制进行错误检查。                                             |
| document.                    |                                                                              |
| document.                    |                                                                              |
| document.                    |                                                                              |
| document.                    |                                                                              |
| document.                    |                                                                              |
| document.                    |                                                                              |

### Document 对象方法

| 方法                              | 描述                                                                           |
| :-------------------------------- | :----------------------------------------------------------------------------- |
| document.addEventListener()       | 向文档添加事件句柄                                                             |
| document.removeEventListener()    | 移除文档中的事件句柄                                                           |
| document.adoptNode(node)          | 从另一个文档返回 adapded 节点到当前文                                          |
| document.write()                  | 向文档写 HTML 表达式 或 JavaScript 代码。                                      |
| document.writeln()                | 等同于 write() 方法，不同的是在每个表达式之后写一个换行符。                    |
| document.open()                   | 打开一个流，以收集来自任何 document.write() 或 document.writeln() 方法的输出。 |
| document.close()                  | 关闭用 document.open() 方法打开的输出流，并显示选定的数据                      |
| document.createDocumentFragment() | 创建空的 DocumentFragment 对象，并返回此对象。                                 |
| document.createAttribute()        | 创建一个属性节点                                                               |
| document.createElement()          | 创建元素节                                                                     |
| document.createTextNode()         | 创建文本节                                                                     |
| document.createComment()          | 可创建注释节点。                                                               |
| document.importNode()             | 把一个节点从另一个文档复制到该文档以便应用。                                   |
| document.normalize()              | 删除空文本节点，并连接相邻节点                                                 |
| document.querySelector()          | 返回文档中匹配指定的 CSS 选择器的第一元素                                      |
| document.querySelectorAll()       | HTML5 引入的新方法，返回文档中匹配的 CSS 选择器的所有元素节点列表              |
| document.renameNode()             | 重命名元素或者属性节点。                                                       |
| document.                         |                                                                                |
| document.                         |                                                                                |
| document.                         |                                                                                |
| document.                         |                                                                                |
| document.                         |                                                                                |

#### 警告！！！

在 W3C DOM 核心，**文档对象**继承**节点对象**的所有属性和方法。很多属性和方法在文档中是没有意义的。

**HTML**文档对象可以避免使用这些节点对象和属性：

| 属性/方法                | 避免的原因                  |
| :----------------------- | :-------------------------- |
| document.attributes      | 文档没有该属性              |
| document.hasAttributes() | 文档没有该属性              |
| document.nextSibling     | 文档没有下一节点            |
| document.nodeName        | 这个通常是 #document        |
| document.nodeType        | 这个通常是 9(DOCUMENT_NODE) |
| document.nodeValue       | 文档没有一个节点值          |
| document.ownerDocument   | 文档没有主文档              |
| document.ownerElement    | 文档没有自己的节点          |
| document.parentNode      | 文档没有父节点              |
| document.previousSibling | 文档没有兄弟节点            |
| document.textContent     | 文档没有文本节点            |
