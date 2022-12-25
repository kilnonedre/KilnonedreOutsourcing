<template>
  <div class="page order">
    <common-header title="安装工单明细"></common-header>
    <div class="content">
      <div class="tab-content">
        <div class="toolbox">
          <div class="left">
            <div class="level">
              <div>
                <el-date-picker
                  v-model="date"
                  type="daterange"
                  format="YYYY-MM-DD"
                  value-format="YYYY/MM/DD"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  style="width: 250px"
                  @change="changeTime"
                />
              </div>
              <div>
                <el-cascader
                  v-model="station_grid"
                  style="width: 250px"
                  :options="stationOptions"
                  :props="{ checkStrictly: userInfo.grade == '网格员' ? false : true }"
                  @change="changeStation"
                  placeholder="中心及广电站"
                  :clearable="userInfo.grade == '管理员'"
                  filterable
                >
                </el-cascader>
              </div>
              <div>
                <el-select
                  v-model="businessName"
                  placeholder="安装类型"
                  multiple
                  collapse-tags
                  collapse-tags-tooltip
                  filterable
                  clearable
                  @change="getTableList"
                >
                  <el-option v-for="item in businessList" :key="item" :label="item" :value="item" />
                </el-select>
              </div>
              <div>
                <el-select
                  v-model="runSts"
                  placeholder="工单状态"
                  filterable
                  clearable
                  @change="getTableList"
                >
                  <el-option v-for="item in runStsList" :key="item" :label="item" :value="item" />
                </el-select>
              </div>
              <div>
                <el-select
                  v-model="executeStaffName"
                  placeholder="施工员"
                  filterable
                  clearable
                  @change="getTableList"
                >
                  <el-option v-for="item in staffList" :key="item" :label="item" :value="item" />
                </el-select>
              </div>
            </div>
            <div class="level">
              <div>
                <el-select
                  v-model="stsWords"
                  placeholder="电话回访结果"
                  filterable
                  clearable
                  @change="getTableList"
                >
                  <el-option v-for="item in stsWordsList" :key="item" :label="item" :value="item" />
                </el-select>
              </div>
              <div>
                <el-select
                  v-model="dissatisfiedReason"
                  placeholder="不满意原因"
                  filterable
                  clearable
                  @change="getTableList"
                >
                  <el-option v-for="item in dissatisfiedReasonList" :key="item" :label="item" :value="item" />
                </el-select>
              </div>
              <div>
                <el-select
                  v-model="accessWay"
                  placeholder="接入方式"
                  multiple
                  collapse-tags
                  collapse-tags-tooltip
                  filterable
                  clearable
                  @change="getTableList"
                >
                  <el-option v-for="item in accessWayList" :key="item" :label="item" :value="item" />
                </el-select>
              </div>
              <div>
                <el-select
                  v-model="isovertime"
                  placeholder="是否超时"
                  clearable
                  @change="getTableList"
                >
                  <el-option v-for="item in isovertimeList" :key="item" :label="item" :value="item" />
                </el-select>
              </div>
              <div class="search-range">
                <span style="font-size: 15px; width: 130px;">安装时长（分钟）:</span>
                <el-input-number
                  style="width: 150px;"
                  v-model="complete1"
                  :min="0"
                  :precision="0"
                  placeholder="最小值"
                  @change="inputNumber($event, 'left')"
                ></el-input-number>
                <span style="margin: 0 10px">~</span>
                <el-input-number
                  style="width: 150px;"
                  :min="0"
                  :precision="0"
                  v-model="complete2"
                  placeholder="最大值"
                  @change="inputNumber($event, 'right')"
                ></el-input-number>
              </div>
            </div>
          </div>
          <div class="right">
            <el-button type="primary" @click="onExport" :loading="downLoading">
              导出数据
            </el-button>
          </div>
        </div>
        <div class="table">
          <el-tooltip effect="dark" content="筛选表格列" placement="top">
            <img
              @click="clickScreen"
              class="icon-screen"
              src="../../assets/img/icon_screen.png"
              alt=""
            />
          </el-tooltip>
          <transition name="el-zoom-in-top">
            <div class="screen-wrap" v-show="showScreen">
              <el-checkbox v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
              <div style="margin: 15px 0"></div>
              <el-checkbox-group
                v-model="checkedHeaders"
                @change="handleCheckedHeaderChange"
              >
                <el-checkbox
                  v-for="(header, index) in allHeader"
                  :label="index"
                  :key="index"
                  >{{ header.label }}
                </el-checkbox>
              </el-checkbox-group>
              <el-button
                @click="cancel"
                style="margin-top: 20px; margin-right: 20px"
                size="small"
                >取消
              </el-button>
              <el-button
                @click="confirm"
                style="margin-top: 20px; margin-right: 20px"
                type="primary"
                size="small"
                >确定
              </el-button>
            </div>
          </transition>
          <el-table
            ref="install"
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
              sortable="custom"
            >
              <template #default="scope">
                <span v-if="index === 'createDate'">{{ !!scope.row[index] ? scope.row[index].split(' ')[0] : '-' }}</span>
                <span v-else-if="index === 'asgnDate'">{{ !!scope.row[index] ? scope.row[index].split(' ')[0] : '-' }}</span>
                <span v-else-if="index === 'completeDate'">{{ !!scope.row[index] ? scope.row[index].split(' ')[0] : '-' }}</span>
                <span v-else-if="index === 'bookTime'">{{ !!scope.row[index] ? scope.row[index].split(' ')[0] : '-' }}</span>
                <span v-else style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">{{!!scope.row[index] ? scope.row[index] : '-'}}</span>
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
            :page-sizes="[20, 30, 50, 100]"
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

import { detail } from '@api'
import { isArray } from '@vue/shared'

import Cookies from 'js-cookie'
import table2excel from '../../plugins/table2excel'

const header = {
  woNbr: {label: '工单号',width: '120'},
  businessName: {label: '安装类型',width: '200'},
  custId: {label: '客户证号',width: '160'},
  custName: {label: '客户姓名',width: '120'},
  contactInfo: {label: '联系信息',width: '400'},
  situated: {label: '地址',width: '450'},
  station: {label: '中心及广电站',width: '180'},
  gridName: {label: '网格名称',width: '180'},
  exchId: {label: '网格ID', width: '180'},
  runSts: {label: '工单状态', width: '120'},
  soStaffName: {label: '受理人', width: '120'},
  executeStaffName: {label: '施工员',width: '120'},
  createDate: {label: '工单生产时间',width: '160'},
  asgnDate: {label: '派单时间',width: '160'},
  completeDate: {label: '完成时间',width: '200'},
  bookTime: {label: '预约时间',width: '180'},
  remarks: {label: '备注',width: '250'},
  surveyStaffName	: {label: '回访员', width: '120'},
  stsWords: {label: '回访结果',width: '200'},
  dissatisfiedReason: {label: '不满意原因',width: '200'},
  mainProd: {label: '主机标识',width: '120'},
  accessWay: {label: '接入方式',width: '200'},
  handleTypeName: {label: '操作类型',width: '200'},
  isovertime: {label: '是否超时',width: '120'},
  completeMin: {label: '完成时长(分钟)',width: '160'},
  orderRank: {label: '客户按月工单排序',width: '200'},
}

export default {
  components: {
    CommonHeader,
  },
  data() {
    return {
      date: '',
      station: '',
      gridName: '',
      station_grid: [],
      stationOptions: [],
      userInfo: {},
      businessName: [],
      businessList: [],
      runSts: '',
      runStsList: ['C','D','P'],
      executeStaffName: '',
      staffList: [],
      stsWords: '',
      stsWordsList: [],
      dissatisfiedReason: '',
      dissatisfiedReasonList: [],
      accessWay: [],
      accessWayList: [],
      isovertime: '',
      isovertimeList: ['是','否'],
      complete1: undefined,
      complete2: undefined,
      downLoading: false,
      loading: false,
      showScreen: false,
      checkAll: true,
      checkedHeaders: [],
      showHeader: [],
      allHeader: header,
      tableHeader: {},
      tableData: [],
      ascs: '',
      descs: '',
      currentPage: 1,
      total: 1,
      pageSize: 100,
    }
  },
  methods: {
    async initList() {
      await detail.getInstalled({
        size: -1
      }).then((res) => {
        res.records.forEach((obj) => {
          if (obj.businessName != null && this.businessList.indexOf(obj.businessName) == -1) {
            this.businessList.push(obj.businessName)
          }
          window.localStorage.setItem('businessListForInstall', JSON.stringify(this.businessList))
          // if (obj.runSts != null && this.runStsList.indexOf(obj.runSts) == -1) {
          //   this.runStsList.push(obj.runSts)
          // }
          if (obj.executeStaffName != null && this.staffList.indexOf(obj.executeStaffName) == -1) {
            this.staffList.push(obj.executeStaffName)
          }
          window.localStorage.setItem('staffList', JSON.stringify(this.staffList))
          if (obj.stsWords != null && this.stsWordsList.indexOf(obj.stsWords) == -1) {
            this.stsWordsList.push(obj.stsWords)
          }
          window.localStorage.setItem('stsWordsList', JSON.stringify(this.stsWordsList))
          if (obj.dissatisfiedReason != null && this.dissatisfiedReasonList.indexOf(obj.dissatisfiedReason) == -1) {
            this.dissatisfiedReasonList.push(obj.dissatisfiedReason)
          }
          window.localStorage.setItem('dissatisfiedReasonList', JSON.stringify(this.dissatisfiedReasonList))
          if (obj.accessWay != null && this.accessWayList.indexOf(obj.accessWay) == -1) {
            this.accessWayList.push(obj.accessWay)
          }
          window.localStorage.setItem('accessWayList', JSON.stringify(this.accessWayList))
        })
      })
    },
    getTableList() {
      this.loading = true
      this.tableData = []
      detail.getInstalled({
        size: this.pageSize,
        current: this.currentPage,
        date1: isArray(this.date) ? this.date[0] : '',
        date2: isArray(this.date) ? this.date[1] : '',
        station: this.station,
        gridName: this.gridName,
        businessNameSet: this.businessName.join(),
        runSts: this.runSts,
        executeStaffName: this.executeStaffName,
        stsWords: this.stsWords,
        dissatisfiedReason: this.dissatisfiedReason,
        accessWaySet: this.accessWay.join(),
        isovertime: this.isovertime,
        complete1: this.complete1,
        complete2: this.complete2,
        descs: this.descs,
        ascs: this.ascs,
      }).then((res) => {
        this.tableData = res.records
        this.total = res.total
      })
      .finally(() => {
        this.loading = false
        this.$nextTick(() => {
          this.$refs['install'].doLayout()
        })
      })
    },
    changeTime() {
      this.getTableList()
    },
    changeStation(e) {
      this.station = e ? e[0] : ''
      this.gridName = e && e.length > 1 ? e[1] : ''
      this.getTableList()
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
    inputNumber(e, num) {
      const pattern = /^(\-|\+)?\d+(\.\d+)?$/
      if (e == '' || e == undefined || pattern.test(e)) {
        if (num == 'left') {
          this.complete1 = e
        } else {
          this.complete2 = e
        }
        this.getTableList()
      } else {
        if (num == 'left') {
          this.complete1 = undefined
        } else {
          this.complete2 = undefined
        }
        this.$message.error('请输入数字！')
        this.getTableList()
      }
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.currentPage = 1
      this.getTableList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getTableList()
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
      this.getTableList()
    },
    onExport() {
      let data = []
      this.downLoading = true
      detail.getInstalled({
        size: -1,
        date1: isArray(this.date) ? this.date[0] : '',
        date2: isArray(this.date) ? this.date[1] : '',
        station: this.station,
        gridName: this.gridName,
        businessNameSet: this.businessName.join(),
        runSts: this.runSts,
        executeStaffName: this.executeStaffName,
        stsWords: this.stsWords,
        dissatisfiedReason: this.dissatisfiedReason,
        accessWaySet: this.accessWay.join(),
        isovertime: this.isovertime,
        complete1: this.complete1,
        complete2: this.complete2,
        descs: this.descs,
        ascs: this.ascs,
      }).then((res) => {
        data = res.records
        res.records.forEach(item => {
          item.createDate = item.createDate ? item.createDate.split(' ')[0] : '-'
          item.asgnDate = item.asgnDate ? item.asgnDate.split(' ')[0] : '-'
          item.completeDate = item.completeDate ? item.completeDate.split(' ')[0] : '-'
          item.bookTime = item.bookTime ? item.bookTime.split(' ')[0] : '-'
        })
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
        const excelName = `安装工单明细`
        table2excel(column, data, excelName)
      }).finally(() => {
        this.downLoading = false
      })
    },
    clickScreen() {
      this.showScreen = true
    },
    handleCheckAllChange(val) {
      this.checkedHeaders = val ? this.computeCheckedHeaders(header) : []
      this.showHeader = val ? header : []
    },
    computeCheckedHeaders(data) {
      let arr = []
      for (let i in data) {
        arr.push(i)
      }
      this.checkedHeaders = arr
      return arr
    },
    handleCheckedHeaderChange(value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === Object.keys(header).length
      let t = {}
      value.forEach((i) => {
        t[i] = this.allHeader[i]
      })
      this.showHeader = t
    },
    confirm() {
      this.tableHeader = this.showHeader
      window.localStorage.setItem('install', JSON.stringify(this.tableHeader))
      this.showScreen = false
      this.$nextTick(() => {
        this.$refs['install'].doLayout()
      })
    },
    cancel() {
      this.showHeader = this.tableHeader
      this.showScreen = false
      this.checkAll =
        Object.keys(this.tableHeader).length ===
        Object.keys(this.computeCheckedHeaders(this.tableHeader)).length
    },
  },
  created() {
    this.date = [this.getDay(-1, '/'), this.getDay(-1, '/')]
    // 表格列筛选
    let t = window.localStorage.getItem('install')
    this.showHeader = t ? JSON.parse(t) : header
    this.tableHeader = t ? JSON.parse(t) : header
    this.computeCheckedHeaders(this.tableHeader)
    this.checkAll =
      Object.keys(this.showHeader).length === Object.keys(header).length
    this.tableHeader = header
    // 用户权限
    this.userInfo = JSON.parse(Cookies.get('user'))
    let arr = []
    let gridList = this.userInfo.grid ? this.userInfo.grid.split(',') : []
    arr.push({
      value: this.userInfo.station,
      label: this.userInfo.station,
      children: []
    })
    gridList.forEach(item => {
      arr[0].children.push({
        value: item,
        label: item
      })
    })
    this.stationOptions = this.userInfo.grade == '管理员' ? window.config.stationOptions : arr
    this.station_grid = [this.userInfo.station]
    if(gridList.length) this.station_grid.push(gridList[0])
    this.station = this.userInfo.station
    this.gridName = gridList[0]
    // 下拉列表的缓存
    t = window.localStorage.getItem('businessListForInstall')
    this.businessList = t ? JSON.parse(t) : []
    t = window.localStorage.getItem('staffList')
    this.staffList = t ? JSON.parse(t) : []
    t = window.localStorage.getItem('stsWordsList')
    this.stsWordsList = t ? JSON.parse(t) : []
    t = window.localStorage.getItem('dissatisfiedReasonList')
    this.dissatisfiedReasonList = t ? JSON.parse(t) : []
    t = window.localStorage.getItem('accessWayList')
    this.accessWayList = t ? JSON.parse(t) : []
    if (this.businessList.length == 0 || this.staffList.length == 0 || this.stsWordsList.length == 0 || this.dissatisfiedReasonList.length == 0 ||  this.accessWayList.length == 0) {
      this.initList()
    }
    this.getTableList()
  }
}
</script>

<style lang="scss" scoped>
.tab-content {
  width: 100%;
  height: calc(100% - 60px);
  .toolbox {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left {
      display: flex;
      flex-wrap: wrap;
      .level:nth-child(1) {
        width: 100%;
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
        & > div {
          width: 25%;
          margin-right: 20px;
        }
      }
      .level:nth-child(2) {
        width: 100%;
        display: flex;
        justify-content: space-between;
        & > div {
          width: 15%;
          margin-right: 20px;
        }
        & > div:last-child{
          width: fit-content;
        }
        .search-range{
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
  .table {
    width: 100%;
    height: calc(100% - 120px);
    position: relative;
    .icon-screen {
      width: 24px;
      height: 24px;
      cursor: pointer;
      position: absolute;
      top: 4px;
      left: -32px;
    }
    .screen-wrap {
      width: 100%;
      padding: 20px;
      border: 1px solid #2c7ef8;
      background-color: rgb(234, 242, 254);
      position: absolute;
      top: 0px;
      left: 0px;
      z-index: 9;
    }
  }
  .pagination {
    float: right;
    margin-top: 20px;
  }
}
</style>
