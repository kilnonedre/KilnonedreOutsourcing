<template>
  <div class="page annual">
    <common-header title="KPI年度目标"></common-header>
   <div class="content">
      <div class="toolbox">
        <div class="left">
          <el-date-picker
            v-model="date"
            type="year"
            placeholder="选择年份"
            format="YYYY"
            value-format="YYYY"
            :clearable="false"
            @change="changeTime"
          />
        </div>
        <div class="right">
          <el-button
            v-if="userInfo.grade == '管理员'"
            type="success"
            plain
            @click="editData"
            >编辑数据</el-button
          >
          <el-button
            type="primary"
            @click="onExport"
            :loading="downLoading"
            >导出数据</el-button
          >
        </div>
      </div>
      <div class="table">
        <el-table
          ref="annual"
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
        >
          <template v-for="(item, index) in tableHeader" :key="item">
            <el-table-column
              :label="item"
              align="center"
              min-width="180"
              :fit="true"
              :fixed="index === 0"
            >
              <template #default="scope">
                <span
                  :class="index === 0 ? 'blod' : ''"
                  v-if="typeof tableData[0][item] === 'string' ? item : ''"
                >
                  {{ !!scope.row[item] ? scope.row[item] : '-' }}
                </span>
                <el-table-column
                  v-else
                  v-for="subitem in getProp(item)"
                  :key="subitem"
                  :label="subitem"
                  align="center"
                  min-width="90"
                  :fit="true"
                >
                  <template #default="scope">
                    {{ !!scope.row[item][subitem] ? scope.row[item][subitem] : '-' }}
                  </template>
                </el-table-column>
              </template>
            </el-table-column>
          </template>
          <template #empty>
            <div style="margin-top: 5%">暂无数据</div>
          </template>
        </el-table>
      </div>
    </div>
    <edit-data ref="editData" @update="getTableList"></edit-data>
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
    EditData
  },
  data() {
    return {
      date: new Date().getFullYear() + '',
      loading: true,
      tableData: [],
      tableHeader: [],
      downLoading: false,
      id: '',
      content: '',
      userInfo: JSON.parse(Cookies.get('user'))
    }
  },
  created(){
    this.getTableList()
  },
  methods: {
    getTableList() {
      this.loading = true
      this.id = ''
      this.tableData = []
      this.tableHeader = []
      kpi
        .getAnnual(this.date)
        .then((res) => {
          if (res.records.length > 0) {
            this.id = res.records[0].id
            this.content = res.records[0].content
            this.tableData = JSON.parse(res.records[0].content)
            this.tableHeader = this.tableData.length ? Object.keys(this.tableData[0]) : []
            console.log(this.tableHeader);
            // console.log(tableHeader);
            this.tableData.splice(1, 0)
          }
        })
        .finally(() => {
          this.loading = false
          this.$nextTick(() => {
            this.$refs['annual'].doLayout()
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
    changeTime() {
      this.getTableList()
    },
    getHeader(item) {
      console.log(item)
    },
    getProp(item) {
      let res
      if (typeof this.tableData[0][item] === 'string') {
        res = ''
      } else {
        res = Object.keys(this.tableData[0][item])
      }
      return res
    },
    onExport() {
      let date = ''
      let header = []
      let data = []
      this.downLoading = true
      date = this.date
      header = this.tableHeader
      data = this.tableData
      let column = []
      let t
      for (let i = 0; i < header.length; i++) {
        if (typeof data[0][header[i]] === 'string') {
          t = {
            title: header[i],
            key: header[i],
            type: 'text',
          }
        } else {
          let childHeader = Object.keys(data[0][header[i]])
          let children = []
          for (let k = 0; k < childHeader.length; k++) {
            children.push({
              title: childHeader[k],
              key: childHeader[k],
              type: 'text',
            })
          }
          t = {
            title: header[i],
            children: children,
          }
        }
        column.push(t)
      }
      /** column数据的说明 */
      // 1.title为列名
      // 2.key为data数据每个对象对应的key
      // 3.若为图片格式, 需要加type为image的说明,并且可以设置图片的宽高
      const excelName = `${date}-KPI年度目标`
      table2excel(column, data, excelName)
      this.downLoading = false
    },
    editData() {
      this.$refs.editData.show = true
      this.$refs.editData.id = this.id
      this.$refs.editData.kpi = 'annual'
      this.$refs.editData.date = this.date
      this.$refs.editData.content = JSON.stringify(this.tableData, null, 4) || this.content
    }
  },
  created() {
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
  }
  .table {
    width: 100%;
    height: calc(100% - 70px);
  }
  .blod {
    font-size: 16px;
    font-weight: 700;
  }
}
</style>
