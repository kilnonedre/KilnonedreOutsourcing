<template>
  <div class="page subscribe">
    <common-header title="光纤宽带客户变化消息"></common-header>
    <div class="content">
      <div class="toolbox">
        <div class="left">
          <el-input style="margin-right: 10px; width: 300px;" clearable prefix-icon="el-icon-search" v-model="keyword" placeholder="请输入企业微信成员ID" @blur="search" @clear="search"></el-input>
          <el-cascader
            v-model="station_grid"
            style="width: 300px"
            :options="stationOptions"
            :props="{ checkStrictly: true }"
            @change="changeStation"
            placeholder="中心及广电站"
            clearable
            filterable
          >
          </el-cascader>
        </div>
        <div class="right">
          <el-button :disabled="btnLoading" type="primary" @click="addSubscription">添加订阅</el-button>
        </div>
      </div>
      <div class="table">
        <el-table
          ref="subscribe"
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
          <el-table-column
            sortable="custom"
            label="账号"
            prop="username"
            align="center"
            min-width="180"
            :fit="true"
          />
          <el-table-column
            sortable="custom"
            label="姓名"
            prop="usernick"
            align="center"
            min-width="180"
            :fit="true"
          />
          <el-table-column
            sortable="custom"
            label="企业微信ID"
            prop="touser"
            align="center"
            min-width="180"
            :fit="true"
          />
          <el-table-column
            sortable="custom"
            label="职级"
            prop="grade"
            align="center"
            min-width="180"
            :fit="true"
          />
          <el-table-column
            sortable="custom"
            label="所属广电站"
            align="center"
            prop="station"
            min-width="180"
            :fit="true"
          />
          <el-table-column
            sortable="custom"
            label="所属网格"
            prop="grid"
            align="center"
            min-width="180"
            :fit="true"
          />
          <el-table-column
            sortable="custom"
            label="创建时间"
            prop="created"
            align="center"
            min-width="180"
            :fit="true"
          />
          
          <el-table-column
            label="操作"
            prop="created"
            align="center"
            min-width="120"
            :fit="true"
          >
            <template #default="scope">
              <el-button
                type="text"
                @click="cancle(scope.$index, scope.row)"
                >取消订阅</el-button
              >
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
          :page-sizes="[20, 30, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
    <add-subscription ref="subscription" @over="update"></add-subscription>
  </div>
</template>

<script>
import CommonHeader from '#/CommonHeader.vue'
import AddSubscription from '#/detail/AddSubscription.vue'

import { subscribe } from '@api'

export default {
  components: {
    CommonHeader,
    AddSubscription
  },
  data() {
    return {
      loading: false,
      btnLoading: false,
      tableData: [],
      total: 0,
      pageSize: 20,
      currentPage: 1,
      keyword: '',
      station: '',
      gridName: '',
      station_grid: [],
      stationOptions: window.config.stationOptions,
      ascs: '',
      descs: 'created',
    }
  },
  computed: {
    computeInfo(row) {
      return function(row) {
        let info = JSON.parse(row.conditions)
        return  (info.gridName ? info.gridName + ' / ' : '') + (info.dw1 ? info.dw1 : '全部')
      }
    }
  },
  methods: {
    getTableList() {
      subscribe.getBroadband({
        size: this.pageSize,
        current: this.currentPage,
        descs: this.descs,
        ascs: this.ascs,
        touser: this.keyword,
        station: this.station,
        grid: this.gridName
      }).then((res) => {
        this.tableData = res.records
        this.total = res.total
      })
      .finally(() => {
        this.loading = false
        this.$nextTick(() => {
          this.$refs['subscribe'].doLayout()
        })
      })
    },
    search() {
      this.currentPage = 1
      this.getTableList()
    },
    changeStation(e) {
      this.station = e ? e[0] : ''
      this.gridName = e && e.length > 1 ? e[1] : ''
      this.getTableList()
    },
    cancle(index, row) {
      this.$confirm(`确定取消该订阅?`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          this.loading = true
          subscribe.delBroadband(row.id).then(res => {
            this.$message.success('已取消！')
          }).finally(() => {
            this.getTableList()
            this.loading = false
          })
        })
        .finally(() => {});
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
        this.descs = 'created'
      }
      this.getTableList()
    },
    addSubscription() {
      this.$refs.subscription.show = true
      this.btnLoading = true
    },
    update() {
      this.btnLoading = false
      this.getTableList()
    }
  },
  created() {
    this.getTableList()
  }
}
</script>

<style lang="scss" scoped>
.subscribe {
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
