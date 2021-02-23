# 1. 说说SPA单页面的理解
SPA(single-page application)仅在web页面初始化时加载相应的HTML、CSS和JS。一旦加载完成，SPA不会因为用户的操作而进行页面的重新加载或跳转。取而代之的是利用路由机制实现HTML内容的替换，UI与用户的交互，避免页面的重新加载。
## 1.1. 优点
* 用户体验好、快，内容的改变不需要重新加载整个页面，避免了不必要的跳转和重复渲染
* 基于上面一点，SPA相对对服务器压力小
* 前后端职责分离，构架清晰，前端进行交互逻辑，后端负责数据处理
## 1.2. 缺点
* 初次加载耗时多：为实现单页 Web 应用功能及显示效果，需要在加载页面的时候将 JavaScript、CSS 统一加载，部分页面按需加载；
* 前几后退由路由器管理：由于单页应用在一个页面中显示所有的内容，所以不能使用浏览器的前进后退功能，所有的页面切换需要自己建立堆栈管理；
* SEO难度较大：由于所有的内容都在一个页面中动态替换显示，所以在 SEO 上其有着天然的弱势。
# 2. Vue面试题
## 2.1. 对于MVVM的理解？
MVVM是Mode-View-ViewModel的缩写
* Model：代表**数据模型**，也可以在Model中定义数据修改和操作的业务逻辑
* View：代表**UI组件**，它负责将数据模型转化成UI展现出来。
* ViewModel：**监听**模型数据的改变和控制视图更新、处理用户交互，简单理解就是一个同步View和Model的对象，连接Model和View。
在MVVM架构下，View和Model之间没有直接的联系，而是通过ViewModel进行交互，Model和ViewModel之间的是双向数据绑定的联系。因此View数据的变化会同步到Model中，而Model数据变化也会立即反应到View上。
ViewModel通过双向数据绑定把View层和Model层连接了起来，而View和Model之间的同步工作完全是自动的，无需认为干涉，因此开发者只需要关注业务逻辑，而不需要手动操作DOM，不需要关注数据状态的同步问题，复杂的数据状态维护完全有MVVM来统一管理。
## 2.2. Vue的生命周期
1. beforeCreate（创建前）：在数据观测和初始化事件还未开始。
2. created（创建后）：完成数据观测，属性和方法的运算，初始化事件，$el属性还没有显示出来。
3. beforeMount（载入前）：在挂载开始之前被调用，相关的render函数首次被调用。实例已完成编译模板，把data里面的数据和模板生成HTML。
4. mounted（载入后）：在$el被新创建的vm.$el替换，并挂载到实例上去之后调用。实例已完成用上面编译好的HTML内容替换$el属性指向的DOM对象。完成模板中HTML渲染到HTML页面中。此过程中进行ajax交互。
5. beforeUpadate（更新前）：在数据更新之前调用，发生在虚拟DOM重新渲染和打补丁之前。可以在该钩子中进一步地更改状态，不会触发附加的重渲染过程。
6. update（更新后）：在由于数据更改导致的虚拟DOM重新渲染和打补丁之后调用。调用时，组件DOM已经更新，所以可以执行依赖于DOM的操作。然后再大多数情况下，应该避免在此期间更改状态，因为可能会导致更新无限循环。该钩子在服务器端渲染期间不被调用。
7. beforeDestroy（销毁前）：在实例销毁之前调用。实例仍然完全可以用。
8. destroyed（销毁后）：在实例销毁之后调用。调用后，所有的事件监听器会被移除，所有的子实例也会销毁。该钩子在服务器渲染期间不会被调用。
### 2.2.1. 什么是vue生命周期？
Vue实例从创建到被销毁的过程，就是生命周期。从开始创建、初始化数据、编译模板、挂载DOM—>渲染、更新—>渲染、销毁等一系列过程，称之为Vue的生命周期。
### 2.2.2. Vue的生命周期的作用是什么？
它的生命周期中有多个事件钩子，让我们在控制整个Vue实例的过程是更容易形成好的逻辑。
### 2.2.3. Vue的生命周期总共有几个阶段？
**总共分为8个阶段**：创建前/后，载入前/后，更新前/后，销毁前/后。
### 2.2.4. 第一页面加载会触发哪几个钩子？
berforeCreate,created,beforeMount,mounted。
### 2.2.5. DOM渲染在哪个周期中已经完成？
在mounted中就已经完成了
## 2.3. Vue实现数据双向绑定的原理
vue.js是采用数据劫持结合发布者-订阅者模式的方式，vue会遍历data项的属性，通过`Object.defineProperty()`来劫持各个属性的setter、getter，在数据变动时发布消息给订阅者(Watcher)，触发相应的监听回调。

具体实现步骤：
1. 当把一个普通 Javascript 对象传给 Vue 实例来作为它的 data 选项时，Vue 将遍历它的属性，用 Object.defineProperty 都加上 setter和getter 这样的话，给这个对象的某个值赋值，就会触发setter，那么就能监听到了数据变化
2. compile解析模板指令，将模板中的变量替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，更新视图
3. Watcher订阅者是Observer和Compile之间通信的桥梁，主要做的事情是: 
    1. 在自身实例化时往属性订阅器(dep)里面添加自己 
    2. 自身必须有一个update()方法 
    3. 待属性变动dep.notice()通知时，能调用自身的update()方法，并触发Compile中绑定的回调，则功成身退。
4. MVVM作为数据绑定的入口，整合Observer、Compile和Watcher三者，通过Observer来监听自己的model数据变化，通过Compile来解析编译模板指令，最终利用Watcher搭起Observer和Compile之间的通信桥梁，达到数据变化 -> 视图更新；视图交互变化(input) -> 数据model变更的双向绑定效果
## 2.4. Proxy和difineProperty比较
### 2.4.1. Obje.difineProperty()
* 不能监听数组的变化
* 必须遍历对象的每个属性
* 必须深层遍历嵌套的对象
### 2.4.2. Proxy在ES2015规范中被正式加入
* 针对对象：针对整个对象，而不是对象的某个属性，所以也就不需要对 keys 进行遍历。这解决了上述 Object.defineProperty() 第二个问题
* 支持数组：Proxy 不需要对数组的方法进行重载，省去了众多 hack，减少代码量等于减少了
* Proxy 的第二个参数可以有 13 种拦截方法，这比起 Object.defineProperty() 要更加丰富
* Proxy 作为新标准受到浏览器厂商的重点关注和性能优化，相比之下 Object.defineProperty() 是一个已有的老方法。
## 2.5. Vue组件间的参数传递
### 2.5.1. 父组件传值给子组件
1. 父组件调用子组件是绑定属性 `<V-header :title="msg2"></V-header>`，属性名是子组件接受名，值名是父组件数据名
2. 在子组件里面通过 props 属性接收数据
3. 传方法同理
### 2.5.2. 父组件主动获取子组件的数据和方法
1. 调用子组件的时候定义一个ref  `<V-header ref='hedaer'></V-header>`
2. 在父组件里面通过 `this.$refs.hedaer.属性/方法`调用
### 2.5.3. 子组件里主动获取父组件的数据和方法
 1. 在子组件里this.$parent.属性/方法
### 2.5.4. 非父子组件之间传值
1. 在model文件夹里新建一个vue实例的JS文件，暴露这个实例
2. 在要广播的组件引入实例
3. 通过VueEmit.$emit('名称',数据)广播
4. 在接收数据的地方通过 VueEmit.$on('名称',fn(data)) 接收广播的数据
## 2.6. vue-router有哪几种导航守卫
* 全局守卫
* 路由独享守卫
* 路由组件内的守卫
### 2.6.1. 全局守卫
vue-router全局有三个守卫：
1. router.beforeEach：全局前置守卫，进入路由之前
2. router.beforeResolve：全局解析守卫(2.5.0+)在beforeRouterEnter调用之后调用
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
### 2.6.2. 路由独享守卫
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
### 2.6.3. 路由组件内的守卫
1. beforeRouteEnter 进入路由前, 在路由独享守卫后调用 不能 获取组件实例 this，组件实例还没被创建
2. beforeRouteUpdate (2.2) 路由复用同一个组件时, 在当前路由改变，但是该组件被复用时调用 可以访问组件实例 this
3. beforeRouteLeave 离开当前路由时, 导航离开该组件的对应路由时调用，可以访问组件实例 this
## 2.7. Vue的路由实现：hash模式和history模式
Vue路由跳转原理：前端路由直接找到与地址匹配的一个组件或者对象，并将它渲染出来，改变浏览器地址。
### 2.7.1. hash模式
在浏览器中符号“#”，#以及#后面的字符称之为hash，用window.location.hash读取。

特点：hash虽然在URL中，但不被包括在HTTP请求中；用来指导浏览器动作，对服务器端安全无用，hash不会重加载页面。

hash模式下，仅hash符号之前的内容被包含在请求之中，如“http://www.xxxx.com”，因此对于后端来说，即使没有做到对路由的全覆盖，也不会返回404错误。
### 2.7.2. history模式
history采用HTML5的特性；且提供两个新方法：pushState()、replaceState()可以对浏览器历史记录栈进行修改，以及popState事件的监听到状态变更。
history模式下，前端的URL必须和实际向后端发起请求的URL一致。如“http://www.xxx.com/items/id”。后端如果缺少/items/id的路由处理，将返回404错误。
## 2.8. Vue和AngularJS的区别
* Angular采用TypeScript开发, 而Vue可以使用javascript也可以使用TypeScript
* AngularJS依赖对数据做脏检查，所以Watcher越多越慢；Vue.js使用基于依赖追踪的观察并且使用异步队列更新，所有的数据都是独立触发的。
* AngularJS社区完善, Vue的学习成本较小
## 2.9. Vue和React的区别
**vue双向数据绑定基于MVVM，react是通多地方算法基于MVC，比较数据有没有变化，有变化才会刷新。**
* vue组件分为全局注册和局部注册，在react中都是通过import相应组件，然后模版中引用；
* props是可以动态变化的，子组件也实时更新，在react中官方建议props要像纯函数那样，输入输出一致对应，而且不太建议通过props来更改视图；
* 子组件一般要显示地调用props选项来声明它期待获得的数据。而在react中不必需，另两者都有props校验机制；
* 每个Vue实例都实现了事件接口，方便父子组件通信，小型项目中不需要引入状态管理机制，而react必需自己实现；
* 使用插槽分发内容，使得可以混合父组件的内容与子组件自己的模板；
* 多了指令系统，让模版可以实现更丰富的功能，而React只能使用JSX语法；
* Vue增加的语法糖computed和watch，而在React中需要自己写一套逻辑来实现；
* react的思路是all in js，通过js来生成html，所以设计了jsx，还有通过js来操作css，社区的styled-component、jss等；而 vue是把html，css，js组合到一起，用各自的处理方式，vue有单文件组件，可以把html、css、js写到一个文件中，html提供了模板引擎来处理。
* react做的事情很少，很多都交给社区去做，vue很多东西都是内置的，写起来确实方便一些， 比如 redux的combineReducer就对应vuex的modules， 比如reselect就对应vuex的getter和vue组件的computed， vuex的mutation是直接改变的原始数据，而redux的reducer是返回一个全新的state，所以redux结合immutable来优化性能，vue不需要。
* react是整体的思路的就是函数式，所以推崇纯组件，数据不可变，单向数据流，当然需要双向的地方也可以做到，比如结合redux-form，组件的横向拆分一般是通过高阶组件。而vue是数据可变的，双向绑定，声明式的写法，vue组件的横向拆分很多情况下用mixin。
## 2.10. Vue和React怎么管理数据？
在数据绑定上来说，Vue的特色是双向数据绑定MVVM，而在React中是单向数据绑定MVC。
## 2.11. Vue路由钩子函数
首页可以控制导航跳转，beforeEach，afterEach等，一般用于页面title的修改。一些需要登录才能跳转页面的重定向功能。
beforeEach主要有3个参数to,from,next：
to：route即将进入的目标路由对象；
from：route当前导航正要离开的路由；
next：function一定要调用该方法resolve这个钩子。执行效果依赖next方法的调用参数。可以控制页面跳转。
## 2.12. vuex是什么？怎么使用？哪种功能场景使用它？
### 2.12.1. vuex是什么
Vuex是一个专门为Vue应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件状态，并以相应的规则保证状态以一种可预测的方式发生变化。应用级的状态放在store中；改变状态的方式提交mutations，这是个同步事物；异步逻辑封装在action中。

简单来说：vuex就是一个仓库，仓库里放了很多对象。其中state即使数据源存放地，对应一般vue对象里面的data。
### 2.12.2. vuex怎么用
在main.js中引入store，注入。vue组件从store读取数据，state里面存放的数据是响应式的，如果是store中数据发生改变，依赖这项数据的组件也会发生改变
### 2.12.3. vuex应用场景
一般用于中大型web单页应用中对应用的状态进行管理，更多地用于解决跨组件通信以及作为数据中心集中式存储数据。
#### 2.12.3.1. 使用vuex解决同级组件之间通信问题
vuex 是通过将 state 作为数据中心、各个组件共享 state 实现跨组件通信的，此时的数据完全独立于组件，因此将组件间共享的数据置于 State 中能有效解决多层级组件嵌套的跨组件通信问题。
#### 2.12.3.2. vuex作为数据存储中心
vuex 的 State 在单页应用的开发中本身具有一个“数据库”的作用，可以将组件中用到的数据存储在 State 中，并在 Action 中封装数据读写的逻辑。

这时候存在一个问题，一般什么样的数据会放在 State 中呢？ 目前主要有两种数据会使用 vuex 进行管理：
1. 组件之间全局共享的数据
2. 通过后端异步请求的数据
## 2.13. vuex有5种属性
5种：state,mutations,getters,action,modules。
### 2.13.1. state
Vuex使用单一状态树，即每个应用将仅仅包含一个store实例，但单一状态树和模块化并不冲突。存放的数据状态，不可以直接修改里面的数据。
### 2.13.2. mutations
mutations定义的方法动态修改Vuex的store中的状态或数据。
### 2.13.3. getters
类似vue的计算属性，主要用来过滤一些数据。
### 2.13.4. action
actions可以理解为通过将mutations里面处理数据的方法变成异步的处理数据的方法，简单的说就是异步操作数据。view层通过store.dispath来分发action。

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
项目特别复杂的时候，可以让每一个模块拥有自己的state、mutation、action、getters，使得解构非常清晰，方便管理。

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
## 2.14. vuex的主要核心？
* state：数据源；
* getters：从基本数据派生的数据；
* mutations：提交更改数据的方法，同步的；
* acitons：像一个装饰器，包裹mutaions，使之可以异步；
* modules：模块化vuex。
## 2.15. Vue不用vuex可不可以？
可以，不用的话就直接在组件里传值，用props。
## 2.16. vue引入模块和ES6引入模块有哪些区别？
vue：需要先安装，再用import引入。
ES6：
1. 导入外部的变量或函数等：`impot{firstName,lastName,year}from'./profle';`
2. 导入外部的模块，并立即执行：`import'./test'`执行test.js，但不导入任何变量。
## 2.17. vue-cli如何新增自定义指令？
### 2.17.1. 创建局部指令

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
### 2.17.2. 全局指令

```JavaScript
Vue.directive('dir2', {
    inserted(el) {
        console.log(el);
    }
})
```
### 2.17.3. 指令的使用

```JavaScript
<div id="app">
    <div v-dir1></div>
    <div v-dir2></div>
</div>
```
## 2.18. vue如何自定义一个过滤器？
html代码：

```html
<div id="app">
     <input type="text" v-model="msg" />
     {{msg| capitalize }}
</div>
```
JS代码：

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
过滤器接收表达式的值（msg）作为第一个参数。capitalize过滤器降回去收到msg的值作为第一个参数。
## 2.19. 对keep-alive的了解？
keep-alive是Vue内置的一个组件，可以使被包含的组件保留状态，或避免重新渲染。
在vue 2.1.0版本之后，keep-alive新加入了两个属性：include（包含的组件缓存）与exclude（排除的组件不缓存，优先级大于include）。
使用方法：

```html
<keep-alive include='include_components' exclude='exclude_components'>
  <component>
    <!-- 该组件是否缓存取决于include和exclude属性 -->
  </component>
</keep-alive>
```
参数解释：
* include - 字符串或正则表达式，只有名称匹配的组件会被缓存。
* exclude - 字符串或正则表达式，任何名称匹配的组件都不会被缓存。
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
## 2.20. 一句话就能回答的面试题
### 2.20.1. css只能在当前组件起作用
在style标签中写入scoped即可，例如：`<style scoped></style>`。
### 2.20.2. v-if 和 v-show 的区别
vi-if按照条件是否渲染，v-show是display的block或none；
### 2.20.3. $route和$router的区别
$route是“路由信息对象”，包括path，params，hash，query，fullPath，matched，name等路由信息参数。而$router是“路由示例”对象包括了路由的跳转方法，钩子函数等。
### 2.20.4. vue.js的两个核心是什么？
数据驱动和组件系统。
### 2.20.5. vue常用的指令
* v-for
* v-if
* v-bind
* v-show
* v-else
### 2.20.6. vue常用修饰符
* .prevent：提交事件不再重载页面；
* .stop：阻止单机事件冒泡；
* .self：当事件发生在该元素本身而不是子元素的时候触发；
* .capture：事件侦听，事件发生的时候调用。
### 2.20.7. v-on可以绑定多个方法吗？
可以
### 2.20.8. vue中key值的作用？
当Vue.js用v-for正在更新已渲染过的元素列表时，它默认用“就地复用”策略。如果数据项的顺序被改变，Vue将不会移动DOM元素来匹配数据项的顺序，而是用过简单复用此处每个元素，并且确保它在特定索引下显示已被渲染过的每个元素。**key的作用主要是为了搞笑的更新虚拟DOM**
### 2.20.9. 什么是vue计算属性？其特点是什么？
在模块中放入太多的逻辑会让模块过重且难以维护，在需要对数据进行复杂处理，且可能多次使用的情况下，尽量采取计算属性的方式。
好处：
1. 使得数据处理解构清晰；
2. 依赖于数据，数据更新，处理结果自动更新；
3. 计算属性内部的this指向vm实例；
4. 在template调用时，直接写计算属性名即可；
5. 常用的是getter方法，获取数据，也可以使用set方法改变数据；
6. 相较于methods，不管依赖的数据变不变，methods都会重新计算，但是依赖数据不变的时候computed从缓存中获取，不会重新计算。
特点：对于计算属性而言，根据名字就可以看出部分的差别，computed属性返回的是运算结果，它是基于依赖进行缓存的（某些属性时非依赖的），只有调用返回的结果发生改变的时候他们才会导致computed属性重新计算调用。
### 2.20.10. vue等单页面应用及其优点
**优点**：Vue的目标是通过尽可能简单的API实现响应的数据绑定和组合的视图组件，核心是一个响应的数据绑定系统。MVVM、数据驱动、组件化、轻量、简介、搞笑、快速、模块友好。
**缺点**：不支持低版本的浏览器，最低只能支持到IE9；不利于SEO的优化（如果支持SEO，建议通过服务端进行渲染组件）；第一次加载页面耗时相对长一些；不可以使用浏览器的导航按钮需要自行实现前进、后退。
## 2.21. vue的双向绑定
基于MVVM视图的更新引起model的更新，model的改变引起视图的改变。
## 2.22. 怎么理解Vue的单向数据流

## 2.23. 谈一谈vue的事件绑定机制
v-on，
## 2.24. Vue生命周期created和mounted的区别？
created里面可以拿到数据，只能拿到虚拟DOM，而mounted可以拿到真实节点和数据。
## 2.25. elementUI table组件怎么筛选数据？
`<template slot-scope="scope">`就是试用scope替代prop，就是没加上prop。试用elementUI的table组件的筛选功能记得加prop！
[详解使用element-ui table组件的筛选功能的一个小坑](https://www.jb51.net/article/150041.htm)
## 2.26. 写React/Vue项目时为什么要在组件中写key，其作用是什么
**key值的作用是为了在diff算法执行时更快的找到对应的节点，提高diff速度**
vue和react都是采用diff算法来对比新旧虚拟节点，从而更新节点。在vue的diff函数中。可以先了解一下diff算法。
在交叉对比的时候，当新节点跟旧节点**头尾交叉对比**没有结果的时候，会根据新节点的key去对比旧节点数组中的key，从而找到相应旧节点（这里对应的是一个key=>index的map映射）。如果没找到就认为是一个新增节点。而如果没有key，那么就会采用一种遍历查找的方式去找到对应的旧节点。一种一个map映射，另一种是遍历查找。相比而言，map映射的速度更快。
vue部分源代码如下：

```JavaScript
// vue项目  src/core/vdom/patch.js  -488行
// oldCh 是一个旧虚拟节点数组， 
 if (isUndef(oldKeyToIdx)) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx)idxInOld = isDef(newStartVnode.key)
          ? oldKeyToIdx[newStartVnode.key]
          : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx)
```
创建map函数

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
## 2.27. 开发时，改变数组或者对象的数据，但是页面没有更新如何解决？

## 2.28. vue弹窗后如何禁止滚动条滚动？

## 2.29. 如何在 vue 项目里正确地引用 jquery 和 jquery-ui的插件
# 3. React面试题
## 3.1. react的部署，状态机和组件的传值怎么处理？
部署：首先对项目进行打包`npm run build`；然后可以通过`serve -s build`在本地环境运行打包后的项目。
通过props传值。
## 3.2. 说一说react的工作原理
react响应非常快，是因为它不直接与DOM进行比较，对DOM的描述一直存放于内存中，使用render方法其实就是返回一个对DOM的描述，react能在内存中对这个描述进行比较，然后以最快的时间重新更新浏览器。
## 3.3. React中的Element、Component、Instance有什么区别？
* Element：是描述一个组件实例或DOM节点及其属性的plain object。
* Component：就是一个Class或一个function。
* Instance：一个实例。
[React 中 Components, Elements 和 Instances 的区别](https://github.com/clarkzsd/blog/issues/1)
## 3.4. Redux状态管理与setState()有什么区别？
Redux的dispatch最终也是会调用react的setState。只使用react，每个组件都可以有一个state，每个组件各自管理各自的state，如果更改state每个组件都需要使用setState。Redux将所有组件的state维护成一个全局的state，保存到store里，需要更改state只需要store里些修改。