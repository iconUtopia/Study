# Vue 面试题

## vue 引入模块和 ES6 引入模块有哪些区别？

- vue：需要先安装，再用 import 引入。
- ES6：
  1. 导入外部的变量或函数等：`import{firstName,lastName,year}from'./profle';`
  2. 导入外部的模块，并立即执行：`import'./test'`执行 test.js，但不导入任何变量。

### vue 等单页面应用及其优点

- **优点**：Vue 的目标是通过尽可能简单的 API 实现响应的数据绑定和组合的视图组件，核心是一个响应的数据绑定系统。MVVM、数据驱动、组件化、轻量、简介、搞笑、快速、模块友好。

- **缺点**：不支持低版本的浏览器，最低只能支持到 IE9；不利于 SEO 的优化（如果支持 SEO，建议通过服务端进行渲染组件）；第一次加载页面耗时相对长一些；不可以使用浏览器的导航按钮需要自行实现前进、后退。

---

## Vue2.0/3.0 的数据双向绑定的实现原理

vue.js 是采用数据劫持结合发布者-订阅者模式的方式，vue 会遍历 data 项的属性，通过 `Object.defineProperty()` 来劫持各个属性的 `setter`、`getter`，在数据变动时发布消息给订阅者(Watcher)，触发相应的监听回调。

**具体实现步骤：**

1. 当把一个普通 JS 对象传给 Vue 实例来作为它的 `data` 选项时，Vue 将遍历它的属性，用 `Object.defineProperty` 都加上 `setter` 和 `getter` 这样的话，给这个对象的某个值赋值，就会触发 `setter`，那么就能监听到了数据变化
2. compile 解析模板指令，将模板中的变量替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，更新视图
3. Watcher 订阅者是 Observer 和 Compile 之间通信的桥梁，主要做的事情是:
   1. 在自身实例化时往属性订阅器(dep)里面添加自己
   2. 自身必须有一个 `update()` 方法
   3. 待属性变动 `dep.notice()` 通知时，能调用自身的 `update()` 方法，并触发 Compile 中绑定的回调，则功成身退。
4. MVVM 作为数据绑定的入口，整合 Observer、Compile 和 Watcher 三者，通过 Observer 来监听自己的 model 数据变化，通过 Compile 来解析编译模板指令，最终利用 Watcher 搭起 Observer 和 Compile 之间的通信桥梁，达到数据变化 -> 视图更新；视图交互变化(input) -> 数据 model 变更的双向绑定效果

```html
<body>
  姓名：<span id="spanName"></span>
  <br />
  <input type="text" id="inpName" />
</body>
```

```js
let obj = { name: "" };

/* --- Object.defineProperty(obj, prop, descriptor) --- */
// 1. 需要对原始数据克隆
// 2. 需要分别给对象中的每一个属性设置监听
let newObj = JSON.parse(JSON.stringify(obj));
Object.defineProperty(obj, "name", {
  get() {
    return newObj.name;
  },
  set(val) {
    if (val === newObj.name) return;
    newObj.name = val;
    observe();
  },
});

/* --- Proxy --- */
obj = new Proxy(obj, {
  get(target, prop) {
    return target[prop];
  },
  set(target, prop, val) {
    target[prop] = val;
    observe();
  },
});

function observe() {
  spanName.innerHTML = obj.name;
  inpName.value = obj.name;
}

// 数据的更改影响视图
setTimeout(() => {
  console.log("setTimeout");
  obj.name = "Object.defineProperty";
}, 1000);

// 视图的改变影响数据
inpName.oninput = function () {
  obj.name = this.value;
};
```

> 答：因为我们现在用的基本都是 2.0，3.0 还没开始运用。运用了 2.0 一段时间后开始研究它的底层实现原理，然后才知道是运用的 es5 的 Object.defineProperty 来进行数据拦截的。然后现在不是推广 3.0 了嘛，然后也去看了些关于 3.0 的文章，感觉 3.0 对于 vue 有跨时代的意义。3.0 采用的是 Proxy 实现数据双向绑定

基于 MVVM 视图的更新引起 model 的更新，model 的改变引起 View 的改变。

### Proxy 和 defineProperty 比较

- Object.defineProperty()
  - 不能监听数组的变化
  - 必须遍历对象的每个属性
  - 必须深层遍历嵌套的对象
- Proxy 在 ES2015 规范中被正式加入
  - 针对对象：针对整个对象，而不是对象的某个属性，所以也就不需要对 keys 进行遍历。这解决了上述 `Object.defineProperty()` 第二个问题
  - 支持数组：`Proxy` 不需要对数组的方法进行重载，省去了众多 hack，减少代码量等于减少了
  - `Proxy` 的第二个参数可以有 13 种拦截方法，这比起 Object.`defineProperty()` 要更加丰富
  - `Proxy` 作为新标准受到浏览器厂商的重点关注和性能优化，相比之下 `Object.defineProperty()` 是一个已有的老方法。

---

## 对于 MVVM 的理解？

MVVM 是 Mode-View-ViewModel 的缩写

- Model：代表**数据模型**，也可以在 Model 中定义数据修改和操作的业务逻辑
- View：代表**UI 组件**，它负责将数据模型转化成 UI 展现出来。
- ViewModel：**监听**模型数据的改变和控制视图更新、处理用户交互，简单理解就是一个同步 View 和 Model 的对象，连接 Model 和 View。

在 MVVM 架构下，View 和 Model 之间没有直接的联系，而是通过 ViewModel 进行交互，Model 和 ViewModel 之间的是双向数据绑定的联系。因此 View 数据的变化会同步到 Model 中，而 Model 数据变化也会立即反应到 View 上。

ViewModel 通过双向数据绑定把 View 层和 Model 层连接了起来，而 View 和 Model 之间的同步工作完全是自动的，无需人为干涉，因此开发者只需要关注业务逻辑，而不需要手动操作 DOM，不需要关注数据状态的同步问题，复杂的数据状态维护完全有 MVVM 来统一管理。

---

## Vue 的生命周期

定义：从开始创建、初始化数据、编译模板、挂载 DOM—>渲染、更新—>渲染、销毁等一系列过程，称之为 Vue 的生命周期。**Vue 实例从创建到被销毁的过程，就是生命周期**。

### Vue 有哪些什么周期？

**总共分为 8 个阶段**：创建前/后，载入前/后，更新前/后，销毁前/后。

1. `beforeCreate`（创建前）：在数据观测和初始化事件还未开始。
2. `created`（创建后）：完成数据观测，属性和方法的运算，初始化事件，`$el` 属性还没有显示出来。
3. `beforeMount`（载入前）：在挂载开始之前被调用，相关的 render 函数首次被调用。实例已完成编译模板，把 data 里面的数据和模板生成 HTML。
4. `mounted`（载入后）：在 `$el` 被新创建的 `vm.$el` 替换，并挂载到实例上去之后调用。实例已完成用上面编译好的 HTML 内容替换\$el 属性指向的 DOM 对象。完成模板中 HTML 渲染到 HTML 页面中。此过程中进行 ajax 交互。
5. `beforeUpdate`（更新前）：在数据更新之前调用，发生在虚拟 DOM 重新渲染和打补丁之前。可以在该钩子中进一步地更改状态，不会触发附加的重渲染过程。
6. `updated`（更新后）：在由于数据更改导致的虚拟 DOM 重新渲染和打补丁之后调用。调用时，组件 DOM 已经更新，所以可以执行依赖于 DOM 的操作。然后再大多数情况下，应该避免在此期间更改状态，因为可能会导致更新无限循环。该钩子在服务器端渲染期间不被调用。
7. `beforeDestroy`（销毁前）：在实例销毁之前调用。实例仍然完全可以用。
8. `destroyed`（销毁后）：在实例销毁之后调用。调用后，所有的事件监听器会被移除，所有的子实例也会销毁。该钩子在服务器渲染期间不会被调用。

### Vue 的生命周期的作用是什么？

它的生命周期中有多个事件钩子，让我们在控制整个 Vue 实例的过程是更容易形成好的逻辑。

### 第一页面加载会触发哪几个钩子？

beforeCreate,created,beforeMount,mounted。

### DOM 渲染在哪个周期中已经完成？

在 mounted 中就已经完成了

### Vue 生命周期 created 和 mounted 的区别？

- created：里面可以拿到数据，只能拿到虚拟 DOM
- mounted：可以拿到真实节点和数据。

### 父子生命周期顺序

父 beforeCreate => 父 created => 父 beforeMount => 子 beforeCreate => 子 created =>子 beforeMount => 子 Mounted=>父 Mounted

更新也：父 beforeUpdate =>子 beforeUpdate => 子 updated => 父 updated

---

## Vue 的 data() 为什么是个函数？

利用闭包的机制，`data()` 为每个组件创建了私有作用域。

---

## 组件通信

- 父传子：
  1. props
  2. \$refs
  3. `$children`
  4. `slot` 插槽
- 子传父：
  1. `$parent`
- 兄弟组件：
  1. EventBus，`$on`、`$emit`
- 共同祖先组件：
  1. `Provide`、`inject`
  2. vuex

### 父组件主动获取子组件的数据和方法

1. 调用子组件的时候定义一个 **ref** `<V-header ref='header'></V-header>`
2. 在父组件里面通过 `this.$refs.header.属性/方法`调用

### 子组件里主动获取父组件的数据和方法

在子组件里 `this.$parent.属性/方法`

### 非父子组件之间传值

1. 在 model 文件夹里新建一个 vue 实例的 JS 文件，暴露这个实例
2. 在要广播的组件引入实例
3. 通过 VueEmit.\$emit('名称',数据)广播
4. 在接收数据的地方通过 VueEmit.\$on('名称',fn(data)) 接收广播的数据

---

## slot 插槽

---

## Transition 组件

---

## vue-router

### 动态路由

### 编程式导航

### 命名路由和命名容器

### 导航守卫

- 全局守卫
- 路由独享守卫
- 路由组件内的守卫

首页可以控制导航跳转，beforeEach，afterEach 等，一般用于页面 title 的修改。一些需要登录才能跳转页面的重定向功能。
beforeEach 主要有 3 个参数 to,from,next：
to：route 即将进入的目标路由对象；
from：route 当前导航正要离开的路由；
next：function 一定要调用该方法 resolve 这个钩子。执行效果依赖 next 方法的调用参数。可以控制页面跳转。

#### 全局守卫

vue-router 全局有三个守卫：

1. router.beforeEach：全局前置守卫，进入路由之前
2. router.beforeResolve：全局解析守卫(2.5.0+)在 beforeRouterEnter 调用之后调用
3. router.afterEach：全局后置钩子，进入路由之后

使用方法：

```
// main.js 入口文件
    import router from './router'; // 引入路由
    router.beforeEach((to, from, next) => {
      next();
    });
    router.beforeResolve((to, from, next) => {
      next();
    });
    router.afterEach((to, from) => {
      console.log('afterEach 全局后置钩子');
    });
```

#### 路由独享守卫

如果不想全局配置守卫的话，就可以为某些路由单独配置守卫：

```
const router = new VueRouter({
      routes: [
        {
          path: '/foo',
          component: Foo,
          beforeEnter: (to, from, next) => {
            // 参数用法什么的都一样,调用顺序在全局前置守卫后面，所以不会被全局守卫覆盖
            // ...
          }
        }
      ]
    })
```

#### 路由组件内的守卫

1. beforeRouteEnter 进入路由前, 在路由独享守卫后调用 不能 获取组件实例 this，组件实例还没被创建
2. beforeRouteUpdate (2.2) 路由复用同一个组件时, 在当前路由改变，但是该组件被复用时调用 可以访问组件实例 this
3. beforeRouteLeave 离开当前路由时, 导航离开该组件的对应路由时调用，可以访问组件实例 this

### hash 和 browser 路由

##### hash 模式

在浏览器中符号“#”，#以及#后面的字符称之为 hash，用 window.location.hash 读取。

特点：hash 虽然在 URL 中，但不被包括在 HTTP 请求中；用来指导浏览器动作，对服务器端安全无用，hash 不会重加载页面。

hash 模式下，仅 hash 符号之前的内容被包含在请求之中，如“http://www.xxxx.com”，因此对于后端来说，即使没有做到对路由的全覆盖，也不会返回404错误。

##### history 模式

history 采用 HTML5 的特性；且提供两个新方法：pushState()、replaceState()可以对浏览器历史记录栈进行修改，以及 popState 事件的监听到状态变更。
history 模式下，前端的 URL 必须和实际向后端发起请求的 URL 一致。如“http://www.xxx.com/items/id”。后端如果缺少/items/id的路由处理，将返回404错误。

### 路由原理

Vue 路由跳转原理：前端路由直接找到与地址匹配的一个组件或者对象，并将它渲染出来，改变浏览器地址。

---

## vue-cli

### vue-cli 如何新增自定义指令？

#### 创建局部指令

```JavaScript
var app = new Vue({
    el: '#app',
    data: {
    },
    // 创建指令(可以多个)
    directives: {
        // 指令名称
        dir1: {
            inserted(el) {
                // 指令中第一个参数是当前使用指令的DOM
                console.log(el);
                console.log(arguments);
                // 对DOM进行操作
                el.style.width = '200px';
                el.style.height = '200px';
                el.style.background = '#000';
            }
        }
    }
})
```

#### 全局指令

```JavaScript
Vue.directive('dir2', {
    inserted(el) {
        console.log(el);
    }
})
```

#### 指令的使用

```JavaScript
<div id="app">
    <div v-dir1></div>
    <div v-dir2></div>
</div>
```

---

## vuex 是什么

Vuex 是一个专门为 Vue 应用程序开发的**状态管理机**。一般用于中大型 web 单页应用中对应用的状态进行管理，使用单一状态树，它采用**集中式存储数据管理**解决跨组件通信，并以相应的规则保证状态以一种可预测的方式发生变化。

### Vuex 有哪些基本属性?

1. state：**基本数据(数据源存放地)**。Vuex 使用单一状态树，即每个应用将仅仅包含一个 store 实例，但单一状态树和模块化并不冲突。存放的数据状态，不可以直接修改里面的数据。
2. mutations：**同步提交更改 store 的方法**。
3. getters：从基本数据派生出来的数据，类似 vue 的计算属性，主要用来过滤一些数据。
4. action：像一个**装饰器**，将 mutations 里面处理数据的方法变成异步的。view 层通过 store.dispatch 来分发 action。
5. modules：模块化 Vuex。项目特别复杂的时候，可以让每一个模块拥有自己的 state、mutation、action、getters，使得解构非常清晰，方便管理。

```JavaScript
const moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
 }
const moduleB = {
  state: { ... },
  mutations: { ... },
  actions: { ... }
 }
const store = new Vuex.Store({
  //store实例
  state: {
    count: 0
  },
  mutations: {
    increment(state) {
      state.count++;
    }
  },
  actions: {
    increment(context) {
      context.commit("increment");
    }
  },
  modules: {
    a: moduleA,
    b: moduleB
  }
});
```

### vuex 怎么用

在 main.js 中引入 store 注入。

Vuex 是通过将 state 作为数据中心，并在 Action 中封装数据读写的逻辑。各个组件共享 state 读取数据，并实现跨组件通信的。

---

## vue 如何自定义一个过滤器？

html 代码：

```html
<div id="app">
  <input type="text" v-model="msg" />
  {{msg| capitalize }}
</div>
```

JS 代码：

```JavaScript
var vm=new Vue({
    el:"#app",
    data:{
        msg:''
    },
    filters: {
      capitalize: function (value) {
        if (!value) return ''
        value = value.toString()
        return value.charAt(0).toUpperCase() + value.slice(1)
      }
    }
})
```

全局定义过滤器

```JavaScript
Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})
```

过滤器接收表达式的值（msg）作为第一个参数。capitalize 过滤器降回去收到 msg 的值作为第一个参数。

### 对 keep-alive 的了解？

keep-alive 是 Vue 内置的一个组件，可以缓存包含的组件，避免重新渲染。
在 vue 2.1.0 版本之后，keep-alive 新加入了两个属性：

- `include`：字符串或正则表达式，只有名称匹配的组件会被缓存；
- `exclude`：字符串或正则表达式，任何名称匹配的组件都不会被缓存，优先级大于 include。

```html
<keep-alive include="include_components" exclude="exclude_components">
  <Component>
    <!-- 该组件是否缓存取决于include和exclude属性 -->
  </Component>
</keep-alive>

<!-- 逗号分隔字符串，只有组件a与b被缓存。 -->
<keep-alive include="a,b">
  <Component></Component>
</keep-alive>

<!-- 正则表达式 (需要使用 v-bind，符合匹配规则的都会被缓存) -->
<keep-alive :include="/a|b/">
  <Component></Component>
</keep-alive>

<!-- Array (需要使用 v-bind，被包含的都会被缓存) -->
<keep-alive :include="['a', 'b']">
  <component></component>
</keep-alive>
```

## 一句话就能回答的面试题

### scoped 的起作用

vue 模板里的 style 标签添加 scoped 属性 `<style scoped></style>`：

1. 作用：让样式在本组件内生效，不影响其他组件
2. 原理：给节点新增自定义属性，然后 CSS 根据属性选择器添加样式。

### v-if 和 v-show 的区别

`v-show` 与 `v-if` 的都是控制元素在页面是否显示。

- `v-if` 根据条件渲染 dom
  - 隐藏是将 dom 元素整个添加或删除
  - 切换有一个局部编译/卸载的过程，会触发生命周期
  - 有更高的切换消耗
- `v-show` 无论条件都会渲染 dom
  - 隐藏是为该元素添加 `display:none`
  - 基于 css 切换，不会触发生命周期
  - 有更高的初始渲染消耗

### v-if 和 v-for 的优先级

`v-for` 比 `v-if` 高，因为源码 `genElement` 函数中对 `v-for` 的判断在 `v-if` 之前。

### `$route`和`$router` 的区别

- `$route`：是**路由信息**对象，包括 path，params，hash，query，fullPath，matched，name 等路由信息参数。
- `$router`：是**路由示例**对象，包括了路由的跳转方法，钩子函数等。

### nextTick 是什么？

获取更新后的 DOM 内容

### vue.js 的两个核心是什么？

数据驱动和组件系统。

### vue 常用的指令

- v-for
- v-if
- v-bind
- v-show
- v-else

### vue 常用修饰符

- .prevent：提交事件不再重载页面；
- .stop：阻止单机事件冒泡；
- .self：当事件发生在该元素本身而不是子元素的时候触发；
- .capture：事件侦听，事件发生的时候调用。

### v-on 可以绑定多个方法吗？

可以

### 写 React/Vue 项目时为什么要在组件中写 key，其作用是什么

**key 值的作用是为了在 diff 算法执行时更快的找到对应的节点，提高 diff 速度**
vue 和 react 都是采用 diff 算法来对比新旧虚拟节点，从而更新节点。在 vue 的 diff 函数中。可以先了解一下 diff 算法。
在交叉对比的时候，当新节点跟旧节点**头尾交叉对比**没有结果的时候，会根据新节点的 key 去对比旧节点数组中的 key，从而找到相应旧节点（这里对应的是一个 key=>index 的 map 映射）。如果没找到就认为是一个新增节点。而如果没有 key，那么就会采用一种遍历查找的方式去找到对应的旧节点。一种一个 map 映射，另一种是遍历查找。相比而言，map 映射的速度更快。
vue 部分源代码如下：

```JavaScript
// vue项目  src/core/vdom/patch.js  -488行
// oldCh 是一个旧虚拟节点数组，
 if (isUndef(oldKeyToIdx)) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx)idxInOld = isDef(newStartVnode.key)
          ? oldKeyToIdx[newStartVnode.key]
          : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx)
```

创建 map 函数

```JavaScript
function createKeyToOldIdx (children, beginIdx, endIdx) {
  let i, key
  const map = {}
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key
    if (isDef(key)) map[key] = i
  }
  return map
}
```

遍历寻找

```JavaScript
// sameVnode 是对比新旧节点是否相同的函数
 function findIdxInOld (node, oldCh, start, end) {
    for (let i = start; i < end; i++) {
      const c = oldCh[i]
      if (isDef(c) && sameVnode(node, c)) return i
    }
  }
```

### 什么是 vue 计算属性？其特点是什么？

在模块中放入太多的逻辑会让模块过重且难以维护，在需要对数据进行复杂处理，且可能多次使用的情况下，尽量采取计算属性的方式。
好处：

1. 使得数据处理解构清晰；
2. 依赖于数据，数据更新，处理结果自动更新；
3. 计算属性内部的 this 指向 vm 实例；
4. 在 template 调用时，直接写计算属性名即可；
5. 常用的是 getter 方法，获取数据，也可以使用 set 方法改变数据；
6. 相较于 methods，不管依赖的数据变不变，methods 都会重新计算，但是依赖数据不变的时候 computed 从缓存中获取，不会重新计算。

特点：对于计算属性而言，根据名字就可以看出部分的差别，computed 属性返回的是运算结果，它是基于依赖进行缓存的（某些属性时非依赖的），只有调用返回的结果发生改变的时候他们才会导致 computed 属性重新计算调用。

#### 和 watch 有什么区别?

- computed 计算属性：依赖其它属性值，并且 computed 的值有缓存，只有它依赖的属性值发生改变，下一次获取 computed 的值时才会重新计算 computed 的值。
- watch 监听器：更多的是观察的作用,无缓存性,类似与某些数据的监听回调,每当监听的数据变化时都会执行回调进行后续操作

### elementUI table 组件怎么筛选数据？

`<template slot-scope="scope">`就是试用 scope 替代 prop，就是没加上 prop。试用 elementUI 的 table 组件的筛选功能记得加 prop！
[详解使用 element-ui table 组件的筛选功能的一个小坑](https://www.jb51.net/article/150041.htm)

### 开发时，改变数组或者对象的数据，但是页面没有更新如何解决？

vue 提供了`$set`方法强制刷新页面
