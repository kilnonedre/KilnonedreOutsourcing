<template>
  <div>
    <p @click="change">修改密码</p>
    <p @click="logOut">退出</p>
  </div>
</template>
<script>
import axios from "axios";
const urlBase = "http://47.108.173.62";
export default {
  name: "AdminHeader",
  methods: {
    logOut() {
      this.$router.push("/admin");
      location.reload();
    },
    change() {
      var name = prompt("请输入您的密码");
      console.log(name); // 弹出input框
      if (name) {
        axios({
          method: "post",
          url: "http://47.108.173.62/User",
          data: {
            zhanghao: "",
            mima: name,
          },
        }).then((data) => {
          console.log(data);
        });
      }
    },
  },
};
</script>

<style scoped>
div {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
  display: flex;
  justify-content: end;
}
p {
  margin-right: 30px;
  font-weight: bold;
  cursor: pointer;
}
</style>