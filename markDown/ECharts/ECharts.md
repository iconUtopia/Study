# ECharts

## 基础配置

主要的配置有：`series`，`xAxis`，`yAxis`，`grid`，`tooltip`，`title`，`legend`，`color`，

- series：
  - 系列列表。每个系列通过`type`决定自己的图标类型
  - 大白话：图标数据，指定设么类型的图标，可以多个图表重叠。
- xAxis：直接坐标系 grid 中的 x 轴
  - boundaryGap：坐标轴两遍六百策略 true，这时候刻度只是作为分割线，标签和数据点都会在两个刻度之间的带(band)中间。
- yAxis：直接坐标系 grid 中的 y 轴
- grid：直角坐标系内绘图网格
- title：标题组件
- tooltip：提示框组件
- legend：图例组件
- color：调色盘颜色列表

  数据堆叠，同类目轴上系列配置相同的`stack`值后，后一个系列的值会在前一个系列的值上相加。

```js
option = {
  // 设置图形的颜色
  color:[],
  // 设置图表的标题
  title: {
    text: "折线图堆叠",
  },
  // 图表的提示框组件
  tooltip: {
    // 触发方式
    trigger: "axis",
  },
  // 图例组件
  legend: {
    // series 里面有了 name 值则 legend 里面的 data 可以删掉
    data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"],
  },
  // 工具箱组件，可以另存为图片等功能
  toolbox: {
    feature: {
      saveAsImage: {},
    },
  },
  // 网格配置，可以控制线形图、柱状图的图表大小
  grid: {
    left: "3%", // 控制网格距离左侧的距离
    right: "4%",
    bottom: "3%",
    containLabel: true, //是否显示y轴刻度
  },
  // 设置 x 轴的相关配置
  xAxis: {
    type: "category", //坐标的类型
    boundaryGap: false, // 坐标轴两边留白策略
    data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
  },
  // 设置 y 轴的相关配置
  yAxis: {
    type: "value",
  },
  // 系列图表匹配值，它决定显示哪种类型的图表
  series: [
    {
      name: "邮件营销",·
      type: "line",
      stack: "总量",
      data: [120, 132, 101, 134, 90, 230, 210],
    },
    {
      name: "联盟广告",
      type: "line",
      stack: "总量",
      data: [220, 182, 191, 234, 290, 330, 310],
    },
    {
      name: "视频广告",
      type: "line",
      stack: "总量",
      data: [150, 232, 201, 154, 190, 330, 410],
    },
    {
      name: "直接访问",
      type: "line",
      stack: "总量",
      data: [320, 332, 301, 334, 390, 330, 320],
    },
    {
      name: "搜索引擎",
      type: "line",
      stack: "总量",
      data: [820, 932, 901, 934, 1290, 1330, 1320],
    },
  ],
};
```
