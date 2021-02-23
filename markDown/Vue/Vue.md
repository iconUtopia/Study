# 1. Vue简介
## 1.1. 什么是Vue
* Vue.js是一套构建用户界面的**渐进式框架**。
* Vue采用自底向上增量开发的设计。Vue的核心库**只关注视图层**
* Vue完全有能力驱动采用单文件组件和Vue上过台系统支持的库开发的复杂简单页面应用。
* Vue的**目标**是尽可能简单的API实**现响应的数据绑定**和**数组的视图组件**
* Vue的**核心概念**，就是让用户不再操作DOM元素，让程序员关注业务逻辑。
## 1.2. 框架和库的区别
* 框架：是一套完整的解决方案；对项目的侵入性较大，项目如果需要更换框架，则需要重新构建整个项目。
* 库（插件）：提供某一个小功能，对项目侵入较小，如果某个库无法完成某些需求，可以很容易切换到其他库实现需求。
## 1.3. 后端中的MVC和前端中的MVVM之间的区别
![视图模型](_v_images/20190824170723319_14331.png)
* MVC是后端分层开发概念
* MVVM是前端视图层的概念，主要关注于视图层分离，也就是说MVVM把前端的视图层，分为了三部分：Model、View、ViewModel
## 1.4. Vue.js基本代码和MVVM之间的对应关系
```
  <body>
    <div id="app">
      <p>{{msg}}</p>
    </div>
  </body>
  <script>
    let vm = new new Vue({
      el: "#app",
      data: {
          msg:"123"
      },
      methods:{
          show:function(){
              alert('Hello');
          }
      }
    });
  </script>
```
* View：Vue实例所控制的这个元素区域，就是我们的V
* ViewModel：`new Vue({})`出来的这个实例对象，就是VM调度者
* Model：`new Vue({})`实例中的配置`data`属性就是Molde，专门用来保存每个页面的数据。
# 2. Vue属性
| 属性名   | 描述                                       |
| :------ | :--------------------------------------- |
| el      | 指定控制区域                                |
| data    | 是个对象，指定控制区域内要用到的数据           |
| methods | 虽然带了个后缀s，但是是个对象，这里可以定义方法   |
| filters | 虽然带了个后缀s，定义私有过滤器,采用就近原则                      |
# 3. Vue指令
| 指令                  | 描述                            |
| :-------------------- | :-------------------------- |
| v-cloak               | 能够解决插值表达式闪烁的问题      |
| v-text='变量名'       | 默认是不会有闪烁问题；会覆盖元素中原本的文本    |
| v-html='变量名'       | 会把文本中的html元素解析了，会覆盖原本的文本    |
| v-bind:属性名='变量名' | 是Vue中，提供用于绑定属性的指令。可简写为`:属性名='变量名'`  |
| v-on:事件名='变量名'   | Vue中提供了v-on事件绑定机制。可以简写为`@事件名='变量名'`     |
| v-for='表达式'        | 用于迭代数组、对象等          |
| v-if                  | 判断值的Boolean，对元素进行删除或创建                           |
| v-show                | 判断值的Boolean，对元素`display:noen`样式进行操作       |
## 3.1. v-on的事件修饰符
```
<div @事件名.修饰符='函数名'></div>
```
* `.stop`：阻止冒泡
* `.prevent`：阻止默认事件
* `.capture`：添加事件监听器时使用事件捕获模式
* `.self`：只当事件在该元素本身触发时触发回调
* `.once`：事件只触发一次
`.stop`和`.self`的区别：`.stop`阻止了向所有父级元素被冒泡；`.self`只能阻止本身被冒泡，不能阻止父级被冒泡
## 3.2. v-for示例
1. 迭代数组
```
<ul>
    <li v-for="(item,index) in 数组对象">
        索引：{{index}},值：{{item}}
    </li>
</ul>
```
2. 迭代对象中的属性
```
<div v-for="(val,key,index) in userInfo" :key="item.id">
    键：{{key}},值：{{val}},索引：{{index}}
</div>
```
    * 在2.2.0+的版本里，**当组件中使用**v-for时，key是必须的
    * v-for在更新视图的时候，默认用**就地复用**策略
    * key是为了**以便Vue能够跟踪每个节点的身份，从而重用和重新排序现有元素**
    * v-for循环的时候，key属性只能使用number或string
    * key在使用的时候，必须使用v-bind属性绑定的形式，指定key的值
3. 迭代数字
```
<p v-for='count in 10'>这是第{{count}}个p标签</p>
```
迭代数字的时候，count值从1开始
# 4. Vue的特殊指令
| 属性       | 描述                                  |
| :--------- | :------------------------------------ |
| key        | 只接受number和string，有相同父元素的子元素必须有**独特的**key，重复的key会造成渲染错误。      |
| ref        | 只接受string，被用来给元素或子组件注册信息。用在DOM元素上时，引用指向的就是DOM元素。   |
| is         |                                            |
| slot       |                                            |
| slot-scope |                                            |
| scope      |                                            |
# 5. Vue中使用样式
## 5.1. 使用class样式
这里的class需要用v-bind绑定
1. 数组：
```
<h1 :class="['red','thin']">这是一个h1</h1>
```
2. 数组中使用三元表达式：
```
<h1 :class="['red','thin',flag?'avctive':'']">这是一个h1</h1>
```
3. 数组中嵌套对象：
```
<h1 :class="['red','thin',{'avtive':isactive}]">这是一个h1</h1>
```
4. 直接使用对象：
```
<h1 :class="{red:true,isalic:true,active:true,thin:true}">这是一个h1</h1>
```
## 5.2. 内联样式
1. 直接在元素上通过`:style`的形式，书写样式对象
```
<h1 :style="{color:'red','font-size':'40px'}"></h1>
```
2. 将样式对象，定义到`data`中，并直接引用到`:style`中
    1. 在data上定义样式
```
data:{
    h1StyleObj:{color:'red','font-size':'40px'}
}
```
    2. 在元素中，通过属性绑定的形式，将样式对象应用到元素中
```
<h1 :style="h1StyleObj"></h1>
```
3. 在`:tyle`中通过数组，引用多个`data`上的样式
    1. 在data上定义样式
```
data:{
    h1StyleObj:{color:'red','font-size':'40px'},
    h1StyleObj2:{fontStyle:'italic'}
}
```
    2. 在元素中，通过属性绑定的形式，将样式对象应用到元素中
```
<h1 :style="[h1StyleObj,h1StyleObj2]"></h1>
```
# 6. 过滤器
## 6.1. 概念
Vue.js允许你自定义过滤器，**可被作用一些常见的文本格式化**。过滤器可以用在两个地方：**mustachc插值和v-bind表达式**。过滤器应该被添加在JavaScript表达式的尾部，由**管道符**指示。
## 6.2. 过滤器的调用格式
```
<td>{{name | 过滤器的名称(msg,msg2)}}</td>
```
## 6.3. 定义过滤器的语法
```
Vue.filter('过滤器的名称',function(data){
    return name.replace(/要替换的字符/g,msg+msg2);
})
```
* data：第一个参数，已经被规定个思死了，永远都是过滤器管道符`|`前面传递过来的数据。
* 过滤器可以调用多个，第一个过滤后，交给后面的依次过滤，直到最后一个过滤完成
## 6.4. 如何自定义一个私有的过滤器
```
let vm=new Vue({
    el:"#app",
    data:{},
    methods:{},
    filters:{
        nameFotmat:fucntion(datta,newNameStr){
            return name.replace(/要替换的字符/g,msg+msg2);
        }
    }
})
```
# 7. 键值修饰符
* `.enter`
* `.tab`
* `.delete`
* `.esc`
* `.space`
* `.up`
* `.down`
* `.left`
* `.right`
以上没有的键可以通过`config。keyCodes`对象自定义键值修饰符
```
// 可以使用 v-on:keyup.f1
Vue.config.keyCodes.f1=112
// 也可以直接通过键码直接绑定
<input type="text" @keyup.112="add">
```
# 8. vue-rtouer
## 8.1. 配置路由
### 8.1.1. 安装路由
`npm install vue-router --save`
### 8.1.2. 引入并实例化路由
创建routerJS路由文件，并将实例化Router暴露
```
import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);
import Login from "../views/loginPage";
export default new Router({
  routes: [
    // 默认跳转路由
    {
      path: "",
      redirect: "/login",
      component: Login
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
  ]
});
```
### 8.1.3. 挂载路由
在main.js中引入路由实例，并挂载
```
import router from "./router";
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
```
### 8.1.4. `<router-view>`
在根组件的模板上挂载路由出口
```
<router-view></router-view>
```
## 8.2. 不同路由传值
### 8.2.1. 动态路由
#### 8.2.1.1. 配置动态路由
```
routes: [
  {
    path: "/component/:id",
    component: Component
  }
];
```
#### 8.2.1.2. 传值组件
```
<ul>
    <li v-for="(item,key) in lits">
        <router-link :to="'/component/'+key">{{item}}</router-link>
    </li>
</ul>
```
#### 8.2.1.3. 获取传值
在对应组件的mounted()接收值
```
mounted(){
  this.$route.params
}
```
### 8.2.2. Get传值
#### 8.2.2.1. 配置路由
```
routes: [
  {
    path: "/component",
    component: Component
  }
];
```
#### 8.2.2.2. 传值组件
```
<ul>
    <li v-for="(item,key) in lits">
        <router-link :to="'/component?id='+key">{{item}}</router-link>
    </li>
</ul>
```
#### 8.2.2.3. 获取传值
在对应组件的mounted()接收值
```
mounted(){
  this.$route.query
}
```
## 8.3. 路由结合请求数据
## 8.4. 编程式导航
使用JavaScript编写方法，实现路由跳转。
```
<button @click="goHome()"></button>
//
//
methods:{
    goHome(){
       this.$reouter.push({ path:"login" })
       // 或  this.$reouter.push({ name:"Login" })
   }
}
```
## 8.5. History模式和hash模式
history模式会去掉hash模式中地址里的“#”
```
export default new Router({
  mode: "history",
  routes: [……]
});
```
使用history模式配合后端时，配置方法去官网看
## 8.6. 路由嵌套
```
export default new Router({
  routes: [
    {
      path: "/user",
      name: "User",
      component: User
      children:[
          {path:"userAdd",component:UserAdd},
          {path:"userList",component:UserList}
      ]
    },
  ]
});
```
并在父级路由里放入`<router-view>`
# 9. Vuex
Vuex状态管理插件，可以解决不同组件的数据共享，数据持久化。
*小项目中的不同组件的数据传值、共享，可以使用localstorage和sessionstorage也是能实现，*
## 9.1. Vuex使用
1. 在src新建一个Vuex文件夹
2. 在文件夹里新建一个js文件
3. 安装vuex：npm install vuex -s
4. 在js文件里引入vue、引入vuex并且`Vue.use(Vuex)`
## 9.2. Vuex实例属性
* state：在vuex中存放数据
* mutations
* actions
* getters：类似于计算属性，改变state里的数据时会触发getters里面的方法，获取新的值
* modules