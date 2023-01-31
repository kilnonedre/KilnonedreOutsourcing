<template>
  <div id="smartTown">
    <h2>加固设计施工案例</h2>
    <el-table
      :data="tableData"
      style="width: 100%; font-size: 19px; white-space: nowrap"
      stripe
      fit
      size="medium"
      >>
      <el-table-column prop="num" label="序号" align="center" width="70px">
      </el-table-column>
      <el-table-column
        prop="pro1"
        label="项目地点"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      tableData: [],
    };
  },
  mounted() {
    axios({
      method: "get",
      url: "http://47.108.173.62/home/ReinforcementDesignAndConstruction",
    }).then((data) => {
      this.tableData = data.data;
    });
  },
};
</script>
<style scoped>
#smartTown > h2 {
  text-align: center;
  margin-bottom: 50px;
}
</style>
