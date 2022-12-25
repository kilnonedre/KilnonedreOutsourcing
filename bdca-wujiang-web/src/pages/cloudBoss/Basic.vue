<template>
  <div class="page basic">
    <common-header title="KPI基础数据"></common-header>
    <div class="content" ref="tableCot">
      <el-tabs v-model="activeId" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane v-for="item in tabList" :label="item.name" :name="item.id">
        </el-tab-pane>
      </el-tabs>
      <div class="tab-content">
        <div class="tab-top">
          <div class="toolbox">
            <div class="left">
              <el-date-picker
                v-model="date1"
                type="date"
                placeholder="选择日期"
                format="YYYY-MM-DD"
                value-format="YYYYMMDD"
                :default-value="new Date()"
                @change="changeTime1"
              />
            </div>
            <div class="right">
              <el-button v-if="userInfo.grade == '管理员'" plain type="success" @click="edit('top')"
                >编辑数据</el-button
              >
              <el-button
                v-if="userInfo.grade == '管理员'"
                plain
                type="primary"
                :loading="runLoading1"
                @click="rerun('top')"
                >重新计算</el-button
              >
              <el-button
                type="primary"
                @click="onExport('top')"
                :loading="downLoading1"
                >导出数据</el-button
              >
            </div>
          </div>
          <div class="table">
            <el-table
              :ref="`table-top`"
              stripe
              border
              v-loading="loading1"
              :data="tableData1"
              :header-cell-style="{
                background: '#eaf2fe',
                color: '#383838',
                fontSize: '16px',
                height: '34px',
              }"
              :row-style="{
                height: '24px',
                fontSize: '14px',
              }"
            >
              <el-table-column
                v-for="(item, index) in tableHeader1"
                :label="item"
                align="center"
                min-width="60"
                fit
              >
                <template #default="scope">
                  <span
                    :class="
                      Number(scope.row[item]) + '' == NaN + '' ? 'blod' : ''
                    "
                    >{{ scope.row[item] }}</span
                  >
                </template>
              </el-table-column>
              <template #empty>
                <div style="margin-top: 5%">暂无数据</div>
              </template>
            </el-table>
          </div>
        </div>
        <div class="tab-bottom">
          <div class="toolbox">
            <div class="left">
              <div>
                <el-date-picker
                  v-model="date2"
                  type="date"
                  placeholder="选择日期"
                  format="YYYY-MM-DD"
                  value-format="YYYYMMDD"
                  :default-value="new Date()"
                  @change="changeTime2"
                />
              </div>
              <div class="radio-group">
                <el-radio-group v-model="radio">
                  <el-radio-button label="原值" />
                  <el-radio-button label="差值" />
                </el-radio-group>
              </div>
            </div>
            <div class="right">
              <el-button v-if="userInfo.grade == '管理员'" plain type="success" @click="edit('bottom')"
                >编辑数据</el-button
              >
              <el-button
                v-if="userInfo.grade == '管理员'"
                plain
                type="primary"
                :loading="runLoading2"
                @click="rerun('bottom')"
                >重新计算</el-button
              >
              <el-button
                type="primary"
                :loading="downLoading2"
                @click="onExport('bottom')"
                >导出数据</el-button
              >
            </div>
          </div>
          <div class="table">
            <el-table
              :ref="`table-bottom`"
              stripe
              border
              v-loading="loading2"
              :data="tableData2"
              :header-cell-style="{
                background: '#eaf2fe',
                color: '#383838',
                fontSize: '16px',
                height: '34px',
              }"
              :row-style="{
                height: '24px',
                fontSize: '14px',
              }"
            >
              <el-table-column
                v-for="(item, index) in tableHeader2"
                :label="item"
                align="center"
                :prop="item"
                min-width="80"
                fit
              >
                <template #default="{ row, $index }">
                  <span
                    :class="{
                      blod: Number(row[item]) + '' == NaN + '',
                      green:
                        radio === '差值' &&
                        (tableData1.length > 0 && tableData1[$index][item]
                          ? tableData1[$index][item]
                          : 0) -
                          row[item] <
                          0,
                      red:
                        radio === '差值' &&
                        (tableData1.length > 0 && tableData1[$index][item]
                          ? tableData1[$index][item]
                          : 0) -
                          row[item] >
                          0,
                    }"
                    >{{
                      Number(row[item]) + '' == NaN + '' || radio === '原值'
                        ? row[item]
                        : (tableData1.length > 0 && tableData1[$index][item]
                            ? tableData1[$index][item]
                            : 0) - row[item]
                    }}</span
                  >
                </template>
              </el-table-column>
              <template #empty>
                <div style="margin-top: 5%">暂无数据</div>
              </template>
            </el-table>
          </div>
        </div>
      </div>
    </div>
    <edit-data ref="editData" @update="update"></edit-data>
  </div>
</template>

<script>
import CommonHeader from '#/CommonHeader.vue'
import EditData from '#/cloudBoss/EditData.vue'

import { kpi } from '@api'

import table2excel from '../../plugins/table2excel'

import Cookies from 'js-cookie'

export default {
  components: {
    CommonHeader,
    EditData,
  },
  data() {
    return {
      tabList: [],
      activeId: '',
      activeName: '',
      date1: '',
      date2: '',
      loading1: true,
      tableData1: [],
      tableHeader1: [],
      loading2: true,
      tableData2: [],
      tableHeader2: [],
      downLoading1: false,
      downLoading2: false,
      runId1: '',
      runId2: '',
      runLoading1: false,
      runLoading2: false,
      id1: '',
      id2: '',
      currentChart: '',
      topContent: '',
      bottomContent: '',
      radio: '差值',
      userInfo: JSON.parse(Cookies.get('user'))
    }
  },
  methods: {
    getMenu() {
      kpi.getApi().then((res) => {
        this.tabList = res.records
        this.activeId = this.tabList.length ? this.tabList[0].id : ''
        this.activeName = this.tabList.length ? this.tabList[0].name : ''
        this.getTableList(this.activeId, this.date1, 'top')
        this.getTableList(this.activeId, this.date2, 'bottom')
      })
    },
    handleClick(e) {
      this.activeId = e.props.name
      this.activeName = e.props.label
      this.getTableList(this.activeId, this.date1, 'top')
      this.getTableList(this.activeId, this.date2, 'bottom')
    },
    getTableList(id, date, chart) {
      if (chart == 'top') {
        this.loading1 = true
        this.tableData1 = []
        this.tableHeader1 = []
        this.runId1 = ''
        this.topContent = ''
      } else if (chart == 'bottom') {
        this.loading2 = true
        this.tableData2 = []
        this.tableHeader2 = []
        this.runId2 = ''
        this.bottomContent = ''
      }
      kpi
        .getBasic(id, date)
        .then((res) => {
          if (res.records.length > 0) {
            if (chart === 'top') {
              this.topContent = res.records[0].content
              this.runId1 = res.records[0].id
              this.tableData1 = JSON.parse(res.records[0].content) || []
              this.tableHeader1 = this.tableData1.length
                ? Object.keys(this.tableData1[0])
                : []
              this.tableData1.splice(1, 0)
            } else if (chart === 'bottom') {
              this.bottomContent = res.records[0].content
              this.runId2 = res.records[0].id
              this.tableData2 = JSON.parse(res.records[0].content) || []
              this.tableHeader2 = this.tableData2.length
                ? Object.keys(this.tableData2[0])
                : []
              this.tableData2.splice(1, 0)
            }
          }
        })
        .then(() => {
          if (chart === 'top') {
            this.loading1 = false
          } else {
            this.loading2 = false
          }
        })
        .finally(() => {
          this.$nextTick(() => {
            this.$refs['table-top'].doLayout()
            this.$refs['table-bottom'].doLayout()
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
    changeTime1() {
      this.getTableList(this.activeId, this.date1, 'top')
    },
    changeTime2() {
      this.getTableList(this.activeId, this.date2, 'bottom')
    },
    onExport(loading) {
      let date = ''
      let header = []
      let data = []
      if (loading === 'top') {
        this.downLoading1 = true
        date = this.date1
        header = this.tableHeader1
        data = this.tableData1
      } else if (loading === 'bottom') {
        this.downLoading2 = true
        date = this.date2
        header = this.tableHeader2
        data = this.tableData2
      }
      let column = []
      for (let i = 0; i < header.length; i++) {
        column.push({
          title: header[i],
          key: header[i],
          type: 'text',
        })
      }
      /** column数据的说明 */
      // 1.title为列名
      // 2.key为data数据每个对象对应的key
      // 3.若为图片格式, 需要加type为image的说明,并且可以设置图片的宽高
      const excelName = `${date}-${this.activeName}`
      table2excel(column, data, excelName)
      if (loading === 'top') {
        this.downLoading1 = false
      } else if (loading === 'bottom') {
        this.downLoading2 = false
      }
    },
    rerun(chart) {
      if (chart === 'top') {
        this.$confirm(`确定重新计算${this.date1}-${this.activeName}?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            this.loading1 = true
            kpi
              .rerun(this.runId1)
              .then((res) => {
                this.$message.success('重新计算成功！')
              })
              .finally(() => {
                this.getTableList(this.activeId, this.date1, chart)
                this.loading1 = false
              })
          })
          .finally(() => {})
      } else {
        this.$confirm(`确定重新计算${this.date2}-${this.activeName}?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            this.loading2 = true
            kpi
              .rerun(this.runId2)
              .then((res) => {
                this.$message.success('重新计算成功！')
              })
              .finally(() => {
                this.getTableList(this.activeId, this.date2, chart)
                this.loading2 = false
              })
          })
          .finally(() => {})
      }
    },
    edit(chart) {
      let id = ''
      let content = ''
      let date = ''
      if (chart === 'top') {
        id = this.runId1
        date = this.date1
        content = JSON.stringify(this.tableData1, null, 4) || this.topContent
      } else {
        id = this.runId2
        date = this.date2
        content = JSON.stringify(this.tableData2, null, 4) || this.bottomContent
      }
      this.$refs.editData.show = true
      this.$refs.editData.id = id
      this.$refs.editData.kpi = 'daily'
      this.$refs.editData.date = date
      this.$refs.editData.dailyApiId = this.activeId
      this.$refs.editData.content = content
    },
    update() {
      this.getTableList(this.activeId, this.date1, 'top')
      this.getTableList(this.activeId, this.date2, 'bottom')
    },
  },
  created() {
    this.getMenu()
    this.date1 = this.getDay(-1, '')
    this.date2 = this.getDay(-2, '')
  },
}
</script>

<style lang="scss" scoped>
.tab-content {
  width: calc(100% + 10px);
  padding-right: 10px;
  padding-top: 20px;
  height: calc(100% - 57px);
  overflow-y: scroll;
  display: flex;
  flex-direction: column;

  .tab-top {
    margin-bottom: 20px;
  }
  .toolbox {
    width: 100%;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .radio-group {
        margin-left: 10px;
      }
    }
  }
  .table {
    width: 100%;
    height: calc(100% - 60px);
  }
  .blod {
    font-size: 16px;
    font-weight: 700;
  }
  .green {
    color: green;
  }
  .red {
    color: red;
  }
}
</style>
