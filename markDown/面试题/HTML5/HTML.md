# HTML 面试题

---

## 谈谈对 HTML5 的理解

HTML5 指的是包括 HTML 、 CSS 和 JavaScript 在内的一套技术组合：

- 增加代码的**可读性**
- **有助于爬虫抓取**更多有效信息，爬虫依赖于标签来确定上下文和各个关键字的权重
- 更好的的呈现呈现**内容结构**、**代码结构**

#### HTML5 新增语义化标签

- 标签语义化：
  - `<header>`：头部标签
  - `<nav>`：导航标签
  - `<main>`：主体标签
  - `<aside>`：侧边栏标签
  - `<footer>`：尾部标签
  - `<article>`：独立的内容标签
  - `<section>`：区段标签
  - [HTML5 还增加了很多其他标签](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element)

#### HTML5 新增多媒体标签

- `<audio>`音频标签
- `<video>`视频标签

#### HTML5 新增表单标签

- h5 新增`<input>`表单类型
  - emil -邮箱
  - url -网址
  - date - 日期
  - time -时间
  - month-月份
  - week -周
  - number-数量 !
  - tel-手机号码 !
  - search -搜索 !
  - color-颜色
- `<datalist>`标签
- 新增表单属性
  - autocomplete: form 或者 input 在输入的时候, 拥有自动完成功能
  - autofocus: 页面加载完毕, 当前属性设置为 true 的表单自动获取焦点
  - placeholder: input 元素的默认提示文本
  - required: 必填项, 提交前必须填充
  - multiple: 输入域中可以选择多个值

---

## script 标签中的 async 和 defer 属性

- `script`：回阻碍 HTML 的解析，只有下载好并执行完脚本才会继续解析 HTML。
- `async script` ：解析 HTML 过程中进行脚本的异步下载，下载成功立马执行，有可能会阻断 HTML 的解析。
- `defer script`：完全不会阻碍 HTML 的解析，解析完成之后再按照顺序执行脚本。

---

## 页面导入样式时，link 和 @import 的区别

1. 兼容性：
   - link 是 XHTML 标签，无兼容问题；
   - @import 是在 CSS2.1 提出的，低版本的浏览器不支持
2. 加载顺序：
   - link 引用 CSS 时，在页面载入时同时加载；
   - @import 需要页面网页完全载入以后加载。
3. 作用范围：
   - link 是 XHTML 标签，除了加载 CSS 外，还可以定义 RSS 等其他事务；
   - @import 属于 CSS 范畴，只能加载 CSS。

---



---

## 从浏览器地址栏输入 url 到请求返回发生了什么

1. 输入 URL 后解析出协议、主机、端口、路径等信息，并构造一个 HTTP 请求。
   - 强缓存
   - 协商缓存
2. [DNS 域名解析](https://juejin.cn/post/6990344840181940261)。
3. TCP 连接。
   > 总是要问：为什么需要三次握手，两次不行吗？其实这是由 TCP 的自身特点可靠传输决定的。客户端和服务端要进行可靠传输，那么就需要确认双方的接收和发送能力。第一次握手可以确认客服端的发送能力，第二次握手，确认了服务端的发送能力和接收能力，所以第三次握手才可以确认客户端的接收能力。不然容易出现丢包的现象。
4. http 请求。
5. 服务器处理请求并返回 HTTP 报文。
6. 浏览器渲染页面。
7. 第四次挥手，断开 TCP 连接。
