<template>
  <div class="storyDetail" v-show="displayReady">
    <h2 style="margin-top: 20px">{{ storyDetail.story.title }}</h2>
    <p style="margin-top: 20px">
      <span style="margin-right: 30px"
        >点赞数：{{ storyDetail.story.like }}</span
      ><span>投币数：{{ storyDetail.story.collection }}</span>
    </p>
    <el-divider></el-divider>
    <el-collapse accordion style="margin-bottom: 20px">
      <el-collapse-item
        :title="item.title"
        v-for="(item, index) in storyDetail.story.fenzhi"
        :key="index"
      >
        <div class="">
          {{ item.content }}
        </div>
      </el-collapse-item>
    </el-collapse>
    <el-button @click="dialogFormVisible = true">续写故事</el-button>
    <el-button @click="storyHeart" :disabled="storyDetail.story.like >= 1"
      >关注</el-button
    >
    <el-button @click="useCoin">投币</el-button>
    <el-button @click="returnBack">返回</el-button>
    <el-divider></el-divider>
    <h3>可选分支</h3>
    <div class="xvxie">
      <el-card class="box-card" v-for="(item, index) in fenzhi" :key="index">
        <div slot="header" class="clearfix">
          <span>{{ item.title }}</span>
          <el-button
            @click="chooseIt(item)"
            style="float: right; padding: 3px 0"
            type="text"
            >投票</el-button
          >
        </div>
        <div class="text item">{{ item.content }}</div>
      </el-card>
      <el-dialog title="续写" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="故事内容" :label-width="formLabelWidth">
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入内容"
              v-model="form.textarea"
            >
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="fenzhiqueren">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  props: ["storyDetail"],
  data() {
    return {
      story: this.storyDetail.story,
      fenzhi: [
        {
          title: "分支1",
          content: "tets",
        },
      ],
      display: this.storyDetail.display,
      dialogFormVisible: false,
      form: {
        textarea: "",
      },
    };
  },
  methods: {
    useCoin() {
      this.$emit("useCoins", this.storyDetail.story);
    },
    storyHeart() {
      if (this.storyDetail.story.like < 1)
        this.$emit("storyHearts", this.storyDetail.story);
    },
    chooseIt(data) {
      const story = this.storyDetail.story;
      console.log(story);
      story.fenzhi[story.fenzhi.length] = {
        title: "片段" + story.fenzhi.length,
        content: data.content,
      };
      console.log(story);
      this.$emit("chooseIts", story);
      this.fenzhi = [];
    },
    test() {
      console.log(this.storyDetail);
    },
    fenzhiqueren() {
      this.dialogFormVisible = false;
      this.fenzhi[this.fenzhi.length] = {
        title: "分支" + (this.fenzhi.length + 1),
        content: this.form.textarea,
      };
      this.form.textarea = "";
    },
    returnBack() {
      let data = false;
      this.$emit("returnBacks", data);
    },
  },
  computed: {
    displayReady() {
      return this.storyDetail.display;
    },
  },
};
</script>

<style scoped>
.el-collapse-item__header {
  margin: 0 auto;
}
.xvxie {
  display: flex;
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
  width: 480px;
}
.storyDetail {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  height: calc(100vh - 60px);
  overflow: auto;
  position: absolute;
  top: 60px;
  width: 100%;
  padding: 0 10%;
}
</style>