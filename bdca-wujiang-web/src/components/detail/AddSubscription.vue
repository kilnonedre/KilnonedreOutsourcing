<template>
  <div>
    <el-dialog
      destroy-on-close
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @open="open"
      @closed="reset"
      width="500px"
      v-model="show"
      title="添加订阅"
    >
      <el-form
        label-width="60px"
        label-position="left"
        :rules="rules"
        ref="form"
        :model="form"
      >
        <el-form-item label="用户" prop="user">
          <el-select
            v-model="form.user"
            style="width: 100%"
            placeholder="请选择用户"
            filterable
            @change="change"
          >
            <el-option
              v-for="item in userList"
              :key="item.id"
              :label="item.usernick + '(' + item.username + ')'"
              :value="item.id + '/' + item.touser"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-tag style="margin-right: 10px" v-if="selectUser.grade">{{selectUser.grade}}</el-tag>
          <el-tag style="margin-right: 10px" type="success" v-if="selectUser.station">{{selectUser.station}}</el-tag>
          <el-tag type="info" v-if="selectUser.grid">{{selectUser.grid}}</el-tag>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="reset">取消</el-button>
          <el-button :loading="loading" type="primary" @click="submit"
            >确定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { Minus, Plus } from '@element-plus/icons-vue'
import { subscribe, management } from '@api'

import Cookies from 'js-cookie'

export default {
  name: 'AddSubscription',
  components: {
    Plus,
    Minus,
  },
  emits: ['over'],
  data() {
    return {
      show: false,
      loading: false,
      stationOptions: window.config.stationOptions,
      rules: {
        user: [{ required: true, message: '请选择用户', trigger: 'change' }],
      },
      station_grid: '',
      gridName: '',
      station: '',
      userInfo: '',
      userList: [],
      selectUser: '',
      form: {
        user: '',
      },
    }
  },
  methods: {
    reset() {
      this.$refs['form'].resetFields()
      this.selectUser = ''
      this.show = false
      this.$emit('over')
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true
          if (this.$route.path.includes('TV')) {
            subscribe
              .subsTelevision({
                userId: this.form.user.split('/')[0],
                touser: this.form.user.split('/')[1],
                dw1: this.selectUser.station,
                gridName: this.selectUser.grid,
                test: true,
              })
              .then((res) => {
                this.$message.success('订阅成功！')
                this.show = false
              })
              .finally(() => {
                this.loading = false
              })
          } else if (this.$route.path.includes('FDDI')) {
            subscribe
              .subsBroadband({
                userId: this.form.user.split('/')[0],
                touser: this.form.user.split('/')[1],
                dw1: this.selectUser.station,
                gridName: this.selectUser.grid,
                test: true,
              })
              .then((res) => {
                this.$message.success('订阅成功！')
                this.show = false
              })
              .finally(() => {
                this.loading = false
              })
          } else if (this.$route.path.includes('Arrearage')) {
            subscribe
              .subsArrearage({
                userId: this.form.user.split('/')[0],
                touser: this.form.user.split('/')[1],
                dw1: this.selectUser.station,
                gridName: this.selectUser.grid,
                test: true,
              })
              .then((res) => {
                this.$message.success('订阅成功！')
                this.show = false
              })
              .finally(() => {
                this.loading = false
              })
          }
        }
      })
    },
    getUserList() {
      management
        .getUser({
          size: -1,
        })
        .then((res) => {
          this.userList = res.records
        })
    },
    change(e) {
      let obj = this.userList.find(item => item.id === e.split('/')[0])
      this.selectUser = obj
    },
    open() {
      this.userInfo = JSON.parse(Cookies.get('user'))
      let arr = []
      if (this.userInfo.station) arr.push(this.userInfo.station)
      if (this.userInfo.grid) arr.push(this.userInfo.grid)
      this.station_grid = arr
      this.station = this.userInfo.station
      this.gridName = this.userInfo.grid
      this.getUserList()
    }
  },
}
</script>

<style lang="scss" scoped>
.row {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  .el-input {
    flex: 1;
    margin-right: 10px;
  }
  .el-button.is-circle {
    min-height: 24px;
    line-height: 0.2;
  }
}
</style>
