<template>
  <div id="app">
    <el-container>
      <el-header><STUDY-NAV></STUDY-NAV></el-header>
      <el-container class="center">
        <el-aside style="width: 20%;min-width: 100px;"
          ><STUDY-SIDEBAR></STUDY-SIDEBAR
        ></el-aside>
        <el-main><router-view /></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import STUDYNAV from '@/components/nav/'
import STUDYSIDEBAR from './components/sidebar/'
export default {
    name: 'App',
    components: {
        'STUDY-NAV': STUDYNAV,
        'STUDY-SIDEBAR': STUDYSIDEBAR
    },
    data () {
        return {}
    },
    methods: {}
}
</script>

<style>
/* 引入 reset.css 重置浏览器的默认样式 */
@import url("../static/reset.css");
</style>
<style scoped lang="less">
.el-header {
  z-index: 2;
  border-bottom: solid 1px #e6e6e6;
}
.center {
  position: absolute;
  width: 100%;
  left: 0;
  top: 60px;
  bottom: 0;
  .el-aside {
    overflow: hidden;
  }
  .el-main {
    overflow-y: auto;
  }
}
</style>
