<template>
  <div class="page television">
    <common-header title="数字电视客户变化明细"></common-header>
    <div class="content">
      <div class="toolbox">
        <div class="left">
          <span>数据日期：</span>
          <div class="date-pick">
            <el-date-picker
              v-model="date"
              type="daterange"
              placeholder="选择日期"
              format="YYYY-MM-DD"
              value-format="YYYY/MM/DD"
              @change="changeTime"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            />
          </div>
          <div class="cascader">
            <el-cascader
              v-model="station_grid"
              style="width: 300px"
              :options="stationOptions"
              :props="{ checkStrictly: userInfo.grade == '网格员' ? false : true }"
              @change="change"
              placeholder="中心及广电站"
              :clearable="userInfo.grade == '管理员'"
              filterable
            >
            </el-cascader>
          </div>
          <div>
            <el-select v-model="type" clearable filterable placeholder="客户标识" @change="changeType">
              <el-option
                v-for="item in typeList"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </div>
        </div>
        <div class="right">
          <el-button type="primary" @click="onExport" :loading="downLoading"
            >导出数据</el-button
          >
        </div>
      </div>
      <div class="table">
        <el-tooltip effect="dark" content="筛选表格列" placement="top">
          <img @click="clickScreen" class="icon-screen" src="../../assets/img/icon_screen.png" alt="">
        </el-tooltip>
        <transition name="el-zoom-in-top">
          <div class="screen-wrap" v-show="showScreen">
          <el-checkbox v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="checkedHeaders" @change="handleCheckedHeaderChange">
            <el-checkbox v-for="(header, index) in allHeader" :label="index" :key="index">{{header.label}}</el-checkbox>
          </el-checkbox-group>
           <el-button @click="cancel" style="margin-top: 20px; margin-right: 20px;" size="small">取消</el-button>
            <el-button @click="confirm" style="margin-top: 20px; margin-right: 20px;" type="primary" size="small">确定</el-button>
          </div>
        </transition>
        <el-table
          ref="television"
          id="table"
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
          @sort-change="sortTable"
        >
          <el-table-column
            v-for="(item, index) in tableHeader"
            :min-width="item.width ? item.width + '' : '100'"
            :fixed="
              index === 'dw1' || index === 'custName'
            "
            fit
            align="center"
            sortable="custom"
            :prop="index"
            :label="item.label"
          >
            <template #default="scope">
              <span v-if="index === 'payType'">{{ scope.row[index] !== null &&
                scope.row[index] !== undefined &&
                scope.row[index] !== '' && !!payTypeOptions[scope.row[index] - 1].label ? payTypeOptions[scope.row[index] - 1].label : '-'}}</span>
              <span v-else-if="index === 'dateYmd'">{{!!scope.row[index] ? scope.row[index].split(' ')[0] : '-'}}</span>
              <span v-else-if="index === 'restBalance'">{{ scope.row[index] == null || scope.row[index] == undefined ? '-' : scope.row[index]/100 }}</span><span v-else-if="index === 'restBalance'">{{ !!scope.row[index] ? scope.row[index]/100 : '-' }}</span>
              <span v-else>{{!!scope.row[index] ? scope.row[index] : '-'}}</span>
            </template>
          </el-table-column>
          <template #empty>
            <div style="margin-top: 5%">暂无数据</div>
          </template>
        </el-table>
      </div>
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
    <add-subscription ref="subscription" :station="station" :gridName="gridName"></add-subscription>
  </div>
</template>

<script>
import CommonHeader from '#/CommonHeader.vue'
import AddSubscription from '#/detail/AddSubscription.vue'

import { detail } from '@api'
import { isArray } from '@vue/shared'

import table2excel from '../../plugins/table2excel'

import Cookies from 'js-cookie'


const header = {
  dw1: {
    label: '中心及广电站',
    width: '220',
  },
  dw2: {
    label: '二级机构',
    width: '200',
  },
  dateYmd: {
    label: '统计日期',
    width: '180',
  },
  custCode: {
    label: '客户证号',
    width: '200',
  },
  custName: {
    label: '客户姓名',
    width: '200',
  },
  custTag: {
    label: '客户标识',
    width: '120',
  },
  custType: {
    label: '客户类型',
    width: '120',
  },
  regionId: {
    label: '区域ID',
    width: '220',
  },
  regionName1: {
    label: '镇/街道',
    width: '180',
  },
  regionName2: {
    label: '村/社区',
    width: '180',
  },
  regionName3: {
    label: '小区',
    width: '180',
  },
  loudong: {
    label: '楼栋',
    width: '180',
  },
  doorDesc: {
    label: '门牌',
    width: '180',
  },
  mobile1: {
    label: '移动电话1',
    width: '210',
  },
  mobile2: {
    label: '移动电话2',
    width: '210',
  },
  phone1: {
    label: '电话1',
    width: '210',
  },
  phone2: {
    label: '电话2',
    width: '210',
  },
  zt: {
    label: '状态',
    width: '80',
  },
  restBalance: {
    label: '当前余额(元)',
    width: '140',
  },
  payType: {
    label: '支付方式',
    width: '120',
  },
  gridName: {
    label: '所属网格',
    width: '200',
  },
  gridId: {
    label: '所属网格ID',
    width: '200',
  },
  doneDate: {
    label: '客户状态变化时间',
    width: '200'
  },
  createDate: {
    label: '客户创建日期',
    width: '200'
  }
}
const checkedHeaders = () => {
  let arr = []
  for(let i in header) {
    arr.push(i)
  }
  return arr
}
export default {
  components: {
    CommonHeader,
    AddSubscription
  },
  data() {
    return {
      loading: true,
      tableData: [],
      allHeader: header,
      tableHeader: [],
      showHeader: [],
      downLoading: false,
      content: '',
      station_grid: [],
      station: '',
      gridName: '',
      stationOptions: [],
      payTypeOptions: [
        {
          label: '现金代扣',
          value: '1',
        },
        {
          label: '支付宝',
          value: '2',
        },
        {
          label: '银行代扣',
          value: '3',
        },
      ],
      date: [],
      currentPage: 1,
      total: 1,
      pageSize: 100,
      ascs: '',
      descs: '',
      showScreen: false,
      checkAll: true,
      checkedHeaders: [],
      typeList: ['流失客户', '回流客户', '新客户'],
      type: '',
      userInfo: {},
    }
  },
  methods: {
    changeTime(e) {
      this.getTableList()
    },
    getTableList() {
      this.loading = true
      this.tableData = []
      detail
        .getTelevision({
          date1: isArray(this.date) ? this.date[0] : '',
          date2: isArray(this.date) ? this.date[1] : '',
          dw1: this.station,
          gridName: this.gridName,
          custTag: this.type,
          size: this.pageSize,
          current: this.currentPage,
          descs: this.descs,
          ascs: this.ascs
        })
        .then((res) => {
          this.tableData = res.records
          this.total = res.total
        })
        .finally(() => {
          this.loading = false
          this.$nextTick(() => {
            this.$refs['television'].doLayout()
          })
        })
    },
    computeCheckedHeaders(data) {
      let arr = []
      for(let i in data) {
        arr.push(i)
      }
      this.checkedHeaders = arr
      return arr
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
      detail
        .getTelevision({
          date1: isArray(this.date) ? this.date[0] : '',
          date2: isArray(this.date) ? this.date[1] : '',
          dw1: this.station,
          gridName: this.gridName,
          custTag: this.type,
          size: -1,
          descs: this.descs,
          ascs: this.ascs
        })
        .then((res) => {
          res.records.forEach(item => {
            item.restBalance = item.restBalance ? item.restBalance / 100 : 0
            item.payType = item.payType ? this.payTypeOptions[item.payType - 1].label : ''
          })
          data = res.records
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
          const excelName = `数字电视客户变化明细`
          table2excel(column, data, excelName)
        }).finally(() => {
          this.downLoading = false
        })
    },
    handleCheckAllChange(val) {
      this.checkedHeaders = val ? this.computeCheckedHeaders(header) : [];
      this.showHeader = val ? header : [];
    },
    handleCheckedHeaderChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === Object.keys(header).length;
      let t = {}
      value.forEach(i => {
        t[i] = this.allHeader[i]
      })
      this.showHeader = t
    },
    clickScreen() {
      this.showScreen = true
    },
    confirm() {
      this.tableHeader = this.showHeader
      window.localStorage.setItem('television', JSON.stringify(this.tableHeader))
      this.showScreen = false
      this.$nextTick(() => {
        this.$refs['television'].doLayout()
      })
    },
    cancel() {
      this.showHeader = this.tableHeader
      this.showScreen = false
      this.checkAll = Object.keys(this.tableHeader).length === Object.keys(this.computeCheckedHeaders(this.tableHeader)).length;
    },
    addSubscription() {
      this.$refs.subscription.show = true
    },
    change(e) {
      this.station = e ? e[0] : ''
      this.gridName = e && e.length > 1 ? e[1] : ''
      this.getTableList()
    },
    changeType() {
      this.currentPage = 1
      this.getTableList()
    }
  },
  created() {
    this.date = [this.getDay(-1, '/'), this.getDay(-1, '/')]
    let t = window.localStorage.getItem('television')
    this.showHeader = t ? JSON.parse(t) : header
    this.tableHeader = t ? JSON.parse(t) : header
    this.computeCheckedHeaders(this.tableHeader)
    this.checkAll = Object.keys(this.showHeader).length === Object.keys(header).length
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
    this.getTableList()
  },
}
</script>

<style lang="scss" scoped>
.content {
  .toolbox {
    width: 100%;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left {
      display: flex;
      align-items: center;
      justify-content: space-between;
      >span {
        white-space: nowrap;
      }
      .cascader,
      .date-pick {
        margin-right: 20px;
      }
    }
  }
  .table {
    width: 100%;
    height: calc(100% - 90px);
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
  .blod {
    font-size: 16px;
    font-weight: 700;
  }
  .pagination {
    float: right;
    margin-top: 20px;
  }
}
</style>
