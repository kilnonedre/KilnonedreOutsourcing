<template>
  <div class="block">
    <el-date-picker v-model="value1" type="date" placeholder="选择日期">
    </el-date-picker>
    <el-input v-model="input" placeholder="介绍内容"></el-input>
    <el-button type="primary" plain @click="test">确认</el-button>
    <div id="NewsInformation">
      <div class="container">
        <div class="container text-center">
          <h3>公司动态</h3>
          <p style="color: #b2b2b2">Company News</p>
        </div>
        <div class="nav container text-center">
          <a href="#" class="active">公司历程</a>
        </div>
        <ul class="news-container container-fuild">
          <li
            v-for="(item, index) in data"
            :key="index"
            class="wow fadeIn"
            @click="deleteData(item._id)"
          >
            <div class="content">
              <p>{{ item.introduce }}</p>
            </div>
            <div class="time">
              <p>{{ item.data }}</p>
              <span>{{ item.year }}</span>
            </div>
            <div class="circle">
              <img
                src="data:image/png;base64,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"
              />
              <i class="line center-block"></i>
            </div>
          </li>
        </ul>
        <div class="contaianer-fuild text-center more">
          <i class="glyphicon glyphicon-th"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      value1: "",
      input: "",
      data: [],
    };
  },
  methods: {
    deleteData(id) {
      console.log(id);
      axios({
        method: "delete",
        url: "http://47.108.173.62/admin/deleteDataAdminDatePicker",
        data: {
          id: id,
        },
      }).then(() => {
        axios({
          method: "get",
          url: `http://47.108.173.62/admin/AdminDatePicker`,
        }).then((data) => {
          this.data = data.data;
          console.log(this.data);
        });
      });
    },
    test() {
      var d = this.value1;
      var year = d.getFullYear();
      var month = d.getMonth() + 1; // 记得当前月是要+1的
      month = month < 10 ? "0" + month : month;
      var dt = d.getDate();
      dt = dt < 10 ? "0" + dt : dt;
      var today = year + "-" + month + "-" + dt;
      axios({
        method: "post",
        url: `http://47.108.173.62/admin/AdminDatePicker`,
        data: {
          data: today,
          introduce: this.input,
        },
      }).then(() => {
        axios({
          method: "get",
          url: `http://47.108.173.62/admin/AdminDatePicker`,
        }).then((data) => {
          this.data = data.data;
          console.log(this.data);
        });
      });
    },
  },
  mounted() {
    axios({
      method: "get",
      url: `http://47.108.173.62/admin/AdminDatePicker`,
    }).then((data) => {
      this.data = data.data;
      console.log(this.data);
    });
  },
};
</script>

<style scoped>
.el-input {
  width: 30%;
}
.block {
  width: 1100px;
  margin: 0 auto;
  padding: 20px 0;
}
#smartTown > h2 {
  text-align: center;
  margin-bottom: 50px;
}
.news-container {
  height: 50vh;
  overflow: auto !important;
}
::v-deep .el-table_5_column_10 {
  width: 10px;
}
.nav {
  margin: 20px 0;
}
.nav > a {
  display: inline-block;
  text-decoration: none;
  width: 120px;
  height: 45px;
  line-height: 45px;
  color: #333;
  border: 1px solid #333;
}
.nav > a.active {
  color: #1e73be;
  border-color: #1e73be;
}
.nav > a:hover {
  color: #1e73be;
  border-color: #1e73be;
}
.news-container {
  overflow: hidden;
  margin-bottom: 0;
}
.news-container > li {
  width: 55.6%;
  height: 120px;
  float: left;
  color: #333;
  text-align: right;
  border-left: 1px solid transparent;
  border-right: 1px solid transparent;
}
.news-container > li:hover {
  color: #1e73be;
  border: 1px solid #1e73be;
  cursor: pointer;
}
.news-container > li:nth-of-type(2n) {
  float: right;
  text-align: left;
}
.news-container > li > .content {
  width: 60%;
  float: left;
  padding: 20px 0;
}
.news-container > li > .time {
  width: 20%;
  float: left;
  padding: 10px 0;
}
.news-container > li > .time > p {
  font-size: 30px;
  margin: 5px 0;
}
.news-container > li > .circle {
  width: 20%;
  height: 100%;
  float: left;
  position: relative;
}
.news-container > li > .circle > img {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 20px;
  height: 20px;
}
.news-container > li > .circle > i {
  display: block;
  width: 1px;
  height: 100%;
  background: #707070;
}
.news-container > li:nth-of-type(2n) > .content {
  float: right;
}
.news-container > li:nth-of-type(2n) > .time {
  float: right;
}
.news-container > li:nth-of-type(2n) > .circle {
  float: right;
}
.news-container > li:nth-of-type(1) > .circle > i {
  height: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
}
.more {
  font-size: 25px;
  color: #707070;
}
.more > i {
  cursor: pointer;
}
@media screen and (max-width: 767px) {
  .news-container > li {
    width: 100%;
  }
  .news-container > li > .content {
    width: 70%;
    text-align: left;
    float: right;
  }
  .news-container > li > .time {
    width: 30%;
    text-align: left;
    float: right;
  }
  .news-container > li > .circle {
    display: none;
  }
}
#NewsInformation {
  padding: 20px 0;
}
</style>