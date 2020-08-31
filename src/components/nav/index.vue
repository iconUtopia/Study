<template>
<nav>
<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
  <el-menu-item index="1">导航1</el-menu-item>
  <el-menu-item index="2">导航2</el-menu-item>
  <el-menu-item index="3">导航3</el-menu-item>
  <el-menu-item index="4">导航4</el-menu-item>
</el-menu>
</nav>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: '1',
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>
<style scopde>
.el-menu.el-menu--horizontal {
  border-bottom: none;
  background-color: rgba(0, 0, 0, 0);
}
</style>