// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

/**
 * 一、引入外部依赖
 */

// 1.Element ui
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 2.less
// import less from "less";

/**
 * 二、注册外部依赖
 */
Vue.use(Element)
// Vue.use(less);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: {App},
    template: '<App/>'
})
