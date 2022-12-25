<template>
  <div>
    <div class="mianter">
      <div class="left">统计时间：{{ ttime }}</div>
      <!-- <div class="right">
        <el-button type="primary" @click="onExport" :loading="downLoading">
          导出数据
        </el-button>
      </div> -->
    </div>
    <el-table
      v-loading="loading"
      :data="tableData"
      border
      stripe
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
        label="单位"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="goal"
        label="目标"
        align="center"
      ></el-table-column>
      <el-table-column label="固移融合" align="center">
        <el-table-column
          align="center"
          prop="gu_yi_today"
          label="固移融合"
        ></el-table-column>
        <el-table-column
          label="单移"
          align="center"
          prop="dan_yi_today"
        ></el-table-column>
        <el-table-column
          label="合计"
          align="center"
          prop="today_sum"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="总发展" align="center" width="90">
        <el-table-column
          align="center"
          prop="gu_yi"
          label="固移融合"
        ></el-table-column>
        <el-table-column
          label="单移"
          prop="dan_yi"
          align="center"
        ></el-table-column>
        <el-table-column
          label="合计"
          prop="sum"
          align="center"
        ></el-table-column>
        <el-table-column label="完成率" prop="complete_pro" align="center">
          <template v-slot="{ row }">
            <div>{{ Math.round(row.complete_pro * 100) }}%</div>
          </template>
        </el-table-column>
        <el-table-column label="固移融合占比" prop="gu_yi_pro" align="center">
          <template v-slot="{ row }">
            <div>{{ Math.round(row.gu_yi_pro * 100) }}%</div>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { media } from '@api'
// import table2excel from '@/plugins/table2excel'
export default {
  data() {
    return {
      tableData: [],
      loading: false,
      type: 1,
      ttime: '',
      downLoading: false,
      date: '',
      tableHeader: [],
    }
  },
  created() {
    this.getColumnSelectorget()
  },
  methods: {
    async getColumnSelectorget() {
      try {
        this.loading = true
        media.getColumnSelectordr(this.type).then((res) => {
          console.log(res.updateTime)
          this.ttime = res.updateTime
          this.tableData = res.data
          this.loading = false
        })
      } catch (error) {
        console.log(error)
        this.loading = false
      }
    },
    //  onExport() {
    //   let date = this.date ? this.date : '全部日期'
    //   let data = this.tableData
    //   this.downLoading = true
    //   let column = []
    //   let t
    //   for (let i in this.tableHeader) {
    //     t = {
    //       title: this.tableHeader[i].label,
    //       key: i,
    //       type: 'text',
    //     }
    //     column.push(t)
    //   }
    //   const excelName = `${date}-${this.activeName}`
    //   table2excel(column, data, excelName)
    //   this.downLoading = falsecontent
    // },
  },
}
</script>

<style lang="scss" scoped>
.mianter {
  display: flex;
  margin: 0 0 20px 0;
  justify-content: space-between;
}

</style>
