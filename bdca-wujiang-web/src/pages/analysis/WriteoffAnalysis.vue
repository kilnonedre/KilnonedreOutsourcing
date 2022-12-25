<template>
  <div class="page order">
    <common-header title="销账分析"></common-header>
    <div class="content">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane :disabled="tabDisable" label="预销账情况" name="预销账"></el-tab-pane>
        <el-tab-pane :disabled="tabDisable" label="用户月消费额度分布情况" name="月消费"></el-tab-pane>
        <el-tab-pane :disabled="tabDisable" label="一次性费用情况" name="一次性"></el-tab-pane>
        <el-tab-pane :disabled="tabDisable" label="银行代扣情况" name="银行"></el-tab-pane>
      </el-tabs>
      <div class="tab-content">
        <div class="group">
          <el-checkbox-group v-model="checkGroup" @change="handleCheckedGroupChange">
            <el-checkbox v-if="activeName == '银行'" label="日期" />
            <el-checkbox label="月份" />
            <el-checkbox label="中心及广电站" />
            <el-checkbox v-if="activeName == '预销账' || activeName == '月消费'" label="客户类型" />
            <el-checkbox v-else-if="activeName == '一次性'" label="营业厅" />
            <el-checkbox v-else-if="activeName == '银行'" label="代扣机构" />
            <el-checkbox v-if="activeName == '一次性'" label="boss科目名称" />
          </el-checkbox-group>
        </div>
        <div class="toolbox">
          <div class="left">
            <el-date-picker
              v-if="activeName == '银行'"
              v-model="date"
              type="daterange"
              format="YYYY-MM-DD"
              value-format="YYYY/MM/DD"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width: 250px; margin-right: 10px;"
              @change="changeTime"
            />
            <el-date-picker
              v-model="month"
              type="monthrange"
              format="YYYY/MM"
              value-format="YYYY/MM"
              start-placeholder="开始月份"
              end-placeholder="结束月份"
              style="width: 250px; margin-right: 10px;"
              @change="changeTime">
            </el-date-picker>
            <div>
              <el-select
                v-if="activeName != '一次性'"
                v-model="dw1"
                placeholder="中心及广电站"
                clearable
                @change="getTableList(activeName)"
              >
                <el-option v-for="item in stationOptions" :key="item" :label="item" :value="item" />
              </el-select>
              <el-select
                v-else-if="activeName == '一次性'"
                v-model="dw1"
                placeholder="中心及广电站"
                clearable
                @change="getTableList(activeName)"
              >
                <el-option v-for="item in stationOptionsforOnce" :key="item" :label="item" :value="item" />
              </el-select>
            </div>
            <div>
              <el-select
                v-if="activeName == '预销账' || activeName == '月消费'"
                v-model="custType"
                placeholder="客户类型"
                clearable
                style="width: 150px"
                @change="getTableList(activeName)"
              >
                <el-option v-for="item in custTypeList" :key="item" :label="item" :value="item" />
              </el-select>
              <el-select
                v-else-if="activeName == '一次性'"
                v-model="serviceHall"
                placeholder="营业厅"
                clearable
                style="width: 150px"
                @change="getTableList(activeName)"
              >
                <el-option v-for="item in serviceHallList" :key="item" :label="item" :value="item" />
              </el-select>
              <el-select
                v-else-if="activeName == '银行'"
                v-model="bank"
                placeholder="代扣机构"
                clearable
                style="width: 150px"
                @change="getTableList(activeName)"
              >
                <el-option v-for="item in bankList" :key="item" :label="item" :value="item" />
              </el-select>
            </div>
            <div>
              <el-select
                v-if="activeName == '一次性'"
                v-model="bossType"
                placeholder="boss科目名称"
                clearable
                style="width: 150px"
                @change="getTableList(activeName)"
              >
                <el-option v-for="item in bossTypeList" :key="item" :label="item" :value="item" />
              </el-select>
            </div>
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

import { behavior } from '@api'
import { isArray } from '@vue/shared'

import table2excel from '../../plugins/table2excel'

const originGroup = 'dateYmd,month,dw1,custType,serviceHall,bank,bossType'

const GROUP = {
  '日期': 'dateYmd',
  '月份': 'month',
  '中心及广电站': 'dw1',
  '客户类型': 'custType',
  '营业厅': 'serviceHall',
  '代扣机构': 'bank',
  'boss科目名称': 'bossType',
}

const header = {
  month: {
    label: '月份',
    width: '150',
    sort: true
  },
  dw1: {
    label: '中心及广电站',
    width: '180',
    sort: true
  },
  custType: {
    label: '客户类型',
    width: '120',
    sort: true
  },
  servicePay: {
    label: '付费节目业务',
    width: '150',
    sort: true
  },
  serviceHdOrder: {
    label: '互动点播业务',
    width: '150',
    sort: true
  },
  serviceHdBasic: {
    label: '互动基本业务',
    width: '150',
    sort: true
  },
  serviceKd: {
    label: '宽带业务',
    width: '150',
    sort: true
  },
  serviceBasic: {
    label: '数字基本业务',
    width: '150',
    sort: true
  },
  serviceIncrement: {
    label: '增值业务',
    width: '150',
    sort: true
  },
  sum: {
    label: '总计',
    width: '180',
    sort: true
  },
  fenduan1: {
    label: '0-24',
    width: '150',
    sort: true
  },
  fenduan2: {
    label: '24-50',
    width: '200',
    sort: true
  },
  fenduan3: {
    label: '50-100',
    width: '200',
    sort: true
  },
  fenduan4: {
    label: '100-200',
    width: '200',
    sort: true
  },
  fenduan5: {
    label: '200-500',
    width: '200',
    sort: true
  },
  fenduan6: {
    label: '500及以上',
    width: '200',
    sort: true
  },
  serviceHall: {
    label: '营业厅',
    width: '150',
    sort: true
  },
  bossType: {
    label: 'boss科目名称',
    width: '200',
    sort: true
  },
  fee: {
    label: '费用',
    width: '200',
    sort: true
  },
  bank: {
    label: '代扣机构',
    width: '150',
    sort: true
  },
  dateYmd: {
    label: '日期',
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
      activeName: '预销账',
      tabDisable: false,
      loading: true,
      downLoading: false,
      checkGroup: ['月份'],
      group: 'month',
      date: '',
      month: '',
      dw1: '',
      stationOptions: ['开发区广电中心','汾湖广电中心','高新区广电中心','吴江东太湖中心','七都广电站','桃源广电站','震泽广电站','平望广电站','横扇广电站'],
      stationOptionsforOnce: [],
      custType: '',
      custTypeList: ['公众客户', '普通商业客户','合同商业客户','其他'],
      serviceHall: '',
      serviceHallList: [],
      caller1: false,
      bank: '',
      bankList: [],
      bossType: '',
      bossTypeList: [],
      caller2: false,
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
      if (activeName == '预销账') {
        behavior.getXiaozhangPre({
          size: this.pageSize,
          current: this.currentPage,
          month1: isArray(this.month) ? this.month[0] : '',
          month2: isArray(this.month) ? this.month[1] : '',
          dw1: this.dw1,
          custType: this.custType,
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
          this.tableData = res.records
          this.tableData.forEach(item => {
            if (item['fee'] != null) {
              item['fee'] = item['fee'].substr(0, 10)
            }
            if (item['servicePay'] != null) {
              item['servicePay'] = item['servicePay'].toFixed(2)
            }
            if (item['serviceHdOrder'] != null) {
              item['serviceHdOrder'] = item['serviceHdOrder'].toFixed(2)
            }
            if (item['serviceHdBasic'] != null) {
              item['serviceHdBasic'] = item['serviceHdBasic'].toFixed(2)
            }
            if (item['serviceKd'] != null) {
              item['serviceKd'] = item['serviceKd'].toFixed(2)
            }
            if (item['serviceBasic'] != null) {
              item['serviceBasic'] = item['serviceBasic'].toFixed(2)
            }
            if (item['serviceIncrement'] != null) {
              item['serviceIncrement'] = item['serviceIncrement'].toFixed(2)
            }
            if (item['sum'] != null) {
              item['sum'] = item['sum'].toFixed(2)
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
      } else if (activeName == '月消费') {
        behavior.getXiaozhangBillDistribute({
          size: this.pageSize,
          current: this.currentPage,
          month1: isArray(this.month) ? this.month[0] : '',
          month2: isArray(this.month) ? this.month[1] : '',
          dw1: this.dw1,
          custType: this.custType,
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
      } else if (activeName == '一次性') {
        behavior.getXiaozhangFin2({
          size: this.pageSize,
          current: this.currentPage,
          month1: isArray(this.month) ? this.month[0] : '',
          month2: isArray(this.month) ? this.month[1] : '',
          dw1: this.dw1,
          serviceHall: this.serviceHall,
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
          this.tableData = res.records
          this.tableData.forEach(item => {
            if (item['fee'] != null) {
              item['fee'] = item['fee'].toFixed(2)
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
          behavior.getXiaozhangFin2({
            size: -1,
            groupBy: 'month,dw1,serviceHall,bossType',
          }).then((res) => {
            if (res.records.length != 0) {
              res.records.forEach((obj) => {
                if (obj.dw1 != null && this.stationOptionsforOnce.indexOf(obj.dw1) == -1) {
                  this.stationOptionsforOnce.push(obj.dw1)
                }
                if (obj.serviceHall != null && this.serviceHallList.indexOf(obj.serviceHall) == -1) {
                  this.serviceHallList.push(obj.serviceHall)
                }
                if (obj.bossType != null && this.bossTypeList.indexOf(obj.bossType) == -1) {
                  this.bossTypeList.push(obj.bossType)
                }
              })
              this.caller1 = true
            }
          })
        }
      } else if (activeName == '银行') {
        behavior.getXiaozhangBankWithhold({
          size: this.pageSize,
          current: this.currentPage,
          date1: isArray(this.date) ? this.date[0] : '',
          date2: isArray(this.date) ? this.date[1] : '',
          month1: isArray(this.month) ? this.month[0] : '',
          month2: isArray(this.month) ? this.month[1] : '',
          dw1: this.dw1,
          bank: this.bank,
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
          this.tableData = res.records
          this.tableData.forEach(item => {
            if (item['dateYmd'] != null) {
              item['dateYmd'] = item['dateYmd'].substr(0, 10)
            }
            if (item['fee'] != null) {
              item['fee'] = item['fee'].toFixed(2)
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
        if (!this.caller2) {
          behavior.getXiaozhangBankWithhold({
            size: -1,
            groupBy: 'month,dw1,bank',
          }).then((res) => {
            if (res.records.length != 0) {
              res.records.forEach((obj) => {
                if (obj.bank != null && this.bankList.indexOf(obj.bank) == -1) {
                  this.bankList.push(obj.bank)
                }
              })
              this.caller2 = true
            }
          })
        }
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
    this.month = [this.getMonth(), this.getMonth()]
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
