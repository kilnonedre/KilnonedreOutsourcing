
<template>
  <div class="login clearfix">
    <div class="login-wrap">
      <el-row type="flex" justify="center">
        <el-form ref="loginForm" status-icon label-width="80px">
          <h3>登录/注册</h3>
          <hr />
          <el-form-item prop="username" label="账号">
            <el-input placeholder="请输入账号" v-model="userAccount"></el-input>
          </el-form-item>
          <el-form-item prop="password" label="密码">
            <el-input show-password placeholder="请输入密码" v-model="userPassword"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon @click="doRegister()" :disabled="
  !(userAccount != '' && userPassword != '')
            ">登录/注册</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </div>
  </div>
</template>
 
<script>
import axios from 'axios';
export default {
  name: "loginAndSignUp",
  data () {
    return {
      userAccount: "",
      userPassword: "",
    };
  },
  methods: {
    doRegister () {
      axios.post('http://10.16.16.121:8038/api/memorandum/index/login', {
        username: this.userAccount,
        password: this.userPassword
      }).then(data => {
        console.log(data)
      })
    }
  },
};
</script>
 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  background-color: #e9eef3;
  background-size: cover;
  overflow: hidden;
}

.login-wrap {
  /* background-color: green; */
  background-size: cover;
  width: 400px;
  margin: 215px auto;
  overflow: hidden;
  padding-top: 10px;
  line-height: 20px;
}

.login-wrap>div {
  background-color: white;
  padding: 20px 0;
  box-sizing: content-box;
}

h3 {
  color: #0babeab8;
  font-size: 24px;
}

hr {
  background-color: #444;
  margin: 20px auto;
}

.el-button {
  width: 80%;
  margin-left: -50px;
}
</style>