<template>
  <el-container>
    <el-header>
      <div @click="test">小说接龙</div>
      <div>
        <ul class="navList">
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1" @click="dialogFormVisible = true">创建小说</el-menu-item>
            <el-menu-item index="5" @click="manage" :style="{ display: isShow }">管理小说</el-menu-item>
            <el-submenu index="2">
              <template slot="title">小说分类</template>
              <el-menu-item index="2-1">全部</el-menu-item>
              <el-menu-item index="2-2">恐怖</el-menu-item>
              <el-menu-item index="2-3">言情</el-menu-item>
            </el-submenu>
            <!-- <el-menu-item index="3" disabled>消息中心</el-menu-item> -->
            <el-menu-item index="4" @click="dialogHeartVisible = true">我的关注</el-menu-item>
            <el-dropdown>
              <el-submenu index="6">
                <template slot="title">
                  <div class="block">
                    <el-avatar :size="30" src="https://pic.imgdb.cn/item/6268b070239250f7c5f9e3e9.jpg"></el-avatar>
                  </div>
                </template>
                <el-menu-item index="6-1" @click="dialogMessageVisible = 'true'">个人信息</el-menu-item>
                <el-menu-item index="6-2" @click="changeWallet">钱包</el-menu-item>
                <el-menu-item index="6-3" @click="logOut">退出</el-menu-item>
              </el-submenu>
            </el-dropdown>
            <el-menu-item index="8" v-if='false'>硬币：{{ Coins }}</el-menu-item>
          </el-menu>
        </ul>
      </div>
    </el-header>
    <el-dialog :visible.sync="dialogMessageVisible">
      <el-descriptions title="用户信息">
        <el-descriptions-item label="用户名">{{
          userdata.username
        }}</el-descriptions-item>
        <el-descriptions-item label="手机号">{{
          userdata.userPhone
        }}</el-descriptions-item>
        <el-descriptions-item label="居住地">{{
          userdata.userLocal
        }}</el-descriptions-item>
        <el-descriptions-item label="性别">
          {{ userdata.userSexy }}
        </el-descriptions-item>
        <el-descriptions-item label="联系地址">{{
          userdata.userConnect
        }}</el-descriptions-item>
      </el-descriptions>
      <span slot="footer" class="dialog-footer">
        <el-button type="info" plain @click="changeMessage">修改信息</el-button>
      </span>
    </el-dialog>
    <el-dialog title="我的关注" :visible.sync="dialogHeartVisible">
      <table class="deleteTable">
        <tr>
          <td>id</td>
          <td>名称</td>
          <td>分类</td>
          <td>操作</td>
        </tr>
        <tr v-for="(item, index) in storiesHeart" :key="index">
          <td>{{ item._id }}</td>
          <td>{{ item.title }}</td>
          <td>{{ item.region }}</td>
          <td>
            <el-button type="success" icon="el-icon-search" @click="showStory(item)"></el-button>
            <el-button type="danger" icon="el-icon-delete" @click="removeStory(item)"></el-button>
          </td>
        </tr>
      </table>
    </el-dialog>
    <el-dialog title="小说详情" :visible.sync="dialogTableVisible">
      <table class="deleteTable">
        <tr>
          <td>id</td>
          <td>名称</td>
          <td>分类</td>
          <td>操作</td>
        </tr>
        <tr v-for="(item, index) in stories" :key="index">
          <td>{{ item._id }}</td>
          <td>{{ item.title }}</td>
          <td>{{ item.region }}</td>
          <td @click="deleteStory(item._id)">
            <el-button type="danger" icon="el-icon-delete"></el-button>
          </td>
        </tr>
        <tr v-for="(item, index) in branchingStory" :key="index">
          <td>{{ item._id }}</td>
          <td>{{ item.title }}</td>
          <td>{{ item.region }}</td>
          <td @click="deleteStorys(item._id)">
            <el-button type="danger" icon="el-icon-delete"></el-button>
          </td>
        </tr>
      </table>
    </el-dialog>
    <el-dialog title="创建你的故事" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="故事名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="故事分类" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择故事分类">
            <el-option v-for="(item, index) in storieCategory" :key="index" :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="故事内容" :label-width="formLabelWidth">
          <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="form.textarea">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="buildStory" :disabled="
          !(form.textarea != '' && form.name != '' && form.region != '')
        ">确 定</el-button>
      </div>
    </el-dialog>
    <el-main>
      <div class="single">
        <el-card class="box-card" v-for="(item, index) in stories" :key="index" @change="changeSelect"
          :style="{ display: displayChoose(item.region) }">
          <div slot="header" class="clearfix">
            <span>{{ item.title }}</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="storyDetaill(item)">详情</el-button>
          </div>
          <div v-for="(item, index) in item.fenzhi" :key="index" class="text item">
            {{ item.title }}
          </div>
        </el-card>

        <el-card class="box-card" v-for="(item, index) in branchingStory" :key="index" @change="changeSelect"
          :style="{ display: displayChoose(item.region) }">
          <div slot="header" class="clearfix">
            <span>{{ item.title }}</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="storyDetaills(item)">详情</el-button>
          </div>
          <div class="showstory">
            {{ item.fenzhi.content }}
          </div>
        </el-card>
      </div>
    </el-main>
    <storyDetail :storyDetail="storyDetail" @returnBacks="returnBacks" @chooseIts="chooseIts" @storyHearts="storyHearts"
      @useCoins="useCoins" />
    <storyDetails :storyDetail="storyDetails" @returnBackss="returnBackss" @storyHeartss="storyHeartss"
      @useCoinss="useCoinss" />
  </el-container>
</template>

<script>
import branchingStory from "../data/branchingStory.json";
import storyDetail from "./storyDetail.vue";
import storyDetails from "./storyDetails.vue";
export default {
  name: "bodyContent",
  props: ["userNow"],
  components: {
    storyDetail,
    storyDetails,
  },
  data () {
    return {
      storyDetails: {
        display: false,
        story: {},
      },
      branchingStory: branchingStory.stories,
      userdata: {
        username: "kooriookami",
        userPhone: "18100000000",
        userSexy: "男",
        userLocal: "苏州市",
        userConnect: "江苏省苏州市吴中区吴中大道 1188 号",
      },
      user: this.userNow,
      Coins: 100,
      activeIndex: "1",
      classify: [""],
      storiesManage: [],
      storiesHeart: [],
      filter: "",
      stories: [
        {
          _id: "00000001",
          like: 0,
          collection: 0,
          mark: "single",
          title: "test1",
          region: "恐怖",
          fenzhi: [
            {
              title: "原文",
              content: "fenzhi1",
            },
          ],
        },
      ],
      storyDetail: {
        display: false,
        story: {
          title: "",
          region: "",
          fenzhi: [],
        },
      },
      dialogFormVisible: false,
      dialogTableVisible: false,
      dialogHeartVisible: false,
      dialogMessageVisible: false,
      form: {
        name: "",
        region: "",
        textarea: "",
      },
      formLabelWidth: "120px",
      storieCategory: [
        { label: "恐怖", value: "kongbu" },
        { label: "言情", value: "yanqing" },
      ],
    };
  },
  computed: {
    displayChoose () {
      return function (data) {
        if (this.filter == "") return "block";
        else if (data == this.filter) return "block";
        else return "none";
      };
    },
    isShow () {
      return this.userNow.account == "admin" ? "block" : "none";
    },
  },
  methods: {
    storyDetaills (data) {
      this.storyDetails.display = true;
      this.storyDetails.story = data;
    },
    logOut () {
      this.$emit("logOut", "ok");
    },
    changeWallet () {
      var person = prompt("请输入新的钱包地址");
      if (person != null && person != "") {
        this.Coins = Math.ceil(Math.random() * 100 + 100);
      }
    },
    changeMessage () {
      var username = prompt("请输入新的用户名", this.userdata.username);
      if (username != null && username != "") {
        this.userdata.username = username;
        var userphone = prompt("请输入新的手机号", this.userdata.userPhone);
        if (userphone != null && userphone != "") {
          this.userdata.userPhone = userphone;
          var usersexy = prompt("请输入新的性别", this.userdata.userSexy);
          if (usersexy != null && usersexy != "") {
            this.userdata.userSexy = usersexy;
            var userlocal = prompt("请输入新的居住地", this.userdata.userLocal);
            if (userlocal != null && userlocal != "") {
              this.userdata.userLocal = userlocal;
              var userconnect = prompt(
                "请输入新的手机号",
                this.userdata.userConnect
              );
              if (userconnect != null && userconnect != "") {
                this.userdata.userConnect = userconnect;
              }
            }
          }
        }
      }
    },
    messageShow () {
      console.log(0);
    },
    test () {
      console.log(this.user);
      console.log(this.userNow);
    },
    useCoins (data) {
      this.stories.map((item) => {
        if (data._id === item._id) item.collection++;
      });
      this.Coins--;
    },
    useCoinss (data) {
      this.branchingStory.map((item) => {
        if (data._id === item._id) item.collection++;
      });
      this.Coins--;
    },
    removeStory (data) {
      this.stories.map((item) => {
        if (data._id === item._id) item.like--;
      });
      for (let i = 0; i < this.storiesHeart.length; i++) {
        if (data._id === this.storiesHeart[i]._id)
          this.storiesHeart.splice(i, 1);
      }
      console.log(this.storiesHeart);
    },
    changeSelect () {
      this.$forceUpdate(); // 强制刷新
    },
    showStory (data) {
      this.storyDetail.display = true;
      this.storyDetail.story = data;
    },
    storyHearts (data) {
      this.stories.map((item) => {
        if (data._id === item._id) item.like++;
      });
      this.storiesHeart.push(data);
    },
    storyHeartss (data) {
      console.log(data);
      this.branchingStory.map((item) => {
        if (data._id === item._id) item.like++;
      });
      this.storiesHeart.push(data);
    },
    chooseIts (data) {
      for (let i = 0; i < this.stories.length; i++) {
        if (this.stories[i]._id == data._id) {
          this.stories[i] = data;
        }
      }
      this.$forceUpdate();
    },
    returnBacks (data) {
      this.storyDetail.display = data;
    },
    returnBackss (data) {
      this.storyDetails.display = data;
    },
    buildStory () {
      this.dialogFormVisible = false;
      this.stories[this.stories.length] = {
        _id: Math.ceil(Math.random() * 100000000) + "",
        like: 0,
        collection: 0,
        title: this.form.name,
        region: this.form.region == "kongbu" ? "恐怖" : "言情",
        fenzhi: [
          {
            title: "原文",
            content: this.form.textarea,
          },
        ],
      };
      this.form.name = "";
      this.form.region = "";
      this.form.textarea = "";
    },
    handleSelect (key, keyPath) {
      console.log(key, keyPath);
      if (key == "2-1") this.filter = "";
      if (key == "2-2") this.filter = "恐怖";
      if (key == "2-3") this.filter = "言情";
    },
    storyDetaill (data) {
      this.storyDetail.display = true;
      this.storyDetail.story = data;
    },
    manage () {
      this.storiesManage = this.stories;
      this.dialogTableVisible = true;
    },
    deleteStory (id) {
      for (let i = 0; i < this.stories.length; i++) {
        if (this.stories[i]._id === id) {
          this.stories.splice(i, 1);
        }
      }
    },
    deleteStorys (id) {
      for (let i = 0; i < this.branchingStory.length; i++) {
        if (this.branchingStory[i]._id === id) {
          this.branchingStory.splice(i, 1);
        }
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.deleteTable {
  width: 100%;
}

.deleteTable tr:nth-child(1) td {
  font-weight: bold;
  font-size: large;
}

.item {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.navList {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  height: calc(100vh - 60px);
  overflow: auto;
}

.single {
  display: flex;
  flex-wrap: wrap;
}

body>.el-container {
  margin-bottom: 40px;
}

.showstory {
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.box-card {
  width: 25%;
}
</style>

