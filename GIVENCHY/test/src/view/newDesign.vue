<template>
  <div id="smartTown">
    <h2>新建设计案例</h2>
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
      tableData: [
        { num: "1", pro4: "内容" },
        { num: "2", pro4: "内容" },
        { num: "3", pro4: "内容" },
        { num: "4", pro4: "内容" },
        { num: "5", pro4: "内容" },
        { num: "6", pro4: "内容" },
        { num: "7", pro4: "内容" },
        { num: "8", pro4: "内容" },
        { num: "9", pro4: "内容" },
        { num: "10", pro4: "内容" },
        { num: "11", pro4: "内容" },
        { num: "12", pro4: "内容" },
        { num: "13", pro4: "内容" },
        { num: "14", pro4: "内容" },
        { num: "15", pro4: "内容" },
        { num: "16", pro4: "内容" },
      ],
    };
  },
  mounted() {
    axios({
      method: "get",
      url: "http://47.108.173.62/home/NewDesign",
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
