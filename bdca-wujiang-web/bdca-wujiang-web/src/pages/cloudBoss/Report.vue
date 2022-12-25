<template>
  <div class="page order">
    <common-header title="5G发展报表"></common-header>
    <!-- <div style="position: fixed;right: 40px;top: 40px;" @click="full">全屏</div> -->
    <div class="content">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="部门发展报表" name="部门发展报表"></el-tab-pane>
        <el-tab-pane label="广电站发展报表" name="广电站发展报表"></el-tab-pane>
        <el-tab-pane label="员工发展报表" name="员工发展报表"></el-tab-pane>
        <el-tab-pane label="5G发展大屏" name="5G发展大屏"></el-tab-pane>　
      </el-tabs>　
      <div v-if="activeName === '部门发展报表'">
        <Reportdepartment></Reportdepartment>
      </div>
      <div v-if="activeName === '广电站发展报表'">
        <ReportReport></ReportReport>
      </div>
      <div v-if="activeName === '员工发展报表'">
        <Reportde></Reportde>
      </div>
      <div v-if="activeName === '5G发展大屏'" class="big_screen ">
        <ReportScreen ref="ReportScreen"></ReportScreen>
      </div>
    </div>
  </div>
</template>

<script>
import CommonHeader from '../../components/CommonHeader.vue'
import ReportReport from '../cloudBoss/components/ReportReport.vue'
import Reportdepartment from '../cloudBoss/components/Reportdepartment.vue'
import Reportde from '../cloudBoss/components/Reportde.vue'
import ReportScreen from '../cloudBoss/components/ReportScreen.vue'
import { Document } from '@element-plus/icons'

export default {
  components: {
    CommonHeader,
    ReportReport,
    Reportdepartment,
    Reportde,
    ReportScreen
  },
  data() {
    return {
      activeName: '部门发展报表',

    }
  },

  methods: {
    full() {

      let el = this.$refs.ReportScreen
      if (el)
        el.fullScern()
    }
  }

}
</script>
<style lang="scss" scoped>
.big_screen {
  min-width: 96.875rem;
}
</style>
