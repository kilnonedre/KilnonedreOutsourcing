<template>
  <div>
    <div class="mianter">
      <div class="left">统计时间：{{ ttime }}</div>
      <span class="mainter-day">今日时序进度:{{ sequentialProgress*100}}%</span>
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
      style="width: 100%;"
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
    >
      <el-table-column
        prop="station"
        label="一级机构"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="goal"
        label="目标"
        align="center"
      ></el-table-column>

      <el-table-column label="固移融合" align="center">
        <el-table-column
          prop="gu_yi_today"
          label="固移融合"
          align="center"
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
        <el-table-column
          label="日均目标量"
          prop="today_goal"
          align="center"
        ></el-table-column>
        <el-table-column
          label="日均完成率"
          prop="today_complete_pro"
          align="center"
        >
          <template v-slot="{ row }">
            <div>{{ Math.round(row.today_complete_pro * 100) }}%</div>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="总发展" align="center">
        <el-table-column
          prop="gu_yi"
          label="固移融合"
          align="center"
        ></el-table-column>
        <el-table-column
          label="单移"
          align="center"
          prop="dan_yi"
        ></el-table-column>
        <el-table-column
          label="合计"
          align="center"
          prop="sum"
        ></el-table-column>
        <el-table-column label="完成率" align="center" prop="complete_pro">
          <template v-slot="{ row }">
            <div>{{ Math.round(row.complete_pro * 100) }}%</div>
          </template>
        </el-table-column>
        <el-table-column
          label="时序进度比较"
          prop="time_sequence_contrast"
          align="center"
        >
          <template v-slot="{ row }">
            <div>{{ (row.time_sequence_contrast*100).toFixed(2)}}%</div>
          </template>
        </el-table-column>
        <el-table-column label="固移融合占比" align="center" prop="gu_yi_pro">
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
      downLoading: false,
      type: 0,
      ttime: '',
      loading: false,
      sequentialProgress: '',
    }
  },
  
filters: {
  numFilter (value) {
    // 截取当前数据到小数点后两位
    let realVal = parseFloat(value).toFixed(2)
    console.log(realVal);
    return realVal
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
          this.sequentialProgress = res.sequentialProgress
          console.log(this.sequentialProgress);
          this.tableData = res.data
          this.loading = false
        })
      } catch (error) {
        console.log(error)
        this.loading = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.mianter {
  display: flex;
  justify-content: space-between;
  margin: 0 0 20px 0;
}
</style>
