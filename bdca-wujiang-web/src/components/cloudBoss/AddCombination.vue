<template>
  <div>
    <el-dialog v-model="show" title="新增组合" :close-on-click-modal="false" :close-on-press-escape="false" width="30%">
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="100px"
        label-position="left"
      >
        <el-form-item label="组合名" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="show = false">取消</el-button>
          <el-button type="primary" @click="submit">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  emit: ['add'],
  data() {
    return {
      show: false,
      form: {
        name: '',
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入组合名称',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  methods: {
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit('add', this.form.name)
          this.show = false
        } else {
          return false
        }
      })
    },
  },
}
</script>

<style></style>
