<template>
  <div class="page daily">
    <common-header title="KPI日报"></common-header>
    <div class="content">
      <el-tabs v-model="activeId" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane v-for="item in tabList" :label="item.name" :name="item.id">
        </el-tab-pane>
      </el-tabs>
      <div class="tab-content">
        <div class="toolbox">
          <div class="left">
            <el-date-picker
              v-model="date"
              type="date"
              placeholder="选择日期"
              format="YYYY-MM-DD"
              value-format="YYYYMMDD"
              :clearable="false"
              :editable="false"
              @change="changeTime"
            />
          </div>
          <div class="right">
            <el-button type="primary" plain @click="clickChart">查看图表</el-button>
            <el-button type="primary" @click="onExport" :loading="downLoading">导出数据</el-button >
          </div>
        </div>
        <div class="table">
          <el-table
            ref="table"
            height="100%"
            stripe
            border
            v-loading="loading"
            :data="tableData"
            :header-cell-style="{
              background: '#eaf2fe',
              color: '#383838',
              fontSize: '16px',
              height: '34px',
            }"
            cell-class-name="cell-class"
            :row-style="{
              height: '24px',
              fontSize: '14px',
            }"
          >
            <template v-for="(item, index) in tableHeader" :key="item">
              <el-table-column
                :label="item"
                align="center"
                min-width="220"
                :fit="true"
                :fixed="index === 0"
              >
                <template #default="scope">
                  <span
                    :class="index === 0 ? 'blod' : ''"
                    v-if="typeof tableData[0][item] == 'string' ? true : ''"
                  >
                    {{ scope.row[item] || '-' }}
                  </span>
                  <el-table-column
                    v-else
                    v-for="(subitem, subindex) in getProp(item)"
                    :key="subitem"
                    :label="subitem"
                    align="center"
                    min-width="160"
                    :fit="true"
                  >
                    <template #default="scope">
                      <span :class="tableData[scope.$index][tableHeader[0]] == '总计' ? 'blod' : ''">{{
                        !!scope.row[item] ? scope.row[item][subitem] : '-'
                      }}</span>
                    </template>
                  </el-table-column>
                </template>
              </el-table-column>
            </template>
            <template #empty>
              <div style="margin-top: 5%">暂无数据</div>
            </template>
          </el-table>
        </div>
      </div>
    </div>
    <chart-header ref="header" :tableData="tableData"></chart-header>
  </div>
</template>

<script>
import CommonHeader from '#/CommonHeader.vue'
import ChartHeader from '../../components/cloudBoss/ChartHeader.vue'

import { kpi } from '@api'

import table2excel from '../../plugins/table2excel'

export default {
  components: {
    CommonHeader,
    ChartHeader
  },
  data() {
    return {
      tabList: [],
      activeId: '',
      activeName: '',
      date: '',
      loading: true,
      tableData: [],
      tableHeader: [],
      downLoading: false,
      option: {},
    }
  },
  methods: {
    getMenu() {
      kpi.getApi().then((res) => {
        this.tabList = res.records
        this.activeId = this.tabList.length ? this.tabList[0].id : ''
        this.activeName = this.tabList.length ? this.tabList[0].name : ''
        this.getTableList(this.activeId, this.date)
      })
    },
    handleClick(e) {
      this.activeId = e.props.name
      this.activeName = e.props.label
      this.$refs.header.checkedHeader = []
      window.localStorage.setItem('combination', '')
      this.getTableList(this.activeId, this.date)
    },
    getTableList(id, date) {
      this.loading = true
      this.tableData = []
      this.tableHeader = []
      kpi
        .getDaily(id, date)
        .then((res) => {
          if (res.length > 0) {
            this.tableData = res
            this.tableHeader = this.tableData.length
              ? Object.keys(this.tableData[0])
              : []
          }
        })
        .finally(() => {
          this.loading = false
          this.$nextTick(() => {
            this.$refs.table.doLayout()
          })
        })
    },
    getDay(num, str) {
      var today = new Date()
      var nowTime = today.getTime()
      var ms = 24 * 3600 * 1000 * num
      today.setTime(parseInt(nowTime + ms))
      var oYear = today.getFullYear()
      var oMoth = (today.getMonth() + 1).toString()
      if (oMoth.length <= 1) oMoth = '0' + oMoth
      var oDay = today.getDate().toString()
      if (oDay.length <= 1) oDay = '0' + oDay
      return oYear + str + oMoth + str + oDay
    },
    changeTime() {
      this.getTableList(this.activeId, this.date)
    },
    getHeader(item) {
      console.log(item)
    },
    getProp(item) {
      let res
      if (typeof this.tableData[0][item] === 'string') {
        res = ''
      } else {
        res = Object.keys(this.tableData[0][item])
      }
      return res
    },
    clickChart() {
      this.$refs.header.show = true
    },
    onExport() {
      let date = ''
      let header = []
      let data = []
      this.downLoading = true
      date = this.date
      header = this.tableHeader
      data = this.tableData
      let column = []
      let t
      for (let i = 0; i < header.length; i++) {
        if (typeof data[0][header[i]] === 'string') {
          t = {
            title: header[i],
            key: header[i],
            type: 'text',
          }
        } else {
          let childHeader = Object.keys(data[0][header[i]])
          let children = []
          for (let k = 0; k < childHeader.length; k++) {
            children.push({
              title: childHeader[k],
              key: childHeader[k],
              type: 'text',
            })
          }
          t = {
            title: header[i],
            children: children,
          }
        }
        column.push(t)
      }
      /** column数据的说明 */
      // 1.title为列名
      // 2.key为data数据每个对象对应的key
      // 3.若为图片格式, 需要加type为image的说明,并且可以设置图片的宽高
      const excelName = `${date}-${this.activeName}`
      table2excel(column, data, excelName)
      this.downLoading = false
    },
  },
  created() {
    this.getMenu()
    this.date = this.getDay(-1, '')
  },
}
</script>

<style lang="scss" scoped>
.tab-content {
  width: 100%;
  height: calc(100% - 60px);
  .toolbox {
    width: 100%;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .table {
    width: 100%;
    height: calc(100% - 60px);
  }
  .blod {
    font-size: 16px;
    font-weight: 700;
  }
}
</style>
