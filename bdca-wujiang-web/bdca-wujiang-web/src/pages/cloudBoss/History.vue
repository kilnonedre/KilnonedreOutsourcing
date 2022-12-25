<template>
  <div class="page history">
    <common-header title="KPI历史趋势"></common-header>
    <div class="content">
      <el-tabs v-model="activeId" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane v-for="item in tabList" :label="item.name" :name="item.id">
        </el-tab-pane>
      </el-tabs>
      <div class="tab-content">
        <el-form
          ref="form"
          :model="form"
          label-width="120px"
          label-position="left"
        >
          <el-form-item label="统计周期">
            <el-radio-group v-model="form.mode" @change="reset">
              <el-radio-button label="day" value="day"
                >按日统计</el-radio-button
              >
              <el-radio-button label="month" value="month"
                >按月统计</el-radio-button
              >
            </el-radio-group>
            <div style="margin-left: 20px">
              <el-date-picker
                v-if="form.mode === 'day'"
                v-model="form.time"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="YYYY/MM/DD"
                @change="getDays"
              />
              <el-date-picker
                v-else
                v-model="form.time"
                type="monthrange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="YYYY/MM"
                @change="getMonths"
              />
            </div>
          </el-form-item>
          <el-form-item label="中心及广电站">
            <el-checkbox-group v-model="form.station">
              <el-checkbox
                v-for="item in stationList"
                :key="item.label"
                :label="item.label"
                >{{ item.label }}</el-checkbox
              >
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="统计维度">
            <el-checkbox-group v-model="form.level1">
              <el-checkbox v-for="item in level1" :key="item" :label="item">{{
                item
              }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="统计指标">
            <el-checkbox-group v-model="form.level2">
              <el-checkbox v-for="item in level2" :key="item" :label="item">{{
                item
              }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <div>
          <el-button @click="reset">重置</el-button>
          <el-button type="primary" @click="confirm">确定</el-button>
        </div>
        <div class="chart-wrap" ref="myChart"></div>
      </div>
    </div>
  </div>
</template>

<script>
import CommonHeader from '../../components/CommonHeader.vue'

import { kpi } from '@api'

import * as echarts from 'echarts' // 引入echarts
import { markRaw } from 'vue'

export default {
  components: {
    CommonHeader,
  },
  data() {
    return {
      activeId: '',
      activeName: '',
      tabList: [],
      form: {
        mode: 'day',
        time: [],
        station: [],
        level1: [],
        level2: [],
      },
      stationList: [
        { label: '总计', value: '总计' },
        ...window.config.stationOptions,
      ],
      level1: [],
      level2: [],
      chart: null,
      data: [],
      showData: [],
      yAxis: [],
      header: [],
      showLabel: true,
      option: {},
    }
  },
  methods: {
    getMenu() {
      kpi.getApi().then((res) => {
        this.tabList = res.records
        this.activeId = this.tabList.length ? this.tabList[0].id : ''
        this.activeName = this.tabList.length ? this.tabList[0].name : ''
      })
    },
    handleClick(e) {
      this.activeId = e.props.name
      this.activeName = e.props.label
      this.reset()
    },
    getMonths() {
      kpi
        .getHistoryMonths({
          dailyApiId: this.activeId,
          month1:
            this.form.time && this.form.time.length ? this.form.time[0] : '',
          month2:
            this.form.time && this.form.time.length ? this.form.time[1] : '',
        })
        .then((res) => {
          this.data = res
          this.computeLevel(res)
        })
    },
    getDays() {
      kpi
        .getHistoryDays({
          dailyApiId: this.activeId,
          date1:
            this.form.time && this.form.time.length ? this.form.time[0] : '',
          date2:
            this.form.time && this.form.time.length ? this.form.time[1] : '',
        })
        .then((res) => {
          this.data = res
          this.computeLevel(res)
        })
    },
    computeLevel(data) {
      for (let i in data) {
        if (data[i].length) {
          let level1 = []
          let arr = []
          for (let j in data[i][0]) {
            if (typeof data[i][0][j] == 'object')
              arr.push(...Object.keys(data[i][0][j]))
            if (j !== '中心及广电站') level1.push(j)
          }
          this.level2 = [...new Set(arr)]
          this.level1 = level1
          break
        }
      }
    },
    reset() {
      this.form = {
        mode: this.form.mode,
        time: [],
        station: [],
        level1: [],
        level2: [],
      }
      this.level1 = []
      this.level2 = []
      this.chart?.clear()
    },
    computeyAxis() {
      for (let i = 0; i < this.form.level1.length; i++) {
        for (let j = 0; j < this.form.level2.length; j++) {
          this.tableHeader.push()
        }
      }
    },
    confirm() {
      let showData = JSON.parse(JSON.stringify(this.data))
      for (let i in showData) {
        let tmp = null
        let arr = []
        this.form.station.forEach((item) => {
          tmp = this.data[i].find((t) => t['中心及广电站'] == item)
          arr.push(tmp || [])
        })
        showData[i] = arr
      }
      this.showData = showData
      let yAxis = []
      let header = []
      for (let i = 0; i < this.form.station.length; i++) {
        this.form.level1.forEach((level1) => {
          this.form.level2.forEach((level2) => {
            header.push(this.form.station[i] + '-' + level1 + '-' + level2)
            let ydata = []
            for (let j in showData) {
              ydata.push(
                showData[j][i]
                  ? showData[j][i][level1]
                    ? level2.includes('率') || level2.includes('度')
                      ? showData[j][i][level1][level2]
                        ? showData[j][i][level1][level2].slice(0, -1)
                        : ''
                      : showData[j][i][level1][level2]
                    : ''
                  : '',
              )
            }
            yAxis.push(ydata)
          })
        })
      }
      this.header = header
      this.yAxis = yAxis
      this.drawChart()
    },
    drawChart() {
      this.chart?.clear()
      const that = this
      this.chart = markRaw(echarts.init(this.$refs.myChart))
      let header = this.header
      let data = this.data
      let series = []
      for (let i = 0; i < this.yAxis.length; i++) {
        series.push({
          name: header[i],
          type: 'bar',
          smooth: true,
          tooltip: {},
          itemStyle: {
            normal: {
              label: {
                show: this.showLabel,
                position: 'top',
                textStyle: {
                  fontSize: 12,
                  color: '#383838',
                  fontWeight: 'bold',
                },
              },
            },
          },
          data: this.yAxis[i],
        })
      }
      let option = {
        grid: {
          left: '5%',
          top: '35%',
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
                (item.value &&
                (item.seriesName.includes('率') ||
                  item.seriesName.includes('度'))
                  ? '%'
                  : '') +
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
            myLabel: {
              show: true,
              title: '显示/隐藏数据',
              icon: 'image://./show_data.png',
              onclick: function () {
                option.series.forEach((i) => {
                  i.itemStyle.normal.label.show = !i.itemStyle.normal.label.show
                })
                that.chart.clear()
                that.chart.setOption(option)
              },
            },
          },
        },
        legend: {
          top: '40',
          textStyle: {
            fontSize: '1rem',
            fontWeight: '500',
          },
        },
        xAxis: [
          {
            type: 'category',
            data: Object.keys(this.data),
            axisLabel: {
              interval: 0,
              fontSize: '0.8rem',
              fontWeight: 'bold',
              formatter:  function (params) {
                if(that.form.mode == 'day') return params
                return params.slice(0, -3)
              }
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
        dataZoom: [
          {
            type: 'inside',
            start: 0,
            end: 100,
          },
          {
            start: 0,
            end: 100,
          },
        ],
        series: series,
      }
      this.chart.setOption(option)
      window.addEventListener('resize', () => {
        this.chart.resize();
      })
    },
    dealWith(name) {
      let arr = name.split('')
      return arr.length > 10 ? arr.slice(0, 10).join('') + '...' : name
    },
  },
  created() {
    this.getMenu()
  },
}
</script>

<style lang="scss">
.history {
  .tab-content {
    width: 100%;
    height: calc(100% - 60px);
  }
  .chart-wrap {
    width: 100%;
    height: calc(100% - 270px);
  }
  .el-form {
    .el-form-item {
      margin-bottom: 6px;
      .el-checkbox {
        height: 30px;
      }
    }
    .el-form-item__content {
      display: flex !important;
      line-height: 30px;
    }
  }
}
</style>
