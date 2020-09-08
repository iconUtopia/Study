<template>
  <div>
    <div ref="lineChart" id="lineChart"></div>
  </div>
</template>
<script>
import ECharts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
export default {
  name: 'lineChart',
  data () {
    return {
      chart: null,
      option: {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          smooth: true,
          areaStyle: {}
        }]
      }
    }
  },
  methods: {
    drawChart () {
      this.chart = ECharts.init(this.$refs.lineChart)
      this.chart.setOption(this.option)
    }
  },
  mounted () {
    this.drawChart()
    window.onresize = () => {
      this.chart.resize()
    }
  }
}
</script>
<style>
#lineChart {
  width: 100%;
  height: 400px;
  margin: 0 auto;
}
</style>
