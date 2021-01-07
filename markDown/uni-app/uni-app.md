# uni-app

## uni-app 规范

- 页面文件遵循 Vue 单文件组件（SFC）规范
- 组件标签靠近小程序规范
- 接口能力（JS API）靠近微信小程序规范
- 数据绑定及事件处理通 Vue.js 规范
- 为兼容多端运行，建议使用 flex 布局进行开发

## uni-app 特色

- 条件编译
- App 端的 Nvue 开发 （App 端）
- HTML5+（App 端）

## uni-app 知识点

- 组件：基础组件、自定义组件
- API
- 路由
- 生命周期
- 语法
- 布局样式

# uni-app 开发环境

- 安装并运行 HbuiderX
- 使用 vue-cli 的方式运行项目

# uni-app 语法

uni-app 的模板语法和 小程序、Vue 的及其类似

html 标签和小程序一致

数据绑定、事件绑定、js 写法 和 vue 写法一样

## 条件编译

允许代码在哪些平台显示：

```html
<!-- #ifdef H5||APP-PLUS -->
<view v-for="(item,index) in arr">
  {{index+':'+item}}
</view>
<!-- #endif -->
```

不允许代码在哪些平台显示

```html
<!-- #ifndef MP-WEIXIN -->
<view v-for="(item,index) in arr">
  {{index+':'+item}}
</view>
<!-- #endif -->
```

在 `<template`>、`<script>`、`<style>` 中都是通过注释开关来完成条件编译

# uni-app 生命周期

## 应用生命周期

- **onLaunch**：应用初始化完成，全局只会触发一次
- **onShow**：应用启动的时候，或从后台进入前台触发
- **onHide**：应用从前台进入后台触发
- onError：当应用报错时触发
- onUniNViewMessage：对 nvue 页面发送的数据进行监听

## 页面生命周期

- **onLoad**：监听页面加载
- **onShow**：监听页面显示
- **onReady**：监听页面的初次渲染完成（如果渲染速度快，会在页面进入动画完成前触发）
- **onHide**：监听页面隐藏
- **onUnload**：监听页面卸载
- onResize：监听窗口尺寸变化(**App、微信小程序**)
- onPullDownRefresh：监听用户下拉动作，一般用于下拉刷新
- onReachBottom：页面滚动到底部的事件（不是 scroll-view 滚到底），常用于上拉加载下一页数据。如使用 scroll-view 导致页面级没有滚动，则触底事件不会被触发
- onTabItemTap：点击 tab 时触发，参数为 Object，具体见下方注意事项(**微信小程序、百度小程序、H5、App（自定义组件模式）**)
- onShareAppMessage：用户点击右上角分享(**微信小程序、百度小程序、字节跳动小程序、支付宝小程序**)
- onPageScroll：监听页面滚动，参数为 Object
- onNavigationBarButtonTap：监听原生标题栏按钮点击事件，参数为 Object(**App、H5**)
- onBackPress：监听页面返回，返回 event = {from:backbutton、 navigateBack} ，backbutton 表示来源是左上角返回按钮或 android 返回键；navigateBack 表示来源是 uni.navigateBack；(**App、H5**)
- onNavigationBarSearchInputChanged：监听原生标题栏搜索输入框输入内容变化事件(**App、H5**)
- onNavigationBarSearchInputConfirmed：监听原生标题栏搜索输入框搜索事件，用户点击软键盘上的“搜索”按钮时触发。(**App、H5**)
- onNavigationBarSearchInputClicked：监听原生标题栏搜索输入框点击事件(**App、H5**)

## 组件生命周期

- **beforeCreate**：实例初始化之前，数据观测(data observer)和 event/watcher 事件配置之前被调用
- **created**：实例创建完成之后立即调用，挂载阶段还没开始
- beforeMount：
- **mounted**：挂载到实例之后立即调用
- beforeUpdate：
- update：
- beforeDestroy
- **destroyed**：Vue 实例销毁后调用

# 平台配置

## 微信小程序

微信小程序开发者工具

## app 真机、模拟器

安卓设备：设置 → 关于手机 → 版本号（点击 5 次）→ 开发人员选项 → 打开 usb 调试

## h5

# 项目结构

- components：自定义组件目录
- pages：页面存放目录
- static：静态资源
- unpackage：编译后的文件存放目录
- utils（自定义）：公用的工具类
- app.vue app.js
- main.js 应用入口
- manifest.json 项目配置
- page.json 页面配置
- readme.md 项目须知
- uni.scss 全局样式配置

## page.json

```json
{
  "pages": [
    //pages数组中第一项表示应用启动页，参考：https://uniapp.dcloud.io/collocation/pages
    {
      "path": "pages/index/index",
      "style": {
        "navigationBarTitleText": "uni-app",
        "app-plus": {
          // 配置app端的特定样式
        },
        "mp-weixin": {
          // 配置微信小程序端的特定样式
        },
        "h5": {
          // 配置h5端的特定样式
        }
      }
    }
  ],
  "globalStyle": {
    "navigationBarTextStyle": "black",
    "navigationBarTitleText": "uni-app",
    "navigationBarBackgroundColor": "#F8F8F8",
    "backgroundColor": "#F8F8F8"
  },
  "tabBar": {
    "color": "#666",
    "selectedColor": "#fff5a5f",
    "borderStyle": "black",
    "list": [
      {
        "pagePath": "pages/index/index",
        "text": "首页",
        // 本地图片，大小40kb，尺寸建议81px*81px
        "iconPath": ""
      }
    ]
  }
}
```

### pages

注册文件，或页面窗口表现。还可以配置一些指定平台特定的样式

### globalStyle

所有页面的默认配置，如果`pages`下文件注册配置了相应的属性，会覆盖`globalStyle`的配置

### tabBar

如果应用是一个多 tab 应用，可以通过 tabBar 配置项指定 tab 栏的表现，以及 tab 切换时显示的对应页。

# uniCloud 云开发平台

DCloud 联合阿里云和腾讯云为 uni-app 的开发者提供的基于 serverless 模式和 js 编程的云开发平台

## uniCloud 的价值

- 用 JS 开发前后端整体业务
- 开发成本大幅下降，不需要后端工程开发师参与
- 只需要专注于你的业务，不需要担心服务器运维和弹性扩容等等
- 非 h5，免域名使用服务器
- 对于敏捷性业务，完整不需要前后台分离

## uniCloud 的开发流程

创建 uni-app 项目 → 选择对应的云开发环境 → 编写业务代码 → 在云函数中进行编写 → 部署到 serverless 环境 → 客户端调用云函数

## uniCloud 构成

1. 云函数
2. 云数据库
3. 云存储和 CDN

# 配置云开发环境

1. 创建项目的时候勾选“启用 uniCloud”，创建项目后可以在文件目录中看见一个“cloudfunctions”的文件夹
2. 然后在 manifest.json 中确保 uni-app 应用标识处于获取状态
3. 然后右键点击“cloudfunctions”文件夹创建云服务空间。
4. 创建云服务空间完成后，右键点击“cloudfunctions”文件夹选择刚才创建好的云服务空间
5. 现在就可以使用云服务功能，可以在“cloudfunctions”文件夹中创建云函数。可以点击右键上传部署云函数

# 使用 uniCloud web 控制台

右键点击“cloudfunctions”文件夹打开 uniCloud Web 控制台

# 云函数

运行在云端（服务器端）的函数

创建云函数后会生成一个默认的 index.js 文件，文件内：

```js
"use strict";
exports.main = async (event, context) => {
  // event 为客户端上传参数
  // context 包含了调用信息和运行状态，获取每次调用的上下文
  console.log("event:" + event);
  // 返回数据给客户端
  return event;
};
```

修改完云函数后一定要记得点击上传部署

## 调用云函数

使用 uni-app 的提供的 API 方法`uniCloud.callFunction()`调用云函数

```js
uniCloud.callFunction({
  name: "login",
  data: {
    name: "XiaoMing",
    age: 18
  },
  success(res) {
    console.log(res);
  },
  fail(err) {
    console.log(err);
  }
});
```

## 使用云函数对数据库进行增删改查

```js
"use strict";
const db = uniCloud.database(); // 获取数据库的数据表
exports.main = async (event, context) => {
  /**
   * 新增：
   * 获取数据库里数据表的引用
   * collection()传入的参数为云数据数据表的名字
   */
  const collection = db.collection("user");
  // 向数据表引用内添加数据
  let res = await collection.add([
    {
      name: "vue"
    },
    {
      name: "html",
      type: "前端"
    }
  ]);
  console.log("数据插入:");
  console.log(JSON.stringify(res)); // {"inserted":2,"result":{"0":"idxxxx","1":"idxxxx"}}
  /**
   * 删除：
   */
  let res2 = await collection.doc("idxxxx").remove();
  console.log(JSON.stringify(res2)); //{"affectedDocs":1,"deleted":1}
  /**
   * 更新：
   * 拥有 update() 和 set() 两个更新数据的方法付
   * update()：要求doc()里填的id参数必须是数据库里存在的
   * set()：如果doc()里填的id参数是数据库里没有的，那么将在数据库插入一条新的数据，id值为doc()填写参数
   */
  let res3 = await collection.doc("1234").set({
    name: "React",
    type: "前端"
  });
  console.log(JSON.stringify(res3)); //{"affectedDocs":1,"update":1,"upsertedId":"1234"}
  /**
   * 查询：
   * doc()：根据数据id值查询
   * where()：根据数据条件查询
   */
  let res4 = await collection.doc("idxxxx").get();
  console.log(JSON.stringify(res4)); //{"affectedDocs":1,"data":[{"_id":"idxxxx","name":"React","type":"前端"}]
  let res5 = await collection.where({ name: "React" }).get();
  console.log(JSON.stringify(res5)); //{"affectedDocs":1,"data":[{"_id":"idxxxx","name":"React","type":"前端"}]
  return event;
};
```
