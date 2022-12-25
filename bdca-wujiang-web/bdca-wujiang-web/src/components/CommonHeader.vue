<template>
  <div class="header">
    <div class="left">
      <el-breadcrumb>
        <el-breadcrumb-item>{{ $route.meta.parent }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ title }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="right">
      <el-dropdown @command="handleDropdown">
        <span class="el-dropdown-link">
          <el-avatar size="small"> U </el-avatar>{{ username
          }}<el-icon><ArrowDown /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="pwd">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <!-- 修改密码 -->
    <el-dialog v-model="dialogVisible" title="修改密码" width="30%">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="100px"
        class="demo-dynamic"
        label-position="left"
      >
        <el-form-item prop="password" label="旧密码">
          <el-input v-model="ruleForm.password" autocomplete="false" show-password></el-input>
        </el-form-item>
        <el-form-item prop="newpassword" label="新密码">
          <el-input v-model="ruleForm.newpassword" autocomplete="false" show-password></el-input>
        </el-form-item>
        <el-form-item prop="confirmpassword" label="确认密码">
          <el-input
            v-model="ruleForm.confirmpassword"
            autocomplete="false"
            show-password
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirm('ruleForm')">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { user } from '@api';
import Cookies from "js-cookie";
import { ArrowDown } from '@element-plus/icons'
export default {
  props: ["title"],
  components: {
    ArrowDown,
  },
  data() {
    const validatePass = (rule, value, callback) => {
      const pattern = /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,}$/
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else if (pattern.test(value) == false) {
        callback(new Error("密码需包含大小写字母、数字、特殊字符至少三种，至少8位"));
      } else {
        if (this.ruleForm.confirmpassword !== "") {
          this.$refs.ruleForm.validateField("confirmpassword");
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入新密码"));
      } else if (value !== this.ruleForm.newpassword) {
        callback(new Error("两次输入的密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      username: "",
      dialogVisible: false,
      ruleForm: {
        password: "",
        newpassword: "",
        confirmpassword: "",
      },
      rules: {
        password: [
          {
            required: true,
            message: "请输入原来的密码",
            trigger: "blur",
          },
        ],
        newpassword: [{ required: true, validator: validatePass, trigger: "blur" }],
        confirmpassword: [{ required: true, validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  mounted() {
    if (Cookies.get("user")) {
      this.username = JSON.parse(Cookies.get("user")).usernick;
    }
  },
  methods: {
    handleDropdown(command) {
      switch (command) {
        case "pwd":
          this.dialogVisible = true;
          break;
        case "logout":
          this.$confirm(`您确定退出登录?`, "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }).then(() => {
            user.logout().then(() => {
            }).finally(() => {
              Cookies.remove("user");
              this.$router.push("/login");
            })
          })
          break;
        default:
          break;
      }
    },
    handleConfirm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          user.editPassword({
              password: this.ruleForm.password,
              newpassword: this.ruleForm.confirmpassword,
            }).then(() => {
              this.$message.success("修改成功！");
              setTimeout(() => {
                Cookies.remove("user");
                this.$router.push("/login");
              }, 2000);
            });
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss">
.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 30px 0;
  .left {
    height: 24px;
    border-left: 10px solid #2C7EF8;
    padding-left: 32px;

    .el-breadcrumb {
      width: 400px;
      font-size: 22px;
      font-weight: bold;
      line-height: 24px;
      &__inner {
        color: #383838 !important;
      }
    }
  }
  .right {
    padding-right: 42px;
    .el-dropdown {
      font-weight: 400;
      color: #383838;
      cursor: pointer;
      &-link {
        display: flex;
        align-items: center;
        .el-avatar {
          margin-right: 10px;
        }
      }
      .el-icon-arrow-down {
        color: #979797;
      }
    }
  }
}
</style>
