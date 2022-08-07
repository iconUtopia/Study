# JavaScript 面试题

### 谈谈你对 ES6 的理解

- 变量的解构赋值
- 新增模板字符串（为 JavaScript 提供了简单的字符串插值功能）
- 箭头函数
- 默认参数
- for-of（用来遍历数据—例如数组中的值。）
- arguments 对象可被不定参数和默认参数完美代替。
- ES6 将 Promise 对象纳入规范，提供了原生的 Promise 对象。
- 增加了 `let` 和 `const` 命令，用来声明变量。
- 增加了块级作用域。
- let 命令实际上就增加了块级作用域。
- 还有就是引入 module 模块的概念
- proxy

[ECMAScript 6 新特性总结](https://imweb.io/topic/55e330d6771670e207a16bbb)，
[es6、7、8、9 新语法新特性-总结](https://juejin.im/post/5c6629a3f265da2dd638dfa1)

---

### let 和 const

let 和 const 定义的变量在 Window 上无法直接访问。使用 `debugger` 通过 Chrome 控制台调试的时候能看见 Scope（作用域）上有两个对象：Script（脚本）作用域中有 let 和 const 定义的变量；Global（全局，即 Window）作用域中有 var 定义的变量。

---

## _DOM_

## 原生 JS 怎么创建，添加节点？

创建：document.CreateElement("h1")
添加：.openedChild("h1")

---

## _事件_

### 事件触发机制，谈一谈事件捕获与冒泡，事件委托。

- 事件**捕获**：网景提出事件捕获的事件流，事件**从外到内**传播。
- 事件**冒泡**：微软提出了名为事件冒泡的事件流，事件**从内到外**。
- 事件**委托**：就是把一个元素响应事件的函数委托到**父元素**。

#### 请解释什么是事件代理

事件代理（Event Delegation），又称之为**事件委托**。是 JavaScript 中常用绑定事件的常用技巧。顾名思义，“事件代理”即是把原本需要绑定的事件委托给**父元素**，让父元素担当事件监听的职务。事件代理的原理是 DOM 元素的**事件冒泡**。

#### 为什么要用事件委托？有什么优点？

- 提高性能
- 节省内存空间；
- 减少事件注册；
- 简化了 dom 节点更新时，相应事件的更新。

---

### [事件循环 EventLoop](https://juejin.cn/post/7001065972463304734)

JS 在单线程上执行所有操作，虽然是单线程却有多线程的感受，实际是通过使用一些比较合理的数据结构来达到该效果。

- **调用堆栈(call stack)** 负责各种所有要执行的代码
  - 每个函数执行完成后，就会从堆栈中 pop 弹出；有其他代码需要进去执行，就进行 push 进入。
- **事件队列(event queue)** 负责将新的函数发送到队列中进行处理
  - 遵循队列的数据结构特点：先进先出。按照顺序发送操作以供执行。
- 每当调用事件队列中的异步函数时，都会将其发送到浏览器 API
  - 根据从调用堆栈收到的命令，API 开始自己的单线程操作。
  - 如 setTimeout，在堆栈中处理 setTimeout 操作时，会将其发送到相应的 API，该 API 一直等到指定的时间将此操作送回到事件队列进行处理。如此就有了一个循环的系统，用于进行异步操作。
  - 循环系统：堆栈处理 setTimout 操作，传递给对应的 API，API 等到指定时间之后把操作送回事件队列，时间队列检查堆栈是否为空，为空就把操作推进去执行。
- JS 是单线程，而浏览器 API 充当单独的线程。

#### 事件队列

1. 微任务队列：DOM 渲染前触发
   - **promise**
   - **async/await**
   - process.nextTick
   - Object.observe
   - MutationObserver
2. 宏任务队列：DOM 渲染后触发
   - **script(整体代码)**
   - **setTimeout/setInterval**
   - **DOM 事件（事件绑定）**
   - **ajax**
   - setImmediate
   - I/O
   - UI rendering

#### 事件队列执行机制

1. JS 引擎首先从宏任务队列取出第一个任务
2. 执行完毕后，再将微任务队列中所有任务取出，按照顺序分别执行；如果这一步过程中产生新的微任务，也要执行
3. 再从宏任务队列中取出一个，执行完毕后，再将微任务队列中全部取出执行。循环往复，直到两个队列中任务都取完

**一次 EventLoop 循环会处理一个宏任务（script 整体代码）和所有这次循环中产生的微任务。**

#### 为何微任务执行更早？

- 微任务是 ES6 语法规定的（被压入 micro task queue）。
- 宏任务是由浏览器规定的（通过 Web APIs 压入 Callback queue）。
- 每一次宏任务开始之前一定是伴随着一次 event loop 结束的，而微任务是在一次 event loop 结束前执行的。
- 宏任务执行时间一般比较长。

---

### 简述一下对异步编程的理解

[JS 单线程和异步机制](https://juejin.im/entry/57b2827f165abd005434c59e)

**浏览器是多线程**运行的（加载 HTML、加载 CSS、加载 JS、发送请求、渲染图片……），但 **JS 是单线程**的，因为浏览器只给了一个线程提供给 JS 渲染。浏览器提供了全局执行栈内存，**主线程**代码从上至下一行一行的执行进栈和出栈，进行同步操作。但浏览器提供了**事件队列(event queue)**

- 进栈：压缩到栈内执行代码
- 出栈：执行完后移除栈内存（需要销毁的移除，不销毁的压缩到底部）

同步是所有的操作都做完了才返回给用户（银行的操作系统必须用同步），异步是将用户请求放入队列中，并反馈给用户，系统迁移程序已经启动，可以关闭浏览器（为了避免短时间大量的数据操作，使用缓存机制，消息队列，任务池，慢慢写入数据库）。

### Promise 是什么?

**Promise 对象用来进行延迟(deferred) 和异步(asynchronous) 计算，解决回调地狱的方案。**

- 从语法上讲，promise 是一个对象，从它可以获取异步操作的消息；
- 从本意上讲，它是承诺，承诺它过一段时间会给你一个结果。
- 创造 promise 实例后，它会立即执行。

#### Promise 有四种状态：

- pending: 初始状态, 非 fulfilled 或 rejected。
- fulfilled: 成功的操作。
- rejected: 失败的操作。
- settled: Promise 已被 fulfilled 或 rejected，且不是 pending。fulfilled 与 rejected 一起合称 settled。

#### 手写 Promise

```js
// 1. 基础的 Promise 对象
function MyPromise(executor) {
  let _this = this;
  _this.state = "pending"; // 状态
  _this.resolveResult = null; // 成功的结果
  _this.rejectReason = null; // 失败的原因

  // 5. 添加缓存数组
  _this.onFulfilledCallbacks = [];
  _this.onRejectedCallbacks = [];

  function resolve(resolveResult) {
    // 4. 状态判断
    if (_this.state === "pending") {
      _this.resolveResult = resolveResult;
      _this.state = "fulfilled";
      // 7. 添加发布者
      _this.onFulfilledCallbacks.forEach(item => item(resolveResult));
    }
  }
  function reject(rejectReason) {
    if (_this.state === "pending") {
      _this.resolveResult = rejectReason;
      _this.state = "rejected";
      _this.onRejectedCallbacks.forEach(item => item(rejectReason));
    }
  }
  // 3. 先执行一遍
  try {
    executor(resolve, reject);
  } catch (error) {
    console.log(error);
  }
}
// 2. new 继承 then 和 catch
MyPromise.prototype.then = function(onFulfilled, onRejected) {
  // promise 状态一改变，不管成功或失败，都会调用 then()，根据状态不同，调用不同的回调
  onFulfilled =
    typeof onFulfilled === "function"
      ? onFulfilled
      : function(data) {
          resolve(data);
        };
  onRejected =
    typeof onRejected === "function"
      ? onRejected
      : function(data) {
          throw err;
        };

  // 6. 添加订阅者
  let _this = this;
  return new MyPromise((resolve, reject) => {
    if (_this.state === "fulfilled" || _this.state === "rejected") {
      try {
        let x =
          _this.state === "fulfilled"
            ? onFulfilled(_this.resolveResult)
            : onRejected(_this.rejectReason);
        x instanceof MyPromise ? x.then(resolve, reject) : resolve(x);
      } catch (error) {
        reject(error);
      }
    } else if (_this.state === "pending") {
      _this.onFulfilledCallbacks.push(() => {
        let x = onFulfilled(_this.resolveResult);
        x instanceof MyPromise ? x.then(resolve, reject) : resolve(x);
      });
      _this.onRejectedCallbacks.push(() => {
        let x = onRejected(_this.rejectReason);
        x instanceof MyPromise ? x.then(resolve, reject) : resolve(x);
      });
    }
  });
};
MyPromise.prototype.catch = function(fn) {
  return this.then(null, fn);
};

let test = new MyPromise((resolve, reject) => {
  console.log("手写 Promise");
  setTimeout(() => resolve(123));
});
test.then(res => console.log(res));
```

#### 实现一个 Promise.all

```js
Promise.all = function(promises) {
  return new Promise((resolve, reject) => {
    // 参数可以不是数组，但必须具有 Iterator 接口
    if (typeof promises[Symbol.iterator] !== "function") {
      reject("Type error");
    }
    if (promises.length === 0) {
      resolve([]);
    } else {
      const res = [];
      let count = 0;
      const len = promises.length;
      for (let i = 0; i < len; i++) {
        //考虑到 promises[i] 可能是 thenable 对象也可能是普通值
        Promise.resolve(promises[i])
          .then(data => {
            res[i] = data;
            if (++count === len) {
              resolve(res);
            }
          })
          .catch(err => {
            reject(err);
          });
      }
    }
  });
};
```

#### async 和 await 分别返回的是什么？

- async：总是返回一个 promise。
- await：执行返回后的结果。

#### Promise 和 async/await 的关系

- async/await 是消灭异步回调的终极武器。
- 但和 Promise 并不互斥，反而，两者相辅相成。
- 执行 async 函数，返回的一定是 Promise 对象。
- await 相当于 Promise 的 then。
- tru...catch 可捕获异常，代替了 Promise 的 catch。

---

### 一道面试题彻底掌握 EventLoop

```js
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}
async function async2() {
  console.log("async2");
}
console.log("script start");
setTimeout(function() {
  console.log("setTimeout");
}); // 默认值 0，0是浏览器的最小反应时间
async1();
// new 的时候是同步执行的
new Promise(function(resolve) {
  // EC函数
  console.log("promise1");
  resolve();
}).then(function() {
  console.log("promise2");
});
console.log("script end");
```

![](../asset/images/一道面试题彻底掌握%20EventLoop.png "描述")

[流程图](https://blog.csdn.net/Gordo_Li/article/details/103268147)

---

## 实现一个 EventMitter 类

```js
export class EventEmitter {
  private _events: Record<string, Array<Function>>;

  constructor() {
    this._events = Object.create(null);
  }

  emit(evt: string, ...args: any[]) {
    if (!this._events[evt]) return false;

    const fns = [...this._events[evt]];
    fns.forEach((fn) => {
      fn.apply(this, args);
    });

    return true;
  }

  on(evt: string, fn: Function) {
    if (typeof fn !== "function") {
      throw new TypeError("The evet-triggered callback must be a function");
    }
    if (!this._events[evt]) {
      this._events[evt] = [fn];
    } else {
      this._events[evt].push(fn);
    }
  }

  once(evt: string, fn: Function) {
    const execFn = () => {
      fn.apply(this);
      this.off(evt, execFn);
    };
    this.on(evt, execFn);
  }

  off(evt: string, fn?: Function) {
    if (!this._events[evt]) return;
    if (!fn) {
      this._events[evt] && (this._events[evt].length = 0);
    }

    let cb;
    const cbLen = this._events[evt].length;
    for (let i = 0; i < cbLen; i++) {
      cb = this._events[evt][i];
      if (cb === fn) {
        this._events[evt].splice(i, 1);
        break;
      }
    }
  }

  removeAllListeners(evt?: string) {
    if (evt) {
      this._events[evt] && (this._events[evt].length = 0);
    } else {
      this._events = Object.create(null);
    }
  }
}

```

---

## _BOM_

### 什么是同源策略？

浏览器出于安全方面的考虑，**同源策略会阻止跨域**，只允许与同源下的接口交互。同源必须要做到同**协议**，同**域名**，同**端口**。

#### 为什么有跨域

当我们前端和后端项目**部署在不同服务器**上时，web 服务器的项目通过 ajax 向数据服务器发送请求时，协议、域名、端口号有一项不同，同源策略会阻止，就产生了跨域

#### 如何解决跨域问题

解决跨域的方式：

- JSONP
- iframe
- **CORS**
- **服务器上设置 http proxy 实现跨域代理**

##### JSONP

1. 同源策略只限制 Ajax 请求，不限制 HTML 标签请求。可以通过创建 **HTML 请求资源**，并提前写好接收函数。
2. 服务器收到请求后，从 callback 参数得到 Function，把原始数据（假设是 {a:1}）处理 后变成 handleData({a:1})
3. script 里的资源加载后会当成 js 执行，相当于执行 handleData({a:1})， 即可在预 定义的 handleData 函数里处理数据

```html
<script>
  function callbackFunction(data) {
    console.log(data); //从服务器获得的数据
  }
</script>
<script src="https://www.runoob.com/try/ajax/jsonp.php?jsoncallback=callbackFunction"></script>
```

**缺点：**

1. 只能发送 GET 请求
2. 不安全
3. 有缓存
4. 传递的信息有大小限制
5. 还需要服务器支持

##### Iframe

- `window.name`
- `document.domain`
- `location.hash`
- `postMessage`

##### CORS

是一个 W3C 标准，全称是“**跨域资源共享**”(Cross-origin resource sharing)。

原理：发送 Ajax 请求时，浏览器发现该请求不符合同源策略，会给该请求加一个请求头：Origin。后台收到请求后，如果确定接受请求则在返回结果中加入一个响应头：Access-Control-Allow-Origin;浏览器判断该响应头中是否包含当前 Origin 的值，如果有则浏览器会处理响应，我们就可以拿到响应数据，如果没有浏览器直接驳回。

用 axios 实现

```js
import axios from "axios";
import qs from "qs";
axios.defaults.baseURL = "http://xxxxxx"; // 服务器地址
axios.defaults.timeout = 1000; // 超时时间
axios.defaults.withCredentials = true; // 跨域发送请求时允许发送资源凭证
/* 请求主体格式 */
axios.defaults.headers["Content-Type"] = `application/x-www-form-urlencode`;
axios.defaults.transformRequest = data => qs.stringify(data);
/* 设置请求拦截器 */
axios.interceptors.request.use(
  config => {
    let token = localStorage.getItem("token");
    token && (config.headers.Authorization = token);
    return config;
  },
  err => {
    return Promise.reject(error);
  }
);
/* 设置响应拦截器 */
axios.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {}
);
export default axios;
```

---

### 介绍一下你对浏览器内核的理解？

主要分为两部分：渲染引擎+JS 引擎

- **渲染引擎**：取得网页的内容（html、xml、图片）、构造 CSSOM 树、计算网页的显示方式，比如各元素宽高，然后输出至显示器或打印机。
- **js 引擎**：解析和执行 javascript 来实现网页的动态效果

---

### [HTTP 和 HTTPS 的区别](https://juejin.im/entry/58d7635e5c497d0057fae036)

- HTTP：是互联网上应用最为广泛的一种**网络协议**，是一个客户端和服务器端**请求和应答的标准**（TCP），用于从 WWW 服务器传输超文本到本地浏览器的传输协议，它可以使浏览器更加高效，使网络传输减少。
- HTTPS：简单讲是**安全版 HTTP 通道**，即 HTTP 下加入 **SSL 层**加密。主要作用建立一个信息安全通道，来保证数据传输的安全，以及确认网站真实性。

超文本传输协议 HTTP 协议被用于在 Web 浏览器和网站服务器之间传递信息，HTTP 协议以明文方式发送内容，不提供任何方式的加密，所以 HTTP 协议不适用于传输一些敏感信息。

主要区别：

1. https 协议需要到 ca 申请证书，一般免费证书较少，因而需要一定费用。
2. http 是超文本传输协议，信息是明文传输，https 则是具有安全性的 ssl 加密传输协议。
3. http 和 https 使用的是完全不同的链接方式，用的端口也不一样，前者是 80，后者是 443.
4. http 的连接很简单，是无状态的；https 协议是由 ssl+http 协议构建的可进行加密传输、身份认证的网络协议，比 http 协议安全。

#### http 状态码

##### 状态分类

- 1xx - 服务器收到请求。
- 2xx - 请求成功，如 200。
- 3xx - 重定向，如 302。
- 4xx - 客户端错误，如 404。
- 5xx - 服务端错误，如 500。

##### 常见状态码

- 200 - 成功。
- 301 - 永久重定向（配合 location，浏览器自动处理）。
- 302 - 临时重定向（配合 location，浏览器自动处理）。
- 304 - 资源未被修改。
- 403 - 没权限。
- 404 - 资源未找到。
- 500 - 服务器错误。
- 504 - 网关超时。

#### [get 和 post 的区别](https://segmentfault.com/a/1190000018129846)

- 从**报文**的角度，GET 一般放在 URL 中，POST 放在请求体中。
- 从**编码**的角度，GET 只能进行 URL 编码，只能接收 ASCII 字符，而 POST 没有限制。
- 从**缓存**的角度，GET 请求会被浏览器主动缓存下来，留下历史记录，而 POST 默认不会。
- 从**幂等性**的角度，GET 是幂等的，而 POST 不是。(幂等表示执行相同的操作，结果也是相同的)
- 从 **TCP** 的角度，GET 请求会把请求报文一次性发出去，而 POST 会分为两个 TCP 数据包，首先发 header 部分，如果服务器响应 100(continue)， 然后发 body 部分。(火狐浏览器除外，它的 POST 请求只发一个 TCP 包)

---

### cookie,sessionStorage,localStorage 的区别

- cookie 储存量较小
- sessionStorage 是会话级别，窗口关闭就不存在
- localStorage 是存储本地

1. **存储位置不同**：
   - cookie 数据始终在同源的 http **请求中携带**，即 cookie 在浏览器和服务器间来回传递。
   - sessionStorage 和 是**会话级别**，窗口关闭就不存在；
   - localStorage 仅在**本地储存**。
2. **存储大小限制不同**：
   - cookie 数据不能超过 **4k**，
   - sessionStorage 和 localStorage 可以达到 **5M**。
3. **数据有效期不同**：
   - cookie 只在设置的 cookie 过期时间之前一直有效；
   - sessionStorage 仅在浏览器**窗口关闭前**有效，不能持久保存；
   - localStorage **始终有效**，因此用作持久数据。
4. **作用域不同**：
   - sessionStorage **不能在不同的浏览器窗口中共享**，即使是同一个页面；
   - localStorage 和 cookie 在所有的同源窗口中**都是共享**的。

---

## _设计模式_

### 渐进增强和优雅降级

- 渐进增强 ：针对低版本浏览器进行构建页面，保证最基本的功能，然后再针对高级浏览器进行效果、交互等改进和追加功能达到更好的用户体验。
- 优雅降级 ：一开始就构建完整的功能，然后再针对低版本浏览器进行兼容

---

### 观察者模式

当对象之间存在一对多的依赖关系时，其中一个对象的状态发生该改变，所有依赖它的对象都会收到通知。

观察者模式中，只有两种主体目标对象和观察者：

- 目标对象（Subject）：
  - 维护观察中列表（ObserverList）；
  - 定义添加观察者的方法；
  - 当自身发生变化后，通过调用自己的 notify 方法一次通知每个观察者执行 update 方法。
- 观察者（Observer）：需要实现 update 方法，提供目标对象调用。update 发放中可以执行自定义的业务逻辑。

```js
// 目标对象
class Subject {
  constructor() {
    this.observerList = [];
  }
  addObserver(observer) {
    this.observerList.push(observer);
  }
  notify(task) {
    console.log("任务更新");
    this.observerList.forEach(item => item.update(task));
  }
}
// 观察者
class Observer {
  constructor(name) {
    this.name = name;
  }
  update({ taskType, taskInfo }) {
    if (taskType === "route") {
      console.log(`${this.name}不需要日常任务`);
    } else this.goToTaskHome(taskInfo);
  }
  goToTaskHome(info) {
    console.log(`${this.name}去领取${info}任务`);
  }
}
const subject = new Subject();
const person1 = new Observer("玩家1");
const person2 = new Observer("玩家2");
// 添加观察目标对象的观察者
subject.addObserver(person1);
subject.addObserver(person2);
// 添加任务
const warTask = {
  taskType: "war",
  taskInfo: "战斗"
};
const routeTask = {
  taskType: "route",
  taskInfo: "日常"
};
// 通知观察者
subject.notify(warTask);
subject.notify(routeTask);
```

---

### 发布订阅模式

基于一个主题通信，希望接收通知的对象 Subscriber 通过自定义事件订阅主题，被激活事件的对象 Publisher 通过发布主题事件的方式通知各个订阅该主题的 Subscriber 对象。

发布定订阅模式中有三个角色：

- 发布者（Publisher）
- 事件调度中心（Event Channel）
  - 维护任务类型，以及每种任务下的订阅情况；
  - 给订阅者提供订阅功能
  - 当发布者发布任务后，给所有订阅者发布任务。
- 订阅者（Subscriber）

```js
class PubSub {
  constructor() {
    this.events = {};
  }
  // 订阅方法
  subscribe(type, callBack) {
    if (!this.events[type]) {
      this.events[type] = [];
    }
    this.events[type].push(callBack);
  }
  // 发布方法
  publish(type, ...ags) {
    if (this.events[type]) {
      this.events[type].forEach(item => item(...ags));
    }
  }
  // 取消订阅方法
  unsubscribe(type, callBack) {
    if (this.events[type]) {
      const cbIndex = this.events[type].findIndex(e => e === callBack);
      if (cbIndex !== -1) {
        this.events[type].splice(cbIndex, 1);
      }
    }
    if (this.events[type].length === 0) {
      delete this.events[type];
    }
  }
  unsubscribeAll(type) {
    if (this.events[type]) {
      delete this.events[type];
    }
  }
}
// 创建一个中介公司
let pubsub = new PubSub();

// 玩家订阅任务
pubsub.subscribe("warTask", function(taskInfo) {
  console.log(`任务大厅发布任务，任务信息：${taskInfo}`);
});
pubsub.subscribe("routeTask", function(taskInfo) {
  console.log(`任务大厅发布任务，任务信息：${taskInfo}`);
});
pubsub.subscribe("allTask", function(taskInfo) {
  console.log(`任务大厅发布任务，任务信息：${taskInfo}`);
});
pubsub.subscribe("allTask", function(taskInfo) {
  console.log(`活动任务：${taskInfo}`);
});

// 发布任务
pubsub.publish("warTask", "战斗");
pubsub.publish("routeTask", "日常");
pubsub.publish("allTask", "活动");
```

---

### 说说你对 AMD 和 Commonjs 的理解

- AMD 推荐的风格通过返回一个对象做为模块对象，CommonJS 的风格通过对 module.exports 或 exports 的属性赋值来达到暴露模块对象的目的
- CommonJS 是服务器端模块的规范，Node.js 采用了这个规范。CommonJS 规范加载模块是**同步**的，也就是说，只有加载完成，才能执行后面的操作。AMD 规范则是**非同步**加载模块，允许指定回调函数

#### require 和 import 的区别？

- 遵循的规范不同：
  - `require`、`exports/module.exports` 是 CommonJS 的标准，通常适用范围如 Node.js
  - `import`、`export` 是 ES6 的标准，通常适用范围如 React
    > 由于 npm 上 CommonJS 的类库众多，以及 CommonJS 和 ES6 之间的差异，Node.js 无法直接兼容 ES6。所以现阶段 require/exports 任然是必要且必须的
- 调用方式不同：
  - `require` 可以理解为一个全局方法，所以意味着可以在任何地方执行。
  - `import` 会提升到整个模块的头部，具有置顶性，建议写在文件的顶部。
- 执行方式不同：
  - `require` 是赋值过程并且是运行时才执行，也就是同步加载
  - `import` 是解构过程并且是编译时执行，理解为异步加载
- 输出结果不同：
  - `exports/module.exports` 输出的，是一个值的拷贝
  - `export` 输出的是值的引用

#### require 和 import 的性能

因为 `require` 是在运行时才引入模块并且还赋值给某个变量，而 `import` 只需要依据 `import` 中的接口在编译时引入指定模块，`require` 的性能相对于 `import` 稍低。

---

### 对 requireJS 了解多少？

[requireJS 是一个 JavaScript 文件或者模块加载器。它可以提高 JavaScript 的加载速度，避免不必要的堵塞。
](http://www.cnblogs.com/floor/p/7231960.html)

#### requireJS 的入口函数是什么？

[requirejs.config()](https://blog.csdn.net/weixin_41049850/article/details/81001709) 函数

---

### [性能优化](https://juejin.im/post/59672fbff265da6c3f70cd53)

##### 加载：

- 减少 HTTP 请求
- 减少静态资源的体积
- 第三方库使用 CDN
- SSR 服务端渲染，预渲染
- 懒加载

##### 代码层面：

- 减少 DOM 操作。
- 减少回流（重排）和重绘。
- 事件委托。
- 防抖和节流（resize，scroll，input）。
- css 放头部 ，js 脚本放最底部。

##### 构建方面：

- **压缩代码文件**，在 webpack 中使用：
  - `terser-webpack-plugin` 压缩 JS 代码；
  - `css-minimizer-webpack-plugin` 压缩 CSS 代码；
  - `html-webpack-plugin` 压缩 html 代码。
- **开启 gzip 压缩**，webpack 中使用 `compression-webpack-plugin` ，node 作为服务器也要开启，使用 compression。
- **常用的第三方库使用 CDN 服务**，在 webpack 中我们要配置 externals，将比如 React， Vue 这种包不打倒最终生成的文件中。而是采用 CDN 服务。

---

### 移动端有几种开发模式？

1. Native App：NA 即原生应用；
2. Web App：Web App 就是网页应用；
3. Hybrid App：混合应用；
4. React Native；
5. 微信小程序；
6. PWA。

---

## _底层原理_

### 简述一下对 JS 单线程的理解

一个程序至少有一个进程，一个进程至少有一个线程，每一个独立的线程都有一个程序运行的入口，线程不能够独立执行，必须存在应用存现中。

---

### _基本概念_

### JavaScript 中的基础数据类型有哪些？

- 值类型：number、string、boolean、null、undefined、Symbol、BigIn；
  - Symbol：代表独一无二的值，最大的用法是用来定义对象的唯一属性名。
  - BigInt：可以表示任意大小的整数
- 引用型：object。

#### JS 中的 undefined 和 null 有什么区别？

- `null` 是一个表述“无”的**对象**，转为数值时 0；
- `undefined` 是一个表示“无”的**原始值**，转为数值时为 NaN。

#### 哪些存储数据在栈内存，哪些数据在堆内存

在现代的多数**操作系统**中一个进程的内存分为 5 个区：

- 代码区：存放编译后的机器码。
- 全局/静态区：存放整个生命周期进程中不会销毁的数据，如 C 和 C++ 中的全局变量。
- 常量区：和全局区类似，唯一的区别是不允许写入。
- 栈区：cpu 提供 api，存放函数调用的参数和局部变量，栈区只和栈数据结构搭上边。
- 堆区：操作系统提供 api，一般使用双链表来管理和分配堆上的内存，堆区和堆数据结构只是英文同名 heap

**js 的所有变量都存储在堆内存**：

1. JS 是解释执行的，现代 JS 在堆上申请一大块内存使用**虚拟机**管理。 虚拟机为了执行它自己的指令，会划一部分内存做虚拟机的栈。JS 执行的时候使用该栈，所以也会抛出 stack overflow 的错误。但是和系统内存抛出的 stack overflow 不同，系统的会崩溃，JS 只是抛出错误。
2. JS 会维护名为 **执行上下文堆栈(Execution Context Stack)** 的栈类型数据结构，用于存储**执行上下文(Execution Context)对象**。
3. 使用栈存储的变量，函数开始执行的时候压栈，函数执行完就弹出，变量就应该销毁了。但 JS 里函数是闭包。

---

### js 判断数据类型

#### 1. typeof

```js
typeof 1; // 'number'
typeof null; // 'object'
typeof function() {}; // 'function'
typeof []; // 'object'
```

用来判断**值类型**和**函数**。不可对 **null**、**引用类型**进行精确判断，因为都返回 object 。

#### 2. instanceof

```js
1 instanceof Number; // false
new Number(1) instanceof Number; // true
```

用来判断对象类型,返回一个布尔值，如果判断基本类型，那么会输出 false.**其内部运行机制是判断在其原型链中能否找到该类型的原型**。

##### 手写 instanceof

```js
function myInstanceof(target, origin) {
  if (typeof target !== "object" || target === null) return false;
  if (typeof origin !== "function")
    throw new TypeError("origin must be function");
  let proto = Object.getPrototypeOf(target); // 相当于 proto = target.__proto__;
  while (proto) {
    if (proto === origin.prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
  return false;
}
console.log(myInstanceof(1, Number));
console.log(myInstanceof(new Number(1), Number));
```

#### 3. Object.prototype.toString.call()

```js
let a = "123";
let target = Object.prototype.toString.call(a); // '[Object String]'
console.log(target.slice(8, target.length - 1) === "String"); // true
```

以判断任何原始类型值，返回的是一个字符串。

#### 4. 特定的判断方式

1. 数组：`isArray()`
2. 合法的数字：`Number()`
3. 不合法的数字：`Number.isNaN()`

---

### _变量、作用域、内存_

### 执行上下文

它指的是：JS 被解析和执行的时候所在的一个环境。（系统进行内部处理）

1. **全局上下文**的变量对象初始化是全局对象
2. **函数上下文**的变量对象初始化只包括 Arguments 对象
3. 在进入执行上下文时会给变量对象添加形参、函数声明、变量声明等初始的属性值
4. 在代码执行阶段，会再次修改变量对象的属性值

#### 执行上下文的类型

- 全局上下文：有且只有一个，浏览器的全局对象 window 对象
- 函数上下文：存在无数个，只有在函数被调用的时候才会被创建，每次调用都会创建一个新的执行上下文

#### 执行栈

执行栈，也叫调用栈，具有 **LIFO（后进先出）结构**，用于存储在代码执行期间创建的所有执行上下文。

首次运行 JS 代码时，会创建一个全局执行上下文并按照栈的规则插到当前的执行栈中。每当发生函数调用，引擎都会为该函数创建一个新的函数执行上下文并插到当前执行栈的栈顶。

#### 执行上下文的创建

1. 创建阶段
   1. 确定 this 的值，也被称为 This Binding。
   2. LexicalEnvironment（词法环境） 组件被创建。
   3. VariableEnvironment（变量环境） 组件被创建。
2. 执行阶段

##### 词法环境

词法环境有两个组成部分:

1. 环境记录：存储变量和函数声明的实际位置
2. 对外部环境的引用：可以访问其外部词法环境

词法环境和变量环境的区别在于前者用于**存储函数声明和变量（ let 和 const ）绑定，而后者仅用于存储变量（ var ）绑定**。

---

### 什么是堆内存和栈内存

- 堆：存储引用类型值的空间，无序
- 栈：存储基本类型值和执行代码的环境，有序的

---

### [垃圾回收机制](https://juejin.cn/post/6887021259482365960)

浏览器的垃圾回收机制（Garbage collection ），简称 GC，它会周期性运行以释放那些不需要的内存，否则，JavaScript 的解释器将会耗尽全部系统内存而导致系统崩溃。

具体到浏览器中的实现，通常有两个策略：

#### 两种垃圾回收策略以及缺点：

- **标记清除**：标记阶段即为所有活动对象做上标记，清除阶段则把没有标记（也就是非活动对象）销毁。
  - **内存碎片化**，空闲内存块是不连续的，容易出现很多空闲内存块，还可能会出现分配所需内存过大的对象时找不到合适的块。
  - **分配速度慢**，因为即便是使用 First-fit 策略，其操作仍是一个 O(n) 的操作，最坏情况是每次都要遍历到最后，同时因为碎片化，大对象的分配效率会更慢。
- **引用计数**：它把**对象是否不再需要**简化定义为**对象有没有其他对象引用到它**。如果没有引用指向该对象（引用计数为 0），对象将被垃圾回收机制回收。
  - 需要一个计数器，所占内存空间大，因为我们也不知道被引用数量的上限。
  - 解决不了循环引用导致的无法回收问题。

#### 四种常见的内存泄露：

1. 全局变量
2. 未移除的事件绑定
3. 无效的 dom 引用
4. 定时器 setInterval/setTimeout

---

### 说说你对作用域链与作用域链的理解

- 作用域：简单的说，作用域就是变量与函数的**可访问范围**，即作用域控制着变量与函数的**可见性**和**生命周期**
- 作用域链：保证执行环境里有权访问的变量和函数是有序的，作用域链的变量只能向上访问，变量访问到 window 对象即被终止，**作用域链向下访问变量是不被允许的**

#### 作用域案例题

```js
var x = 2;
var y = {
  x: 3,
  z: (function(x) {
    this.x *= x; //匿名函数调用，this指向window
    x += 2;
    return function(n) {
      this.x *= n;
      x += 3; // 调用上文 x ，形成了闭包
    };
  })(x)
};
var m = y.z;
m(4);
y.z(5);
```

1. `y` 声明时，`y.z` 立即执行函数 `this` 指向全局，改变全局 `x` 为 4
2. `m(4)` 调用时全局 `x` 变为 16
3. `y.z(5)` 调用时调用的是 `return` 的函数，`this`指向了`y`，所以`y.x`变成了 15

---

### JavaScript 中什么是闭包？

闭包（Closure）是 1964 年提出的一个计算机编程的概念，按照当时论文[《表达式的机器执行》](https://academic.oup.com/comjnl/article/6/4/308/375725)的定义包含控制和环境两个部分，在 JS 中，以函数能够访问其定义时的环境中的变量的方式得以实现。**本质上，JS 中的每个函数都是一个闭包，因为每个函数都可以访问全局变量**

- 代码层面：**嵌套函数**，且执行返回结果一定依赖**上级作用域**。立即执行函数理论上也是个闭包。
- 作用：创建**私有作用域**，延长变量的生命周期，避免全局变量的污染。
- 机制：私有作用域内的变量和函数上下文不回被垃圾回收机制回收，导致**内存常驻**。

闭包导致内存常驻，变量内存一直占用着。使用不当肯定是会造成内存泄漏，该销毁的没销毁。

---

### 谈谈变量提升

变量提升是因为用 `var` 关键字声明变量造成的，但变量提升只会把声明语句提升到当前作用域的顶端，而赋值语句不会被提升。

```JavaScript
console.log(a) // ƒ a() { console.log(a) }
var a=1;
console.log(a) // 1
function a(){ console.log(a) }
console.log(a) // 1
var a = 2 // 变量覆盖
console.log(a) // 2
function fn (){
  for(var i=0;i<3;i++){
    console.log(i);//0、1、2
  }
  console.log(i); // 3， var 没有块级作用域
}
```

**命名的变量和函数，函数会提升最前边，而变量其次。而且变量会被忽略**

---

### _引用类型_

### generator 是什么？

generator（生成器）是 ES6 标准引入的新的数据类型，一个 generator 看上去像一个函数，但可以返回多次，generator 和函数不同的是，generator 由 function 定义。

---

### _面向对象_

### new 操作符

#### new 一个对象发生了什么？

即原生 js 创建一个对象的过程

```js
function Person() {}
let person = new Person();
// 1. 首先创一个新的空对象。
let obj = new Object();
// 2. 根据原型链，设置新对象的 __proto__ 为构造函数的 prototype。
obj.__proto__ = Person.prototype;
// 3. 绑定构造函数的 this 指向这个新对象，然后执行构造函数（为这个新对象添加属性）
let result = Person.call(obj);
// 4. 判断函数的返回值类型
if (typeof result === "object") {
  person = result; // 如果是引用类型，返回这个引用类型的对象。
} else {
  person = obj; //如果是值类型，返回创建的对象。
}
```

#### 手动实现一个 new 操作符

```js
function myNew(context) {
  const obj = Object.create(context.prototype); // 创建新对象
  const res = context.apply(obj, [...arguments].slice(1)); // 改变 this 指向
  return res && res instanceof Object ? res : obj; // 判断返回值的类型，是对象返回 res，不是返回构造函数的执行结果
}
```

---

### JavaScript 中定义对象的几种方式？

创建单个对象时使用**基本模式**，创建多个对象时使用**动态原型模式**。

#### 1. 基本模式

```JavaScript
var person = new Object();
person.name = "孙悟空";
person.weapon = "棒子";
person.run = function () {
  return this.name + "武器是" + person.weapon;
}
```

缺点：

1. 创建对象较多时比较麻烦；
2. 各个对象之前看不出有什么关联。

#### 2. 工厂模式

```JavaScript
function createPerson(name, weapon) {
  var person = new Object();
  person.name = name;
  person.weapon = weapon;
  person.run = function () {
    return this.name + "武器是" + person.weapon;
  }
  return person;
}
```

缺点：

1. 实例之间没有联系；
2. 没有使用 `new` 关键字；
3. 会造成资源浪费，没生成 一个实例都会增加一些重复内容。

#### 3. 构造函数模式

```JavaScript
function CreatePerson(name, weapon) {
    this.name = name;
    this.weapon = weapon;
    this.run = function () {
      return this.name + "武器是" + this.weapon;
    }
} // 调用创建对象
var WuKou = new CreatePerson("孙悟空", "棒子");
```

缺点：没有解决工厂模式会浪费内存的缺点，每创建一个对象会增加很多重复的东西。

#### 4. 原型（portotype）模式

js 中规定，每一个构造都有一个 prototype 属性，指向另一个对象，这个对象的所有属性和方法，都会被构造函数的实例继承，可以把哪些不变的属性和方法直接定义在 prototype 对象上。

```JavaScript
function PersonObj() { }
personObj.prototype.name = "孙悟空";
personObj.prototype.weapon = "棒子";
personObj.prototype.run = function () {
  return this.name + "武器是" + this.weapon;
}
//创建对象
var person = new PersonObj();
personObj.prototype = {
  constructor: personObj, // 强制指回 personObj
  name: "孙悟空",
  weapon: "棒子",
  run: function () {
    return this.name + "武器是" + this.weapon;
  }
}
```

缺点：构造函数没有参数，不能传参初始化值，因为不同的对象可能只共享方法，但是不会共享属性。

#### 5. 组合模式

这样不同的实例可以有自己特有的属性，还有共享的方法。

```JavaScript
function PersonObj(name,weapon) {
  this.name = name;
  this.weapon = weapon;
}
personObj.prototype = {
  run: function () {
    return this.name + "武器是" + this.weapon;
  }
}
//创建对象
var WuKou = new PersonObj("孙悟空", "棒子");
```

缺点：对象中的属性和方法是分开的。

#### 6. 动态原型模式

```JavaScript
function PersonObj(name, weapon) {
  this.name = name;
  this.weapon = weapon;
  if (typeof this.run != "function") {
    PersonObj.prototype = {
      run: function () {
        return this.name + "武器是" + this.weapon;
      }
    }
  }
}
//创建对象
var WuKou = new PersonObj("孙悟空", "棒子");
```

函数中 `typeof this.run!="function"` 目的是为了防止创建多个对象时，方法执行多次。

---

### JavaScript 原型，原型链是什么 ? ？

- 原型（prototype）：函数特有的，在创建的时候就会与之关联`prototype` 对象，每一个函数都会从原型**继承**属性。
- 原型链（`_proto_`=>`[[prototype]]`）：对象继承属性的一个链条，由相互关联的原型组成的**链状结构**就是原型链。

关系：`instance.constructor = instance.prototype.constructor`

---

### [JavaScript 如何实现继承](https://juejin.im/entry/5993eeaa51882524382f3c0b)

1. 原型继承
2. 构造继承
3. 实例继承
4. 拷贝继承
5. 组合继承
6. 寄生组合式继承
7. ES6 的 extends 继承

```js
function Animal(name) {
  this.name = name || "Animal";
  this.sleep = function() {
    return `${this.name} 正在睡觉！`;
  };
}

Animal.prototype.eat = function(food) {
  return ` ${this.name} 正在吃 ${food}`;
};
```

#### 1. 原型继承

```js
function Child() {}
Child.prototype = new Animal();
Child.prototype.name = "cat";
var child = new Child();
console.log(child.sleep()); // 'cat 正在睡觉！'
console.log(child.eat("fish")); // 'cat 正在吃 fish'
```

简单易于实现，但是要想为子类新增属性和方法，必须要在 `new Parent()` 这样的语句之后执行，无法实现多继承。

#### 2. 构造继承

```js
function Child() {
  Animal.call(this);
  this.name = name || "Tom";
}
var child = new Child();
console.log(child.sleep()); // 'Tom 正在睡觉！'
console.log(child.eat("fish")); // 'Uncaught TypeError: child.eat is not a function'
```

利用 `call` 改变 `this` 指向同时执行方法。可以实现多继承，不能继承原型属性和方法

#### 3. 实例继承

```js
function Child(name) {
  var instance = new Animal();
  instance.name = name || "Tom";
  return instance;
}
console.log(child.sleep()); // 'Tom 正在睡觉！'
console.log(child.eat("fish")); // 'Tom 正在吃 fish'
```

为父类实例添加新特性，作为子类实例返回。不限制调用方式,但不能实现多继承

#### 4. 拷贝继承

```js
function Child(name) {
  var animal = new Animal();
  for (var p in animal) {
    Child.prototype[p] = animal[p];
  }
  Child.prototype.name = name || "Tom";
}
console.log(child.sleep()); // 'Tom 正在睡觉！'
console.log(child.eat("fish")); // 'Tom 正在吃 fish'
```

将父类的属性和方法拷贝一份到子类中。支持多继承,但是效率低占用内存

#### 5. 组合继承

```js
function Child(name) {
  Animal.call(this);
  this.name = name || "Tom";
}
Child.prototype = new Animal();
Child.prototype.constructor = Child;
var child = new Child();
console.log(child.sleep()); // 'Tom 正在睡觉！'
console.log(child.eat("fish")); // 'Tom 正在吃 fish'
```

使用构造继承 + 原型继承的方式，无论是私有的还是公有的都拿过来了。

#### 6. 寄生组合式继承

```js
function Child(name) {
  Animal.call(this);
  this.name = name || "Tom";
}
(function() {
  // 创建一个没有实例方法的类
  var Super = function() {};
  Super.prototype = Animal.prototype;
  //将实例作为子类的原型
  Child.prototype = new Super();
})();
var child = new Child();
console.log(child.sleep()); // 'Tom 正在睡觉！'
console.log(child.eat("fish")); // 'Tom 正在吃 fish'
```

所谓寄生组合式继承就是通过借用构造函数来继承属性，通过原型链的混合形式来继承方法。

#### 7. ES6 的 extends 继承

```js
//父类
class Person {
  //constructor是构造方法
  constructor(skin, language) {
    this.skin = skin;
    this.language = language;
  }
  say() {
    console.log("我是父类");
  }
}

//子类
class Chinese extends Person {
  constructor(skin, language, positon) {
    //console.log(this);//报错
    super(skin, language);
    //super();相当于父类的构造函数
    //console.log(this);调用super后得到了this，不报错，this指向子类，相当于调用了父类.prototype.constructor.call(this)
    this.positon = positon;
  }
  aboutMe() {
    console.log(`${this.skin} ${this.language}  ${this.positon}`);
  }
}

//调用只能通过new的方法得到实例,再调用里面的方法
let obj = new Chinese("红色", "中文", "香港");
obj.aboutMe();
obj.say();
```

ES6 的继承机制是先创造父类的实例对象 `this`（所以必须先调用 super 方法），然后再用子类的构造函数修改 `this`

---

### 对象的遍历方法

#### 一级对象遍历

1. `for...in`：遍历对象自身的和继承的可枚举属性(不含 Symbol 属性)
2. `Object.keys(obj)`：返回一个数组,包括对象自身的(不含继承的)所有可枚举属性(不含 Symbol 属性)
3. `Object.getOwnPropertyNames(obj)`：返回一个数组,包括对象自身的所有可枚举(不含 Symbol 属性)
4. `Object.getOwnPropertySymbols(obj)`：返回一个数组,包含对象自身的所有 **Symbol 属性**
5. `Reflect.ownKeys(obj)`：返回一个数组,包含对象自身的所有(**不可枚举**、可枚举和 **Symbol**)属性
6. `Reflect.enumerate(obj)`：返回一个 Iterator 对象,遍历对象自身的和继承的所有可枚举属性(不含 Symbol 属性)

```js
const copyObj = { a: 1 },
  result = {};

// for...in
for (const key in copyObj) {
  if (Object.hasOwnProperty.call(copyObj, key)) {
    result[key] = copyObj[key];
  }
}

// Object.keys(obj)
Object.keys(copyObj).forEach(key => {
  result[key] = copyObj[key];
});

// Object.getOwnPropertyNames(obj)
Object.getOwnPropertyNames(copyObj).forEach(key => {
  result[key] = copyObj[key];
});

// Object.getOwnPropertySymbols(obj)
Object.getOwnPropertySymbols(copyObj).forEach(key => {
  result[key] = copyObj[key];
});

// Reflect.ownKeys(obj)
Reflect.ownKeys(copyObj).forEach(key => {
  result[key] = copyObj[key];
});

// Reflect.enumerate(obj)
Reflect.enumerate(copyObj).forEach(key => {
  result[key] = copyObj[key];
});
```

#### 多级对象遍历

递归

```js
var treeNodes = [
  {
    id: 1,
    name: "1",
    children: [
      {
        id: 11,
        name: "11",
        children: [
          {
            id: 111,
            name: "111",
            children: []
          },
          {
            id: 112,
            name: "112"
          }
        ]
      },
      {
        id: 12,
        name: "12",
        children: []
      }
    ],
    users: []
  }
];

let parseTreeJson = function(treeNodes) {
  if (!treeNodes || !treeNodes.length) return;
  for (let i = 0, len = treeNodes.length; i < len; i++) {
    let children = treeNodes[i].children;
    console.log(treeNodes[i].id);
    if (children && children.length > 0) {
      parseTreeJson(children);
    }
  }
};
console.log("------------- 递归实现 ------------------");
parseTreeJson(treeNodes);
```

---

### 深拷贝和浅拷贝

- **浅拷贝**：只是复制了对象的引用地址，两个对象指向同一个内存地址，所以修改其中一个的任意值，另一个值也会随之变化。
- **深拷贝**：是将对象及值复制过来，两个对象修改其中任意的值，另一个的值不会改变。

二维对象的时候需要使用深拷贝拷贝所有内容

```js
let obj1 = {
    a: 100,
    b: [1, 2, 3],
    c: {},
    d: /^\d+&/,
    e: new Date()
  },
  obj2 = {};

/* ---一维深拷贝--- */

// 方案一：for…in
for (let key in obj1) {
  if (!obj1.hasOwnProperty(key)) break;
  obj2[key] = obj1[key];
}

// 方案二：... 展开运算法
obj2 = { ...obj1 };

// 方案三：将源对象（source）的所有可枚举属性，复制到目标对象（target）。这个是伪深度拷贝,只能拷贝第一层
Object.assign(obj2, obj1);

/* ---多维深拷贝--- */

// 方案一：转 JSON，函数、日期、正则格式的数据不能使用，函数和正则值会变成空对象`{}`,日期会被转换为字符串。这个是伪深度拷贝,只能拷贝第一层
obj2 = JSON.parse(JSON.stringify(obj1));

//方案二：递归
function deepClone(obj = {}) {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  } else if (obj instanceof RegExp) {
    return new RegExp(obj);
  } else if (obj instanceof Date) {
    return new Date(obj);
  }

  // 使用 new obj.constructor()，为了克隆的结果和传入的参数对象保持相同的所属类
  let result = new obj.constructor();

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = deepClone(obj[key]);
    }
  }

  return result;
}
obj2 = deepClone(obj1);
```

---

### Set 和 Map 有什么区别？

1. Map 是键值对，Set 是值得集合，当然键和值可以是任何得值
2. Map 可以通过 get 方法获取值，而 Set 不能因为它只有值
3. 都能通过迭代器进行 `for...of` 遍历
4. Set 的值是唯一的可以做数组去重，而 Map 由于没有格式限制，可以做数据存储

---

### _AJAX_

### Ajax 原理

- Ajax 的原理简单来说是在客户端和服务器之间加了一个中间层(AJAX 引擎)，通过 XmlHttpRequest 对象来向服务器发**异步**请求，从服务器获得数据，然后用 JavaScript 来操作 DOM 而更新页面。使用户操作与服务器响应异步化。这其中最关键的一步就是从服务器获得请求数据
- Ajax 的过程只涉及 JavaScript、XMLHttpRequest 和 DOM。**XMLHttpRequest 是 ajax 的核心机制**

#### XMLHttpRequest 的通用属性

浏览器提供的 XMLHttpRequest 对象，这个对象的浏览器可以发送 http 请求与接收 http 响应。是一种支持**异步**请求数据的技术。

- readyState：放回 XMLHttpRequest 请求的当前状态，语法`lValue=oXMLHttpRequest.readyState`；
- responseText：将响应信息作为字符串返回，语法`strValue=oXMLHttpRequest.responseText`；
- responseXml：将响应信息格式化为 Xml Document 对象并返回，语法`objDispath=oXMLHttpRequest.responseXML`；
- status：返回当前请求的 http 状态码，语法`lValue=oXMLHttpRequest.status`;
- statusText：返回当前请求的响应行状态，语法`strValue=oXMLHttpRequest.statusText`。

#### JSON 的了解？

- JSON(JavaScript Object Notation) 是一种轻量级的数据交换格式
- 它是基于 JavaScript 的一个子集。数据格式简单, 易于读写, 占用带宽小

JSON 字符串转换为 JSON 对象：`JSON.parse(str);`
JSON 对象转换为 JSON 字符串：`JSON.stringify(obj);`

#### XML 和 JSON 的区别？

- **数据体积**方面：JSON 比 XML 数据的体积小
- **数据交互**方面：与 JavaScript 的交互 JSON 比 XML 更加方便，更容易解析处理
- **传输速度**方面：JSON 比 XML 快
- **数据描述**方面：JSON 比 XML 较差

---

### _高级_

### JS 如何实现多态

**多态**(Polymorphism)，按字面的意思就是“多种状态”。同一操作作用于不同的对象，可以有不同的解释，产生不同的执行结果。

```JavaScript
// --- 非多态代码示例 ---
function poultrySound(animal) {
  if (animal instanceof Duck) {
    console.log('嘎嘎嘎');
  } else if (animal instanceof Chicken) {
    console.log('咯咯咯');
  }
}
function Duck() { }
function Chicken() { };
poultrySound(new Chicken());
poultrySound(new Duck());

// --- 多态的代码示例 ---
function makeSound(animal) {
  animal.sound();
}
function Dog() { }
Dog.prototype.sound = function () {
  console.log('汪汪汪')
}
function Cat() { };
Cat.prototype.sound = function () {
  console.log('喵喵喵')
}
makeSound(new Dog());
makeSound(new Cat());
```

---

### call、apply、bind

- 来源：每一个函数都作为 Function 对象的实例，三者都是 Function 对象原型上的方法。
- 作用：三者都是用来改变函数的 this 对象的指向的；
- 使用：三者第一个参数都是 this 要指向的对象，也就是想指定的上下文；
  - call，bind 后续需要一个个传参；
  - apply 以数组形式传参；
  - 当参数数量不确定时，函数内部也可以通过 arguments 这个数组来遍历所有的参数

#### 区别

- 执行方式：
  - apply、call 是**立即执行**
  - bind 返回的是一个**新的函数**，你必须调用它才会被执行
- 参数：
  - call 和 bind 需要一个个传参，
  - apply 则是以数组形式传参
- 性能：当参数在 3 个及以内的时候 call、apply 差不多，超过 3 个 call 性能要好一些

#### 使用案例

```js
let obj = {
    name: "小智",
    age: 15,
    say: function(name, cls) {
      console.log(
        `我叫 ${this.name}，今年 ${this.age} 岁，我的宝可梦是 ${name}，属于 ${cls}`
      );
    }
  },
  person2 = {
    name: "小霞",
    age: 16
  },
  person3 = {
    name: "小刚",
    age: 17
  },
  person4 = {
    name: "小茂",
    age: 18
  };
obj.say("皮卡丘", "电系"); // 我叫 小智，今年 15 岁，我的宝可梦是 皮卡丘，属于 电系
obj.say.call(person2, "可达鸭", "水系"); // 我叫 小霞，今年 16 岁，我的宝可梦是 可达鸭，属于 水系
obj.say.apply(person3, ["大岩蛇", "岩石系"]); // 我叫 小刚，今年 17 岁，我的宝可梦是 大岩蛇，属于 岩石系
obj.say.bind(person4, "伊布", "普通系")(); // 我叫 小茂，今年 18 岁，我的宝可梦是 伊布，属于 普通系
obj.say.bind(person4, ["伊布", "普通系"])(); // 我叫 小茂，今年 18 岁，我的宝可梦是 伊布,普通系，属于 undefined
```

#### 原生实现

call 和 apply 封装对比:其实核心代码是一样的,只不过 call 需要对第二个形参解构

```js
// call（...parameter）、apply（parameter）
Function.prototype.newCall = function(context, ...parameter) {
  if (typeof context === "object" || typeof context === "function") {
    context = context || window;
  } else {
    context = Object.create(null);
  }
  let fnSymbol = Symbol();
  context[fnSymbol] = this;
  context[fnSymbol](...parameter);
  delete context[fnSymbol];
  return result;
};

let person = {
  name: "Abiel"
};
function sayHi(age, sex) {
  console.log(this.name, age, sex);
}
sayHi.newCall(person, 25, "男"); // Abiel 25 男

// --- bind ---
Function.prototype.newBind = function(context, ...innerArgs) {
  var me = this;
  return function(...finnalyArgs) {
    return me.call(context, ...innerArgs, ...finnalyArgs);
  };
};
let personSayHi = sayHi.newBind(person, 25);
personSayHi("男");
```

---

### 对箭头函数的理解

- 箭头函数的 `this` 和定义时有关和调用无关。即 `call`、`apply`、`bind` 也不能改变箭头函数的 `this` 指向。
- 箭头函数不可以当做构造函数，箭头函数没有原型链，没 `construct` 构造器，不可以使用 `new` 命令实例化对象，否则会抛出一个错误。
- 不可以使用 `arguments` 对象，该对象在函数体内不存在。

---

### 数据拦截

定义：利用对象内置方法,设置属性,进而改变对象的属性值

#### Object.defineProperty(obj, prop, descriptor)

1. ES5 提供的方法；
2. 三个参数：对象(必填)，属性名或 Symbol(必填)，描述符(可选)；
   - 描述符属性：
     - 数据属性：value,writable,configurable,enumerable。（不能同时设置 value 和 writable,这两对属性是互斥的）
     - 访问器属性：get,set。
3. 无法监听数组索引赋值和改变数组长度的变化; 但是通过数组方法来操作可以监听到
4. 无法深度监听，如果属性值也是对象那么需要深度遍历。

```html
<input placeholder="数据改变视图" id="inputValue" />

显示值:
<p id="inputData"></p>
```

```js
let data = {};
Object.defineProperty(data, "value", {
  get() {
    return val;
  },
  set(val) {
    document.querySelector("#inputData").innerText = val;
  }
});

document.querySelector("#inputValue").addEventListener("keyup", () => {
  data.value = event.target.value;
});
```

#### proxy

1. ES6 提供的方法，实质是对对象做了一个拦截,并提供了 13 个处理方法
2. 两个参数:对象和行为函数
3. 可以监听数组索引赋值,改变数组长度的变化, 是直接监听对象的变化,不用深层遍历

```js
let handler = {
  get(target, key, receiver) {
    console.log("get", key);
    return Reflect.get(target, key, receiver);
  },
  set(target, key, value, receiver) {
    console.log("set", key, value);
    return Reflect.set(target, key, value, receiver);
  }
};
let proxy = new Proxy(obj, handler);
proxy.name = "李四";
proxy.age = 24;
```

#### defineProperty 和 proxy 的对比

1. defineProperty 是 es5 的标准，proxy 是 es6 的标准;
2. proxy 可以监听到数组索引赋值，改变数组长度的变化;
3. proxy 是监听对象，不用深层遍历，defineProperty 是监听属性;
4. 利用 defineProperty 实现双向数据绑定(vue2.x 采用的核心)
5. 利用 proxy 实现双向数据绑定(vue3.x 会采用)

---

## 实践

### 什么是防抖和节流？有什么区别？如何实现？

- 防抖：多次触发，只会执行最新的一次。
- 节流：多次触发，一定是时间内只会执行一次。

```JavaScript
/* --- 防抖 --- */
function debounce(fn,wait=500) {
  let timeout = null; // 创建一个标记用来存放定时器的返回值
  return function () {
   if(timeout) clearTimeout(timeout); // 每当用户输入的时候把前一个 setTimeout clear 掉
    timeout = setTimeout(() => { // 然后又创建一个新的 setTimeout, 这样就能保证输入字符后的 interval 间隔内如果还有字符输入的话，就不会执行 fn 函数
      fn.apply(this, arguments);
    }, wait);
  };
}

function sayHi() {
  console.log('防抖成功');
}

var inp = document.getElementById('inp');
inp.addEventListener('input', debounce(sayHi)); // 防抖

/* --- 节流 --- */
// 使用时间戳实现
function timestampThrottle(fn, wait) {
  let preTime = 0;
  return function () {
    let nowTime = new Date();
    let context = this;
    let args = arguments;
    if (nowTime - preTime > wait) {
      fn.apply(context, args);
      preTime = nowTime;
    }
  };
}

// 定时器实现
function throttle(fn,wait=500) {
  let timeout = null; // 通过闭包保存一个标记
  return () => {
    if (!timeout) {
      timeout = setTimeout(()=> {
        fn();
        timeout = null
      }, wait);
    }
  };
}

function say(e) {
  console.log(e.target.innerWidth, e.target.innerHeight);
}

window.addEventListener('resize', throttle(say));
```

---

### 根据 `0.1 + 0.2 !== 0.3`，讲讲 IEEE 754 ，如何让其相等？

- 进制转换 ：js 在做数字计算的时候，0.1 和 0.2 都会被转成二进制后无限循环 ，但是 js 采用的 IEEE 754 二进制浮点运算，最大可以存储 53 位有效数字，于是大于 53 位后面的会全部截掉，将导致精度丢失。
- 对阶运算 ：由于指数位数不相同，运算时需要对阶运算，阶小的尾数要根据阶差来右移（0 舍 1 入），尾数位移时可能会发生数丢失的情况，影响精度。

#### 解决方法

```js
// 方案一：
parseFloat((0.1 + 0.2).toFixed(10));

//方案二：
function withinErrorMarin(left, right) {
  return Math.abs(left - right) < Number.EPSILON * Math.pow(2, 2);
}
withinErrorMarin(0.1 + 0.2, 0.3);
```

---

### `a==1&&a==2&&a==3`为 tue

知识点在`==`不判断数据类型

#### 方法一：重写 toString 方法

```js
var a = {
  i: 0,
  toString() {
    return ++this.i;
  }
};
if (a == 1 && a == 2 && a == 3) console.log("条件成立");
```

```js
var a = [1, 2, 3];
a.torString = a.shift;
if (a == 1 && a == 2 && a == 3) console.log("条件成立");
```

#### 方法二：数据劫持（拦截）

```js
var i = 0;
Object.defineProperty(window, "a", {
  get() {
    return ++i;
  }
});
if (a == 1 && a == 2 && a == 3) console.log("条件成立");
```

这种方法不适用于`let`、`const`。且`defineProperty`的 Getter 拦截器中不能再次获取属性

---

### 调试工具用过哪些？

1. console
2. soure
3. Chrome 开发调试工具

---

### 说说 tcp/ip、http 的理解

- tcp/ip 协议是**传输层协议**，主要解决数据如何在网络中传输；
- http 协议是**应用层协议**，主要解决如何报装数据。

---

### 怎么找到一个字符串里的某个数字或字母然后替换？

方法 1：循环替换，因为 JS 里的 replace 默认只会替换一个

```JavaScript
var a = "abc;def;hij;";
while (a.indexOf(";") >= 0);
a = a.replace(";", ",");
alert(a);
```

方法 2：正则替换

```JavaScript
var a = "abc;def;hij;";
a = a.replace(/;/g, ",");
alert(a);
```

---

### 数组怎么替换，添加，删除等。

- 替换：splice；
- 添加：push、unshift；
- 删除：pop、shift。

---

### 根据移动端的屏幕适配样式有几种？

- **Cover 布局**：就跟 background-size 的 cover 属性意义，保持页面的宽高比，取宽或高中较小的占满屏幕，超出的内容会被隐藏。适用于主要内容集中在中部，边沿无重要内容的设计。
- **Contain 布局**：就跟 background-size 的 cover 属性意义，保持页面的宽高比，取宽或高中较小的占满屏幕，不足的部分会用背景填充。适用于设计上需要背景为单色，或者可平铺的背景。
- **响应式布局**
- **自适应布局**

---

### 说几个查看源代码的网站

1. github
2. gitLab
3. CSDN
4. Stack Overflow
5. Reddit

---

### lodash 是什么？

lodash 是一个一致性、模块化、高性能的 JS 工具库。不需要引入其他第三方依赖，是一个意在提高开发效率，提高 JS 原生方法性能的 JS 库。

---

### map 和 forEach 的区别

1. forEach 没有返回值，map 有
2. 都不能被 break 打断

---

### 解析['1','2','3'].map(parseInt)

```js
var new_array = arr.map(function callback(currentValue, index, arr) {
  // Return element for new_array
}, thisArg);
```

- `callback` 一共可以接收三个参数：
  - `currentValue` 当前元素的值；
  - `index` 当前元素的索引值；
  - `arr` 当前元素属于的数组对象。
- `parseInt(string,radix)` 则是用来解析字符串的，使字符串成为指定基数的整数。接收两个参数：
  - 第一个参数表示被处理的值（字符串）；
  - 第二个表示为解析时的基数。
- 了解两个函数后，可以模拟一下运行情况：
  1. parseInt('1',0)，radix 为 0 时，且 string 参数不以"0x"和"0"开头时，按照 10 为基数处理。这个时候返回 1
  2. parseInt('2',1)，radix 为 1（1 进制）表示的数中，最大值小于 2，所以无法解析，返回 NaN
  3. parseInt('3',2)，radix 为 2（2 进制）表示的数中，最大值小于 3，所以无法解析，返回 NaN

**map 函数返回的是一个数组，所以最后结果为[1,NaN,NaN]**

---

### 函数柯里化(Currying)

定义：是一种预先处理思想，利用的是闭包的机制。只传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数。`fn(a,b,c,d)=>fn(a)(b)(c)(d)`

```js
// 普通的add函数
function add(x, y) {
  return x + y;
}

// Currying后
function curryingAdd(x) {
  return function(y) {
    return x + y;
  };
}

add(1, 2); // 3
curryingAdd(1)(2); // 3
```

##### 柯里化的好处：

1. 参数复用
2. 提前确认
3. 延迟运行

##### 性能：差

- 存取 `arguments` 对象通常要比存取命名参数要慢一点
- 一些老版本的浏览器在 `arguments.length` 的实现上是相当慢的
- 使用 `fn.apply()` 和 `fn.call()` 通常比直接调用 `fn()` 稍微慢点
- 创建大量嵌套作用域和闭包函数会带来花销，无论是在内存还是速度上

```js
function curryingAdd() {
  // 第一次执行时，创建一个数组用来存储所有参数
  let argArr = Array.prototype.slice.call(arguments);
  // 在内部声明一个函数，利用闭包的特性保存 argArr 并收集所有的参数
  let adder = function() {
    argArr.push(...arguments);
    return adder;
  };
  adder.sum = () => argArr.reduce((previous, current) => previous + current);
  return adder;
}
curryingAdd(1)(2, 3)(4, 5, 6)(7, 8, 9, 10).sum(); // 55
```

---

### 运算符优先级

```js
function Foo() {
  getName = function() {
    console.log(1);
  };
  return this;
}
Foo.getName = function() {
  console.log(2);
};
Foo.prototype.getName = function() {
  console.log(3);
};
var getName = function() {
  console.log(4);
};
function getName() {
  console.log(5);
}

Foo.getName(); // 2
getName(); // 4
Foo().getName(); // 1
getName(); // 1
new Foo.getName(); // 2
new Foo().getName(); // 3
new new Foo().getName(); // 3
```

解析顺序，先声明再赋值，后执行：

1. 声明
   1. 函数声明式 `Foo`，因函数提升声明，并赋值函数对象的堆地址
   2. 函数表达式，变量`getName`，因变量提升并声明
   3. 函数声明式 `getName`，因函数提升但`getName`已经声明，并赋值函数对象的堆地址
   4. 函数表达式，`getName`，赋值函数对象的堆地址
2. 执行：
   1. 执行 `Foo.getName()` 方法,调用 `Foo` 函数对象里的 `getName` 属性，输出 2；
   2. 执行全局 `getName()` 方法，输出 4；
   3. 执行 `Foo().getName()` 方法，`Foo()` 先被当做普通函数执行 `getName` 赋值，返回 `this`，然后变成 `this.getName=function(){console.log(1)}` 执行，输出 1；
   4. 执行 `getName()`，因为被上一步重新复制，所有输出 1；
   5. 执行 `new Foo.getName()`，运算符优先级 `new(无参数列表)`，输出 2；
   6. 执行 `new Foo().getName()`，运算符优先级 `new(带参数列表)`，先构造一个`new Foo()`实例，再从 `new Foo()` 实例的原型对象上调用 `getName()`，输出 3；
   7. 执行 `new new Foo().getNam()`，运算符优先级，先构造一个 `new Foo()` 实例，再从 `new Foo()` 实例的原型对象上 `new getName()` 方法并执行，输出 3；

---

## 前端登录的流程

初次登录的时候，前端调后端的登录接口，发送用户名和密码，后端收到请求，验证用户名和密码，验证成功，就给前端返回一个 token，和一个用户信息的值，前端拿到 token，将 token 储存到 Vuex 中，然后从 Vuex 中把 token 的值存入浏览器 Cookies 中。把用户信息存到 Vuex 然后再存储到 localStorage 中,然后跳转到下一个页面，根据后端接口的要求，只要不登录就不能访问的页面需要在前端每次跳转页面师判断 Cookies 中是否有 token，没有就跳转到登录页，有就跳转到相应的页面，我们应该再每次发送 post/get 请求的时候应该加入 token，常用方法再项目 utils/service.js 中添加全局拦截器，将 token 的值放入请求头中 后端判断请求头中有无 token，有 token，就拿到 token 并验证 token 是否过期，在这里过期会返回无效的 token 然后有个跳回登录页面重新登录并且清除本地用户的信息

---
