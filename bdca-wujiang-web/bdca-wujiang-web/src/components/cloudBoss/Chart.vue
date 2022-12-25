<template>
  <el-dialog
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @opened="open"
    @close="close"
    width="80vw"
    v-model="show"
  >
    <div class="chart-wrap" ref="myChart"></div>
  </el-dialog>
</template>

<script>
import * as echarts from 'echarts' // 引入echarts
import { markRaw } from 'vue'
export default {
  props: ['tableData', 'tableHeader'],
  data() {
    return {
      show: false,
      xAxis: [],
      yAxis: [],
      chart: null,
    }
  },
  methods: {
    drawChart() {
      const that = this
      this.chart = markRaw(echarts.init(this.$refs.myChart))
      let header = this.tableHeader
      let data = this.tableData
      let series = []
      let series2 = []
      for (let i = 0; i < this.yAxis.length; i++) {
        series.push({
          name: header[i],
          type: 'bar',
          smooth: true,
          tooltip: {
          },
          itemStyle: {
            normal: {
              label: {
                show: true,
                position: 'top',
                textStyle: {
                  fontSize: 12,
                  color: '#383838',
                  fontWeight: "bold",
                }
              }
            }
          },
          data: this.yAxis[i],
        })
        series2.push({
          name: header[i],
          type: 'bar',
          yAxisIndex: i,
          smooth: true,
          tooltip: {
            valueFormatter: function (value) {
              let arr = header[i].split('-')
              return (data[0][arr[0]][arr[1]] + '').includes('%')
                ? value + '%'
                : value
            },
          },
          itemStyle: {
            normal: {
              label: {
                show: true,
                position: 'top',
                textStyle: {
                  fontSize: 12,
                  color: '#383838',
                  fontWeight: "bold",
                }
              }
            }
          },
          data: this.yAxis[i],
        })
      }
      let yLable = []
      for (let i = 0; i < header.length; i++) {
        let pos = i === 0 ? 'left' : 'right'
        let offset = i === 0 ? '' : i * 80 - 80
        let nameLocation = i === 0 ? 'end' : 'middle'
        let nameGap = i === 0 ? '30' : '40'
        yLable.push({
          type: 'value',
          name: header[i],
          nameLocation: nameLocation,
          nameGap: nameGap,
          position: pos,
          offset: offset,
          alignTicks: true,
          axisLine: {
            show: true,
          },
          axisLabel: {
            fontWeight: "bold",
            formatter: function (value) {
              let arr = header[i].split('-')
              return (data[0][arr[0]][arr[1]] + '').includes('%')
                ? value + '%'
                : value
            },
          },
        })
      }
      let grid = header.length * 4 + '%'
      let option = {
        grid: {
          right: grid,
          top: '20%',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999',
            },
          },
          formatter: function (params) {
            let str = params[0].axisValue + ': <br /> '
            params.forEach((item) => {
              str +=
                item.seriesName +
                '：' +
                item.value +
                (item.seriesName.includes('率') ? '%' : '') +
                '<br />'
            })
            return str
          },
        },
        toolbox: {
          right: '20',
          feature: {
            magicType: {
              show: true,
              title: { line: '切换为折线图', bar: '切换为柱状图' },
              type: ['line', 'bar'],
            },
            saveAsImage: {
              show: true,
              title: '保存为图片',
              name: '各站数据对比图',
            },
            myRestore: {
              show: true,
              title: '重载',
              icon: 'image://./refresh.png',
              onclick: function () {
                that.chart.clear()
                that.chart.setOption(option)
              },
            },
            myTool: {
              show: true,
              title: '切换为多轴',
              icon: 'image://./doubleY.png',
              onclick: function () {
                console.log(option2)
                that.chart.clear()
                that.chart.setOption(option2)
              },
            },
          },
        },
        legend: {
          data: this.tableHeader,
          type: 'scroll',
          textStyle: {
            fontSize: '1rem',
            fontWeight: '500',
          },
        },
        xAxis: [
          {
            type: 'category',
            data: this.xAxis,
            axisLabel: {
              interval: 0,
              fontSize: '0.8rem',
              fontWeight: 'bold',
            },
            axisPointer: {
              type: 'shadow',
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            alignTicks: true,
            axisLine: {
              show: true,
            },
            axisLabel: {
              // formatter: function (value) {
              //   return header[0].includes('率') ? value + '%' : value
              // },
              fontSize: '0.8rem',
              fontWeight: 'bold',
            },
          },
        ],
        series: series,
      }
      let option2 = {
        grid: {
          right: grid,
          top: '20%',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999',
            },
          },
          formatter: function (params) {
            let str = params[0].axisValue + ': <br /> '
            params.forEach((item) => {
              str +=
                item.seriesName +
                '：' +
                item.value +
                (item.seriesName.includes('率') ? '%' : '') +
                '<br />'
            })
            return str
          },
        },
        toolbox: {
          right: '20',
          feature: {
            magicType: {
              show: true,
              title: { line: '切换为折线图', bar: '切换为柱状图' },
              type: ['line', 'bar'],
            },
            saveAsImage: {
              show: true,
              title: '保存为图片',
              name: '各站数据对比图',
            },
            myRestore: {
              show: true,
              title: '重载',
              icon: 'image://./refresh.png',
              onclick: function () {
                that.chart.clear()
                that.chart.setOption(option)
              },
            },
            myTool: {
              show: true,
              title: '切换为多轴',
              icon: 'image://./doubleY.png',
              onclick: function () {
                that.chart.clear()
                that.chart.setOption(option2)
              },
            },
          },
        },
        legend: {
          data: this.tableHeader,
          type: 'scroll',
          textStyle: {
            fontSize: '1rem',
            fontWeight: '500',
          },
        },
        xAxis: [
          {
            type: 'category',
            data: this.xAxis,
            axisLabel: {
              interval: 0,
              fontSize: '0.8rem',
              fontWeight: 'bold',
            },
            axisPointer: {
              type: 'shadow',
            },
          },
        ],
        yAxis: yLable,
        series: series2,
      }
      this.chart.setOption(option)
      window.addEventListener('resize', () => {
        this.chart.resize();
      })
    },
    open() {
      let t = window.config.stationOptions.reduce((pre, cur, index) => {
        pre[index] = cur.label
        return pre
      }, [])
      this.xAxis = t
      let data = this.tableData.reduce((pre, cur, index) => {
        pre[cur['中心及广电站']] = cur
        return pre
      }, {})
      let yAxis = []
      for (let i = 0; i < this.tableHeader.length; i++) {
        let arr = this.tableHeader[i].split('-')
        let t = []
        for (let j = 0; j < this.tableData.length; j++) {
          if (this.tableData[j]['中心及广电站'] !== '总计') {
            let num =
              data[this.tableData[j]['中心及广电站']][arr[0]][arr[1]] || 0
            t.push(
              (num + '').includes('%')
                ? Number(num.split('%')[0])
                : Number(num),
            )
          }
        }
        yAxis.push(t)
      }
      this.yAxis = yAxis
      this.$nextTick(() => {
        this.drawChart()
      })
    },
    close() {
      this.chart.dispose()
      this.chart = null
    },
  },
}
</script>

<style lang="scss" scoped>
.chart-wrap {
  width: 78vw;
  height: 60vh;
}
</style>
