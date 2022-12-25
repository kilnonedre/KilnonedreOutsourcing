<template>
  <div class="login-wrap">
    <div class="left"></div>
    <div class="right">
      <h1>运行维护数据统计分析系统</h1>
      <el-form
        :model="form"
        status-icon
        ref="form"
        label-width="0"
        class="demo-form"
      >
        <el-form-item prop="id">
          <div class="icon">
            <img src="@img/icon_username@3x.svg" />
          </div>
          <el-input
            prefix-icon
            v-model="form.username"
            placeholder="请输入手机号"
            autofocus
          ></el-input>
        </el-form-item>
        <el-form-item prop="pass">
          <div class="icon">
            <img src="@img/icon_pwd@3x.svg" />
          </div>
          <el-input
            type="password"
            v-model="form.password"
            autocomplete="off"
            placeholder="请输入密码"
            @keyup.enter="submitForm"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="bottom">
        <div class="tips">如忘记登录密码请联系管理员</div>
        <el-button
          size="large"
          type="primary"
          class="login-btn"
          @click="submitForm"
          >登录</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { user } from '@api'
import Cookies from 'js-cookie'
import router from '../../router'

export default {
  name: 'Login',
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
    }
  },
  methods: {
    submitForm() {
      user.login(this.form).then((res) => {
        Cookies.set(
          'user',
          JSON.stringify({
            username: res.username,
            usernick: res.usernick,
            id: res.id,
            grade: res.grade,
            station: res.station,
            grid: res.grid,
            role: res.roles.length ? res.roles[0].roleName : ''
          }),
        )
        this.$router.push('/')
        return
      })
    },
  },
}
</script>

<style lang="scss">
.login-wrap {
  width: 100vw;
  height: 100vh;
  display: flex;
  background: #f0f2f5;
  min-width: 400px;
  min-height: 670px;
  .left {
    flex: 1;
    height: 100%;
    background: url(@img/login_bg.jpg) no-repeat;
    background-size: cover;
    border-bottom-right-radius: 25px;
    border-top-right-radius: 25px;
  }
  .right {
    width: 733px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    h1 {
      font-size: 28px;
      font-weight: 600;
      color: #383838;
      margin: 0 auto;
    }
    .el-form {
      width: 400px;
      height: 136px;
      margin: 40px auto 32px;
      .el-form-item {
        width: 100%;
        height: 56px;
        position: relative;
        .el-input__inner {
          height: 56px;
          padding-left: 44px !important;
        }
        .icon {
          width: 44px;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 2;
          img {
            width: 16px;
            height: 16px;
            margin: 0;
            position: absolute;
            top: 50%;
            left: 60%;
            transform: translate(-50%, -50%);
          }
        }
      }
    }
    .bottom {
      width: 400px;
      height: 56px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .tips {
        font-size: 14px;
        font-weight: 400;
        color: #999999;
        line-height: 20px;
      }
      .login-btn {
        width: 120px;
        height: 100%;
        font-size: 16px;
        font-weight: 400;
        cursor: pointer;
      }
    }
  }
}
</style>
