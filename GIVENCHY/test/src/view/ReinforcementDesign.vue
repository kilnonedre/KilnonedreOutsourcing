<template>
  <div id="smartTown">
    <h2>加固设计案例</h2>
    <el-table :data="tableData" style="font-size: 19px" stripe size="medium">
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
  name: "smartTown",
  data() {
    return {
      tableData: [
        { num: "1", pro1: "内容" },
        { num: "2", pro1: "内容" },
        { num: "3", pro1: "内容" },
        { num: "4", pro1: "内容" },
        { num: "5", pro1: "内容" },
        { num: "6", pro1: "内容" },
        { num: "7", pro1: "内容" },
        { num: "8", pro1: "内容" },
      ],
    };
  },
  mounted() {
    axios({
      method: "get",
      url: "http://47.108.173.62/home/ReinforcementDesign",
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
::v-deep .el-table_5_column_10 {
  width: 10px;
}
</style>
