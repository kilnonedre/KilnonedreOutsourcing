<template>
  <div class="page user-manage">
    <common-header title="用户管理"></common-header>
    <div class="content">
      <div class="toolbox">
        <div class="left">
          <el-input
            style="width: 250px; margin-right: 16px;"
            prefix-icon="el-icon-search"
            v-model="keyword"
            placeholder="请输入手机号查询"
            clearable
            @blur="search"
            @clear="search"
            @keyup.enter.native="search"
          ></el-input>
          <el-cascader
            v-model="station_grid"
            style="width: 320px"
            :options="stationOptions"
            :props="{ checkStrictly: userInfo.grade == '网格员' ? false : true }"
            placeholder="广电站及网格"
            :clearable="userInfo.grade == '管理员'"
            filterable
            @change="change"
          ></el-cascader>
        </div>
        <div class="right">
          <el-button type="primary" @click="addUser">新增用户</el-button>
        </div>
      </div>
      <div class="table">
        <el-table
          ref="table"
          id="table"
          height="100%"
          stripe
          border
          v-loading="loading"
          :data="tableData"
          :header-cell-style="{
            background: '#eaf2fe',
            color: '#383838',
            fontSize: '16px',
            height: '34px',
          }"
          cell-class-name="cell-class"
          :row-style="{
            height: '40px',
            fontSize: '14px',
          }"
          @sort-change="sortTable"
        >
          <el-table-column label="账号" prop="username" align="center" min-width="100" sortable="custom" />
          <el-table-column label="姓名" prop="usernick" align="center" min-width="100" sortable="custom" />
          <el-table-column label="职级" prop="grade" align="center" min-width="100" sortable="custom" />
          <el-table-column label="所属广电站" prop="station" align="center" min-width="180" sortable="custom" />
          <el-table-column label="所属网格" prop="grid" align="center" min-width="180" sortable="custom" />
          <el-table-column label="企业微信ID" prop="touser" align="center" min-width="120" sortable="custom" />
          <el-table-column label="系统角色" align="center" min-width="120">
            <template #default="scope">{{ scope.row.roles && scope.row.roles.length ? scope.row.roles[0].roleName : '普通用户'}}</template>
          </el-table-column>
          <el-table-column label="操作" align="center" min-width="160">
            <template #default="scope">
              <el-button size="small" type="text" @click="delUser(scope.$index, scope.row)">删除</el-button>
              <el-button size="small" type="text" @click="editUser(scope.$index, scope.row)">编辑</el-button>
              <el-button size="small" type="text" @click="resetPwd(scope.$index, scope.row)">重置密码</el-button>
            </template>
          </el-table-column>
          <template #empty>
            <div style="margin-top: 5%">暂无数据</div>
          </template>
        </el-table>
      </div>
      <div class="pagination">
        <el-pagination
          :current-page="currentPage"
          :page-size="pageSize"
          :page-sizes="[20, 30, 50, 100]"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
    </div>
    <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" v-model="dialogVisible" :title="dialogTitle" width="480px" @closed="closeDialog" @open="getRole">
      <el-form ref="userForm" :model="userForm" label-width="120px" label-position="left" :rules="userRules">
        <el-form-item label="账号" prop="username">
          <el-input placeholder="请输入手机号" v-model="userForm.username" />
        </el-form-item>
        <el-form-item label="姓名" prop="usernick">
          <el-input placeholder="请输入姓名" v-model="userForm.usernick" />
        </el-form-item>
        <el-form-item inline v-if="dialogTitle == '新增用户'" label="密码" prop="password">
          <template style="width: 100%; display: flex;">
            <el-input placeholder="请输入密码" v-model="userForm.password" style="flex: 1; margin-right: 16px;"/>
            <el-button type="primary" plain @click="randomPwd" class="pwd">随机密码</el-button>
          </template>
        </el-form-item>
        <el-form-item label="企业微信ID" prop="touser">
          <el-input placeholder="请输入企业微信ID" v-model="userForm.touser" />
        </el-form-item>
        <el-form-item label="系统角色" prop="role">
          <el-radio-group v-model="userForm.role" @change="changeRole">
            <el-radio-button v-for="item in roleList" :key="item.id" :label="item.id" :value="item.id">{{ item.roleName }}</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="职级" prop="grade">
          <el-select placeholder="请选择权限等级" v-model="userForm.grade" clearable filterable @change="changeGrade">
            <el-option v-for="item in typeList" :key="item" :label="item" :value="item"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="userForm.grade == '网格员' ? '广电站及网格' : '广电站'" v-if="userForm.grade !== '管理员'" prop="station_grid">
          <el-cascader
            placeholder="请选择广电站"
            v-model="userForm.station_grid"
            style="width: 320px"
            :options="stationList"
            :props="{ multiple: userForm.grade == '网格员', checkStrictly: userForm.grade !== '网格员' }"
            clearable
            filterable
          ></el-cascader>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitFormData">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import CommonHeader from '#/CommonHeader.vue'

import { management } from '@api'
import Cookies from 'js-cookie'
import { isArray } from '@vue/shared'

export default {
  components: {
    CommonHeader,
  },
  data() {
    const validatePass = (rule, value, callback) => {
      const pattern = /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,}$/
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (pattern.test(value) == false) {
        callback(new Error("密码需包含大小写字母、数字、特殊字符至少三种，至少8位"));
      } else {
        callback()
      }
    };
    return {
      loading: false,
      stationOptions: [],
      stationList: [], //编辑弹框的网格选择
      tableData: [],
      total: 0,
      pageSize: 20,
      currentPage: 1,
      keyword: '',
      ascs: '',
      descs: 'created',
      userInfo: {},
      station_grid: [],
      station: '',
      grid: '',
      dialogVisible: false,
      dialogTitle: '',
      userForm: {
        id: '',
        touser: '',
        usernick: '',
        username: '',
        password: '',
        station_grid: '',
        station: '',
        grid: '',
        grade: '',
        role: ''
      },
      userRules: {
        touser: [{ required: true, message: "请输入企业微信ID", trigger: "blur" }],
        usernick: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        username: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        password: [{ required: true, validator: validatePass, trigger: "blur" }],
        grade: [{ required: true, message: "请选择权限等级", trigger: "change" }],
        station_grid: [{ required: true, message: "请选择广电站", trigger: "change" }],
        role: [{ required: true, message: "请选择系统角色", trigger: "change" }]
      },
      typeList: ['管理员', '站长', '网格员'],
      roleList: [],
      currentRoleId: '', //记录编辑用户的roleid，方便删除
    }
  },
  methods: {
    getTableList() {
      management.getUser({
        size: this.pageSize,
        current: this.currentPage,
        username: this.keyword,
        station: this.station,
        grid: this.grid,
        descs: this.descs,
        ascs: this.ascs,
      }).then((res) => {
        this.tableData = res.records
        this.total = res.total
      })
      .finally(() => {
        this.loading = false
        this.$nextTick(() => {
          this.$refs['table'].doLayout()
        })
      })
    },
    search() {
      this.currentPage = 1
      this.getTableList()
    },
    change(e) {
      this.station = e ? e[0] : ''
      this.grid = e && e.length > 1 ? e[1] : ''
      this.getTableList()
    },
    addUser() {
      this.dialogTitle = '新增用户'
      this.dialogVisible = true
      this.userForm.id = ''
    },
    editUser(index, row) {
      this.dialogTitle = '编辑用户'
      Object.keys(this.userForm).forEach((key) => {
        this.userForm[key] = row[key] || this.userForm[key]
      })
      this.changeGrade()
      this.getUserRole(row.id)
      let station_grid = []
      let gridList = row.grid ? row.grid.split(',') : []
      if(gridList.length === 0) {
        station_grid.push(row.station)
      } else {
        gridList.forEach(item => {
          station_grid.push([row.station, item])
        })
      }
      this.userForm.station_grid = station_grid
      this.dialogVisible = true
    },
    delUser(index, row) {
      this.$confirm(`您确定删除用户?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        management.delUser(row.id).then(() => {
          this.$message.success("删除成功")
          this.getTableList()
        });
      })
    },
    resetPwd(index, row) {
      this.$confirm(`您确定重置密码?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let _newpassword = this.randomPwd()
        management.resetUserPwd({
          userid: row.id,
          newpassword: _newpassword,
        }).then(() => {
          this.$message.success(`密码重置成功为"${_newpassword}"！`)
        });
      })
    },
    randomPwd() {
      const pattern = /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,}$/
      const seed = new Array('A','B','C','D','E','F','G','H','I','J','K','L','M','N',
                             'O','P','Q','R','S','T','U','V','W','X','Y','Z',
                             'a','b','c','d','e','f','g','h','i','j','k','m','n',
                             'o','p','q','r','s','t','u','v','w','x','y','z',
                             '0','1','2','3','4','5','6','7','8','9',)
      let password
      let length = seed.length
      do {
        password = ''
        for (let i = 0; i < 8; i++) {
          password += seed[Math.floor(Math.random() * length)]
        }
      } while (pattern.test(password) == false)
      this.userForm.password = password
      return password
    },
    closeDialog() {
      this.$refs['userForm'].resetFields()
    },
    submitFormData() {
      this.$refs['userForm'].validate(valid => {
        if (valid) {
          let station = this.userForm.station_grid && this.userForm.station_grid.length ? (isArray(this.userForm.station_grid[0]) ? this.userForm.station_grid[0][0] : this.userForm.station_grid[0]) : ''
          let grid = []
          this.userForm.station_grid.forEach(item => {
            grid.push(isArray(item) ? item[1] : '')
          })
          if (this.dialogTitle === '新增用户') {
            management.addUser({
              touser: this.userForm.touser,
              usernick: this.userForm.usernick,
              username: this.userForm.username,
              password: this.userForm.password,
              station: station,
              grid: grid.join(','),
              grade: this.userForm.grade,
            }).then((res) => {
              this.updateUserRole({
                userId: res.id,
                roleId: this.userForm.role == 'normal' ? '' : this.userForm.role
              }).then(() => {
                this.$message.success('新增用户成功!');
                this.loading = false
                this.dialogVisible = false
                this.getTableList()
              })
            })
          } else {
            if (this.userForm.password) {
              this.userForm.password = ''
            }
            Promise.all([management.editUser({
              id: this.userForm.id,
              touser: this.userForm.touser,
              usernick: this.userForm.usernick,
              username: this.userForm.username,
              station: station,
              grid: grid.join(','),
              grade: this.userForm.grade,
            }), this.updateUserRole({
                userId: this.userForm.id,
                roleId: this.userForm.role == 'normal' ? '' : this.userForm.role
              })]).then((res) => {
                this.$message.success('编辑用户成功!');
                this.loading = false
                this.dialogVisible = false
                this.getTableList()
            })
          }
        }
      });
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.currentPage = 1
      this.getTableList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getTableList()
    },
    sortTable({ prop, order }) {
      if(order == 'ascending') {
        this.ascs = prop
        this.descs = ''
      } else if(order == 'descending') {
        this.ascs = ''
        this.descs = prop
      } else {
        this.ascs = ''
        this.descs = 'created'
      }
      this.getTableList()
    },
    changeGrade() {
      this.userForm.station_grid = []
      this.userForm.station = ''
      this.userForm.grid = ''
      if(this.userForm.grade == '站长') {
        this.stationOptions.forEach(item => {
          item.children.forEach(i => {
            i.disabled = true
          })
        })
      } else if(this.userForm.grade == '网格员') {
        this.stationOptions.forEach(item => {
          item.children.forEach(i => {
            i.disabled = false
          })
        })
      }
    },
    computeStation() {
      let station = JSON.parse(JSON.stringify(window.config.stationOptions))
      let show = []
      switch(this.userInfo.grade) {
      case '管理员':
        this.typeList = ['管理员', '站长', '网格员']
        show = JSON.parse(JSON.stringify(window.config.stationOptions))
        this.station_grid = []
        this.station = this.userInfo.station
        this.grid = this.userInfo.grid
        break;
      case '站长':
        this.typeList = ['站长', '网格员']
        station.forEach(item => {
          if(item.value == this.userInfo.station) {
            show.push(item)
          }
        })
        this.station_grid = [this.userInfo.station]
        this.station = this.userInfo.station
        this.grid = this.userInfo.grid
        break;
      case '网格员':
        this.typeList = ['网格员']
        let gridList = this.userInfo.grid.split(',')
        show.push({
          label: this.userInfo.station,
          value: this.userInfo.station,
          children: []
        })
        gridList.forEach(item => {
          show[0].children.push({
            label: item,
            value: item
          })
        })
        this.station_grid = [this.userInfo.station, gridList[0]]
        this.station = this.userInfo.station
        this.grid = gridList[0]
        break;
      }
      this.stationOptions = show
      this.stationList = JSON.parse(JSON.stringify(show))
    },
    getRole() {
      management.getRole().then(res => {
        res.unshift({
          roleName: '普通用户',
          id: 'normal'
        })
        this.roleList = res
      })
    },
    getUserRole(id) {
      management.getUserRole(id).then(res => {
        this.userForm.role = res.length ? res[0].roleId : 'normal'
        this.currentRoleId = res.length ? res[0].id : ''
      })
    },
    updateUserRole(data) {
      return data.roleId ? management.updateUserRole(data) : (this.currentRoleId ? management.delUserRole(this.currentRoleId) : new Promise(function(resolve, reject){resolve(1)}))
    },
    changeRole(e) {
      this.userForm.role = e
    }
  },
  created() {
    this.userInfo = JSON.parse(Cookies.get('user'))
    this.computeStation()
    this.getTableList()
  }
}
</script>

<style lang="scss" scoped>
.user-manage {
  .toolbox {
    margin-bottom: 20px;
  }
  .table {
    width: 100%;
    height: calc(100% - 90px);
  }
  .pagination {
    float: right;
    margin-top: 20px;
  }
  .pwd {
    float: right;
  }
}
</style>