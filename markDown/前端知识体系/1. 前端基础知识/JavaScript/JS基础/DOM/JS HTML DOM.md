# JS HTML DOM

## 简介

### HTML DOM（文档对象模型）

当网页被加载时，浏览器会创建页面的文档对象模型（**D**ocument **O**bject **M**odel）。

**HTML DOM** 模型被结构化为**对象树**：
![DOM树](./../img/DOM_Tree.png)

通过这个对象模型，JavaScript 获得创建动态 HTML 的所有力量：

- JavaScript 能改变页面中的所有 HTML 元素
- JavaScript 能改变页面中的所有 HTML 属性
- JavaScript 能改变页面中的所有 CSS 样式
- JavaScript 能删除已有的 HTML 元素和属性
- JavaScript 能添加新的 HTML 元素和属性
- JavaScript 能对页面中所有已有的 HTML 事件作出反应
- JavaScript 能在页面中创建新的 HTML 事件

### 什么是 DOM？

DOM 是一项 W3C (World Wide Web Consortium) 标准。

DOM 定义了访问文档的标准：

“W3C 文档对象模型（DOM）是中立于平台和语言的接口，它允许程序和脚本动态地访问、更新文档的内容、结构和样式。”

W3C DOM 标准被分为 3 个不同的部分：

- Core DOM - 针对任何结构化文档的标准模型
- XML DOM - 针对 XML 文档的标准模型
- HTML DOM - 针对 HTML 文档的标准模型

### 什么是 XML DOM？

XML DOM 定义了所有 XML 元素的**对象**和**属性**，以及访问它们的**方法**。

### 什么是 HTML DOM？

HTML DOM 是：

- HTML 的标准对象模型
- HTML 的标准编程接口
- W3C 标准

  HTML DOM 定义了所有 HTML 元素的**对象**和**属性**，以及访问它们的**方法**。

## 方法

- **HTML DOM 方法是您能够（在 HTML 元素上）执行的动作**。
- **HTML DOM 属性是您能够设置或改变的 HTML 元素的值**。

### DOM 编程界面

HTML DOM 能够通过 JavaScript 进行访问（也可以通过其他编程语言）。

在 DOM 中，所有 HTML 元素都被定义为**对象**。

编程界面是每个对象的属性和方法。

**属性**是您能够获取或设置的值（就比如改变 HTML 元素的内容）。

**方法**是您能够完成的动作（比如添加或删除 HTML 元素）。

### HTML DOM 对象 - 方法和属性

一些常用的 HTML DOM 方法：

- getElementById(id) - 获取带有指定 id 的节点（元素）
- appendChild(node) - 插入新的子节点（元素）
- removeChild(node) - 删除子节点（元素）

一些常用的 HTML DOM 属性：

- innerHTML - 节点（元素）的文本值
- parentNode - 节点（元素）的父节点
- childNodes - 节点（元素）的子节点
- attributes - 节点（元素）的属性节点

## 文档

## 事件监听器

**addEventListener() 方法**

### 语法

```js
element.addEventListener(event, function, useCapture);
```

- 第一个参数：事件的类型
- 第二个参数：当事件发生时我们需要调用的函数。
- 第三个参数：布尔值，指定使用事件冒泡还是事件捕获。默认值是 false，将使用冒泡传播，如果该值设置为 true，则事件使用捕获传播。

**示例**

```js
document.getElementById('myBtn').addEventListener('click', displayDate)
```

- `addEventListener()` 方法为指定元素指定事件处理程序。

- `addEventListener()` 方法为元素附加事件处理程序而不会覆盖已有的事件处理程序
- 您能够向一个元素添加多个事件处理程序。
- 您能够向一个元素添加多个相同类型的事件处理程序，例如两个 "click" 事件。
- 您能够向任何 DOM 对象添加事件处理程序而非仅仅 HTML 元素，例如 window 对象。
- `addEventListener()` 方法使我们更容易控制事件如何对冒泡作出反应。
- 当使用 `addEventListener()` 方法时，JavaScript 与 HTML 标记是分隔的，已达到更佳的可读性；即使在不控制 HTML 标记时也允许您添加事件监听器。
- 您能够通过使用 `removeEventListener()` 方法轻松地删除事件监听器。

### removeEventListener() 方法

`removeEventListener()` 方法会删除已通过 `addEventListener()` 方法附加的事件处理程序：

```js
element.removeEventListener('mousemove', myFunction)
```

## 节点

在 HTML DOM(Document Object Model)中，每一个元素都是**节点**：

- 文档是一个文档节点。
- 所有的 HTML 元素都是元素节点。
- 所有 HTML 属性都是属性节点。
- 文本插入到 HTML 元素是文本节点。
- 注释是注释节点。

## 导航

### 节点关系

节点树中的节点彼此之间有一定的等级关系。

- 术语（父、子和同胞，parent、child 以及 sibling）用于描述这些关- 系。
- 在节点树中，顶端节点被称为根（根节点）。
- 每个节点都有父节点，除了根（根节点没有父节点）。
- 节点能够拥有一定数量的子
- 同胞（兄弟或姐妹）指的是拥有相同父的节点。

### 在节点之间导航

通过 JavaScript，您可以使用以下节点属性在节点之间导航：

- parentNode
- childNodes[nodenumber]
- firstChild
- lastChild
- nextSibling
- previousSibling
