<template>
  <div id="Index">
    <el-header class="header">
      <h1>大前端</h1>
      <ul>
        <li>
          <el-autocomplete
            v-model="search"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入内容"
            @select="handleSelect"
            clearable
          ></el-autocomplete>
        </li>
      </ul>
    </el-header>
    <el-main class="main"></el-main>
    <el-footer class="footer"></el-footer>
  </div>
</template>
<script>
export default {
  name: "IndexPage",
  components: {},
  data() {
    return {
      search: "",
      searchResults: [],
      timeout: null
    };
  },
  methods: {
    createStateFilter(queryString) {
      return state => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    querySearchAsync(queryString, cb) {
      let searchResults = this.searchResults;
      let results = queryString
        ? searchResults.filter(this.createStateFilter(queryString))
        : searchResults;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 3000 * Math.random());
    },
    handleSelect(item) {
      console.log(item);
    },
    loadAll() {
      return [
        { value: "三全鲜食（北新泾店）", address: "长宁区新渔路144号" },
        {
          value: "Hot honey 首尔炸鸡（仙霞路）",
          address: "上海市长宁区淞虹路661号"
        },
        {
          value: "新旺角茶餐厅",
          address: "上海市普陀区真北路988号创邑金沙谷6号楼113"
        },
        { value: "泷千家(天山西路店)", address: "天山西路438号" }
      ];
    }
  },
  mounted() {
    this.searchResults = this.loadAll();
  }
};
</script>
<style></style>
