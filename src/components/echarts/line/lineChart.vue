<template>
  <div>
    <div ref="lineChart" id="lineChart"></div>
  </div>
</template>
<script>
import ECharts from "echarts/lib/echarts";
import "echarts/lib/chart/line";
export default {
    name: "lineChart",
    data () {
        return {
            chart: null,
            option: {
                xAxis: {
                    type: "category",
                    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                    axisTick: {
                        show: false
                    }
                },
                yAxis: {
                    name: "(家)",
                    type: "value",
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    }
                },
                series: [
                    {
                        data: [820, 932, 901, 934, 1290, 1330, 1320],
                        type: "line",
                        smooth: true,
                        symbolSize: 6,
                        itemStyle: {
                            normal: {
                                color: "#2ec7c9",
                                lineStyle: {
                                    color: "#59A3FB",
                                    width: 2
                                }
                            }
                        },
                        areaStyle: {
                            normal: {
                                color: ECharts.graphic.LinearGradient(0, 0, 0, 1, [
                                    {
                                        offset: 0,
                                        color: "rgba(89, 162, 250, 7)"
                                    },
                                    {
                                        offset: 1,
                                        color: "rgba(89, 162, 250, 0)"
                                    }
                                ])
                            }
                        }
                    }
                ]
            }
        };
    },
    methods: {
        drawChart () {
            this.chart = ECharts.init(this.$refs.lineChart);
            this.chart.setOption(this.option);
        }
    },
    mounted () {
        this.drawChart();
        window.onresize = () => {
            this.chart.resize();
        };
    }
};
</script>
<style>
#lineChart {
  width: 100%;
  height: 400px;
  margin: 0 auto;
}
</style>
