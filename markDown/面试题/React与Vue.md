# 1. 说说 SPA 单页面的理解

SPA(single-page application)仅在 web 页面初始化时加载相应的 HTML、CSS 和 JS。一旦加载完成，SPA 不会因为用户的操作而进行页面的重新加载或跳转。取而代之的是利用路由机制实现 HTML 内容的替换，UI 与用户的交互，避免页面的重新加载。

## 1.1. 优点

- 用户体验好、快，内容的改变不需要重新加载整个页面，避免了不必要的跳转和重复渲染
- 基于上面一点，SPA 相对对服务器压力小
- 前后端职责分离，构架清晰，前端进行交互逻辑，后端负责数据处理

## 1.2. 缺点

- 初次加载耗时多：为实现单页 Web 应用功能及显示效果，需要在加载页面的时候将 JavaScript、CSS 统一加载，部分页面按需加载；
- 前几后退由路由器管理：由于单页应用在一个页面中显示所有的内容，所以不能使用浏览器的前进后退功能，所有的页面切换需要自己建立堆栈管理；
- SEO 难度较大：由于所有的内容都在一个页面中动态替换显示，所以在 SEO 上其有着天然的弱势。

# Vue 面试题

## 1. 基础知识

### vue 引入模块和 ES6 引入模块有哪些区别？

vue：需要先安装，再用 import 引入。
ES6：

1. 导入外部的变量或函数等：`impot{firstName,lastName,year}from'./profle';`
2. 导入外部的模块，并立即执行：`import'./test'`执行 test.js，但不导入任何变量。

### Vue2.0/3.0 的数据双向绑定的实现原理

vue.js 是采用数据劫持结合发布者-订阅者模式的方式，vue 会遍历 data 项的属性，通过`Object.defineProperty()`来劫持各个属性的 setter、getter，在数据变动时发布消息给订阅者(Watcher)，触发相应的监听回调。

**具体实现步骤：**

1. 当把一个普通 Javascript 对象传给 Vue 实例来作为它的 data 选项时，Vue 将遍历它的属性，用 Object.defineProperty 都加上 setter 和 getter 这样的话，给这个对象的某个值赋值，就会触发 setter，那么就能监听到了数据变化
2. compile 解析模板指令，将模板中的变量替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，更新视图
3. Watcher 订阅者是 Observer 和 Compile 之间通信的桥梁，主要做的事情是:
   1. 在自身实例化时往属性订阅器(dep)里面添加自己
   2. 自身必须有一个 update()方法
   3. 待属性变动 dep.notice()通知时，能调用自身的 update()方法，并触发 Compile 中绑定的回调，则功成身退。
4. MVVM 作为数据绑定的入口，整合 Observer、Compile 和 Watcher 三者，通过 Observer 来监听自己的 model 数据变化，通过 Compile 来解析编译模板指令，最终利用 Watcher 搭起 Observer 和 Compile 之间的通信桥梁，达到数据变化 -> 视图更新；视图交互变化(input) -> 数据 model 变更的双向绑定效果

```html
<body>
  姓名：<span id="spanName"></span>
  <br />
  <input type="text" id="inpName" />
</body>
```

**ES5：Object.defineProperty**

```js
let obj = { name: "" };
// let newObj = obj;
let newObj = JSON.parse(JSON.stringify(obj));
Object.defineProperty(obj, "name", {
  get() {
    return newObj.name;
  },
  set(val) {
    if (val === newObj.name) return;
    newObj.name = val;
    observe();
  }
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
inpName.oninput = function() {
  obj.name = this.value;
};
```

1. 需要对原始数据克隆
2. 需要分别给对象中的每一个属性设置监听

ES6：Proxy

```js
obj = new Proxy(obj, {
  get(target, prop) {
    return target[prop];
  },
  set(target, prop, val) {
    target[prop] = val;
    observe();
  }
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
inpName.oninput = function() {
  obj.name = this.value;
};
```

> 答：因为我们现在用的基本都是 2.0，3.0 还没开始运用。运用了 2.0 一段时间后开始研究它的底层实现原理，然后才知道是运用的 es5 的 Object.defineProperty 来进行数据拦截的。然后现在不是推广 3.0 了嘛，然后也去看了些关于 3.0 的文章，感觉 3.0 对于 vue 有跨时代的意义。3.0 采用的是 Proxy 实现数据双向绑定

基于 MVVM 视图的更新引起 model 的更新，model 的改变引起 View 的改变。

#### 对于 MVVM 的理解？

MVVM 是 Mode-View-ViewModel 的缩写

- Model：代表**数据模型**，也可以在 Model 中定义数据修改和操作的业务逻辑
- View：代表**UI 组件**，它负责将数据模型转化成 UI 展现出来。
- ViewModel：**监听**模型数据的改变和控制视图更新、处理用户交互，简单理解就是一个同步 View 和 Model 的对象，连接 Model 和 View。

在 MVVM 架构下，View 和 Model 之间没有直接的联系，而是通过 ViewModel 进行交互，Model 和 ViewModel 之间的是双向数据绑定的联系。因此 View 数据的变化会同步到 Model 中，而 Model 数据变化也会立即反应到 View 上。

ViewModel 通过双向数据绑定把 View 层和 Model 层连接了起来，而 View 和 Model 之间的同步工作完全是自动的，无需人为干涉，因此开发者只需要关注业务逻辑，而不需要手动操作 DOM，不需要关注数据状态的同步问题，复杂的数据状态维护完全有 MVVM 来统一管理。

### template 模板渲染语法和原理（vue-loader、虚拟 DOM）

### methods computed watch filters

### class/style

### 条件和循环渲染

### 事件处理

### 表单处理

### 组件

#### 组件信息通信

- 属性传递：父传子
- 发布订阅(EventBus)：`$on`/`$emit`：子传父
- `$parent`/`$children`：实现父子组件之间的互相调用
- `Provide`/`inject`：祖先和后代上下文的方式，祖传后，后传祖
- `slot`：插槽
- 本地存储方案：vuex(虚拟内存，刷新没)、localStorage(浏览器本地存储，持久化，需要做过期日期)

### ref

### 生命周期

### 插槽

### transition

### 渲染函数和 jsx

### 插件编写

### 混入

### devtools

### ……

## 2. 核心原理

## 3. vue-router

### 基础知识

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

### ……

## 4. vue-cli

### 配置

### 优化

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

## 5. vuex

### vuex 是什么？怎么使用？哪种功能场景使用它？

#### vuex 是什么

Vuex 是一个专门为 Vue 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件状态，并以相应的规则保证状态以一种可预测的方式发生变化。应用级的状态放在 store 中；改变状态的方式提交 mutations，这是个同步事物；异步逻辑封装在 action 中。

简单来说：vuex 就是一个仓库，仓库里放了很多对象。其中 state 即使数据源存放地，对应一般 vue 对象里面的 data。

#### vuex 怎么用

在 main.js 中引入 store，注入。vue 组件从 store 读取数据，state 里面存放的数据是响应式的，如果是 store 中数据发生改变，依赖这项数据的组件也会发生改变

#### vuex 应用场景

一般用于中大型 web 单页应用中对应用的状态进行管理，更多地用于解决跨组件通信以及作为数据中心集中式存储数据。

##### 使用 vuex 解决同级组件之间通信问题

vuex 是通过将 state 作为数据中心、各个组件共享 state 实现跨组件通信的，此时的数据完全独立于组件，因此将组件间共享的数据置于 State 中能有效解决多层级组件嵌套的跨组件通信问题。

##### vuex 作为数据存储中心

vuex 的 State 在单页应用的开发中本身具有一个“数据库”的作用，可以将组件中用到的数据存储在 State 中，并在 Action 中封装数据读写的逻辑。

这时候存在一个问题，一般什么样的数据会放在 State 中呢？ 目前主要有两种数据会使用 vuex 进行管理：

1. 组件之间全局共享的数据
2. 通过后端异步请求的数据

### vuex 有 5 种属性

5 种：state,mutations,getters,action,modules。

#### state

Vuex 使用单一状态树，即每个应用将仅仅包含一个 store 实例，但单一状态树和模块化并不冲突。存放的数据状态，不可以直接修改里面的数据。

#### mutations

mutations 定义的方法动态修改 Vuex 的 store 中的状态或数据。

#### getters

类似 vue 的计算属性，主要用来过滤一些数据。

#### action

actions 可以理解为通过将 mutations 里面处理数据的方法变成异步的处理数据的方法，简单的说就是异步操作数据。view 层通过 store.dispath 来分发 action。

```JavaScript
const store = new Vuex.Store({ //store实例
      state: {
         count: 0
             },
      mutations: {
         increment (state) {
          state.count++
         }
          },
      actions: {
         increment (context) {
          context.commit('increment')
   }
 }
})
```

**modules**
项目特别复杂的时候，可以让每一个模块拥有自己的 state、mutation、action、getters，使得解构非常清晰，方便管理。

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
  modules: {
    a: moduleA,
    b: moduleB
})
```

### vuex 的主要核心？

- state：数据源；
- getters：从基本数据派生的数据；
- mutations：提交更改数据的方法，同步的；
- acitons：像一个装饰器，包裹 mutaions，使之可以异步；
- modules：模块化 vuex。

### Vue 不用 vuex 可不可以？

可以，不用的话就直接在组件里传值，用 props。

## 6. UI 组件库

## 7. cube

## 8. SSR

## 9. 优化

## 10.其他

### Vue 的生命周期

1. beforeCreate（创建前）：在数据观测和初始化事件还未开始。
2. created（创建后）：完成数据观测，属性和方法的运算，初始化事件，\$el 属性还没有显示出来。
3. beforeMount（载入前）：在挂载开始之前被调用，相关的 render 函数首次被调用。实例已完成编译模板，把 data 里面的数据和模板生成 HTML。
4. mounted（载入后）：在$el被新创建的vm.$el 替换，并挂载到实例上去之后调用。实例已完成用上面编译好的 HTML 内容替换\$el 属性指向的 DOM 对象。完成模板中 HTML 渲染到 HTML 页面中。此过程中进行 ajax 交互。
5. beforeUpadate（更新前）：在数据更新之前调用，发生在虚拟 DOM 重新渲染和打补丁之前。可以在该钩子中进一步地更改状态，不会触发附加的重渲染过程。
6. update（更新后）：在由于数据更改导致的虚拟 DOM 重新渲染和打补丁之后调用。调用时，组件 DOM 已经更新，所以可以执行依赖于 DOM 的操作。然后再大多数情况下，应该避免在此期间更改状态，因为可能会导致更新无限循环。该钩子在服务器端渲染期间不被调用。
7. beforeDestroy（销毁前）：在实例销毁之前调用。实例仍然完全可以用。
8. destroyed（销毁后）：在实例销毁之后调用。调用后，所有的事件监听器会被移除，所有的子实例也会销毁。该钩子在服务器渲染期间不会被调用。

#### 什么是 vue 生命周期？

Vue 实例从创建到被销毁的过程，就是生命周期。从开始创建、初始化数据、编译模板、挂载 DOM—>渲染、更新—>渲染、销毁等一系列过程，称之为 Vue 的生命周期。

#### Vue 的生命周期的作用是什么？

它的生命周期中有多个事件钩子，让我们在控制整个 Vue 实例的过程是更容易形成好的逻辑。

#### Vue 的生命周期总共有几个阶段？

**总共分为 8 个阶段**：创建前/后，载入前/后，更新前/后，销毁前/后。

#### 第一页面加载会触发哪几个钩子？

berforeCreate,created,beforeMount,mounted。

#### DOM 渲染在哪个周期中已经完成？

在 mounted 中就已经完成了

### Proxy 和 difineProperty 比较

#### Obje.difineProperty()

- 不能监听数组的变化
- 必须遍历对象的每个属性
- 必须深层遍历嵌套的对象

#### Proxy 在 ES2015 规范中被正式加入

- 针对对象：针对整个对象，而不是对象的某个属性，所以也就不需要对 keys 进行遍历。这解决了上述 Object.defineProperty() 第二个问题
- 支持数组：Proxy 不需要对数组的方法进行重载，省去了众多 hack，减少代码量等于减少了
- Proxy 的第二个参数可以有 13 种拦截方法，这比起 Object.defineProperty() 要更加丰富
- Proxy 作为新标准受到浏览器厂商的重点关注和性能优化，相比之下 Object.defineProperty() 是一个已有的老方法。

### Vue 组件间的参数传递

#### 父组件传值给子组件

1. 父组件调用子组件是绑定属性 `<V-header :title="msg2"></V-header>`，属性名是子组件接受名，值名是父组件数据名
2. 在子组件里面通过 props 属性接收数据
3. 传方法同理

#### 父组件主动获取子组件的数据和方法

1. 调用子组件的时候定义一个 ref `<V-header ref='hedaer'></V-header>`
2. 在父组件里面通过 `this.$refs.hedaer.属性/方法`调用

#### 子组件里主动获取父组件的数据和方法

1.  在子组件里 this.\$parent.属性/方法

#### 非父子组件之间传值

1. 在 model 文件夹里新建一个 vue 实例的 JS 文件，暴露这个实例
2. 在要广播的组件引入实例
3. 通过 VueEmit.\$emit('名称',数据)广播
4. 在接收数据的地方通过 VueEmit.\$on('名称',fn(data)) 接收广播的数据

### vue 如何自定义一个过滤器？

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

keep-alive 是 Vue 内置的一个组件，可以使被包含的组件保留状态，或避免重新渲染。
在 vue 2.1.0 版本之后，keep-alive 新加入了两个属性：include（包含的组件缓存）与 exclude（排除的组件不缓存，优先级大于 include）。
使用方法：

```html
<keep-alive include="include_components" exclude="exclude_components">
  <component>
    <!-- 该组件是否缓存取决于include和exclude属性 -->
  </component>
</keep-alive>
```

参数解释：

- include - 字符串或正则表达式，只有名称匹配的组件会被缓存。
- exclude - 字符串或正则表达式，任何名称匹配的组件都不会被缓存。
  使用示例：

```html
<!-- 逗号分隔字符串，只有组件a与b被缓存。 -->
<keep-alive include="a,b">
  <component></component>
</keep-alive>

<!-- 正则表达式 (需要使用 v-bind，符合匹配规则的都会被缓存) -->
<keep-alive :include="/a|b/">
  <component></component>
</keep-alive>

<!-- Array (需要使用 v-bind，被包含的都会被缓存) -->
<keep-alive :include="['a', 'b']">
  <component></component>
</keep-alive>
```

### 一句话就能回答的面试题

#### css 只能在当前组件起作用

在 style 标签中写入 scoped 即可，例如：`<style scoped></style>`。

#### v-if 和 v-show 的区别

vi-if 按照条件是否渲染，v-show 是 display 的 block 或 none；

#### `$route`和`$router` 的区别

$route是“路由信息对象”，包括path，params，hash，query，fullPath，matched，name等路由信息参数。而$router 是“路由示例”对象包括了路由的跳转方法，钩子函数等。

#### vue.js 的两个核心是什么？

数据驱动和组件系统。

#### vue 常用的指令

- v-for
- v-if
- v-bind
- v-show
- v-else

#### vue 常用修饰符

- .prevent：提交事件不再重载页面；
- .stop：阻止单机事件冒泡；
- .self：当事件发生在该元素本身而不是子元素的时候触发；
- .capture：事件侦听，事件发生的时候调用。

#### v-on 可以绑定多个方法吗？

可以

#### vue 中 key 值的作用？

当 Vue.js 用 v-for 正在更新已渲染过的元素列表时，它默认用“就地复用”策略。如果数据项的顺序被改变，Vue 将不会移动 DOM 元素来匹配数据项的顺序，而是用过简单复用此处每个元素，并且确保它在特定索引下显示已被渲染过的每个元素。**key 的作用主要是为了搞笑的更新虚拟 DOM**

#### 什么是 vue 计算属性？其特点是什么？

在模块中放入太多的逻辑会让模块过重且难以维护，在需要对数据进行复杂处理，且可能多次使用的情况下，尽量采取计算属性的方式。
好处：

1. 使得数据处理解构清晰；
2. 依赖于数据，数据更新，处理结果自动更新；
3. 计算属性内部的 this 指向 vm 实例；
4. 在 template 调用时，直接写计算属性名即可；
5. 常用的是 getter 方法，获取数据，也可以使用 set 方法改变数据；
6. 相较于 methods，不管依赖的数据变不变，methods 都会重新计算，但是依赖数据不变的时候 computed 从缓存中获取，不会重新计算。
   特点：对于计算属性而言，根据名字就可以看出部分的差别，computed 属性返回的是运算结果，它是基于依赖进行缓存的（某些属性时非依赖的），只有调用返回的结果发生改变的时候他们才会导致 computed 属性重新计算调用。

#### vue 等单页面应用及其优点

**优点**：Vue 的目标是通过尽可能简单的 API 实现响应的数据绑定和组合的视图组件，核心是一个响应的数据绑定系统。MVVM、数据驱动、组件化、轻量、简介、搞笑、快速、模块友好。
**缺点**：不支持低版本的浏览器，最低只能支持到 IE9；不利于 SEO 的优化（如果支持 SEO，建议通过服务端进行渲染组件）；第一次加载页面耗时相对长一些；不可以使用浏览器的导航按钮需要自行实现前进、后退。

### 怎么理解 Vue 的单向数据流

### 谈一谈 vue 的事件绑定机制

v-on，

### Vue 生命周期 created 和 mounted 的区别？

created 里面可以拿到数据，只能拿到虚拟 DOM，而 mounted 可以拿到真实节点和数据。

### elementUI table 组件怎么筛选数据？

`<template slot-scope="scope">`就是试用 scope 替代 prop，就是没加上 prop。试用 elementUI 的 table 组件的筛选功能记得加 prop！
[详解使用 element-ui table 组件的筛选功能的一个小坑](https://www.jb51.net/article/150041.htm)

## 写 React/Vue 项目时为什么要在组件中写 key，其作用是什么

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

### 开发时，改变数组或者对象的数据，但是页面没有更新如何解决？

vue 提供了`$set`方法强制刷新页面

### vue 弹窗后如何禁止滚动条滚动？

### 如何在 vue 项目里正确地引用 jquery 和 jquery-ui 的插件

# React 面试题

## 1. 基础知识

### JSX 语法（虚拟 DOM）

### 状态

### 属性

### ref

### 组件

- 属性传递：父传子，子传父传回调函数
- 发布订阅：自己手动实现
- `React.createContext`：上下文的方式，祖传后，后传祖
- 本地存储方案：redux/react-redux/mobix/dva

### 生命周期

### PureComponent

### Hooks

### ……

## 2. 核心原理

## 3. react-router-dom

## 4. redux

### redux

### react-redux

### 中间件

## 5. create-react-app

### 配置

### 优化

## 6. dva

## 7. umi

## 8. TypeScript

## 9. UI 组件库

## 10. SSR

## 11. 优化

## 12. 其他

### react 的部署，状态机和组件的传值怎么处理？

部署：首先对项目进行打包`npm run build`；然后可以通过`serve -s build`在本地环境运行打包后的项目。
通过 props 传值。

### 说一说 react 的工作原理

react 响应非常快，是因为它不直接与 DOM 进行比较，对 DOM 的描述一直存放于内存中，使用 render 方法其实就是返回一个对 DOM 的描述，react 能在内存中对这个描述进行比较，然后以最快的时间重新更新浏览器。

### React 中的 Element、Component、Instance 有什么区别？

- Element：是描述一个组件实例或 DOM 节点及其属性的 plain object。
- Component：就是一个 Class 或一个 function。
- Instance：一个实例。
  [React 中 Components, Elements 和 Instances 的区别](https://github.com/clarkzsd/blog/issues/1)

### Redux 状态管理与 setState()有什么区别？

Redux 的 dispatch 最终也是会调用 react 的 setState。只使用 react，每个组件都可以有一个 state，每个组件各自管理各自的 state，如果更改 state 每个组件都需要使用 setState。Redux 将所有组件的 state 维护成一个全局的 state，保存到 store 里，需要更改 state 只需要 store 里些修改。

# 框架对比

## MVC 和 MVVM 的却别

- MVC：单向数据改变，默认只实现了数据的更改控制了视图
- MVVM：双向数据改变，不仅实现了数据控制视图，也实现了视图控制数据`onchange()`

> 答：没区别，MVC 和 MVVM 都实现了数据影响视图，无非是 MVVM 默认替我们做好了视图影响数据，通过 onchange 或 oninput 就能达成视图影响数据了

## Vue 和 AngularJS 的区别

- Angular 采用 TypeScript 开发, 而 Vue 可以使用 javascript 也可以使用 TypeScript
- AngularJS 依赖对数据做脏检查，所以 Watcher 越多越慢；Vue.js 使用基于依赖追踪的观察并且使用异步队列更新，所有的数据都是独立触发的。
- AngularJS 社区完善, Vue 的学习成本较小

## Vue 和 React 的区别

**vue 双向数据绑定基于 MVVM，react 是通多地方算法基于 MVC，比较数据有没有变化，有变化才会刷新。**

- vue 组件分为全局注册和局部注册，在 react 中都是通过 import 相应组件，然后模版中引用；
- props 是可以动态变化的，子组件也实时更新，在 react 中官方建议 props 要像纯函数那样，输入输出一致对应，而且不太建议通过 props 来更改视图；
- 子组件一般要显示地调用 props 选项来声明它期待获得的数据。而在 react 中不必需，另两者都有 props 校验机制；
- 每个 Vue 实例都实现了事件接口，方便父子组件通信，小型项目中不需要引入状态管理机制，而 react 必需自己实现；
- 使用插槽分发内容，使得可以混合父组件的内容与子组件自己的模板；
- 多了指令系统，让模版可以实现更丰富的功能，而 React 只能使用 JSX 语法；
- Vue 增加的语法糖 computed 和 watch，而在 React 中需要自己写一套逻辑来实现；
- react 的思路是 all in js，通过 js 来生成 html，所以设计了 jsx，还有通过 js 来操作 css，社区的 styled-component、jss 等；而 vue 是把 html，css，js 组合到一起，用各自的处理方式，vue 有单文件组件，可以把 html、css、js 写到一个文件中，html 提供了模板引擎来处理。
- react 做的事情很少，很多都交给社区去做，vue 很多东西都是内置的，写起来确实方便一些， 比如 redux 的 combineReducer 就对应 vuex 的 modules， 比如 reselect 就对应 vuex 的 getter 和 vue 组件的 computed， vuex 的 mutation 是直接改变的原始数据，而 redux 的 reducer 是返回一个全新的 state，所以 redux 结合 immutable 来优化性能，vue 不需要。
- react 是整体的思路的就是函数式，所以推崇纯组件，数据不可变，单向数据流，当然需要双向的地方也可以做到，比如结合 redux-form，组件的横向拆分一般是通过高阶组件。而 vue 是数据可变的，双向绑定，声明式的写法，vue 组件的横向拆分很多情况下用 mixin。

## Vue 和 React 怎么管理数据？

在数据绑定上来说，Vue 的特色是双向数据绑定 MVVM，而在 React 中是单向数据绑定 MVC。
