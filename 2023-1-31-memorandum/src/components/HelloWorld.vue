<template>
  <el-container>
    <el-header>
      <div class="bodyHead">
        <div class="bodyHead__left">
          <div>便签</div>
          <div>
            <el-button icon="el-icon-refresh" @click="clearData"></el-button><el-button icon="el-icon-edit"
              @click="openEdit"></el-button>
          </div>
        </div>
        <div class="bodyHead__right">
          <el-dropdown @command="handleCommand">
            <div class="header-right">
              <el-avatar>
                <img src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" alt />
              </el-avatar>
              <span>{{ user[0].userAccount }}</span>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-edit" command="a">修改密码</el-dropdown-item>
              <el-dropdown-item icon="el-icon-s-fold" command="b">退出系统</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </el-header>
    <el-container>
      <el-aside>
        <div class="bodyAside">
          <div class="bodyAside__header">
            <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="input">
            </el-input>
            <el-select v-model="value" placeholder="请选择" width="10px">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="bodyAside__main">
            <div>
              <div class="bodyAside__main__card" v-for="item in nodeList0" :key="item._id" @click="showDetail(item)"
                @dblclick="deleteItem(item)" v-show="
                  item.category == value || value == '全部' || value == ''
                ">
                <div>
                  <i :class="{
                    'el-icon-collection': item.category == '学习类',
                    'el-icon-ice-tea': item.category != '学习类'
                  }"></i><span>{{ item.title }}</span>
                </div>
                <div>
                  <el-rate :value="item.star" :colors="starColors" disabled text-color="#ff9900">
                  </el-rate>
                  <div>
                    {{ item.bulidTime.substring(0, 10) }}
                    <el-checkbox :checked="item.isDone" @change="isDone(item)"></el-checkbox>
                  </div>
                </div>
              </div>
              <div class="bodyAside__main__card isDone" v-for="item in nodeList1" :key="item._id"
                @click="showDetail(item)" @dblclick="deleteItem(item)" v-show="
                  item.category == value || value == '全部' || value == ''
                ">
                <div>
                  <i :class="{
                    'el-icon-collection': item.category == '学习类',
                    'el-icon-ice-tea': item.category == '生活类'
                  }"></i><span>{{ item.title }}</span>
                </div>
                <div>
                  <el-rate :value="item.star" :colors="starColors" disabled text-color="#ff9900">
                  </el-rate>
                  <div>
                    {{ item.bulidTime.substring(0, 10) }}
                    <el-checkbox :checked="item.isDone" disabled></el-checkbox>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bodyAside__footer"></div>
        </div>
      </el-aside>
      <el-dialog title="新的笔记" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="标题" :label-width="formLabelWidth">
            <el-input v-model="form.title" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="类别" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="请选择类别">
              <el-option v-for="(item, index) in options.slice(1)" :label="item.label" :value="item.value"
                :key="index"></el-option>
            </el-select>
            <el-button @click="addOptions" plain>添加分类</el-button>
          </el-form-item>
          <el-form-item label="进度" :label-width="formLabelWidth">
            <el-slider v-model="form.schedule"></el-slider>
          </el-form-item>
          <el-form-item label="优先级" :label-width="formLabelWidth">
            <el-rate v-model="form.star" :colors="starColors"> </el-rate>
          </el-form-item>
          <el-form-item label="预计完成时间" :label-width="formLabelWidth">
            <el-date-picker v-model="form.data" type="datetime" format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="内容" :label-width="formLabelWidth">
            <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="form.content">
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="createMemo" :disabled="
            form.title == '' ||
            form.region == '' ||
            !form.star ||
            form.data == '' ||
            form.content == ''
          ">确 定</el-button>
        </div>
      </el-dialog>
      <el-main>
        <div class="bodyMain">
          <div class="bodyMain__card" ref="box">
            <div class="bodyMain__card__line bodyMain__card__head">
              <div>
                <div></div>
                <div>{{ nodeDetail.bulidTime }}</div>
              </div>
              <div style="padding-right: 20px">
                {{ nodeDetail.length != 0 ? nodeDetail.length : '' }}
              </div>
            </div>
            <div class="bodyMain__card__line">
              <div>
                <div></div>
                <div>
                  <h2>{{ nodeDetail.title }}</h2>
                </div>
              </div>
            </div>
            <div class="bodyMain__card__line">
              <div>
                <div></div>
                <div style="width: 40vw; display: flex; align-items: center" v-show="isShow">
                  <div style="font-size: 14px; font-weight: bold">进度：</div>
                  <el-slider v-model="schedule" style="width: calc(100% - 48px)"
                    :disabled="nodeDetail.isDone == 1"></el-slider>
                </div>
              </div>
            </div>
            <div class="bodyMain__card__line" v-show="isShow">
              <div>
                <div></div>
                <div style="font-size: 14px; font-weight: bold">
                  <span>预计完成时间：{{ nodeDetail.esrimatedFinishTime }}</span>
                  <span style="margin-left: 30px">实际完成时间：{{
                    nodeDetail.finishedTime == '' ? '暂未完成' :
                      nodeDetail.finishedTime
                  }}</span>
                </div>
              </div>
            </div>
            <div class="bodyMain__card__line" v-for="(item, index) in nodesplice" :key="index">
              <div>
                <div></div>
                <div>{{ item }}</div>
              </div>
            </div>
          </div>
        </div>
        <button @click="test">1</button>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HelloWorld',
  props: ['user'],
  data () {
    return {
      input: '',
      value: '',
      options: [
        {
          value: '全部',
          label: '全部'
        },
        {
          value: '学习类',
          label: '学习类'
        },
        {
          value: '生活类',
          label: '生活类'
        }
      ],
      schedule: 0,
      fonts: 0,
      isShow: false,
      lines: 0,
      interval: null,
      nodeList0: [],
      nodeList1: [],
      nodesplice: [],
      nodeDetail: [],
      starColors: ['#99A9BF', '#F7BA2A', '#FF9900'],
      dialogFormVisible: false,
      form: {
        title: '',
        region: '',
        schedule: 0,
        star: null,
        data: '',
        content: ''
      },
      formLabelWidth: '120px'
    }
  },
  beforeMount () {
    this.options = [
      {
        value: '全部',
        label: '全部'
      }
    ]
    axios.get(`http://localhost:3000/nodeList?username=${this.user[0].userAccount}`).then(data => {
      data.data.map(item => {
        let opt = false
        for (let i = 0; i < this.options.length; i++) {
          if (this.options[i].value == item.category)
            opt = true
        }
        if (!opt) {
          this.options[this.options.length] = {
            value: item.category,
            label: item.category
          }
        }
      })
      data.data.reverse()
      data.data.sort(this.compare('star'))
      this.nodeList0 = data.data.filter(item => {
        return item.isDone == 0
      })
      this.nodeList1 = data.data.filter(item => {
        return item.isDone == 1
      })
    })
  },
  mounted () {
    this.fonts = Math.floor(this.$refs.box.clientWidth / 16) - 4
    this.nodesplice.length = Math.floor(this.$refs.box.clientHeight / 60) - 3
    this.lines = Math.floor(this.$refs.box.clientHeight / 60) - 4
    this.value = '1'
    this.interval = null
    this.interval = setInterval(() => {
      this.nodeList0.map(data => {
        const curDate = new Date()
        const curDateTommorow = new Date(curDate.getTime() + 24 * 60 * 60 * 1000) // 当前时间戳
        const curDateTommorowTime = this.format(curDateTommorow)
        const curWeek = new Date()
        const curWeekTommorow = new Date(curWeek.getTime() + 7 * 24 * 60 * 60 * 1000) // 当前时间戳
        const curWeekTommorowTime = this.format(curWeekTommorow)
        if (curDateTommorowTime == data.esrimatedFinishTime) {
          alert('还有一件事要做，距离截止时间只有一天，别忘记了    “' + data.title + '"')
        }
        if (curWeekTommorowTime == data.esrimatedFinishTime) {
          alert('还有一件事要做，距离截止时间只有一周，别忘记了    “' + data.title + '"')
        }
      })
    }, 1000)
    setTimeout(() => {
      this.value = ''
    }, 1)
  },
  methods: {
    addOptions () {
      var person = prompt("请输入新的分类");
      if (person != null && person != "") {
        this.options[this.options.length] = {
          value: person,
          label: person
        }
        this.dialogFormVisible = false
      }
    },
    test () {
      console.log(this.nodeList0[0].esrimatedFinishTime - '24:00:00')
    },
    clearData () { this.nodeDetail = [], this.isShow = false, this.nodesplice = [], this.nodesplice.length = Math.floor(this.$refs.box.clientHeight / 60) - 3 },
    deleteItem (data) {
      axios.post('http://localhost:3000/itemDelete', {
        _id: data._id,
        username: this.user[0].userAccount,
      }).then(data => {
        data.data.reverse()
        data.data.sort(this.compare('star'))
        this.nodeList0 = data.data.filter(item => {
          return item.isDone == 0
        })
        this.nodeList1 = data.data.filter(item => {
          return item.isDone == 1
        })
      })
      this.clearData()
    },
    isDone (data) {
      let t = new Date().getTime() // 当前时间戳
      let time = this.format(t)
      axios.post('http://localhost:3000/isDoneChange', {
        _id: data._id,
        username: this.user[0].userAccount,
        finishedTime: time
      }).then(data => {
        data.data.reverse()
        data.data.sort(this.compare('star'))
        this.nodeList0 = data.data.filter(item => {
          return item.isDone == 0
        })
        this.nodeList1 = data.data.filter(item => {
          return item.isDone == 1
        })
      })
      this.$forceUpdate()
    },
    compare (property) {
      return function (obj1, obj2) {
        var value1 = obj1[property]
        var value2 = obj2[property]
        return value2 - value1 // 升序
      }
    },
    showDetail (data) {
      this.nodeDetail = data
      this.nodeDetail.length = `共 ${data.content.length} 字`
      let t = Math.floor(data.content.length / this.fonts) + 1
      this.nodesplice = []
      let splic = []
      for (let i = 0; i < t; i++) {
        splic[i] = this.nodeDetail.content.substr(i * this.fonts, this.fonts)
      }
      this.nodesplice = splic
      if (this.nodesplice.length < this.lines) {
        this.nodesplice.length = this.lines
      }
      this.isShow = true
      this.schedule = this.nodeDetail.schedule
    },
    handleCommand (command) {
      if (command == 'a') {
        var password = prompt("请输入新密码", "");
        if (password != null && password != "") {
          axios.post('http://localhost:3000/updata', {
            userEmail: this.user[0].userEmail,
            userPassword: password
          }).then(data => {
            console.log(data.data)
          })
        }
      }
      if (command == 'b') {
        this.$emit('logout', false)
      }
    },
    format (date) {
      if (!date) return
      var date2 = new Date(date)
      var y = date2.getUTCFullYear()
      var m = date2.getMonth() + 1
      m = m < 10 ? '0' + m : m
      var d = date2.getDate()
      d = d < 10 ? '0' + d : d
      var h = date2.getHours()
      h = h < 10 ? '0' + h : h
      var minute = date2.getMinutes()
      minute = minute < 10 ? '0' + minute : minute
      var seconds = date2.getSeconds() //获取当前毫秒数（0 - 999）
      seconds = seconds < 10 ? '0' + seconds : seconds
      return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + seconds
    },
    createMemo () {
      let t = new Date().getTime() // 当前时间戳
      let time = this.format(t)
      axios.post('http://localhost:3000/node', {
        username: this.user[0].userAccount,
        title: this.form.title,
        category: this.form.region,
        schedule: this.form.schedule,
        star: this.form.star,
        esrimatedFinishTime: this.form.data,
        content: this.form.content,
        isDone: 0,
        bulidTime: time,
        finishedTime: ''
      }).then(data => {
        data.data.reverse()
        data.data.sort(this.compare('star'))
        this.nodeList0 = data.data.filter(item => {
          return item.isDone == 0
        })
        this.nodeList1 = data.data.filter(item => {
          return item.isDone == 1
        })
      })
      this.dialogFormVisible = false
    },
    openEdit () {
      this.clean()
      this.dialogFormVisible = true
    },
    clean () {
      this.form.title = ''
      this.form.region = ''
      this.form.schedule = 0
      this.form.star = null
      this.form.data = ''
      this.form.content = ''
    }
  },
  watch: {
    schedule: function () {
      axios.post('http://localhost:3000/scheduleChange', {
        _id: this.nodeDetail._id,
        schedule: this.schedule,
        username: this.user[0].userAccount
      }).then(data => {
        data.data.reverse()
        data.data.sort(this.compare('star'))
        this.nodeList0 = data.data.filter(item => {
          return item.isDone == 0
        })
        this.nodeList1 = data.data.filter(item => {
          return item.isDone == 1
        })
      })
    },
    input: function () {
      axios.post('http://localhost:3000/searchItem', {
        partTitle: this.input,
        username: this.user[0].userAccount
      }).then(data => {
        data.data.reverse()
        data.data.sort(this.compare('star'))
        this.nodeList0 = data.data.filter(item => {
          return item.isDone == 0
        })
        this.nodeList1 = data.data.filter(item => {
          return item.isDone == 1
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@mixin flex {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.bodyHead {
  @include flex;
  justify-content: flex-start;

  >div {
    &:nth-child(1) {
      width: 30vw;
    }

    &:nth-child(2) {
      width: 70vw;
    }
  }

  &__left {
    height: 60px;
    @include flex;
    justify-content: space-between;
    padding: 10px;
  }

  &__right {
    height: 60px;
    @include flex;
    justify-content: flex-end;
    padding: 10px;

    >div {
      >div {
        &:nth-child(1) {
          >span {
            vertical-align: middle;

            &:nth-child(1) {
              margin-right: 10px;
            }
          }
        }
      }
    }
  }
}

.el-rate {
  padding-top: 10px;
}

.isDone {
  background-color: #808080;
  border-top: 1px solid white !important;
}

.bodyAside {
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  height: calc(100vh - 60px);

  &__header {
    @include flex;
    height: 60px;

    >.el-input {
      width: 60%;
    }

    >.el-select {
      width: 35%;
    }
  }

  &__main {
    height: calc(100% - 120px);
    padding: 0 10px;
    overflow: auto;

    >div {
      height: 100%;
    }

    &__card {
      @include flex;
      transition: 0.2s;
      justify-content: space-between;
      height: 60px;
      padding: 0 10px;
      border-top: 1px solid gray;
      cursor: pointer;

      &:last-child {
        border-bottom: 1px solid gray;
      }

      &:hover {
        background-color: gray;
      }

      >div {
        &:nth-child(1) {
          @include flex;
          justify-content: flex-start;

          span {
            display: inline-block;
            width: calc(30vw - 300px);
            text-align: left;
            padding-left: 5px;
            overflow: hidden; //超出的文本隐藏
            text-overflow: ellipsis; //溢出用省略号显示
            white-space: nowrap; //溢出不换行
          }
        }

        &:nth-child(2) {
          @include flex;

          .el-rate {
            padding-top: 1px;
          }
        }
      }
    }
  }

  &__footer {
    height: 60px;
    background-color: #b2c0d0;
  }
}

.bodyMain {
  background-color: #ffffff;
  height: 100%;

  &__card {
    min-height: 100%;
    background-color: #fffcf7;

    &__line {
      @include flex;
      justify-content: space-between;
      height: 60px;
      border-bottom: 1px solid #e4e1dc;

      >div {
        @include flex;

        >div {
          &:nth-child(1) {
            width: 20px;
            background-color: #f7f4ed;
            height: 60px;
            border-right: 1px solid #e4e1dc;
            border-bottom: 1px solid #e4e1dc;
          }

          &:nth-child(2) {
            line-height: 60px;
            padding-left: 20px;
          }
        }
      }
    }

    &__head {
      color: #b0a38f;
    }
  }
}

.el-header {
  padding: 0;
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  width: 30vw !important;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  height: calc(100vh - 60px);
}
</style>
