# 一、JavaScript HTML DOM

通过 HTML DOM，可以访问 JavaScript HTML 文档的所有元素

## 1.HTML DOM（文档对象模型）

当页面被加载时，浏览器会创建页面的文档对象模型(Document Object Model)。

![DOM树](./../static/HTMLDOM.gif)

通过可编辑的对象模型，JavaScript 获得了足够的能力来创建动态的 HTML。

- JavaScript 能够改变页面中的所有 HTML 元素。
- JavaScript 能够改变页面中的所有 HTML 属性。
- JavaScript 能够改变页面中的所有 CSS 样式。
- JavaScript 能够对页面中的所有事件作出反应。

## 2.查找 HTML 元素

通常，通过 JavaScript，您需要操作 HTML 元素。

有三种方法来做这件事：

- 通过 id 找到 HTML 元素：`document.getElementById()`
- 通过标签名找到 HTML 元素：`document.getElementByTagName()`
- 通过类名找到 HTML 元素：`document.getElementByClassName()`

# 二、DOM HTML

HTML DOM 允许 JavaScript 改变 HTML 元素的内容。

## 1.改变 HTML 输出流

在 JavaScript 中，`document.write()` 可用于直接向 HTML 输出流写内容。

```js
<!DOCTYPE html>
<html>
<body>

<script>
document.write(Date());
</script>

</body>
</html>
```

> 绝对不要在文档(DOM)加载完成之后使用 document.write()。这会覆盖该文档。

## 2.改变 HTML 内容

修改 HTML 内容的最简单方式是使用 `innerHTML` 属性。如果需要改变 HTML 元素的内容：

```js
document.getElementById(id).innerHTML=新的 HTML
```

## 3.改变 HTML 属性

如果需要改变 HTML 元素的属性：

```js
document.getElementById(id).attribute = 新属性值;

<!DOCTYPE html>
<html>
<body>

<img id="image" src="smiley.gif">

<script>
document.getElementById("image").src="landscape.jpg";
</script>

</body>
</html>
```

# 三、DOM CSS

HTML DOM 允许 JavaScript 改变 HTML 元素的样式。

## 1.改变 HTML 样式

如需改变 HTML 元素的样式：

```js
document.getElementById(id).style.property = 新样式;

<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>菜鸟教程(runoob.com)</title>
</head>
<body>

<p id="p1">Hello World!</p>
<p id="p2">Hello World!</p>
<script>
document.getElementById("p2").style.color="blue";
document.getElementById("p2").style.fontFamily="Arial";
document.getElementById("p2").style.fontSize="larger";
</script>
<p>以上段落通过脚本修改。</p>

</body>
</html>
```

# 四、HTML DOM 事件

HTML DOM 使 JavaScript 有能力对 HTML 事件做出反应。

## 1.HTML 事件属性

如需向 HTML 元素分配事件，您可以使用事件属性。

```js
// 向 button 元素分配 onclick 事件：
<button onclick="displayDate()">点这里</button>
```

## 2.使用 HTML DOM 来分配事件

HTML DOM 允许您使用 JavaScript 来向 HTML 元素分配事件：

```js
// 向 button 元素分配 onclick 事件：
<script>
  document.getElementById("myBtn").onclick=function(){displayDate()};
</script>
```

# 五、HTML DOM EventListener

## 1.addEventListener() 方法

```js
document.getElementById('myBtn').addEventListener('click', displayDate)
```

- `addEventListener()` 方法用于向指定元素添加事件句柄。
- `addEventListener()`方法添加的事件句柄不会覆盖已存在的事件句柄。
- 可以向一个元素添加多个事件句柄。
- 可以向一个元素添加多个同类型的事件句柄。
- 可以向任何 DOM 对象添加事件监听，不仅限于 HTML 元素。如：window 对象。
- `addEventListener()`方法可更简单的控制事件（冒泡或捕获）。
- 当使用`addEventListener()`方法事，JavaScript 从 HTMl 标记中分离开，可读性更强，在没有控制 HTML 标记时也可以添加事件监听。
- 可以使用`removeEventListener()`方法来移除事件监听。

## 2.语法

```js
element.addEventListener(event, function, useCapture);
```

- 第一个参数：事件类型。
- 第二个参数：触发后调用的函数。
- 第三个参数：布尔值，用于描述事件是否冒泡还是捕获。
  > 注意:不要使用 "on" 前缀。 例如，使用 "click" ,而不是使用 "onclick"。

## 3.向元素添加事件句柄

```js
element.addEventListener('click', myFunction)

function myFunction() {
  alert('Hello World!')
}
```

## 4.事件冒泡或事件捕获

事件传递有两种方式：**冒泡**与**捕获**。

事件传递定义了元素事件触发的顺序。 如果你将 `<p>` 元素插入到 `<div>` 元素中，用户点击 `<p>` 元素, 哪个元素的 "click" 事件先被触发呢？

在 **冒泡** 中，内部元素的事件会先被触发，然后再触发外部元素，即： `<p>` 元素的点击事件先触发，然后会触发 `<div>` 元素的点击事件。

在 **捕获** 中，外部元素的事件会先被触发，然后才会触发内部元素的事件，即： `<div>` 元素的点击事件先触发 ，然后再触发 `<p>` 元素的点击事件

# 六、HTML DOM Document 对象

## 1.HTML DOM 节点

在 HTML DOM(Document Object Model)中，每一个元素都是**节点**：

- 文档是一个文档节点。
- 所有的 HTML 元素都是元素节点。
- 所有 HTML 属性都是属性节点。
- 文本插入到 HTML 元素是文本节点。
- 注释是注释节点。

## 2.Document 对象

当浏览器载入 HTML 文档，它就会成为 **Document 对象**。Document 对象是 HTML 文档的根节点。Document 对象使我们可以从脚本中对 HTML 页面中的所有元素进行访问。

> Document 对象是 Window 对象的一部分，可通过 window.document 属性对其进行访问。

## 3.Document 对象属性和方法

| 属性/方法                         | 描述                                                                                               |
| :-------------------------------- | :------------------------------------------------------------------------------------------------- |
| document.activeElement            | 返回当前获取焦点元素                                                                               |
| document.addEventListener()       | 向文档添加事件句柄                                                                                 |
| document.adoptNode(node)          | 从另一个文档返回 adapded 节点到当前文档。                                                          |
| document.anchors                  | 返回对文档中所有 Anchor 对象的引用                                                                 |
| document.baseURI                  | 返回文档的绝对基础 URI 1                                                                           |
| document.body                     | 返回文档的 body 元素 1                                                                             |
| document.close()                  | 关闭用 document.open() 方法打开的输出流，并显示选定的数据。                                        |
| document.cookie                   | 设置或返回与当前文档有关的所有 cookie。                                                            |
| document.createAttribute()        | 创建一个属性节点                                                                                   |
| document.createComment()          | createComment() 方法可创建注释节点。                                                               |
| document.createDocumentFragment() | 创建空的 DocumentFragment 对象，并返回此对象。                                                     |
| document.createElement()          | 创建元素节点。                                                                                     |
| document.createTextNode()         | 创建文本节点。                                                                                     |
| document.doctype                  | 返回与文档相关的文档类型声明 (DTD)。                                                               |
| document.documentElement          | 返回文档的根节点                                                                                   |
| document.documentMode             | 返回用于通过浏览器渲染文档的模式                                                                   |
| document.documentURI              | 设置或返回文档的位置                                                                               |
| document.domain                   | 返回当前文档的域名。                                                                               |
| document.embeds                   | 返回文档中所有嵌入的内容（embed）集合                                                              |
| document.forms                    | 返回对文档中所有 Form 对象引用。                                                                   |
| document.getElementsByClassName() | 返回文档中所有指定类名的元素集合，作为 NodeList 对象。                                             |
| document.getElementById()         | 返回对拥有指定 id 的第一个对象的引用。                                                             |
| document.getElementsByName()      | 返回带有指定名称的对象集合。                                                                       |
| document.getElementsByTagName()   | 返回带有指定标签名的对象集合。                                                                     |
| document.images                   | 返回对文档中所有 Image 对象引用。                                                                  |
| document.implementation           | 返回处理该文档的 DOMImplementation 对象。                                                          |
| document.importNode()             | 把一个节点从另一个文档复制到该文档以便应用。                                                       |
| document.inputEncoding            | 返回用于文档的编码方式（在解析时）。                                                               |
| document.lastModified             | 返回文档被最后修改的日期和时间。                                                                   |
| document.links                    | 返回对文档中所有 Area 和 Link 对象引用。                                                           |
| document.normalize()              | 删除空文本节点，并连接相邻节点                                                                     |
| document.normalizeDocument()      | 删除空文本节点，并连接相邻节点的 1                                                                 |
| document.open()                   | 打开一个流，以收集来自任何 document.write() 或 document.writeln() 方法的输出。                     |
| document.querySelector()          | 返回文档中匹配指定的 CSS 选择器的第一元素                                                          |
| document.querySelectorAll()       | document.querySelectorAll() 是 HTML5 中引入的新方法，返回文档中匹配的 CSS 选择器的所有元素节点列表 |
| document.readyState               | 返回文档状态 (载入中……)                                                                            |
| document.referrer                 | 返回载入当前文档的文档的 URL。                                                                     |
| document.removeEventListener()    | 移除文档中的事件句柄(由 addEventListener() 方法添加)                                               |
| document.renameNode()             | 重命名元素或者属性节点。                                                                           |
| document.scripts                  | 返回页面中所有脚本的集合。                                                                         |
| document.strictErrorChecking      | 设置或返回是否强制进行错误检查。                                                                   |
| document.title                    | 返回当前文档的标题。                                                                               |
| document.URL                      | 返回文档完整的 URL                                                                                 |
| document.write()                  | 向文档写 HTML 表达式 或 JavaScript 代码。                                                          |
| document.writeln()                | 等同于 write() 方法，不同的是在每个表达式之后写一个换行符。                                        |

### 警告！！！

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

# 七、HTML DOM 元素对象

## 1.元素对象

在 HTML DOM 中，元素对象代表着一个 HTML 元素。

元素对象的 子节点 可以是元素节点，文本节点，注释节点。

NodeList 对象代表了节点列表，类似于 HTML 元素的子节点集合。

元素可以有属性，属性属于属性节点。

## 2.元素对象的属性和方法

| 属性/方法                         | 描述                                                                                                                                                                                 |
| :-------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| element.accessKey                 | 设置或返回 accesskey 一个元素                                                                                                                                                        |
| element.addEventListener()        | 向指定元素添加事件句柄                                                                                                                                                               |
| element.appendChild()             | 为元素添加一个新的子元素                                                                                                                                                             |
| element.attributes                | 返回元素的属性数组                                                                                                                                                                   |
| element.childNodes                | 返回元素的一个子节点的数组                                                                                                                                                           |
| element.children                  | 返回元素的子元素的结合                                                                                                                                                               |
| element.classList                 | 返回元素的类名，作为 DOMTokenList 对象                                                                                                                                               |
| element.className                 | 设置或返回元素的 class 属性                                                                                                                                                          |
| element.clientHeight              | 在页面上返回内容的可视高度（不包括边框、边距、滚定调）                                                                                                                               |
| element.clientWidth               | 在页面上返回内容的可视宽度（不包括边框、边距、滚定调）                                                                                                                               |
| element.cloneNode()               | 克隆某个元素                                                                                                                                                                         |
| element.compareDocumentPosition() | 比较两个元素的文档位置。                                                                                                                                                             |
| element.contentEditable           | 设置或返回元素的内容是否可编辑                                                                                                                                                       |
| element.dir                       | 设置或返回一个元素中的文本方向                                                                                                                                                       |
| element.firstChild                | 设返回元素的第一个子节点                                                                                                                                                             |
| element.focus()                   | 设置文档或元素获取焦点                                                                                                                                                               |
| element.getAttribute()            | 返回指定属性节点                                                                                                                                                                     |
| element.getElementsByTagName()    | 返回指定标签名的所有子元素集合                                                                                                                                                       |
| element.getElementsByClassName()  | 返回文档中所有指定类名元素集合，作为 NodeList 对象                                                                                                                                   |
| element.getFeature()              | 返回指定特征的执行 APIs 对象                                                                                                                                                         |
| element.getUserData()             | 返回一个元素中关联键值的对象                                                                                                                                                         |
| element.hasAttribute()            | 如果元素中存在指定的属性返回 true，，否则返回 false                                                                                                                                  |
| element.hasAttributes()           | 如果元素有任何属性返回 true,否则返回 false                                                                                                                                           |
| element.hasChildNodes()           | 返回一个元素是否具有任何子元素                                                                                                                                                       |
| element.hasFocus()                | 返回布尔值，检测文档或元素是否获取焦点                                                                                                                                               |
| element.id                        | 设置或返回元素的 id                                                                                                                                                                  |
| element.innerHTML                 | 设置或返回远元素的内容                                                                                                                                                               |
| element.insertBefore()            | 现有的子元素之前插入一个新的子元素                                                                                                                                                   |
| element.isContentEditable         | 如果元素内容可以编辑则返回 true,否则返回 false                                                                                                                                       |
| element.isDefaultNamespace()      | 如果指定了 namespaceURL 返回 true，否则返回 false                                                                                                                                    |
| element.isEqualNode()             | 检查两个元素是否相等                                                                                                                                                                 |
| element.isSameNode()              | 检查两个元素所有有相同节点。                                                                                                                                                         |
| element.isSupported()             | 如果在元素中支持指定特征则返回 true                                                                                                                                                  |
| element.lang                      | 设置或返回一个元素的语言                                                                                                                                                             |
| element.lastChild                 | 返回的最后一个子节点                                                                                                                                                                 |
| element.namespaceURI              | 返回命名空间的 URI。                                                                                                                                                                 |
| element.nextSibling               | 返回该元素紧跟的一个节点                                                                                                                                                             |
| element.nextElementSibling        | 返回指定元素之后的下一个兄弟元素（相同节点树层中的下一个元素节点）。                                                                                                                 |
| element.nodeName                  | 返回元素的标记名（大写）                                                                                                                                                             |
| element.nodeType                  | 返回元素的节点类型                                                                                                                                                                   |
| element.nodeValue                 | 返回元素的节点值                                                                                                                                                                     |
| element.normalize()               | 使得此成为一个"normal"的形式，其中只有结构（如元素，注释，处理指令，CDATA 节和实体引用）隔开 Text 节点，即元素（包括属性）下面的所有文本节点，既没有相邻的文本节点也没有空的文本节点 |
| element.offsetHeight              | 返回任何一个元素的高度包括边框和填充，但不是边距                                                                                                                                     |
| element.offsetWidth               | 返回元素的宽度，包括边框和填充，但不是边距                                                                                                                                           |
| element.offsetLeft                | 返回当前元素的相对水平偏移位置的偏移容器                                                                                                                                             |
| element.offsetParent              | 返回元素的偏移容器                                                                                                                                                                   |
| element.offsetTop                 | 返回当前元素的相对垂直偏移位置的偏移容器                                                                                                                                             |
| element.ownerDocument             | 返回元素的根元素（文档对象）                                                                                                                                                         |
| element.parentNode                | 返回元素的父节点                                                                                                                                                                     |
| element.previousSibling           | 返回某个元素紧接之前元素                                                                                                                                                             |
| element.previousElementSibling    | 返回指定元素的前一个兄弟元素（相同节点树层中的前一个元素节点）。                                                                                                                     |
| element.querySelector()           | 返回匹配指定 CSS 选择器元素的第一个子元素                                                                                                                                            |
| document.querySelectorAll()       | 返回匹配指定 CSS 选择器元素的所有子元素节点列表                                                                                                                                      |
| element.removeAttribute()         | 从元素中删除指定的属性                                                                                                                                                               |
| element.removeAttributeNode()     | 删除指定属性节点并返回移除后的节点。                                                                                                                                                 |
| element.removeChild()             | 删除一个子元素                                                                                                                                                                       |
| element.removeEventListener()     | 移除由 addEventListener() 方法添加的事件句柄                                                                                                                                         |
| element.replaceChild()            | 替换一个子元素                                                                                                                                                                       |
| element.scrollHeight              | 返回整个元素的高度（包括带滚动条的隐蔽的地方）                                                                                                                                       |
| element.scrollLeft                | 返回当前视图中的实际元素的左边缘和左边缘之间的距离                                                                                                                                   |
| element.scrollTop                 | 返回当前视图中的实际元素的顶部边缘和顶部边缘之间的距离                                                                                                                               |
| element.scrollWidth               | 返回元素的整个宽度（包括带滚动条的隐蔽的地方）                                                                                                                                       |
| element.setAttribute()            | 设置或者改变指定属性并指定值。                                                                                                                                                       |
| element.setAttributeNode()        | 设置或者改变指定属性节点。                                                                                                                                                           |
| element.setIdAttribute()          |                                                                                                                                                                                      |
| element.setIdAttributeNode()      |                                                                                                                                                                                      |
| element.setUserData()             | 在元素中为指定键值关联对象。                                                                                                                                                         |
| element.style                     | 设置或返回元素的样式属性                                                                                                                                                             |
| element.tabIndex                  | 设置或返回元素的标签顺序。                                                                                                                                                           |
| element.tagName                   | 作为一个字符串返回某个元素的标记名（大写）                                                                                                                                           |
| element.textContent               | 设置或返回一个节点和它的文本内容                                                                                                                                                     |
| element.title                     | 设置或返回元素的 title 属性                                                                                                                                                          |
| element.toString()                | 一个元素转换成字符串                                                                                                                                                                 |
| element.item()                    | 返回某个元素基于文档树的索引                                                                                                                                                         |
| element.length                    | 返回节点列表的节点数目。                                                                                                                                                             |

# 八、HTML DOM 属性对象

## 1.Attr 对象

在 HTML DOM 中，**Attr 对象**代表一个 HTML 属性。HTML 属性总是属于 HTML 元素。

## 2.NamedNodeMap 对象

在 HTML DOM 中，**NamedNodeMap 对象**表示一个无顺序的节点列表。我们可以通过节点名称来访问 NamedNodeMap 中的节点。

## 3.属性和方法

所有主流浏览器都支持 Attr 对象和 NamedNodeMap 对象。

| 属性/方法              | 描述                                                        |
| :--------------------- | :---------------------------------------------------------- |
| attr.isId              | 如果属性是 ID 类型，则 isId 属性返回 true，否则返回 false。 |
| attr.name              | 返回属性名称                                                |
| attr.value             | 设置或者返回属性值                                          |
| attr.specified         | 如果属性被指定返回 true ，否则返回 false                    |
| attr.getNamedItem()    | 从节点列表中返回的指定属性节点。                            |
| attr.item()            | 返回节点列表中处于指定索引号的节点。                        |
| attr.length            | 返回节点列表的节点数目。                                    |
| attr.removeNamedItem() | 删除指定属性节点                                            |
| attr.setNamedItem()    | 设置指定属性节点(通过名称)                                  |

### DMO 4 警告！！！

在 W3C DOM 内核中, Attr (属性) 对象继承节点对象的所有属性和方法 。在 DOM 4 中, Attr (属性) 对象不再从节点对象中继承。

**从长远的代码质量来考虑，在属性对象中你需要避免使用节点对象属性和方法:**

| 属性/方法            | 避免原因                   |
| :------------------- | :------------------------- |
| attr.appendChild()   | 属性没有子节点             |
| attr.attributes      | 属性没有属性               |
| attr.baseURI         | 使用 document.baseURI 替代 |
| attr.childNodes      | 属性没有子节点             |
| attr.cloneNode()     | 使用 attr.value 替代       |
| attr.firstChild      | 属性没有子节点             |
| attr.hasAttributes() | 属性没有属性               |
| attr.hasChildNodes   | 属性没有子节点             |
| attr.insertBefore()  | 属性没有子节点             |
| attr.isEqualNode()   | 没有意义                   |
| attr.isSameNode()    | 没有意义                   |
| attr.isSupported()   | 通常为 true                |
| attr.lastChild       | 属性没有兄弟节点           |
| attr.nodeName        | 使用 attr.name 替代        |
| attr.nodeType        | 通常为 2 (ATTRIBUTE-NODE)  |
| attr.nodeValue       | 使用 attr.value 替代       |
| attr.normalize()     | 属性没有规范               |
| attr.ownerDocument   | 通常为你的 HTML 文档       |
| attr.ownerElement    | 你用来访问属性的 HTML 元素 |
| attr.parentNode      | 你用来访问属性的 HTML 元素 |
| attr.previousSibling | 属性没有兄弟节点           |
| attr.removeChild     | 属性没有子节点             |
| attr.replaceChild    | 属性没有子节点             |
| attr.textContent     | 使用 attr.value 替代       |
