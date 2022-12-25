<template>
  <div class="page order">
    <common-header title="栏目管理"></common-header>
    <div class="content">
      <div class="tab-content">
        <div class="toolbox">
          <div class="left">
            <el-input
              v-model="programmeName"
              style="width: 250px; margin-right: 15px;"
              prefix-icon="el-icon-search"
              placeholder="请输入节目名称"
              clearable
              @blur="search"
              @clear="search"
            />
            <el-cascader
              v-model="lanmu"
              style="width: 250px"
              :options="lanmuList"
              @change="changeLanmu"
              :props="{ checkStrictly: true }"
              placeholder="一级/二级/三级"
              clearable
              filterable
            />
          </div>
          <div class="right">
            <el-button type="primary" @click="addLanmu">
              新增栏目
            </el-button>
          </div>
        </div>
        <div class="table">
          <el-table
            ref="lanmu"
            v-loading="loading"
            height="100%"
            stripe
            border
            :data="tableData"
            :header-cell-style="{
              background: '#eaf2fe',
              color: '#383838',
              fontSize: '16px',
              height: '34px',
            }"
            :row-style="{
              height: '24px',
              fontSize: '14px',
            }"
            @sort-change="sortTable"
          >
            <el-table-column
              v-for="(item, index) in tableHeader"
              :label="item.label"
              :prop="index"
              align="center"
              :min-width="item.width ? item.width + '' : '100'"
              sortable="custom"
            >
              <template #default="scope">
                <div class="image-wrapper" v-if="index === 'picturePath'">
                  <el-image class="image" :src="baseUrl + scope.row[index]" :preview-src-list="srcList">
                    <template #error>
                      <span>暂无图片</span>
                    </template>
                  </el-image>
                </div>
                <span v-else-if="index === 'putStartTime'">{{ !!scope.row[index] ? formatDate(scope.row[index]).split(' ')[0] : '-' }}</span>
                <span v-else-if="index === 'putEndTime'">{{ !!scope.row[index] ? formatDate(scope.row[index]).split(' ')[0] : '-' }}</span>
                <span v-else-if="index === 'createTime'">{{ !!scope.row[index] ? formatDate(scope.row[index]).split(' ')[0] : '-' }}</span>
                <span v-else-if="index === 'updateTime'">{{ !!scope.row[index] ? formatDate(scope.row[index]).split(' ')[0] : '-' }}</span>
                <span v-else>{{ !!scope.row[index] ? scope.row[index] : '-' }}</span>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" align="center" min-width="120">
              <template #default="scope">
                <el-button size="small" type="text" @click="delLanmu(scope.$index, scope.row)">删除</el-button>
                <el-button size="small" type="text" @click="editLanmu(scope.$index, scope.row)">编辑</el-button>
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
        <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" v-model="dialogVisible" :title="dialogTitle" width="500px" @closed="closeDialog">
          <el-form ref="lanmuForm" :model="lanmuForm" label-width="120px" label-position="left" :rules="lanmuRules">
            <el-form-item label="一级栏目名称" prop="firstColumnName">
              <el-input placeholder="一级栏目名称" v-model="lanmuForm.firstColumnName" />
            </el-form-item>
            <el-form-item label="二级栏目名称" prop="secondColumnName">
              <el-input placeholder="二级栏目名称" v-model="lanmuForm.secondColumnName" />
            </el-form-item>
            <el-form-item label="三级栏目名称" prop="thirdColumnName">
              <el-input placeholder="三级栏目名称" v-model="lanmuForm.thirdColumnName" />
            </el-form-item>
            <el-form-item label="尺寸" prop="pictureSize">
              <el-input placeholder="默认上传的图片尺寸，可编辑" v-model="lanmuForm.pictureSize" />
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
    </div>
  </div>
</template>

<script>
import CommonHeader from '#/CommonHeader.vue'

import { media } from '@api'

const header = {
  firstColumnName: {label: '一级栏目',width: '120'},
  secondColumnName: {label: '二级栏目',width: '150'},
  thirdColumnName: {label: '三级栏目',width: '150'},
  programmeName: {label: '节目名称',width: '150'},
  putStartTime: {label: '投放开始时间',width: '150'},
  putEndTime: {label: '投放结束时间',width: '150'},
  pictureSize: {label: '尺寸',width: '100'},
  picturePath: {label: '图片缩略', width: '120'},
}

export default {
  components: {
    CommonHeader,
  },
  data() {
    return {
      programmeName: '',
      lanmu: '',
      lanmuList: [],
      firstColumnName: '',
      secondColumnName: '',
      thirdColumnName: '',
      dialogVisible: false,
      dialogTitle: '',
      lanmuForm: {
        id: '',
        firstColumnName: '',
        secondColumnName: '',
        thirdColumnName: '',
        pictureSize: '',
      },
      lanmuRules: {
        firstColumnName: [{ required: true, message: "请输入一级栏目名称", trigger: "blur" }],
        secondColumnName: [{ required: true, message: "请输入二级栏目名称", trigger: "blur" }],
        thirdColumnName: [{ required: true, message: "请输入三级栏目名称", trigger: "blur" }],
        pictureSize: [{ required: true, message: "请输入图片尺寸", trigger: "blur" }],
      },
      loading: false,
      tableHeader: header,
      tableData: [],
      baseUrl: window.config.baseUrl,
      srcList: [],
      ascs: '',
      descs: '',
      pageSize: 100,
      currentPage: 1,
      total: 1,
    }
  },
  methods: {
    async initList() {
      await media.getColumnSelector().then((res) => {
        this.lanmuList = res
      })
    },
    getTableList() {
      this.loading = true
      this.tableData = []
      this.srcList = []
      media.getColumnManage({
        programmeName: this.programmeName,
        firstColumnName: this.firstColumnName,
        secondColumnName: this.secondColumnName,
        thirdColumnName: this.thirdColumnName,
        size: this.pageSize,
        current: this.currentPage,
        descs: this.descs,
        ascs: this.ascs,
      }).then((res) => {
        this.tableData = res.records
        this.total = res.total
        res.records.forEach((item) => {
          this.srcList.push(this.baseUrl + item['picturePath'])
        })
      })
      .finally(() => {
        this.loading = false
        this.$nextTick(() => {
          this.$refs['lanmu'].doLayout()
        })
      })
    },
    search() {
      this.currentPage = 1
      this.getTableList()
    },
    changeLanmu(e) {
      this.firstColumnName = e ? e[0] : ''
      this.secondColumnName = e && e.length > 1 ? e[1] : ''
      this.thirdColumnName = e && e.length > 2 ? e[2] : ''
      this.getTableList()
    },
    addLanmu() {
      this.dialogTitle = '新增栏目'
      this.dialogVisible = true
    },
    editLanmu(index, data) {
      this.dialogTitle = '编辑栏目'
      this.dialogVisible = true
      Object.keys(this.lanmuForm).forEach((key) => {
        this.lanmuForm[key] = data[key] || this.lanmuForm[key]
      })
    },
    delLanmu(index, data) {
      this.$confirm(`您确定删除?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        media.delColumnManage(data.id).then(() => {
          this.$message.success("删除成功")
          this.getTableList()
        });
      })
    },
    submitFormData() {
      this.$refs['lanmuForm'].validate(valid => {
        if(valid) {
          if(this.dialogTitle === '新增栏目') {
            media.addColumnManage({
              firstColumnName: this.lanmuForm.firstColumnName,
              secondColumnName: this.lanmuForm.secondColumnName,
              thirdColumnName: this.lanmuForm.thirdColumnName,
              pictureSize: this.lanmuForm.pictureSize,
            }).then(() => {
              this.$message.success('新增栏目成功!');
              this.dialogVisible= false
              this.$refs['lanmuForm'].resetFields()
              this.getTableList()
            })
          } else if (this.dialogTitle === '编辑栏目')  {
            media.editColumnManage({
              id: this.lanmuForm.id,
              firstColumnName: this.lanmuForm.firstColumnName,
              secondColumnName: this.lanmuForm.secondColumnName,
              thirdColumnName: this.lanmuForm.thirdColumnName,
              pictureSize: this.lanmuForm.pictureSize,
            }).then(() => {
              this.$message.success('编辑栏目成功!');
              this.dialogVisible = false
              this.$refs['lanmuForm'].resetFields()
              this.getTableList()
            })
          }
        }
      });
    },
    closeDialog() {
      this.$refs['lanmuForm'].resetFields()
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
        this.descs = ''
      }
      this.getTableList()
    },
    formatDate(timestamp) {
      let now = new Date(timestamp);
      let year = now.getFullYear();
      let month = now.getMonth() + 1;
      let date = now.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (date >= 0 && date <= 9) {
        date = "0" + date;
      }
      let hour = now.getHours();
      let minute = now.getMinutes();
      let second = now.getSeconds();
      if (hour >= 1 && hour <= 9) {
        hour = "0" + hour;
      }
      if (minute >= 0 && minute <= 9) {
        minute = "0" + minute;
      }
      if (second >= 0 && second <= 9) {
        second = "0" + second;
      }
      return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
    },
  },
  created() {
    this.initList()
    this.getTableList()
  }
}
</script>

<style lang="scss">
.tab-content {
  width: 100%;
  height: calc(100% - 60px);
  .toolbox {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .table {
    width: 100%;
    height: calc(100% - 40px);
    position: relative;
    overflow: auto;
    .image-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      .image {
        width: 60px;
      }
    }
  }
  .pagination {
    float: right;
    margin-top: 20px;
  }
}
.el-table__body-wrapper {
  overflow-y: auto;
}
</style>
