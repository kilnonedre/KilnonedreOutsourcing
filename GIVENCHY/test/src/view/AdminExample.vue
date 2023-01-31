<template>
  <div id="Software" class="container">
    <div class="row">
      <div id="left" class="col-md-4 col-xs-12">
        <ul class="left-container wow bounceInLeft">
          <p>案例类型</p>
          <li
            v-for="(item, index) in softwareList"
            :key="index"
            @click="changeForm(item.name)"
          >
            {{ item.name }}
          </li>
        </ul>
        <div class="inputButton">
          <el-input v-model="data" placeholder="请输入内容"></el-input>
          <el-button
            type="success"
            icon="el-icon-check"
            circle
            @click="subData"
          ></el-button>
        </div>
      </div>
      <div id="right" class="col-md-8 col-xs-12 wow bounceInRight">
        <div id="smartTown">
          <h2>{{ formTitle }}案例</h2>
          <table>
            <tr>
              <td>序号</td>
              <td>项目地点</td>
              <td>操作</td>
            </tr>
            <tr v-for="item in table" :key="item._id">
              <td>{{ item.num }}</td>
              <td>{{ item.pro1 }}</td>
              <td>
                <el-button type="danger" plain @click="delectData(item._id)"
                  >删除</el-button
                >
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { WOW } from "wowjs";
import Header from "@/components/Header.vue";
import axios from "axios";
export default {
  components: { Header },
  name: "Example",
  data() {
    return {
      data: "",
      formTitle: "加固设计",
      softwareList: [
        { path: 1, name: "加固设计" },
        { path: 2, name: "加固施工" },
        { path: 3, name: "加固设计施工" },
        { path: 4, name: "新建设计" },
        { path: 5, name: "新建施工" },
      ],
      table: [],
    };
  },
  mounted() {
    var wow = new WOW({ live: false });
    wow.init();
  },
  methods: {
    changeForm(data) {
      console.log(1);
      this.formTitle = data;
      let url = "";
      if (this.formTitle == "加固设计") {
        url = "ReinforcementDesign";
      } else if (this.formTitle == "加固施工") {
        url = "ReinforcementConstruction";
      } else if (this.formTitle == "加固设计施工") {
        url = "ReinforcementDesignAndConstruction";
      } else if (this.formTitle == "新建设计") {
        url = "NewDesign";
      } else if (this.formTitle == "新建施工") {
        url = "NewConstruction";
      }
      axios({
        method: "get",
        url: `http://47.108.173.62/home/${url}`,
      }).then((data) => {
        this.table = data.data;
      });
    },
    subData() {
      let url = "";
      if (this.formTitle == "加固设计") {
        url = "reinforcementDesign";
      } else if (this.formTitle == "加固施工") {
        url = "reinforcementConstruction";
      } else if (this.formTitle == "加固设计施工") {
        url = "reinforcementDesignAndConstruction";
      } else if (this.formTitle == "新建设计") {
        url = "newDesign";
      } else if (this.formTitle == "新建施工") {
        url = "newConstruction";
      }
      axios({
        method: "post",
        url: "http://47.108.173.62/dataChange",
        data: {
          url: url,
          data: this.data,
        },
      }).then((data) => {
        axios({
          method: "get",
          url: `http://47.108.173.62/home/${data.data}`,
        }).then((data) => {
          this.table = data.data;
        });
      });
    },
    delectData(id) {
      let url = "";
      if (this.formTitle == "加固设计") {
        url = "ReinforcementDesign";
      } else if (this.formTitle == "加固施工") {
        url = "ReinforcementConstruction";
      } else if (this.formTitle == "加固设计施工") {
        url = "ReinforcementDesignAndConstruction";
      } else if (this.formTitle == "新建设计") {
        url = "NewDesign";
      } else if (this.formTitle == "新建施工") {
        url = "NewConstruction";
      }
      axios({
        method: "delete",
        url: `http://47.108.173.62/admin/deleteData`,
        data: {
          url: url,
          id: id,
        },
      }).then((data) => {
        axios({
          method: "get",
          url: `http://47.108.173.62/home/${data.data}`,
        }).then((data) => {
          this.table = data.data;
        });
      });
    },
  },
};
</script>
<style scoped>
.inputButton {
  width: 60%;
  margin: 0 auto;
  display: flex;
  margin-top: 20px;
}
table {
  width: 100%;
}
table th {
  width: 100%;
}
table tr:nth-child(1) td {
  font-weight: bold;
  font-size: 2em;
}
td {
  font-size: 1.5em;
  text-align: center;
  line-height: 2.5em;
}
tr:nth-child(n + 2) {
  border-top: 1px solid #ebeef5;
}
tr:last-child {
  border-bottom: 1px solid #ebeef5;
}
table tr td:nth-child(1),
table th td:nth-child(1) {
  width: calc(780px * 0.25);
}
table tr td:nth-child(2),
table th td:nth-child(2) {
  width: 45%;
}
table tr td:nth-child(3),
table th td:nth-child(3) {
  width: 30%;
}
#smartTown > h2 {
  text-align: center;
  margin-bottom: 50px;
}
#left {
  margin: 50px 0;
}
.left-container {
  width: 60%;
  margin: 0 auto;
  border: 1px solid #262627;
  border-radius: 5px;
}
.left-container > p {
  text-align: center;
  line-height: 45px;
  padding: 0;
  margin: 0;
  background: #262627;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
}
.left-container > li {
  text-align: center;
  height: 38px;
  line-height: 38px;
  margin: 0;
  border-top: 1px solid #474747;
}
.left-container > li > a {
  text-decoration: none;
}
.left-container > li:hover {
  background: #928989;
}
#right {
  padding: 50px 0;
  height: calc(100vh - 60px);
  overflow: auto;
}
@media screen and (max-width: 768px) {
  #right {
    padding: 15px;
  }
}
</style>
