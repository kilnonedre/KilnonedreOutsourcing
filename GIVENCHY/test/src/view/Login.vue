
<template>
  <div class="mask" v-bind:class="{ maskNone: tdialogVisible }">
    <div>
      <el-input v-model="zhanghao" placeholder="请输入账号"></el-input
      ><el-input v-model="mima" placeholder="请输入密码"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="admin">确 定</el-button>
      </span>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      dialogVisible: true,
      zhanghao: "",
      mima: "",
    };
  },
  computed: {
    tdialogVisible() {
      return this.dialogVisible;
    },
  },
  methods: {
    admin() {
      axios({
        method: "post",
        url: "http://47.108.173.62/User",
        data: {
          zhanghao: this.zhanghao,
          mima: this.mima,
        },
      }).then((data) => {
        if (data.data == "shenfqueren") {
          this.dialogVisible = true;
        }
      });
    },
  },
  mounted() {
    if (
      window.location.href.substring(
        window.location.href.length - 5,
        window.location.href.length
      ) == "admin"
    )
      this.dialogVisible = false;
  },
};
</script>

<style scoped>
.maskNone {
  display: none;
}
.mask {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
}
.mask > div {
  width: 300px;
  height: 260px;
  padding: 20px;
  border-radius: 10px;
  margin: 0 auto;
  margin-top: 200px;
  background-color: white;
}
.el-input {
  margin: 20px 0;
}
.el-dialog__headerbtn {
  display: none;
}
</style>