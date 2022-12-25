<template>
  <div class="page order">
    <common-header title="一次性费用明细"></common-header>
    <div class="content">
      <div class="tab-content">
        <div class="toolbox">
          <div class="left">
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
              <el-select
                v-model="dw1"
                :disabled="userInfo.grade !== '管理员'"
                placeholder="中心及广电站"
                clearable
                @change="getTableList"
              >
                <el-option v-for="item in stationOptions" :key="item" :label="item" :value="item" />
              </el-select>
            <div>
              <el-select
                v-model="serviceHall"
                placeholder="营业厅"
                filterable
                clearable
                @change="getTableList"
              >
                <el-option v-for="item in serviceHallList" :key="item" :label="item" :value="item" />
              </el-select>
            </div>
            <div>
              <el-select
                v-model="bossType"
                placeholder="boss科目名称"
                filterable
                clearable
                @change="getTableList"
              >
                <el-option v-for="item in bossTypeList" :key="item" :label="item" :value="item" />
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
            ref="once"
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
                <span v-if="index === 'accTime'">{{ !!scope.row[index] ? scope.row[index].split(' ')[0] : '-' }}</span>
                <span v-else-if="index === 'billTime'">{{ !!scope.row[index] ? scope.row[index].split(' ')[0] : '-' }}</span>
                <span v-else-if="index === 'wirteBillTime'">{{ !!scope.row[index] ? scope.row[index].split(' ')[0] : '-' }}</span>
                <span v-else-if="index === 'tradeDate'">{{ !!scope.row[index] ? scope.row[index].split(' ')[0] : '-' }}</span>
                <span v-else-if="index === 'etlDate'">{{ !!scope.row[index] ? scope.row[index].split(' ')[0] : '-' }}</span>
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
  corpOrgId: {label: '所属区域id',width: '150'},
  custId: {label: '客户证号',width: '160'},
  name: {label: '客户姓名',width: '180'},
  serviceType: {label: '业务类型',width: '150'},
  accTime: {label: '受理时间',width: '150'},
  billTime: {label: '出票时间', width: '150'},
  billNumber: {label: '发票号码',width: '150'},
  billCode: {label: '发票代码', width: '120'},
  wirteBillTime: {label: '开票时间',width: '150'},
  billType: {label: '发票类型',width: '150'},
  bossId: {label: 'boss科目id',width: '150'},
  bossType: {label: 'boss科目名称', width: '150'},
  billFee: {label: '发票金额',width: '150'},
  billStatus: {label: '发票状态',width: '150'},
  billMode	: {label: 'payment_mode', width: '180'},
  chargeType: {label: '缴费方式',width: '150'},
  operator: {label: '操作员',width: '150'},
  serviceHall: {label: '营业厅',width: '150'},
  originalBillNumber	: {label: '原发票号码',width: '150'},
  originalBillCode: {label: '原发票代码',width: '150'},
  tradeDate: {label: '交易时间',width: '150'},
  remark: {label: '备注',width: '150'},
  etlDate: {label: '数据入库时间',width: '160'},
  dw1: {label: '中心及广电站',width: '180'},
}

export default {
  components: {
    CommonHeader,
  },
  data() {
    return {
      date: '',
      dw1: '',
      stationOptions: ['开发区广电中心','汾湖广电中心','高新区广电中心','吴江东太湖中心','七都广电站','桃源广电站','震泽广电站','平望广电站','横扇广电站'],
      userInfo: {},
      serviceHall: '',
      serviceHallList: [],
      bossType: '',
      bossTypeList: [],
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
      await detail.getOnce({
        size: -1
      }).then((res) => {
        res.records.forEach((obj) => {
          if (obj.serviceHall != null && this.serviceHallList.indexOf(obj.serviceHall) == -1) {
            this.serviceHallList.push(obj.serviceHall)
          }
          window.localStorage.setItem('serviceHallList', JSON.stringify(this.serviceHallList))
          if (obj.bossType != null && this.bossTypeList.indexOf(obj.bossType) == -1) {
            this.bossTypeList.push(obj.bossType)
          }
          window.localStorage.setItem('bossTypeList', JSON.stringify(this.bossTypeList))
        })
      })
    },
    getTableList() {
      this.loading = true
      this.tableData = []
      detail.getOnce({
        size: this.pageSize,
        current: this.currentPage,
        date1: isArray(this.date) ? this.date[0] : '',
        date2: isArray(this.date) ? this.date[1] : '',
        dw1: this.dw1,
        serviceHall: this.serviceHall,
        bossType: this.bossType,
        descs: this.descs,
        ascs: this.ascs,
      }).then((res) => {
        this.tableData = res.records
        this.total = res.total
      })
      .finally(() => {
        this.loading = false
        this.$nextTick(() => {
          this.$refs['once'].doLayout()
        })
      })
    },
    changeTime() {
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
      detail.getOnce({
        size: -1,
        date1: isArray(this.date) ? this.date[0] : '',
        date2: isArray(this.date) ? this.date[1] : '',
        dw1: this.dw1,
        serviceHall: this.serviceHall,
        bossType: this.bossType,
        descs: this.descs,
        ascs: this.ascs,
      }).then((res) => {
        data = res.records
        res.records.forEach(item => {
          item.accTime = item.accTime ? item.accTime.split(' ')[0] : '-'
          item.billTime = item.billTime ? item.billTime.split(' ')[0] : '-'
          item.wirteBillTime = item.wirteBillTime ? item.wirteBillTime.split(' ')[0] : '-'
          item.tradeDate = item.tradeDate ? item.tradeDate.split(' ')[0] : '-'
          item.etlDate = item.etlDate ? item.etlDate.split(' ')[0] : '-'
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
        const excelName = `一次性费用明细`
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
      window.localStorage.setItem('once', JSON.stringify(this.tableHeader))
      this.showScreen = false
      this.$nextTick(() => {
        this.$refs['once'].doLayout()
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
    let t = window.localStorage.getItem('once')
    this.showHeader = t ? JSON.parse(t) : header
    this.tableHeader = t ? JSON.parse(t) : header
    this.computeCheckedHeaders(this.tableHeader)
    this.checkAll =
      Object.keys(this.showHeader).length === Object.keys(header).length
    this.tableHeader = header
    // 用户权限
    this.userInfo = JSON.parse(Cookies.get('user'))
    this.dw1 = this.userInfo.station
    // 下拉列表的缓存
    t = window.localStorage.getItem('serviceHallList')
    this.serviceHallList = t ? JSON.parse(t) : []
    t = window.localStorage.getItem('bossTypeList')
    this.bossTypeList = t ? JSON.parse(t) : []
    if (this.serviceHallList.length == 0 || this.bossTypeList.length == 0) {
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
      & > div {
        width: 25%;
        margin-right: 20px;
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
