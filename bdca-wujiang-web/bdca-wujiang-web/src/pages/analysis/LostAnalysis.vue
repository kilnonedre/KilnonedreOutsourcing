<template>
  <div class="page order">
    <common-header title="流失用户分析"></common-header>
    <div class="content">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane :disabled="tabDisable" label="流失用户基础信息分析" name="基础"></el-tab-pane>
        <el-tab-pane :disabled="tabDisable" label="光纤宽带流失用户点击分析" name="光纤点击"></el-tab-pane>
        <el-tab-pane :disabled="tabDisable" label="光纤宽带流失用户维修工单分析" name="光纤维修"></el-tab-pane>
        <el-tab-pane :disabled="tabDisable" label="数字电视流失用户点击分析" name="数字点击"></el-tab-pane>
        <el-tab-pane :disabled="tabDisable" label="数字电视流失用户维修工单分析" name="数字维修"></el-tab-pane>
      </el-tabs>
      <div class="tab-content">
        <div class="group">
          <el-checkbox-group v-if="activeName == '基础'" v-model="checkGroup" @change="handleCheckedGroupChange">
            <el-checkbox label="中心及广电站" />
            <el-checkbox label="网格" />
            <el-checkbox label="客户类型" />
            <el-checkbox label="支付类型" />
            <el-checkbox label="产品名称" />
            <el-checkbox label="套餐名称" />
            <el-checkbox label="客户入网时间" />
            <el-checkbox label="月消费额度" />
            <el-checkbox label="终端个数" />
          </el-checkbox-group>
          <el-checkbox-group v-if="activeName != '基础'" v-model="checkGroup1" @change="handleCheckedGroup1Change">
            <el-checkbox label="流失月份" />
            <el-checkbox label="数据月份" />
          </el-checkbox-group>
        </div>
        <div class="toolbox">
          <div class="left">
            <div>
              <el-select
                v-if="activeName == '基础'"
                v-model="offerNameP"
                placeholder="产品名称"
                clearable
                @change="getTableList(activeName)"
              >
                <el-option v-for="item in offerNamePList" :key="item" :label="item" :value="item" />
              </el-select>
            </div>
            <div>
              <el-select
                v-if="activeName == '基础'"
                v-model="offerNameT"
                placeholder="套餐名称"
                clearable
                @change="getTableList(activeName)"
              >
                <el-option v-for="item in offerNameTList" :key="item" :label="item" :value="item" />
              </el-select>
            </div>
            <el-date-picker
              v-if="activeName != '基础'"
              v-model="monthLost"
              type="monthrange"
              format="YYYY/MM"
              value-format="YYYY/MM"
              start-placeholder="开始流失月份"
              end-placeholder="结束流失月份"
              style="width: 250px; margin-right: 10px;"
              @change="changeTime">
            </el-date-picker>
            <el-date-picker
              v-if="activeName != '基础'"
              v-model="month"
              type="monthrange"
              format="YYYY/MM"
              value-format="YYYY/MM"
              start-placeholder="开始数据月份"
              end-placeholder="结束数据月份"
              style="width: 250px; margin-right: 10px;"
              @change="changeTime">
            </el-date-picker>
          </div>
          <div class="right">
            <el-button type="primary" @click="onExport" :loading="downLoading">导出数据</el-button>
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
              :fit="true"
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

const originGroup = 'dw1,gridName,custType,payType,offerNameP,offerNameT,acessDuration,monthFee,countSub,monthLost,month'

const GROUP = {
  '中心及广电站': 'dw1',
  '网格': 'gridName',
  '客户类型': 'custType',
  '支付类型': 'payType',
  '产品名称': 'offerNameP',
  '套餐名称': 'offerNameT',
  '客户入网时间': 'acessDuration',
  '月消费额度': 'monthFee',
  '终端个数': 'countSub',
}

const originGroup1 = ['monthLost','month']

const GROUP1 = {
  '流失月份': 'monthLost',
  '数据月份': 'month',
}

const header = {
  dw1: {
    label: '中心及广电站',
    width: '180',
    sort: true
  },
  gridName: {
    label: '网格名称',
    width: '180',
    sort: true
  },
  custType: {
    label: '客户类型',
    width: '120',
    sort: true
  },
  payType: {
    label: '支付类型',
    width: '120',
    sort: true
  },
  offerNameP: {
    label: '产品名称',
    width: '300',
    sort: true
  },
  offerNameT: {
    label: '套餐名称',
    width: '300',
    sort: true
  },
  acessDuration: {
    label: '入网时长',
    width: '120',
    sort: true
  },
  monthFee: {
    label: '月消费额度',
    width: '150',
    sort: true
  },
  countSub: {
    label: '终端个数',
    width: '120',
    sort: true
  },
  custAll: {
    label: '客户数',
    width: '120',
    sort: true
  },
  subAll: {
    label: '终端数',
    width: '200',
    sort: true
  },
  custLost: {
    label: '数字电视流失客户数',
    width: '200',
    sort: true
  },
  custLostRate: {
    label: '数字电视客户流失率',
    width: '200',
    sort: false
  },
  custSubLost: {
    label: '光纤宽带流失客户数',
    width: '200',
    sort: true
  },
  custSubLostRate: {
    label: '光纤宽带客户流失率',
    width: '200',
    sort: false
  },
  subLost: {
    label: '光纤宽带流失终端数',
    width: '200',
    sort: true
  },
  subLostRate: {
    label: '光纤宽带终端流失率',
    width: '200',
    sort: false
  },
  month: {
    label: '数据月份',
    width: '120',
    sort: true
  },
  monthLost: {
    label: '流失月份',
    width: '120',
    sort: true
  },
  clickSum: {
    label: '平均点击数',
    width: '120',
    sort: true
  },
  clickAvgDay: {
    label: '日均点击数',
    width: '200',
    sort: true
  },
  openDays: {
    label: '月平均开机天数',
    width: '200',
    sort: true
  },
  openWeekendDays: {
    label: '周六日开机天数',
    width: '150',
    sort: true
  },
  openWorkDays: {
    label: '工作日开机天数',
    width: '150',
    sort: true
  },
  nbrCount: {
    label: '工单总数',
    width: '150',
    sort: true
  },
  completeNbrCount: {
    label: '完成工单数',
    width: '150',
    sort: true
  },
  overtimeNbrCount: {
    label: '超时工单数',
    width: '150',
    sort: true
  },
  overtimeNbrUncomple	: {
    label: '超时未完成工单数',
    width: '200',
    sort: true
  },
  rank2Cust: {
    label: '二次报修客户数',
    width: '200',
    sort: true
  },
  rank3Cust: {
    label: '三次及以上报修客户数',
    width: '220',
    sort: true
  },
  compleTimeSum: {
    label: '完成时长(分钟)',
    width: '180',
    sort: true
  },
  booktimeUnuse: {
    label: '预约时间大于完成时间',
    width: '250',
    sort: true
  },
  recallSuccess: {
    label: '回访成功数',
    width: '150',
    sort: true
  },
  recallGood: {
    label: '回访满意数',
    width: '150',
    sort: true
  },
  recallOrdinary: {
    label: '回访一般数',
    width: '150',
    sort: true
  },
  recallBad: {
    label: '回访不满意数',
    width: '150',
    sort: true
  },
}

export default {
  components: {
    CommonHeader,
  },
  data() {
    return {
      activeName: '基础',
      tabDisable: false,
      loading: true,
      downLoading: false,
      checkGroup: [],
      group: '',
      checkGroup1: [],
      group1: '',
      offerNameP: '',
      offerNamePList: [],
      offerNameT: '',
      offerNameTList: [],
      caller1: false,
      monthLost: '',
      month: '',
      total: 0,
      pageSize: 100,
      currentPage: 1,
      tableHeader: {},
      tableData: [],
      ascs: '',
      descs: '',
    }
  },
  methods: {
    getTableList(activeName) {
      this.loading = true
      this.tabDisable = true  // 表格加载前把其他 tab 给 disable 掉，不能点击
      this.tableHeader = {}
      this.tableData = []
      if (activeName == '基础') {
        behavior.getLostBasic({
          size: this.pageSize,
          current: this.currentPage,
          offerNameP: this.offerNameP,
          offerNameT: this.offerNameT,
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
          }
          delete this.tableHeader.custCode
          delete this.tableHeader.isHitvLost
          delete this.tableHeader.isHitvSubLost
          delete this.tableHeader.isSdtvLost
          delete this.tableHeader.subscriberInsId
          this.tableHeader['custLostRate'] = header['custLostRate']
          this.tableHeader['custSubLostRate'] = header['custSubLostRate']
          this.tableHeader['subLostRate'] = header['subLostRate']
          this.tableData = res.records
          this.tableData.forEach(item => {
            if (item['custAll'] == 0) {
              item['custLostRate'] = '/'
              item['custSubLostRate'] = '/'
            } else {
              item['custLostRate'] = (item['custLost'] / item['custAll']).toFixed(2)
              item['custSubLostRate'] = (item['custSubLost'] / item['custAll']).toFixed(2)
            }
            if (item['subAll'] == 0) {
              item['subLostRate'] = '/'
            } else {
              item['subLostRate'] = (item['subLost'] / item['subAll']).toFixed(2)
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
        if (!this.caller1) {
          management.getParamList({
            params: "yhxw_lost_basic_mingxi-OFFER_NAME_P," +
                    "yhxw_lost_basic_mingxi-OFFER_NAME_T"
          }).then((res) => {
            this.offerNamePList = res['yhxw_lost_basic_mingxi-OFFER_NAME_P']
            this.offerNameTList = res['yhxw_lost_basic_mingxi-OFFER_NAME_T']
            this.caller1 = true
          })
        }
      } else if (activeName == '光纤点击') {
        behavior.getLostHitvClick({
          size: this.pageSize,
          current: this.currentPage,
          month1: isArray(this.month) ? this.month[0] : '',
          month2: isArray(this.month) ? this.month[1] : '',
          lostMonth1: isArray(this.monthLost) ? this.monthLost[0] : '',
          lostMonth1: isArray(this.monthLost) ? this.monthLost[1] : '',
          groupBy: this.group1,
          descs: this.descs,
          ascs: this.ascs,
        }).then((res) => {
          if (res.records.length != 0) {
            Object.keys(res.records[0]).forEach((key) => {
              if (this.group1.split(',').indexOf(key) != -1) {
                this.tableHeader[key] = header[key]
              }
              if (originGroup1.indexOf(key) == -1) {
                this.tableHeader[key] = header[key]
              }
            })
          }
          this.tableData = res.records
          this.tableData.forEach(item => {
            if (item['clickSum'] != null) {
              item['clickSum'] = item['clickSum'].toFixed(2)
            }
            if (item['clickAvgDay'] != null) {
              item['clickAvgDay'] = item['clickAvgDay'].toFixed(2)
            }
            if (item['openDays'] != null) {
              item['openDays'] = item['openDays'].toFixed(2)
            }
            if (item['openWeekendDays'] != null) {
              item['openWeekendDays'] = item['openWeekendDays'].toFixed(2)
            }
            if (item['openWorkDays'] != null) {
              item['openWorkDays'] = item['openWorkDays'].toFixed(2)
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
      } else if (activeName == '光纤维修') {
        behavior.getLostHitvWeixiu({
          size: this.pageSize,
          current: this.currentPage,
          month1: isArray(this.month) ? this.month[0] : '',
          month2: isArray(this.month) ? this.month[1] : '',
          lostMonth1: isArray(this.monthLost) ? this.monthLost[0] : '',
          lostMonth1: isArray(this.monthLost) ? this.monthLost[1] : '',
          groupBy: this.group1,
          descs: this.descs,
          ascs: this.ascs,
        }).then((res) => {
         if (res.records.length != 0) {
            Object.keys(res.records[0]).forEach((key) => {
              if (this.group1.split(',').indexOf(key) != -1) {
                this.tableHeader[key] = header[key]
              }
              if (originGroup1.indexOf(key) == -1) {
                this.tableHeader[key] = header[key]
              }
            })
          }
          this.tableData = res.records
          this.total = res.total
        })
        .finally(() => {
          this.tabDisable = false
          this.loading = false
          this.$nextTick(() => {
            this.$refs['table'].doLayout()
          })
        })
      } else if (activeName == '数字点击') {
        behavior.getLostSdtvClick({
          size: this.pageSize,
          current: this.currentPage,
          month1: isArray(this.month) ? this.month[0] : '',
          month2: isArray(this.month) ? this.month[1] : '',
          lostMonth1: isArray(this.monthLost) ? this.monthLost[0] : '',
          lostMonth1: isArray(this.monthLost) ? this.monthLost[1] : '',
          groupBy: this.group1,
          descs: this.descs,
          ascs: this.ascs,
        }).then((res) => {
          if (res.records.length != 0) {
            Object.keys(res.records[0]).forEach((key) => {
              if (this.group1.split(',').indexOf(key) != -1) {
                this.tableHeader[key] = header[key]
              }
              if (originGroup1.indexOf(key) == -1) {
                this.tableHeader[key] = header[key]
              }
            })
          }
          this.tableData = res.records
          this.tableData.forEach(item => {
            if (item['clickSum'] != null) {
              item['clickSum'] = item['clickSum'].toFixed(2)
            }
            if (item['clickAvgDay'] != null) {
              item['clickAvgDay'] = item['clickAvgDay'].toFixed(2)
            }
            if (item['openDays'] != null) {
              item['openDays'] = item['openDays'].toFixed(2)
            }
            if (item['openWeekendDays'] != null) {
              item['openWeekendDays'] = item['openWeekendDays'].toFixed(2)
            }
            if (item['openWorkDays'] != null) {
              item['openWorkDays'] = item['openWorkDays'].toFixed(2)
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
      } else if (activeName == '数字维修') {
        behavior.getLostSdtvWeixiu({
          size: this.pageSize,
          current: this.currentPage,
          month1: isArray(this.month) ? this.month[0] : '',
          month2: isArray(this.month) ? this.month[1] : '',
          lostMonth1: isArray(this.monthLost) ? this.monthLost[0] : '',
          lostMonth1: isArray(this.monthLost) ? this.monthLost[1] : '',
          groupBy: this.group1,
          descs: this.descs,
          ascs: this.ascs,
        }).then((res) => {
          if (res.records.length != 0) {
            Object.keys(res.records[0]).forEach((key) => {
              if (this.group1.split(',').indexOf(key) != -1) {
                this.tableHeader[key] = header[key]
              }
              if (originGroup1.indexOf(key) == -1) {
                this.tableHeader[key] = header[key]
              }
            })
          }
          this.tableData = res.records
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
    },
    handleClick(e) {
      this.activeName = e.props.name
      this.checkGroup = ['月份']
      this.group = 'month'
      this.ascs = ''
      this.descs = ''
      this.getTableList(this.activeName)
    },
    handleCheckedGroupChange(arr) {
      this.group = ''
      for (let i = 0; i < arr.length; i++) {
        if (i == arr.length - 1) {
          this.group += GROUP[arr[i]]
        } else {
          this.group += GROUP[arr[i]] + ','
        }
      }
      this.getTableList(this.activeName)
    },
    handleCheckedGroup1Change(arr) {
      this.group1 = ''
      for (let i = 0; i < arr.length; i++) {
        if (i == arr.length - 1) {
          this.group1 += GROUP1[arr[i]]
        } else {
          this.group1 += GROUP1[arr[i]] + ','
        }
      }
      this.getTableList(this.activeName)
    },
    changeTime() {
      this.getTableList(this.activeName)
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
      this.getTableList(this.activeName)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getTableList(this.activeName)
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
      this.downLoading = false
    },
  },
  created() {
    // this.month = [this.getMonth(), this.getMonth()]
    this.getTableList(this.activeName)
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
      & > div {
        display: flex;
        margin-right: 10px;
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
