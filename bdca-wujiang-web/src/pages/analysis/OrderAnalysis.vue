<template>
  <div class="page order">
    <common-header title="工单系统分析"></common-header>
    <div class="content">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="安装工单" name="安装工单"></el-tab-pane>
        <el-tab-pane label="维修工单" name="维修工单"></el-tab-pane>
      </el-tabs>
      <div class="tab-content">
        <div class="group">
          <el-radio-group v-model="checkPeriod" style="margin-right: 20px" @change="handleCheckedPeriodChange">
            <el-radio-button :disabled="tabDisable" label="按日统计"></el-radio-button>
            <el-radio-button :disabled="tabDisable" label="按周统计"></el-radio-button>
            <el-radio-button :disabled="tabDisable" label="按月统计"></el-radio-button>
          </el-radio-group>
          <el-checkbox-group v-model="checkGroup" @change="handleCheckedGroupChange">
            <el-checkbox label="中心及广电站" />
            <el-checkbox label="网格" />
            <el-checkbox v-if="activeName == '安装工单'" label="安装类型" />
            <el-checkbox v-else label="维修类型" />
            <el-checkbox v-if="activeName == '维修工单'" label="故障种类" />
            <el-checkbox label="施工员" />
          </el-checkbox-group>
        </div>
        <div class="toolbox">
          <div class="left">
            <div class="date-pick">
              <el-date-picker
                v-if="checkPeriod == '按日统计'"
                v-model="date"
                type="daterange"
                format="YYYY-MM-DD"
                value-format="YYYY/MM/DD"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                style="width: 250px"
                @change="changeTime"
              />
              <div v-else-if ="checkPeriod == '按周统计'">
                <el-date-picker
                  v-model="week1forShow"
                  type="week"
                  format="YYYY 第 ww 周"
                  placeholder="开始周"
                  style="width: 160px">
                </el-date-picker>
                至
                <el-date-picker
                  v-model="week2forShow"
                  type="week"
                  format="YYYY 第 ww 周"
                  placeholder="结束周"
                  style="width: 160px"
                  @change="changeWeekTime">
                </el-date-picker>
              </div>
              <el-date-picker
                v-else-if ="checkPeriod == '按月统计'"
                v-model="month"
                type="monthrange"
                format="YYYY/MM"
                value-format="YYYY/MM"
                start-placeholder="开始月份"
                end-placeholder="结束月份"
                style="width: 250px"
                @change="changeTime">
              </el-date-picker>
            </div>
            <div>
              <el-select
                v-model="station"
                placeholder="中心及广电站"
                clearable
                @change="getTableList(activeName, checkPeriod)"
              >
                <el-option v-for="item in stationOptions" :key="item" :label="item" :value="item" />
              </el-select>
            </div>
            <div>
              <el-select
                v-model="businessName"
                :placeholder="activeName == '安装工单' ? '安装类型' : '维修类型'"
                multiple
                collapse-tags
                collapse-tags-tooltip
                filterable
                clearable
                @change="getTableList(activeName, checkPeriod)"
              >
                <el-option v-for="item in typeList" :key="item" :label="item" :value="item" />
              </el-select>
            </div>
            <div>
              <el-select
                v-model="executeStaffName"
                :placeholder="activeName == '安装工单' ? '安装员' : '维修员'"
                filterable
                clearable
                @change="getTableList(activeName, checkPeriod)"
              >
                <el-option v-for="item in staffList" :key="item" :label="item" :value="item" />
              </el-select>
            </div>
          </div>
          <div class="right">
            <el-button type="primary" @click="onExport" :loading="downLoading">
              导出数据
            </el-button>
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
            :row-style="{
              height: '24px',
              fontSize: '14px',
            }"
            @sort-change="sortTable"
          >
            <el-table-column
              v-for="(item, index) in tableHeader"
              :label="item.label"
              :prop="index"
              align="center"
              :min-width="item.width ? item.width + '' : '100'"
              :sortable="item.sort ? 'custom' : false"
            >
              <template #default="scope">
                <span>{{ scope.row[index] }}</span>
              </template>
            </el-table-column>
            <template #empty>
              <div style="margin-top: 5%">暂无数据</div>
            </template>
          </el-table>
        </div>
        <div class="pagination">
          <el-pagination
            :current-page="currentPage"
            :page-size="pageSize"
            :page-sizes="[20, 30, 50, 100, 1000]"
            :total="total"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CommonHeader from '#/CommonHeader.vue'

import { behavior, management } from '@api'
import { isArray } from '@vue/shared'

import table2excel from '../../plugins/table2excel'

const originGroup = 'station,gridName,businessName,faulttypename,executeStaffName,'

const GROUP = {
  '中心及广电站': 'station',
  '网格': 'gridName',
  '安装类型': 'businessName',
  '维修类型': 'businessName',
  '故障种类': 'faulttypename',
  '施工员': 'executeStaffName',
}

const header = {
  createDate: {label: '工单生产日期',width: '160',sort: true},
  dateWeek: {label: '工单生产周',width: '160',sort: true},
  dateMonth: {label: '工单生产月份',width: '160',sort: true},
  station: {label: '中心及广电站',width: '180',sort: true},
  gridName: {label: '网格名称',width: '180',sort: true},
  businessName: {label: '安装类型', width: '180',sort: true},
  executeStaffName: {label: '施工员',width: '160',sort: true},
  nbrCount: {label: '工单数',width: '160',sort: true},
  completeNbrCount: {label: '完成工单数',width: '160',sort: true},
  orderDoneRate: {label: '工单完成率',width: '200',sort: false},
  compleTimeSum: {label: '工单完成平均时长(分钟)',width: '250',sort: true},
  overtimeNbrCount: {label: '48小时超时已完成工单数',width: '250',sort: true},
  overtimeNbrUncomple	: {label: '48小时超时未完成工单数', width: '250',sort: true},
  rank2Cust: {label: '二次报修工单数',width: '200',sort: true},
  rank2CustRate: {label: '二次报修率',width: '200',sort: false},
  rank3Cust: {label: '三次及以上报修工单数',width: '300',sort: true},
  booktimeUnuse: {label: '完成时间小于预约时间工单数',width: '300',sort: true},
  recallSuccess: {label: '回访成功单数',width: '200',sort: true},
  recallSuccessRate: {label: '回访成功率',width: '200',sort: false},
  recallGood: {label: '回访满意单数',width: '200',sort: true},
  recallGoodRate: {label: '回访满意率',width: '200',sort: false},
  recallOrdinary: {label: '回访一般单数',width: '200',sort: true},
  recallBad: {label: '回访不满意单数',width: '200',sort: true},
  faulttypename: {label: '故障种类', width: '180',sort: true},
}

export default {
  components: {
    CommonHeader,
  },
  data() {
    return {
      activeName: '安装工单',
      tabDisable: false,
      loading: true,
      downLoading: false,
      checkPeriod: '按日统计',
      checkGroup: ['中心及广电站'],
      group: 'station,createDate',
      date: '',
      week1: '',
      week2: '',
      week1forShow: '',
      week2forShow: '',
      month: '',
      businessName: [],
      typeList: [],
      typeListforInstaller: [],
      typeListforRepairer: [],
      executeStaffName: '',
      staffList: [],
      staffListforInstaller: [],
      staffListforRepairer: [],
      station: '',
      stationOptions: ['开发区广电中心','汾湖广电中心','高新区广电中心','吴江东太湖中心','七都广电站','桃源广电站','震泽广电站','平望广电站','横扇广电站'],
      total: 0,
      pageSize: 20,
      currentPage: 1,
      tableHeader: {},
      tableData: [],
      ascs: '',
      descs: '',
    }
  },
  watch: {
    week1forShow(newData) {
      if (!newData || !this.week2forShow) {
        this.week1 = ''
      } else if (newData > this.week2forShow) {   // 保证week2大于week1
        this.week1forShow = this.week2forShow
        this.week1 = this.getWeek(this.week1forShow)
      } else {
        this.week1 = this.getWeek(newData)
      }
    }
  },
  methods: {
    getTableList(activeName, period) {
      this.loading = true
      this.tabDisable = true  // 表格加载前把其他 tab 给 disable 掉，不能点击
      this.tableData = []
      this.tableHeader = {}
      if (activeName == '安装工单') {
        if (period == '按日统计') {
          behavior.getDailyInstalledGroup({
            size: this.pageSize,
            current: this.currentPage,
            date1: isArray(this.date) ? this.date[0] : '',
            date2: isArray(this.date) ? this.date[1] : '',
            businessNameSet: this.businessName.join(),
            executeStaffName: this.executeStaffName,
            station: this.station,
            groupBy: this.group,
            descs: this.descs,
            ascs: this.ascs,
          }).then((res) => {
            if (res.records.length != 0) {
              Object.keys(res.records[0]).forEach((key) => {
                if (this.group.indexOf(key) != -1) {
                  this.tableHeader[key] = header[key]
                }
                if (originGroup.indexOf(key) == -1) {
                  this.tableHeader[key] = header[key]
                }
              })
              if (this.tableHeader['executeStaffName'] != undefined) {
                this.tableHeader['executeStaffName'].label = '安装员'
              }
              if (this.tableHeader['businessName'] != undefined) {
                this.tableHeader['businessName'].label = '安装类型'
              }
              if (this.tableHeader['overtimeNbrCount'] != undefined) {
                this.tableHeader['overtimeNbrCount'].label = '48小时超时已完成工单数'
              }
              if (this.tableHeader['overtimeNbrUncomple'] != undefined) {
                this.tableHeader['overtimeNbrUncomple'].label = '48小时超时未完成工单数'
              }
              this.tableHeader['orderDoneRate'] = header['orderDoneRate']
              this.tableHeader['recallSuccessRate'] = header['recallSuccessRate']
              this.tableHeader['recallGoodRate'] = header['recallGoodRate']
              delete this.tableHeader['businessNameSet']
            }
            this.tableData = res.records
            this.tableData.forEach(item => {
              if (item['createDate'] != null) {
                item['createDate'] = item['createDate'].substr(0, 10)
              }
              if (item['compleTimeSum'] != null) {
                if (item['completeNbrCount'] == 0) {
                  item['compleTimeSum'] = '/'
                } else {
                  item['compleTimeSum'] = (item['compleTimeSum'] / item['completeNbrCount']).toFixed(2)
                }
              }
              if (item['nbrCount'] == 0) {
                item['orderDoneRate'] = '/'
              } else {
                item['orderDoneRate'] = (item['completeNbrCount'] / item['nbrCount']).toFixed(2)
              }
              if (item['completeNbrCount'] == 0) {
                item['recallSuccessRate'] = '/'
              } else {
                item['recallSuccessRate'] = (item['recallSuccess'] / item['completeNbrCount']).toFixed(2)
              }
              if (item['recallSuccess'] == 0) {
                item['recallGoodRate'] = '/'
              } else {
                item['recallGoodRate'] = (item['recallGood'] / item['recallSuccess']).toFixed(2)
              }
            })
            this.total = res.total
          })
          .finally(() => {
            this.tabDisable = false
            this.loading = false
            this.$nextTick(() => {
              this.$refs['table'].doLayout()
            })
          })
        } else if (period == '按周统计') {
          behavior.getWeekInstalledGroup({
            size: this.pageSize,
            current: this.currentPage,
            week1: this.week1,
            week2: this.week2,
            businessNameSet: this.businessName.join(),
            executeStaffName: this.executeStaffName,
            station: this.station,
            groupBy: this.group,
            descs: this.descs,
            ascs: this.ascs,
          }).then((res) => {
            if (res.records.length != 0) {
              Object.keys(res.records[0]).forEach((key) => {
                if (this.group.indexOf(key) != -1) {
                  this.tableHeader[key] = header[key]
                }
                if (originGroup.indexOf(key) == -1) {
                  this.tableHeader[key] = header[key]
                }
              })
              if (this.tableHeader['executeStaffName'] != undefined) {
                this.tableHeader['executeStaffName'].label = '安装员'
              }
              if (this.tableHeader['businessName'] != undefined) {
                this.tableHeader['businessName'].label = '安装类型'
              }
              if (this.tableHeader['overtimeNbrCount'] != undefined) {
                this.tableHeader['overtimeNbrCount'].label = '48小时超时已完成工单数'
              }
              if (this.tableHeader['overtimeNbrUncomple'] != undefined) {
                this.tableHeader['overtimeNbrUncomple'].label = '48小时超时未完成工单数'
              }
              this.tableHeader['orderDoneRate'] = header['orderDoneRate']
              this.tableHeader['recallSuccessRate'] = header['recallSuccessRate']
              this.tableHeader['recallGoodRate'] = header['recallGoodRate']
              delete this.tableHeader['businessNameSet']
            }
            this.tableData = res.records
            this.tableData.forEach(item => {
              if (item['createDate'] != null) {
                item['createDate'] = item['createDate'].substr(0, 10)
              }
              if (item['compleTimeSum'] != null) {
                if (item['completeNbrCount'] == 0) {
                  item['compleTimeSum'] = '/'
                } else {
                  item['compleTimeSum'] = (item['compleTimeSum'] / item['completeNbrCount']).toFixed(2)
                }
              }
              if (item['nbrCount'] == 0) {
                item['orderDoneRate'] = '/'
              } else {
                item['orderDoneRate'] = (item['completeNbrCount'] / item['nbrCount']).toFixed(2)
              }
              if (item['completeNbrCount'] == 0) {
                item['recallSuccessRate'] = '/'
              } else {
                item['recallSuccessRate'] = (item['recallSuccess'] / item['completeNbrCount']).toFixed(2)
              }
              if (item['recallSuccess'] == 0) {
                item['recallGoodRate'] = '/'
              } else {
                item['recallGoodRate'] = (item['recallGood'] / item['recallSuccess']).toFixed(2)
              }
            })
            this.total = res.total
          })
          .finally(() => {
            this.tabDisable = false
            this.loading = false
            this.$nextTick(() => {
              this.$refs['table'].doLayout()
            })
          })
        } else if (period == '按月统计') {
          behavior.getMonthInstalledGroup({
            size: this.pageSize,
            current: this.currentPage,
            month1: isArray(this.month) ? this.month[0] : '',
            month2: isArray(this.month) ? this.month[1] : '',
            businessNameSet: this.businessName.join(),
            executeStaffName: this.executeStaffName,
            station: this.station,
            groupBy: this.group,
            descs: this.descs,
            ascs: this.ascs,
          }).then((res) => {
            if (res.records.length != 0) {
              Object.keys(res.records[0]).forEach((key) => {
                if (this.group.indexOf(key) != -1) {
                  this.tableHeader[key] = header[key]
                }
                if (originGroup.indexOf(key) == -1) {
                  this.tableHeader[key] = header[key]
                }
              })
              if (this.tableHeader['executeStaffName'] != undefined) {
                this.tableHeader['executeStaffName'].label = '安装员'
              }
              if (this.tableHeader['businessName'] != undefined) {
                this.tableHeader['businessName'].label = '安装类型'
              }
              if (this.tableHeader['overtimeNbrCount'] != undefined) {
                this.tableHeader['overtimeNbrCount'].label = '48小时超时已完成工单数'
              }
              if (this.tableHeader['overtimeNbrUncomple'] != undefined) {
                this.tableHeader['overtimeNbrUncomple'].label = '48小时超时未完成工单数'
              }
              this.tableHeader['orderDoneRate'] = header['orderDoneRate']
              this.tableHeader['recallSuccessRate'] = header['recallSuccessRate']
              this.tableHeader['recallGoodRate'] = header['recallGoodRate']
              delete this.tableHeader['businessNameSet']
            }
            this.tableData = res.records
            this.tableData.forEach(item => {
              if (item['createDate'] != null) {
                item['createDate'] = item['createDate'].substr(0, 10)
              }
              if (item['compleTimeSum'] != null) {
                if (item['completeNbrCount'] == 0) {
                  item['compleTimeSum'] = '/'
                } else {
                  item['compleTimeSum'] = (item['compleTimeSum'] / item['completeNbrCount']).toFixed(2)
                }
              }
              if (item['nbrCount'] == 0) {
                item['orderDoneRate'] = '/'
              } else {
                item['orderDoneRate'] = (item['completeNbrCount'] / item['nbrCount']).toFixed(2)
              }
              if (item['completeNbrCount'] == 0) {
                item['recallSuccessRate'] = '/'
              } else {
                item['recallSuccessRate'] = (item['recallSuccess'] / item['completeNbrCount']).toFixed(2)
              }
              if (item['recallSuccess'] == 0) {
                item['recallGoodRate'] = '/'
              } else {
                item['recallGoodRate'] = (item['recallGood'] / item['recallSuccess']).toFixed(2)
              }
            })
            this.total = res.total
          })
          .finally(() => {
            this.tabDisable = false
            this.loading = false
            this.$nextTick(() => {
              this.$refs['table'].doLayout()
            })
          })
        }
      } else if (activeName == '维修工单') {
        if (period == '按日统计') {
          behavior.getDailyRepairedGroup({
            size: this.pageSize,
            current: this.currentPage,
            date1: isArray(this.date) ? this.date[0] : '',
            date2: isArray(this.date) ? this.date[1] : '',
            businessNameSet: this.businessName.join(),
            executeStaffName: this.executeStaffName,
            station: this.station,
            groupBy: this.group,
            descs: this.descs,
            ascs: this.ascs,
          }).then((res) => {
            if (res.records.length != 0) {
              Object.keys(res.records[0]).forEach((key) => {
                if (this.group.indexOf(key) != -1) {
                  this.tableHeader[key] = header[key]
                }
                if (originGroup.indexOf(key) == -1) {
                  this.tableHeader[key] = header[key]
                }
              })
              if (this.tableHeader['executeStaffName'] != undefined) {
                this.tableHeader['executeStaffName'].label = '维修员'
              }
              if (this.tableHeader['businessName'] != undefined) {
                this.tableHeader['businessName'].label = '维修类型'
              }
              if (this.tableHeader['overtimeNbrCount'] != undefined) {
                this.tableHeader['overtimeNbrCount'].label = '24小时超时已完成工单数'
              }
              if (this.tableHeader['overtimeNbrUncomple'] != undefined) {
                this.tableHeader['overtimeNbrUncomple'].label = '24小时超时未完成工单数'
              }
              this.tableHeader['orderDoneRate'] = header['orderDoneRate']
              this.tableHeader['recallSuccessRate'] = header['recallSuccessRate']
              this.tableHeader['recallGoodRate'] = header['recallGoodRate']
              this.tableHeader['rank2CustRate'] = header['rank2CustRate']
              delete this.tableHeader['businessNameSet']
            }
            this.tableData = res.records
            this.tableData.forEach(item => {
              if (item['createDate'] != null) {
                item['createDate'] = item['createDate'].substr(0, 10)
              }
              if (item['compleTimeSum'] != null) {
                if (item['completeNbrCount'] == 0) {
                  item['compleTimeSum'] = '/'
                } else {
                  item['compleTimeSum'] = (item['compleTimeSum'] / item['completeNbrCount']).toFixed(2)
                }
              }
              if (item['nbrCount'] == 0) {
                item['orderDoneRate'] = '/'
              } else {
                item['orderDoneRate'] = (item['completeNbrCount'] / item['nbrCount']).toFixed(2)
              }
              if (item['completeNbrCount'] == 0) {
                item['recallSuccessRate'] = '/'
              } else {
                item['recallSuccessRate'] = (item['recallSuccess'] / item['completeNbrCount']).toFixed(2)
              }
              if (item['recallSuccess'] == 0) {
                item['recallGoodRate'] = '/'
              } else {
                item['recallGoodRate'] = (item['recallGood'] / item['recallSuccess']).toFixed(2)
              }
              if (item['nbrCount'] == 0) {
                item['rank2CustRate'] = '/'
              } else {
                item['rank2CustRate'] = (item['rank2Cust'] / item['nbrCount']).toFixed(2)
              }
            })
            this.total = res.total
          }).finally(() => {
            this.tabDisable = false
            this.loading = false
            this.$nextTick(() => {
              this.$refs['table'].doLayout()
            })
          })
        } else if (period == '按周统计') {
          behavior.getWeekRepairedGroup({
            size: this.pageSize,
            current: this.currentPage,
            week1: this.week1,
            week2: this.week2,
            businessNameSet: this.businessName.join(),
            executeStaffName: this.executeStaffName,
            station: this.station,
            groupBy: this.group,
            descs: this.descs,
            ascs: this.ascs,
          }).then((res) => {
            if (res.records.length != 0) {
              Object.keys(res.records[0]).forEach((key) => {
                if (this.group.indexOf(key) != -1) {
                  this.tableHeader[key] = header[key]
                }
                if (originGroup.indexOf(key) == -1) {
                  this.tableHeader[key] = header[key]
                }
              })
              if (this.tableHeader['executeStaffName'] != undefined) {
                this.tableHeader['executeStaffName'].label = '维修员'
              }
              if (this.tableHeader['businessName'] != undefined) {
                this.tableHeader['businessName'].label = '维修类型'
              }
              if (this.tableHeader['overtimeNbrCount'] != undefined) {
                this.tableHeader['overtimeNbrCount'].label = '24小时超时已完成工单数'
              }
              if (this.tableHeader['overtimeNbrUncomple'] != undefined) {
                this.tableHeader['overtimeNbrUncomple'].label = '24小时超时未完成工单数'
              }
              this.tableHeader['orderDoneRate'] = header['orderDoneRate']
              this.tableHeader['recallSuccessRate'] = header['recallSuccessRate']
              this.tableHeader['recallGoodRate'] = header['recallGoodRate']
              this.tableHeader['rank2CustRate'] = header['rank2CustRate']
              delete this.tableHeader['businessNameSet']
            }
            this.tableData = res.records
            this.tableData.forEach(item => {
              if (item['createDate'] != null) {
                item['createDate'] = item['createDate'].substr(0, 10)
              }
              if (item['compleTimeSum'] != null) {
                if (item['completeNbrCount'] == 0) {
                  item['compleTimeSum'] = '/'
                } else {
                  item['compleTimeSum'] = (item['compleTimeSum'] / item['completeNbrCount']).toFixed(2)
                }
              }
              if (item['nbrCount'] == 0) {
                item['orderDoneRate'] = '/'
              } else {
                item['orderDoneRate'] = (item['completeNbrCount'] / item['nbrCount']).toFixed(2)
              }
              if (item['completeNbrCount'] == 0) {
                item['recallSuccessRate'] = '/'
              } else {
                item['recallSuccessRate'] = (item['recallSuccess'] / item['completeNbrCount']).toFixed(2)
              }
              if (item['recallSuccess'] == 0) {
                item['recallGoodRate'] = '/'
              } else {
                item['recallGoodRate'] = (item['recallGood'] / item['recallSuccess']).toFixed(2)
              }
              if (item['nbrCount'] == 0) {
                item['rank2CustRate'] = '/'
              } else {
                item['rank2CustRate'] = (item['rank2Cust'] / item['nbrCount']).toFixed(2)
              }
            })
            this.total = res.total
          }).finally(() => {
            this.tabDisable = false
            this.loading = false
            this.$nextTick(() => {
              this.$refs['table'].doLayout()
            })
          })
        } else if (period == '按月统计') {
          behavior.getMonthRepairedGroup({
            size: this.pageSize,
            current: this.currentPage,
            month1: isArray(this.month) ? this.month[0] : '',
            month2: isArray(this.month) ? this.month[1] : '',
            businessNameSet: this.businessName.join(),
            executeStaffName: this.executeStaffName,
            station: this.station,
            groupBy: this.group,
            descs: this.descs,
            ascs: this.ascs,
          }).then((res) => {
            if (res.records.length != 0) {
              Object.keys(res.records[0]).forEach((key) => {
                if (this.group.indexOf(key) != -1) {
                  this.tableHeader[key] = header[key]
                }
                if (originGroup.indexOf(key) == -1) {
                  this.tableHeader[key] = header[key]
                }
              })
              if (this.tableHeader['executeStaffName'] != undefined) {
                this.tableHeader['executeStaffName'].label = '维修员'
              }
              if (this.tableHeader['businessName'] != undefined) {
                this.tableHeader['businessName'].label = '维修类型'
              }
              if (this.tableHeader['overtimeNbrCount'] != undefined) {
                this.tableHeader['overtimeNbrCount'].label = '24小时超时已完成工单数'
              }
              if (this.tableHeader['overtimeNbrUncomple'] != undefined) {
                this.tableHeader['overtimeNbrUncomple'].label = '24小时超时未完成工单数'
              }
              this.tableHeader['orderDoneRate'] = header['orderDoneRate']
              this.tableHeader['recallSuccessRate'] = header['recallSuccessRate']
              this.tableHeader['recallGoodRate'] = header['recallGoodRate']
              this.tableHeader['rank2CustRate'] = header['rank2CustRate']
              delete this.tableHeader['businessNameSet']
            }
            this.tableData = res.records
            this.tableData.forEach(item => {
              if (item['createDate'] != null) {
                item['createDate'] = item['createDate'].substr(0, 10)
              }
              if (item['compleTimeSum'] != null) {
                if (item['completeNbrCount'] == 0) {
                  item['compleTimeSum'] = '/'
                } else {
                  item['compleTimeSum'] = (item['compleTimeSum'] / item['completeNbrCount']).toFixed(2)
                }
              }
              if (item['nbrCount'] == 0) {
                item['orderDoneRate'] = '/'
              } else {
                item['orderDoneRate'] = (item['completeNbrCount'] / item['nbrCount']).toFixed(2)
              }
              if (item['completeNbrCount'] == 0) {
                item['recallSuccessRate'] = '/'
              } else {
                item['recallSuccessRate'] = (item['recallSuccess'] / item['completeNbrCount']).toFixed(2)
              }
              if (item['recallSuccess'] == 0) {
                item['recallGoodRate'] = '/'
              } else {
                item['recallGoodRate'] = (item['recallGood'] / item['recallSuccess']).toFixed(2)
              }
              if (item['nbrCount'] == 0) {
                item['rank2CustRate'] = '/'
              } else {
                item['rank2CustRate'] = (item['rank2Cust'] / item['nbrCount']).toFixed(2)
              }
            })
            this.total = res.total
          }).finally(() => {
            this.tabDisable = false
            this.loading = false
            this.$nextTick(() => {
              this.$refs['table'].doLayout()
            })
          })
        }
      }
    },
    initList() {
      management.getParamList({
        params: "yhxw_order_anzhuang_statistic_month-business_name," +
                "yhxw_order_anzhuang_statistic_month-EXECUTE_STAFF_NAME," +
                "yhxw_order_weixiu_statistic_month-business_name," +
                "yhxw_order_weixiu_statistic_month-EXECUTE_STAFF_NAME"
      }).then((res) => {
        this.typeListforInstaller = res['yhxw_order_anzhuang_statistic_month-business_name']
        this.typeList = this.typeListforInstaller
        this.staffListforInstaller = res['yhxw_order_anzhuang_statistic_month-EXECUTE_STAFF_NAME']
        this.staffList = this.staffListforInstaller
        this.typeListforRepairer = res['yhxw_order_weixiu_statistic_month-business_name']
        this.staffListforRepairer = res['yhxw_order_weixiu_statistic_month-EXECUTE_STAFF_NAME']
      })
    },
    handleClick(e) {
      this.activeName = e.props.label
      this.businessName = []
      this.ascs = ''
      this.descs = ''
      this.checkPeriod = '按日统计'
      this.checkGroup = ['中心及广电站']
      this.group = 'station,createDate'
      if (this.activeName == '安装工单') {
        this.staffList = this.staffListforInstaller
        this.typeList = this.typeListforInstaller
      } else {
        this.staffList = this.staffListforRepairer
        this.typeList = this.typeListforRepairer
      }
      this.getTableList(this.activeName, this.checkPeriod)
    },
    handleCheckedPeriodChange(period) {
      if (period == '按日统计') {
        this.checkGroup = ['中心及广电站']
        this.group = 'station,createDate'
      } else if (period == '按周统计') {
        this.checkGroup = ['中心及广电站']
        this.group = 'station,dateWeek'
      } else if (period == '按月统计') {
        this.checkGroup = ['中心及广电站']
        this.group = 'station,dateMonth'
      }
      this.getTableList(this.activeName, period)
    },
    handleCheckedGroupChange(arr) {
      if (this.checkPeriod == '按日统计') {
        this.group = 'createDate,'
      } else if (this.checkPeriod == '按周统计') {
        this.group = 'dateWeek,'
      } else if (this.checkPeriod == '按月统计') {
        this.group = 'dateMonth,'
      }
      for (let i = 0; i < arr.length; i++) {
        if (i == arr.length - 1) {
          this.group += GROUP[arr[i]]
        } else {
          this.group += GROUP[arr[i]] + ','
        }
      }
      this.getTableList(this.activeName, this.checkPeriod)
    },
    changeTime() {
      this.getTableList(this.activeName, this.checkPeriod)
    },
    changeWeekTime(newWeek) {
      if (!newWeek || !this.week1forShow) {
        this.week2 = ''
      } else if (newWeek < this.week1forShow) {   // 保证week2大于week1
        this.week2forShow = this.week1forShow
        this.week2 = this.getWeek(this.week2forShow)
      } else {
        this.week2 = this.getWeek(newWeek)
      }
      this.getTableList(this.activeName, this.checkPeriod)
    },
    getDay(num, str) {
      var today = new Date();
      var nowTime = today.getTime();
      var ms = 24*3600*1000*num;
      today.setTime(parseInt(nowTime + ms));
      var oYear = today.getFullYear();
      var oMoth = (today.getMonth() + 1).toString();
      if (oMoth.length <= 1) oMoth = '0' + oMoth;
      var oDay = today.getDate().toString();
      if (oDay.length <= 1) oDay = '0' + oDay;
      return oYear + str + oMoth + str + oDay;
    },
    getLastMonday() {
      let today = new Date();
      let nowTime = today.getTime();
      let day = today.getDay();
      let oneDayTime = 24 * 3600 * 1000;
      let lastMondayTime = nowTime - (day - 1 + 7) * oneDayTime;
      return new Date(lastMondayTime)

      // let oYear = Monday.getFullYear();
      // let oMoth = (Monday.getMonth() + 1).toString();
      // if (oMoth.length <= 1) oMoth = '0' + oMoth;
      // let oDay = Monday.getDate().toString();
      // if (oDay.length <= 1) oDay = '0' + oDay;
      // return oYear + '/' + oMoth + '/' + oDay;
    },
    getWeek(day) {
      // 当年的第一天
      const fist_day_of_year = new Date(day.getFullYear().toString(), 0, 1)
      // 毫秒差
      const ms_count= day - fist_day_of_year
      // 今天是今年的第几天
      const days_count= Math.ceil(ms_count/ 86400000)

      let oYear = day.getFullYear();
      return oYear + '/' + Math.ceil(days_count / 7);
    },
    getMonth() {
      let today = new Date();
      let preMonth = today.getMonth();
      preMonth = preMonth - 1;
      if (preMonth > 11) {
        today.setFullYear(today.getFullYear() + 1);
        today.setMonth(0);
      } else if (preMonth < 0) {
        today.setFullYear(today.getFullYear() - 1);
        today.setMonth(11);
      } else {
        today.setMonth(preMonth);
      }

      let oYear = today.getFullYear();
      let oMoth = (today.getMonth() + 1).toString();
      if (oMoth.length <= 1) oMoth = '0' + oMoth;
      return oYear + '/' + oMoth;
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.currentPage = 1
      this.getTableList(this.activeName, this.checkPeriod)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getTableList(this.activeName, this.checkPeriod)
    },
    sortTable({ prop, order }) {
      if(order == 'ascending') {
        this.ascs = prop
        this.descs = ''
      } else if(order == 'descending') {
        this.ascs = ''
        this.descs = prop
      } else {
        this.ascs = ''
        this.descs = ''
      }
      this.getTableList(this.activeName, this.checkPeriod)
    },
    onExport() {
      let date = this.date ? this.date : '全部日期'
      let data = this.tableData
      this.downLoading = true
      let column = []
      let t
      for (let i in this.tableHeader) {
        t = {
          title: this.tableHeader[i].label,
          key: i,
          type: 'text',
        }
        column.push(t)
      }
      const excelName = `${date}-${this.activeName}`
      table2excel(column, data, excelName)
      this.downLoading = falsecontent
    },
  },
  created() {
    this.date = [this.getDay(-1, '/'), this.getDay(-1, '/')]
    this.week1forShow = this.week2forShow = this.getLastMonday()
    this.week1 = this.week2 = this.getWeek(this.week1forShow)
    this.month = [this.getMonth(), this.getMonth()]
    this.initList()
    this.getTableList(this.activeName, this.checkPeriod)
  }
}
</script>

<style lang="scss" scoped>
.tab-content {
  width: 100%;
  height: calc(100% - 60px);
  .group {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .toolbox {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left {
      .date-pick {
        display: flex;
      }
      & > div {
        margin-right: 20px;
      }
    }
  }
  .table {
    width: 100%;
    height: calc(100% - 140px);
  }
  .pagination {
    float: right;
    margin-top: 20px;
  }
}
</style>
