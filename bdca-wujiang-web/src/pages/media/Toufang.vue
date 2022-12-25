<template>
  <div class="page order">
    <common-header title="投放计划"></common-header>
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
            ></el-input>
            <el-cascader
              v-model="lanmu"
              style="width: 250px; margin-right: 15px;"
              :props="{ checkStrictly: true }"
              :options="lanmuList"
              @change="changeLanmu"
              placeholder="一级/二级/三级"
              clearable
              filterable
            >
            </el-cascader>
            <el-date-picker
              v-model="datetime"
              type="daterange"
              start-placeholder="投放开始时间"
              end-placeholder="投放结束时间"
              style="width: 350px"
              @change="changeTime"
            />
          </div>
          <div class="right">
            <el-button type="primary" @click="addPutPlan">
              新增计划
            </el-button>
          </div>
        </div>
        <div class="table">
          <el-table
            ref="toufang"
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
            scrollbar-always-on
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
                  <!-- <el-image :style="imgStyle(scope.row)" lazy :src="baseUrl + scope.row[index]" :preview-src-list="srcList"> -->
                  <el-image class="image" lazy :src="baseUrl + scope.row[index]" :preview-src-list="srcList">
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
                <el-button size="small" type="text" @click="delPutPlan(scope.$index, scope.row)">删除</el-button>
                <el-button size="small" type="text" @click="editPutPlan(scope.$index, scope.row)">编辑</el-button>
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
          <el-form ref="toufangForm" :model="toufangForm" label-width="120px" label-position="left" :rules="toufangRules">
            <el-form-item label="投放位置筛选" prop="xmtColumnManageId">
              <el-cascader v-model="lanmu2" style="width: 100%" :options="lanmuList" @change="changeLanmu2" placeholder="一级/二级/三级栏目" />
            </el-form-item>
            <el-form-item label="投放节目名称" prop="programmeName">
              <el-input placeholder="投放节目名称" v-model="toufangForm.programmeName" />
            </el-form-item>
            <el-form-item label="类型" prop="type">
              <el-input placeholder="类型" v-model="toufangForm.type" />
            </el-form-item>
            <el-form-item label="平台" prop="platform">
              <el-input placeholder="平台" v-model="toufangForm.platform" />
            </el-form-item>
            <el-form-item class="upload" label="图片" prop="picturePath">
              <el-upload
                ref="upload"
                v-model:file-list="fileList"
                :action="baseUrl + '/api/v1/bdca/files'"
                accept="image/*"
                :limit="1"
                :on-exceed="handleExceed"
                :on-change="handleChange"
                :auto-upload="false"
                list-type="picture"
              >
                <el-button type="primary">上传图片</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item label="投放开始时间" prop="putStartTime">
              <el-date-picker
                v-model="toufangForm.putStartTime"
                type="date"
                placeholder="投放开始时间"
                style="width: 100%"
              />
            </el-form-item>
            <el-form-item label="投放结束时间" prop="putEndTime">
              <el-date-picker
                v-model="toufangForm.putEndTime"
                placeholder="投放结束时间"
                type="date"
                style="width: 100%"
              />
            </el-form-item>
            <el-form-item label="图片尺寸" prop="pictureSize">
              <el-input placeholder="图片尺寸" disabled v-model="toufangForm.pictureSize" />
            </el-form-item>
            <el-form-item label="备注" prop="remark">
              <el-input placeholder="备注" v-model="toufangForm.remark" />
            </el-form-item>
          </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="closeDialog">取消</el-button>
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
import { media, file } from '@api'

const header = {
  firstColumnName: {label: '一级栏目',width: '120'},
  secondColumnName: {label: '二级栏目',width: '150'},
  thirdColumnName: {label: '三级栏目',width: '150'},
  programmeName: {label: '节目名称',width: '150'},
  putStartTime: {label: '投放开始时间',width: '150'},
  putEndTime: {label: '投放结束时间',width: '150'},
  pictureSize: {label: '尺寸',width: '100'},
  picturePath: {label: '图片缩略', width: '120'},
  createTime: {label: '创建时间', width: '150'},
  updateTime: {label: '更新时间', width: '150'},
  createUserId: {label: '创建的用户id', width: '180'},
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
      lanmu2: '',
      firstColumnName: '',
      secondColumnName: '',
      thirdColumnName: '',
      datetime: '',
      dialogVisible: false,
      dialogTitle: '',
      baseUrl: window.config.baseUrl,
      srcList: [],
      fileForm: null,
      fileList: [],
      toufangForm: {
        id: '',
        xmtColumnManageId: '',
        programmeName: '',
        type: '',
        platform: '',
        picturePath: '',
        putStartTime: '',
        putEndTime: '',
        pictureSize: '',
        remark: '',
      },
      toufangRules: {
        xmtColumnManageId: [{ required: true, message: "请选择栏目位置", trigger: "blur" }],
        programmeName: [{ required: true, message: "请输入节目名称", trigger: "blur" }],
        // picturePath: [{ required: true, message: '请上传图片', trigger: "blur" }],
        putStartTime: [{ required: true, message: "请输入投放开始时间", trigger: "blur" }],
        pictureSize: [{ required: true, message: "请输入图片尺寸", trigger: "blur" }],
      },
      loading: false,
      tableHeader: header,
      tableData: [],
      ascs: '',
      descs: '',
      pageSize: 100,
      currentPage: 1,
      total: 1,
    }
  },
  // computed: {
  //   // 不建议使用，会导致表格变形严重
  //   imgStyle() {
  //     return (row) => {
  //       console.log(row);
  //       if(row.pictureSize) {
  //         let width = row.pictureSize.split(' x ')[0]
  //         let height = row.pictureSize.split(' x ')[1]
  //         return {
  //           width: width + 'px',
  //           height: height + 'px'
  //         }
  //       }
  //     }
  //   }
  // },
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
      media.getColumnPutPlan({
        programmeName: this.programmeName,
        firstColumnName: this.firstColumnName,
        secondColumnName: this.secondColumnName,
        thirdColumnName: this.thirdColumnName,
        putStartTime: this.datetime ? this.datetime[0].getTime() : '',
        putEndTime: this.datetime ? this.datetime[1].getTime() : '',
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
          this.$refs['toufang'].doLayout()
        })
      })
    },
    search() {
      this.currentPage = 1
      this.getTableList()
    },
    changeTime() {
      this.getTableList()
    },
    changeLanmu(e) {
      this.firstColumnName = e ? e[0] : ''
      this.secondColumnName = e && e.length > 1 ? e[1] : ''
      this.thirdColumnName = e && e.length > 2 ? e[2] : ''
      this.getTableList()
    },
    changeLanmu2(e) {
      for(let item of this.lanmuList){
        if(item.value == e[0]) {
          for(let innerItem of item.children) {
            if(innerItem.value == e[1]) {
              for(let innerItem2 of innerItem.children) {
                if(innerItem2.value == e[2]) {
                  this.toufangForm.xmtColumnManageId = parseInt(innerItem2.id)
                  this.toufangForm.pictureSize = innerItem2.size
                  break
                }
              }
            }
          }
        }
      }
    },
    addPutPlan() {
      this.dialogTitle = '新增计划'
      this.dialogVisible = true
    },
    editPutPlan(index, data) {
      this.dialogTitle = '编辑计划'
      this.dialogVisible = true
      let arr = []
      Object.keys(this.toufangForm).forEach((key) => {
        if(key === 'xmtColumnManageId') {
          this.toufangForm[key] = data[key] || this.toufangForm[key]
          // 展示投放位置
          for(let item of this.lanmuList) {
            if(item.label == data.firstColumnName) {
              arr.push(item.label)
              for(let innerItem of item.children) {
                if(innerItem.label == data.secondColumnName) {
                  arr.push(innerItem.label)
                  for(let innerItem2 of innerItem.children) {
                    if(innerItem2.label == data.thirdColumnName) {
                      arr.push(innerItem2.label)
                      this.lanmu2 = arr
                      break
                    }
                  }
                }
              }
            }
          }
        } else if(key === 'picturePath') {
          let file = {
            url: this.baseUrl + data[key]
          }
          this.fileList.push(file)
          this.toufangForm[key] = data[key] || this.toufangForm[key]
        } else if(key === 'putStartTime' || key === 'putEndTime') {
          if(data[key]) {
            this.toufangForm[key] = new Date(data[key])
          }
        } else {
          this.toufangForm[key] = data[key] || this.toufangForm[key]
        }
      })
    },
    delPutPlan(index, data) {
      this.$confirm(`您确定删除?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        media.delColumnPutPlan(data.id).then(() => {
          this.$message.success("删除成功")
          this.getTableList()
        });
      })
    },
    handleChange(file, fileList) {
      if(file.raw.type.indexOf("image/") == -1) {
        this.$message.warning("文件格式错误，请上传图片类型！")
        return false
      } else if(file.raw.type == 'image/gif'){
        let formData = new FormData()
        formData.append('file', file.raw , file.name)
        this.fileForm = formData
      } else {
        let _this = this

        let reader = new FileReader()
        reader.readAsDataURL(file.raw)
        reader.onload = function(event) {
          let image = new Image()
          let src = event.target.result
          image.src = src
          image.onload = function() {
            let targetWidth = _this.toufangForm.pictureSize ? _this.toufangForm.pictureSize.split(' x ')[0] : 1000
            let targetHeight =_this.toufangForm.pictureSize ? _this.toufangForm.pictureSize.split(' x ')[1] : 100

            let canvas = document.createElement('canvas')
            let context = canvas.getContext('2d')
            canvas.width = targetWidth
            canvas.height = targetHeight
            context.clearRect(0, 0, targetWidth, targetHeight)
            context.drawImage(image, 0, 0, targetWidth, targetHeight)
            let base64 = canvas.toDataURL('image')

            // base64 转 file
            let arr = base64.split(','), mime = arr[0].match(/:(.*?);/)[1],
            binary = atob(arr[1]), array = [];
            for(let i = 0; i < binary.length; i++) {
              array.push(binary.charCodeAt(i))
            }
            let imgBlob = new Blob([new Uint8Array(array)], {type: mime});
            let imgFile = new File([imgBlob], file.name)

            _this.fileForm = null
            let formData = new FormData()
            formData.append('file', imgFile , file.name)
            _this.fileForm = formData
          }
        }
      }
      if(fileList.length > 1){
        fileList.splice(0,1);
      }
    },
    handleExceed(exceedFiles) {
      this.$refs.upload.clearFiles()
      let file = exceedFiles[0]
      this.$refs.upload.handleStart(file)
    },
    submitFormData() {
      this.$refs['toufangForm'].validate(valid => {
        if(valid) {
          if(this.dialogTitle === '新增计划') {
            if(this.fileForm) {
              const loading = this.$loading({
                lock: true,
                text: '图片上传中...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
              });
              file.addFile(this.fileForm)
              .then((res) => {
                this.toufangForm.picturePath = res[0]
                this.fileForm = null
              })
              .then(() => {
                media.addColumnPutPlan({
                  xmtColumnManageId: this.toufangForm.xmtColumnManageId,
                  programmeName: this.toufangForm.programmeName,
                  type: this.toufangForm.type,
                  platform: this.toufangForm.platform,
                  picturePath: this.toufangForm.picturePath,
                  putStartTime: this.toufangForm.putStartTime ? this.toufangForm.putStartTime.getTime() : '',
                  putEndTime: this.toufangForm.putEndTime ? this.toufangForm.putEndTime.getTime() : '',
                  pictureSize: this.toufangForm.pictureSize,
                  remark: this.toufangForm.remark,
                })
                .then(() => {
                  loading.close();
                  this.dialogVisible= false
                  this.$message.success('新增计划成功!');
                  this.$refs['toufangForm'].resetFields()
                  this.lanmu2 = ''
                  this.getTableList()
                })
              })
            } else {
              this.$message.warning('请上传图片');
            }
          } else if (this.dialogTitle === '编辑计划') {
            if(this.fileForm) {
              const loading = this.$loading({
                lock: true,
                text: '图片上传中...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
              });
              file.addFile(this.fileForm)
              .then((res) => {
                this.toufangForm.picturePath = res[0]
                this.fileForm = null
              })
              .then(() => {
                media.editColumnPutPlan({
                  id: this.toufangForm.id,
                  xmtColumnManageId: this.toufangForm.xmtColumnManageId,
                  programmeName: this.toufangForm.programmeName,
                  type: this.toufangForm.type,
                  platform: this.toufangForm.platform,
                  picturePath: this.toufangForm.picturePath,
                  putStartTime: this.toufangForm.putStartTime ? this.toufangForm.putStartTime.getTime() : '',
                  putEndTime: this.toufangForm.putEndTime ? this.toufangForm.putEndTime.getTime() : '',
                  pictureSize: this.toufangForm.pictureSize,
                  remark: this.toufangForm.remark,
                }).then(() => {
                  loading.close();
                  this.dialogVisible = false
                  this.$message.success('编辑计划成功!');
                  this.$refs['toufangForm'].resetFields()
                  this.lanmu2 = ''
                  this.getTableList()
                })
              })
            } else {
              media.editColumnPutPlan({
                id: this.toufangForm.id,
                xmtColumnManageId: this.toufangForm.xmtColumnManageId,
                programmeName: this.toufangForm.programmeName,
                type: this.toufangForm.type,
                platform: this.toufangForm.platform,
                picturePath: this.toufangForm.picturePath,
                putStartTime: this.toufangForm.putStartTime ? this.toufangForm.putStartTime.getTime() : '',
                putEndTime: this.toufangForm.putEndTime ? this.toufangForm.putEndTime.getTime() : '',
                pictureSize: this.toufangForm.pictureSize,
                remark: this.toufangForm.remark,
              }).then(() => {
                this.$message.success('编辑计划成功!');
                this.dialogVisible = false
                this.$refs['toufangForm'].resetFields()
                this.lanmu2 = ''
                this.getTableList()
              })
            }
          }
        }
      });
    },
    closeDialog() {
      this.dialogVisible = false
      this.$refs['toufangForm'].resetFields()
      this.lanmu2 = ''
      this.fileForm = null
      this.fileList = []
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
.el-table__body-wrapper{
  overflow: auto;
}
</style>
