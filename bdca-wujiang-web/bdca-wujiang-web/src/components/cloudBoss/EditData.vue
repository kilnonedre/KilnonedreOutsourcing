<template>
  <el-dialog
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :destroy-on-close="true"
    v-model="show"
    title="编辑数据"
    width="40%"
  >
    <el-input
      :rows="20"
      type="textarea"
      v-model="content"
      placeholder="请输入数据"
    ></el-input>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="show = false">取消</el-button>
        <el-button type="primary" @click="editData">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { kpi } from "../../server/api";

export default {
  data() {
    return {
      show: false,
      content: '',
      id: '',
      kpi: '',
      dailyApiId: '',
      date: ''
    }
  },
  emits: ['update'],
  methods: {
    editData() {
      this.$confirm(`确定${this.id ? '修改' : '新增'}?`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          if(this.kpi === 'daily') {
            if(this.id) {
              this.editDaily({id: this.id, content: this.content})
            } else {
              // 新增
              this.editDaily({ date: this.date, dailyApiId: this.dailyApiId, content: this.content})
            }
          } else if (this.kpi === 'annual') {
            if(this.id) {
              this.editAnnual({id: this.id, content: this.content})
            } else {
              // 新增
              this.editAnnual({name: '中心及广电站年度目标', type: '年', date: this.date, content: this.content})
            }
          }
        })
        .finally(() => {});
    },
    editAnnual(data) {
      kpi.editAnnual(data).then(res => {
        this.$message.success(this.id ? '修改成功！' : '新增成功！')
        this.show = false
        this.$emit('update')
      })
    },
    editDaily(data) {
      kpi.editDaily(data).then(res => {
        this.$message.success(this.id ? '修改成功！' : '新增成功！')
        this.show = false
        this.$emit('update')
      })
    },
    addDaily() {

    }
  },
}
</script>

<style></style>
