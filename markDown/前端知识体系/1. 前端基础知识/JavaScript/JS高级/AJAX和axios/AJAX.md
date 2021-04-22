# AJAX

AJAX 是一种在无需重新加载整个网页的情况下，能够更新部分网页的技术。

## 什么是 AJAX？

AJAX = Asynchronous JavaScript and XML（异步的 JavaScript 和 XML）。

AJAX 不是新的编程语言，而是一种使用现有标准的新方法。

AJAX 最大的优点是在不重新加载整个页面的情况下，可以与服务器交换数据并更新部分网页内容。

AJAX 不需要任何浏览器插件，但需要用户允许 JavaScript 在浏览器上执行。

**总结**： AJAX 是一种用于创建快速动态网页的技术。通过在后台与服务器进行少量数据交换，AJAX 可以使网页实现异步更新。这意味着可以在不重新加载整个网页的情况下，对网页的某部分进行更新。

## AJAX 工作原理

![AJAX工作原理](../img/ajax-yl.png)

## AJAX 是基于现有的 Internet 标准

AJAX 是基于现有的 Internet 标准，并且联合使用它们：

- XMLHttpRequest 对象 (异步的与服务器交换数据)
- JavaScript/DOM (信息显示/交互)
- CSS (给数据定义样式)
- XML (作为转换数据的格式)

# 创建 XMLHttpRequest 对象

XMLHttpRequest 是 AJAX 的基础。

## XMLHttpRequest 对象

所有现代浏览器均支持 XMLHttpRequest 对象（IE5 和 IE6 使用 ActiveXObject）。

XMLHttpRequest 用于在后台与服务器交换数据。这意味着可以在不重新加载整个网页的情况下，对网页的某部分进行更新。

## 创建 XMLHttpRequest 对象

所有现代浏览器（IE7+、Firefox、Chrome、Safari 以及 Opera）均内建 XMLHttpRequest 对象。

语法：

```js
var iable = new XMLHttpRequest()
```

老版本的 Internet Explorer （IE5 和 IE6）使用 ActiveX 对象：

```js
var iable = new ActiveXObject('Microsoft.XMLHTTP')
```

为了应对所有的现代浏览器，包括 IE5 和 IE6，请检查浏览器是否支持 XMLHttpRequest 对象。如果支持，则创建 XMLHttpRequest 对象。如果不支持，则创建 ActiveXObject ：

### 实例

```html
<div id="myDiv"><h2>使用 AJAX 修改该文本内容</h2></div>
<button type="button" onclick="loadXMLDoc()">修改内容</button>
```

```js
function loadXMLDoc() {
  let xmlhttp = window.XMLHttpRequest
    ? new XMLHttpRequest()
    : new ActiveXObject('Microsoft.XMLHTTP')

  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      document.getElementById('myDiv').innerHTML = xmlhttp.responseText
    }
  }

  xmlhttp.open('GET', '/try/ajax/ajax_info.txt', true)
  xmlhttp.send()
}
```

# 向服务器发送 请求

XMLHttpRequest 对象用于和服务器交换数据。

## 向服务器发送请求

如需将请求发送到服务器，我们使用 XMLHttpRequest 对象的 `open()` 和 `send()` 方法：

```js
xmlhttp.open('GET', 'ajax_info.txt', true)
xmlhttp.send()
```

| 方法                   | 描述                                       |
| :--------------------- | :----------------------------------------- |
| open(method,url,async) | 规定请求的类型、URL 以及是否异步处理请求。 |
| send(string)           | 将请求发送到服务器。                       |

- method：请求的类型；GET 或 POST
- url：文件在服务器上的位置
- async：true（异步）或 false（同步）
- string：仅用于 POST 请求

## GET 还是 POST

与 POST 相比，GET 更简单也更快，并且在大部分情况下都能用。

然而，在以下情况中，请使用 POST 请求：

- 无法使用缓存文件（更新服务器上的文件或数据库）
- 向服务器发送大量数据（POST 没有数据量限制）
- 发送包含未知字符的用户输入时，POST 比 GET 更稳定也更可靠

## GET 请求

```js
xmlhttp.open('GET', '/try/ajax/demo_get.php', true)
xmlhttp.send()
```

在上面的例子中，您可能得到的是缓存的结果。

为了避免这种情况，请向 URL 添加一个唯一的 ID：

```js
xmlhttp.open('GET', '/try/ajax/demo_get.php?t=' + Math.random(), true)
xmlhttp.send()
```

如果您希望通过 GET 方法发送信息，请向 URL 添加信息：

```js
xmlhttp.open('GET', '/try/ajax/demo_get2.php?fname=Henry&lname=Ford', true)
xmlhttp.send()
```

## POST 请求

```js
xmlhttp.open('POST', '/try/ajax/demo_post.php', true)
xmlhttp.send()
```

如果需要像 HTML 表单那样 POST 数据，请使用 `setRequestHeader()` 来添加 HTTP 头。然后在 send() 方法中规定您希望发送的数据：

```js
xmlhttp.open('POST', '/try/ajax/demo_post2.php', true)
xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
xmlhttp.send('fname=Henry&lname=Ford')
```

| 方法                           | 描述                 |
| :----------------------------- | :------------------- |
| setRequestHeader(header,value) | 向请求添加 HTTP 头。 |

- header: 规定头的名称
- value: 规定头的值

## url 服务器上的文件

`open()` 方法的 url 参数是服务器上文件的地址：

```js
xmlhttp.open('GET', 'ajax_test.html', true)
```

## 异步 True 或 False

AJAX 指的是异步 JavaScript 和 XML（Asynchronous JavaScript and XML）。

XMLHttpRequest 对象如果要用于 AJAX 的话，其 `open()` 方法的 async 参数必须设置为 true：

```js
xmlhttp.open('GET', 'ajax_test.html', true)
```

对于 web 开发人员来说，发送异步请求是一个巨大的进步。很多在服务器执行的任务都相当费时。AJAX 出现之前，这可能会引起应用程序挂起或停止。

通过 AJAX，JavaScript 无需等待服务器的响应，而是：

- 在等待服务器响应时执行其他脚本
- 当响应就绪后对响应进行处理

### Async=true

当使用 async=true 时，请规定在响应处于 onreadystatechange 事件中的就绪状态时执行的函数：

```js
xmlhttp.onreadystatechange = function () {
  if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    document.getElementById('myDiv').innerHTML = xmlhttp.responseText
  }
}
xmlhttp.open('GET', '/try/ajax/ajax_info.txt', true)
xmlhttp.send()
```

### Async=false

如需使用 async=false，请将 `open()` 方法中的第三个参数改为 false：

```js
xmlhttp.open('GET', 'test1.txt', false)
```

我们不推荐使用 async=false，但是对于一些小型的请求，也是可以的。

请记住，JavaScript 会等到服务器响应就绪才继续执行。如果服务器繁忙或缓慢，应用程序会挂起或停止。

**注意**：当您使用 async=false 时，请不要编写 onreadystatechange 函数 - 把代码放到 send() 语句后面即可：

```js
xmlhttp.open('GET', '/try/ajax/ajax_info.txt', false)
xmlhttp.send()
document.getElementById('myDiv').innerHTML = xmlhttp.responseText
```

# 服务器 响应

如需获得来自服务器的响应，请使用 `XMLHttpRequest` 对象的 `responseText` 或 `responseXML` 属性。

| 属性         | 描述                       |
| :----------- | :------------------------- |
| responseText | 获得字符串形式的响应数据。 |
| responseXML  | 获得 XML 形式的响应数据。  |

## responseText 属性

如果来自服务器的响应并非 XML，请使用 responseText 属性。

responseText 属性返回字符串形式的响应，因此您可以这样使用：

```js
document.getElementById('myDiv').innerHTML = xmlhttp.responseText
```

## responseXML 属性

如果来自服务器的响应是 XML，而且需要作为 XML 对象进行解析，请使用 responseXML 属性：

```js
xmlDoc = xmlhttp.responseXML
txt = ''
x = xmlDoc.getElementsByTagName('ARTIST')
for (i = 0; i < x.length; i++) {
  txt = txt + x[i].childNodes[0].nodeValue + '<br>'
}
document.getElementById('myDiv').innerHTML = txt
```

# onreadystatechange 事件

当请求被发送到服务器时，我们需要执行一些基于响应的任务。

每当 readyState 改变时，就会触发 onreadystatechange 事件。

readyState 属性存有 XMLHttpRequest 的状态信息。

下面是 XMLHttpRequest 对象的三个重要的属性：

| 属性               | 描述                                                               |
| :----------------- | :----------------------------------------------------------------- |
| onreadystatechange | 存储函数（或函数名），每当 readyState 属性改变时，就会调用该函数。 |
| readyState         | 存有 XMLHttpRequest 的状态。从 0 到 4 发生变化。                   |
| status             | 200: "OK"; 404: 未找到页面                                         |

readyState:

- 0: 请求未初始化
- 1: 服务器连接已建立
- 2: 请求已接收
- 3: 请求处理中
- 4: 请求已完成，且响应已就绪

在 onreadystatechange 事件中，我们规定当服务器响应已做好被处理的准备时所执行的任务。

当 readyState 等于 4 且状态为 200 时，表示响应已就绪：

```js
xmlhttp.onreadystatechange = function () {
  if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    document.getElementById('myDiv').innerHTML = xmlhttp.responseText
  }
}
```

**注意**： onreadystatechange 事件被触发 4 次（0 - 4）, 分别是： 0-1、1-2、2-3、3-4，对应着 readyState 的每个变化。

## 使用回调函数

回调函数是一种以参数形式传递给另一个函数的函数。

如果您的网站上存在多个 AJAX 任务，那么您应该为创建 XMLHttpRequest 对象编写一个标准的函数，并为每个 AJAX 任务调用该函数。

该函数调用应该包含 URL 以及发生 onreadystatechange 事件时执行的任务（每次调用可能不尽相同）：

```js
function myFunction() {
  loadXMLDoc('/try/ajax/ajax_info.txt', function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      document.getElementById('myDiv').innerHTML = xmlhttp.responseText
    }
  })
}
```
