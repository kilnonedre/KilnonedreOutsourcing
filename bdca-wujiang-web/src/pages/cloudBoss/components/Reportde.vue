<template>
  <div>
    <div class="mianter">
      <div class="left">
        <el-row>
          <el-col :span="3">
            <div class="leftleft">统计时间：{{ ttime }}</div>
          </el-col>
          <el-col :span="4">
            <div class="left-left">
              <el-select
                v-model="STATION"
                placeholder="归属发展单位"
                @change="searchChange"
              >
                <el-option
                  v-for="item in options"
                  :key="item"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </div>
          </el-col>
        </el-row>
      </div>
      <!-- <div class="right">
        <el-button type="primary" @click="onExport" :loading="downLoading">
          导出数据
        </el-button>
      </div> -->
    </div>
    <div class="table">
      <el-table
        :data="tableData"
        border
        stripe
        height="720"
        v-loading="loading"
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
        style="width: 100%;"
      >
        <el-table-column
          prop="station"
          label="归属发展单位"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="staff_name"
          label="员工"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="fazhan"
          sortable
          label="累计发展"
          align="center"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="fazhan_month"
          sortable
          label="当月发展"
        ></el-table-column>
        <el-table-column
          align="center"
          sortable
          prop="fazhan_today"
          label="当日发展"
        ></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { media } from '@api'
// import table2excel from '@/plugins/table2excel'
export default {
  data() {
    return {
      tableData: [],
      options: [],
      value: '',
      tableData: [],
      STATION: '',
      downLoading: false,
      type: 2,
      size:1000,
      ttime: '',
      loading: false,
      sequentialProgress: '',
    }
  },
  created() {
    this.getColumnSelectorget()
    this.getColumnSelectordrsta()
  },
  methods: {
    async getColumnSelectorget(val) {
      try {
        this.loading = true
        media.getColumnSelectord2r(this.type,this.size,val).then((res) => {
          console.log(res)
          this.ttime = res.updateTime
          this.sequentialProgress = res.sequentialProgress
          this.tableData = res.data
          console.log(this.tableData);
          // res.data.forEach((item) => {
          //   // console.log(item.STATION)
          //   this.options.push(item.STATION)
          //   // this.offerNameP=item.STATION
          // })
          this.loading = false
        })
      } catch (error) {
        console.log(error)
        this.loading = false
      }
    },
    //   async getColumnSe1lectorget(val) {
    //   try {
    //     this.loading = true
    //     media.getColumnSelectord2r(this.type,val).then((res) => {
    //       console.log(res)
    //       this.ttime = res.updateTime
    //       this.sequentialProgress = res.sequentialProgress
    //       this.tableData = res.data
    //       console.log(this.tableData);
    //       // res.data.forEach((item) => {
    //       //   // console.log(item.STATION)
    //       //   this.options.push(item.STATION)
    //       //   // this.offerNameP=item.STATION
    //       // })
    //       this.loading = false
    //     })
    //   } catch (error) {
    //     console.log(error)
    //     this.loading = false
    //   }
    // },
    getColumnSelectordrsta() {
      try {
        media.getColumnSelectordrsta().then((res) => {
          console.log(res)
          this.options = res
        })
      } catch (error) {
        console.log(error)
      }
    },
    searchChange(val) {
      console.log(val)
      this.STATION = val
      this.getColumnSelectorget(val)
    },
  },
}
</script>

<style lang="scss" scope>
.mianter {
  margin: 0 0 20px 0;
}
.right {
  margin-left: 92%;
  margin-top: -40px;
}
.leftleft {
  margin: 5px 0 0 0;
}
// .table {
//   width: 100%;
//   height: calc(100% - 240px);
// }
</style>
