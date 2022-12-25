<template>
  <div class="page login-log">
    <common-header title="登录日志"></common-header>
    <div class="content">
      <div class="toolbox">
        <div class="left">
          <el-input
            v-model="keyword"
            style="width: 250px; margin-right: 16px;"
            prefix-icon="el-icon-search"
            placeholder="请输入用户名"
            clearable
            @blur="search"
            @clear="search"
          ></el-input>
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
      </div>
      <div class="table">
        <el-table
          ref="table"
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
            height: '40px',
            fontSize: '14px',
          }"
          @sort-change="sortTable"
        >
          <el-table-column label="用户姓名" prop="usernick" align="center" min-width="120" sortable="custom" />
          <el-table-column label="手机号" prop="username" align="center" min-width="120" sortable="custom" />
          <el-table-column label="登陆操作" prop="info" align="center" min-width="120" sortable="custom" />
          <!-- <el-table-column label="IP" prop="ip" align="center" min-width="180" /> -->
          <el-table-column label="登录状态" prop="status" align="center" min-width="100" />
          <el-table-column label="时间" prop="timestamp" align="center" min-width="160" sortable="custom" />
          <el-table-column label="浏览器" prop="ua" align="center" min-width="800" />
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
</template>

<script>
import CommonHeader from '#/CommonHeader.vue'

import { management } from '@api'
import { isArray } from '@vue/shared'

export default {
  components: {
    CommonHeader,
  },
  data() {
    return {
      keyword: '',
      date: [],
      loading: false,
      tableData: [],
      total: 0,
      pageSize: 20,
      currentPage: 1,
      ascs: '',
      descs: 'timestamp',
    }
  },
  methods: {
    getTableList() {
      management.getLoginLog({
        size: this.pageSize,
        current: this.currentPage,
        usernick: this.keyword,
        date1: isArray(this.date) ? this.date[0] : '',
        date2: isArray(this.date) ? this.date[1] : '',
        descs: this.descs,
        ascs: this.ascs,
      }).then((res) => {
        this.tableData = res.records
        this.tableData.forEach((obj) => {
          if (obj.status === 0) {
            obj.status = '登录成功'
          } else {
            obj.status = '登录失败'
          }
        })
        this.total = res.total
      })
      .finally(() => {
        this.loading = false
        this.$nextTick(() => {
          this.$refs['table'].doLayout()
        })
      })
    },
    search() {
      this.currentPage = 1
      this.getTableList()
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
        this.descs = 'timestamp'
      }
      this.getTableList()
    },
  },
  created() {
    this.date = [this.getDay(-3, '/'), this.getDay(-1, '/')]
    this.getTableList()
  }
}
</script>

<style lang="scss" scoped>
.login-log {
  .toolbox {
    margin-bottom: 20px;
  }
  .table {
    width: 100%;
    height: calc(100% - 90px);
  }
  .pagination {
    float: right;
    margin-top: 20px;
  }
}
</style>