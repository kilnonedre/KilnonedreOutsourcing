<template>
  <div class="page arrearage">
    <common-header title="欠费用户明细"></common-header>
    <div class="content">
      <div class="toolbox">
        <div class="left">
          <div class="search-range">
            <span>账户余额：</span>
            <el-input
              v-model="leftRange"
              placeholder="最小值"
              @change="inputNumber($event, 'left')"
            ></el-input>
            <span style="margin: 0 10px">~</span>
            <el-input
              v-model="rightRange"
              placeholder="最大值"
              @change="inputNumber($event, 'right')"
            ></el-input>
          </div>
          <div>
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
            <el-select
              clearable
              @change="getTableList"
              v-model="client"
              placeholder="客户类型"
            >
              <el-option
                v-for="item in clientOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div>
            <el-select
              clearable
              @change="getTableList"
              v-model="tag"
              placeholder="客户标识"
            >
              <el-option
                v-for="item in clientTags"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div>
            <el-select
              clearable
              @change="getTableList"
              v-model="payType"
              placeholder="代扣类型"
            >
              <el-option
                v-for="item in payTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </div>
        <div class="right">
          <el-button type="primary" @click="onExport" :loading="downLoading">导出数据</el-button>
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
                >{{ header.label }}</el-checkbox
              >
            </el-checkbox-group>
            <el-button
              @click="cancel"
              style="margin-top: 20px; margin-right: 20px"
              size="small">
              取消
            </el-button>
            <el-button
              @click="confirm"
              style="margin-top: 20px; margin-right: 20px"
              type="primary"
              size="small">
              确定
            </el-button >
          </div>
        </transition>
        <el-table
          ref="arrearage"
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
            width="auto"
            :min-width="item.width || 100"
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
              <span v-if="index === 'payType'">{{
                scope.row[index] !== null &&
                scope.row[index] !== undefined &&
                scope.row[index] !== '' &&
                !!payTypeOptions[scope.row[index] - 1].label
                  ? payTypeOptions[scope.row[index] - 1].label
                  : '-'
              }}</span>
              <span v-else-if="index === 'restBalance'">{{
                scope.row[index] == null || scope.row[index] == undefined
                  ? '-'
                  : scope.row[index] / 100
              }}</span>
              <span v-else>{{
                !!scope.row[index] ? scope.row[index] : '-'
              }}</span>
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
          :page-sizes="[100, 200, 500, 1000]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import CommonHeader from '#/CommonHeader.vue'

import { detail } from '@api'

import table2excel from '../../plugins/table2excel'

import Cookies from 'js-cookie'
import store from '../../store'

const header = {
  dw1: {
    label: '中心及广电站',
    width: '210',
  },
  gridName: {
    label: '所属网格',
    width: '200',
  },
  custCode: {
    label: '客户证号',
    width: '180',
  },
  custName: {
    label: '客户姓名',
    width: '200',
  },
  custType: {
    label: '客户类型',
    width: '120',
  },
  custTag: {
    label: '客户标识',
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
}
export default {
  components: {
    CommonHeader,
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
      restBalance: '',
      station: '',
      gridName: '',
      station_grid: [],
      stationOptions: [],
      client: '',
      clientOptions: [
        {
          label: '公众客户',
          value: '公众客户',
        },
        {
          label: '普通商业客户',
          value: '普通商业客户',
        },
        {
          label: '合同商业客户',
          value: '合同商业客户',
        },
      ],
      tag: '',
      clientTags: [
        {
          label: '代扣待催缴',
          value: '代扣待催缴',
        },
        {
          label: '现金待催缴',
          value: '现金待催缴',
        },
        {
          label: '现金余额不足',
          value: '现金余额不足',
        },
      ],
      payType: '',
      payTypeOptions: [
        {
          label: '现金',
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
      leftRange: '',
      rightRange: '',
      currentPage: 1,
      total: 1,
      pageSize: 100,
      ascs: 'dw1,gridName',
      descs: '',
      showScreen: false,
      checkAll: true,
      checkedHeaders: [],
      userInfo: {},
    }
  },
  methods: {
    getTableList() {
      this.loading = true
      this.tableData = []
      let leftNum = ''
      let rightNum = ''
      if (this.leftRange !== '') {
        leftNum = parseFloat((Number(this.leftRange) * 100).toFixed(10))  // 解决 js 浮点运算的问题
      }
      if (this.rightRange !== '') {
        rightNum = parseFloat((Number(this.rightRange) * 100).toFixed(10))  // 解决 js 浮点运算的问题
      }
      detail
        .getArrearage({
          dw1: this.station,
          gridName: this.gridName,
          custType: this.client,
          custTag: this.tag,
          payType: this.payType,
          balance1: leftNum,
          balance2: rightNum,
          size: this.pageSize,
          current: this.currentPage,
          descs: this.descs,
          ascs: this.ascs,
        })
        .then((res) => {
          this.tableData = res.records
          this.total = res.total
        })
        .finally(() => {
          this.loading = false
          this.$nextTick(() => {
            this.$refs['arrearage'].doLayout()
          })
        })
    },
    inputNumber(e, num) {
      const pattern = /^(\-|\+)?\d+(\.\d+)?$/
      if (e == '' || pattern.test(e)) {
        if (num == 'left') {
          this.leftRange = e
        } else {
          this.rightRange = e
        }
        this.getTableList()
      } else {
        if (num == 'left') {
          this.leftRange = ''
        } else {
          this.rightRange = ''
        }
        this.$message.error('请输入数字！')
      }
    },
    change(e) {
      this.station = e ? e[0] : ''
      this.gridName = e && e.length > 1 ? e[1] : ''
      this.getTableList()
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
      if (order == 'ascending') {
        this.ascs = prop
        this.descs = ''
      } else if (order == 'descending') {
        this.ascs = ''
        this.descs = prop
      } else {
        this.ascs = 'dw1,gridName'
        this.descs = ''
      }
      this.getTableList()
    },
    onExport() {
      let data = []
      this.downLoading = true
      detail
        .getArrearage({
          dw1: this.station,
          gridName: this.gridName,
          custType: this.client,
          payType: this.payType,
          custTag: this.tag,
          balance1: this.leftRange ? Number(this.leftRange) * 100 : '',
          balance2: this.rightRange ? Number(this.rightRange) * 100 : '',
          size: -1,
          descs: this.descs,
          ascs: this.ascs,
        })
        .then((res) => {
          data = res.records
          res.records.forEach(item => {
            item.restBalance = item.restBalance ? item.restBalance / 100 : 0
            item.payType = item.payType ? this.payTypeOptions[item.payType - 1].label : ''
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
          const excelName = `欠费用户明细`
          table2excel(column, data, excelName)
        }).finally(() => {
          this.downLoading = false
        })
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
    clickScreen() {
      this.showScreen = true
    },
    confirm() {
      this.tableHeader = this.showHeader
      window.localStorage.setItem('arrearage', JSON.stringify(this.tableHeader))
      this.showScreen = false
      this.$nextTick(() => {
        this.$refs['arrearage'].doLayout()
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
    let t = window.localStorage.getItem('arrearage')
    this.showHeader = t ? JSON.parse(t) : header
    this.tableHeader = t ? JSON.parse(t) : header
    this.computeCheckedHeaders(this.tableHeader)
    this.checkAll =
      Object.keys(this.showHeader).length === Object.keys(header).length
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
      > div {
        margin-right: 20px;
      }
      .search-range {
        width: 300px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 20px;
        flex-shrink: 0;
        > span {
          white-space: nowrap;
        }
      }
    }
  }
  .table {
    width: 100%;
    height: calc(100% - 90px);
    // border: 1px solid black;
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
