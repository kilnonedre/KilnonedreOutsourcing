<template>
  <div class="block">
    <el-input v-model="comName" placeholder="请输入公司名称"></el-input>
    <el-input
      type="textarea"
      :rows="4"
      placeholder="请输入公司介绍"
      v-model="comIntroduce"
    >
    </el-input>
    <div class="work">
      <el-input v-model="workName" placeholder="请输入岗位"></el-input>
      <el-input v-model="workNeed" placeholder="请输入岗位职责"></el-input>
      <el-input v-model="workHave" placeholder="请输入任职要求"></el-input>
    </div>
    <el-button type="primary" plain @click="test">确认</el-button>
    <div class="container">
      <div
        class="JobChance-container wow pulse"
        v-for="item in data"
        :key="item._id"
        @click="deleteWork(item._id)"
      >
        <h2>岗位：{{ item.title }}</h2>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      comName: "",
      comIntroduce: "",
      workName: "",
      workNeed: "",
      workHave: "",
      data: [],
    };
  },
  methods: {
    deleteWork(id) {
      axios({
        method: "delete",
        url: "http://47.108.173.62/admin/WorkIntroduction-delete",
        data: {
          id: id,
        },
      }).then(() => {
        axios({
          method: "get",
          url: `http://47.108.173.62/home/WorkIntroduction`,
        }).then((data) => {
          this.data = data.data;
        });
      });
    },
    test() {
      axios({
        method: "post",
        url: `http://47.108.173.62/admin/CompanyIntroduction`,
        data: {
          comName: this.comName,
          comIntroduce: this.comIntroduce,
        },
      }).then((data) => {
        axios({
          method: "get",
          url: `http://47.108.173.62/home/CompanyIntroduction`,
        }).then((data) => {
          this.comName = data.data[0].name;
          this.comIntroduce = data.data[0].content;
        });
      });
      axios({
        method: "post",
        url: `http://47.108.173.62/admin/WorkIntroduction`,
        data: {
          workName: this.workName,
          workNeed: this.workNeed,
          workHave: this.workHave,
        },
      }).then((data) => {
        axios({
          method: "get",
          url: `http://47.108.173.62/home/WorkIntroduction`,
        }).then((data) => {
          this.data = data.data;
        });
      });
    },
  },
  mounted() {
    axios({
      method: "get",
      url: `http://47.108.173.62/home/CompanyIntroduction`,
    }).then((data) => {
      this.comName = data.data[0].name;
      this.comIntroduce = data.data[0].content;
    });
    axios({
      method: "get",
      url: `http://47.108.173.62/home/WorkIntroduction`,
    }).then((data) => {
      this.data = data.data;
    });
  },
};
</script>

<style scoped>
.work {
  width: 30%;
}
.el-input {
  width: 100%;
  margin: 10px 0;
}
.container {
  height: 30vh;
  overflow: auto;
}
.banner {
  color: #fff;
  font-size: 30px;
  height: 150px;
  line-height: 150px;
  background-image: url("~@/assets/img/banner_2.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: scroll;
  background-position: center center;
}
.JobChance-container {
  margin: 10px;
  padding: 10px;
  transition: all ease 0.5s;
  border: 1px dashed salmon;
}
.JobChance-container h2 {
  color: #ff6613;
  font-weight: bolder;
  text-align: center;
}
.JobChance-container p {
  font-size: 20px;
  color: #ff6613;
  font-weight: 700;
}
.JobChance-container ol {
  list-style-type: decimal;
  padding-left: 30px;
}
.JobChance-container ol > li {
  font-size: 14px;
  line-height: 2.7rem;
}
@media screen and (max-width: 997px) {
  .JobChance-container {
    margin: 20px 0;
    padding: 20px;
    border: 1px dashed salmon;
  }
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