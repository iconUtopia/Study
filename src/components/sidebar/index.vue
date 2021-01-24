<template>
  <nav>
    <el-menu default-active="2" class="el-menu-vertical-demo" collapse-transition>
      <el-submenu index="1">
        <template slot="title">
          <span>导航一</span>
        </template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu>
  </nav>
</template>
<script>
export default {
    data () {
        return {
            activeIndex: '1'
        }
    },
    methods: {
        handleSelect (key, keyPath) {
            console.log(key, keyPath)
        }
    }
}
</script>
<style scoped>
.el-menu {
  border-right: none;
}
</style>
