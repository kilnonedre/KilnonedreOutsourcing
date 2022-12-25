<template>
  <el-dialog @open="open" :close-on-click-modal="false" :close-on-press-escape="false" v-model="show" title="选择展示数据">
    <!-- <el-checkbox v-model="checkAll" @change="handleCheckAllChange"
      >全选</el-checkbox
    > -->
    <el-tag round closable v-for="(item, itname) in combination" :key="itname" @click="clickCombination(item)" @close="remove(itname)">{{itname}}</el-tag>

    <el-checkbox-group
      v-model="checkedHeader"
      @change="handleCheckedHeadersChange"
      :max="5"
    >
      <el-checkbox v-for="item in allHeader" :key="item" :label="item">{{item}}</el-checkbox>
    </el-checkbox-group>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="show = false">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </span>
    </template>
  </el-dialog>
  <chart ref="chart" :tableData="tableData" :tableHeader="checkedHeader"></chart>
  <!-- <add-combination ref="combination" @add="addCombination"></add-combination> -->
</template>

<script>
import Chart from './Chart.vue'
// import AddCombination from './AddCombination.vue'
export default {
  components: {
    Chart,
    // AddCombination
  },
  props: ['tableData', 'tableHeader'],
  data() {
    return {
      show: false,
      checkAll: false,
      checkedHeader: [],
      combination: {},
    }
  },
  computed: {
    allHeader() {
      let arr = []
      for(let i in this.tableData[0]) {
        if(typeof this.tableData[0][i] === 'string') {
         if(i !== '中心及广电站') {
            arr.push(i)
         } 
        } else {
          for(let j in this.tableData[0][i]) {
            arr.push(i + '-' + j)
          }
        }
      }
      return arr
    }
  },
  methods: {
    handleCheckAllChange(val) {
      this.checkedHeader = val ? this.allHeader : []
    },
    handleCheckedHeadersChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.allHeader.length
    },
    confirm() {
      this.show = false
      // this.$confirm(`是否保存此次组合以便下次查看?`, "提示", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "warning",
      // }).then(() => {
      //   this.$refs.combination.show = true
      // }).catch(() => {
      //   this.$refs.chart.show = true
      // })
      this.$refs.chart.show = true
    },
    addCombination(e) {
      let com = window.localStorage.getItem('combination') ? JSON.parse(window.localStorage.getItem('combination')) : {}
      com[e] = this.checkedHeader
      window.localStorage.setItem('combination', JSON.stringify(com))
      this.$refs.chart.show = true
    },
    open() {
      this.combination = window.localStorage.getItem('combination') ? JSON.parse(window.localStorage.getItem('combination')) : {}
    },
    clickCombination(item) {
      this.checkedHeader = item
    },
    remove(name) {
      delete this.combination[name]
      window.localStorage.setItem('combination', JSON.stringify(this.combination))
    }
  },
}
</script>

<style lang="scss" scoped>
.group {
  font-size: 18px;
  color: #303133;
}
.el-tag {
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>
