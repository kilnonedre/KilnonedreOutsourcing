<template>
  <div id="ca">
    <div>
      <div class="inputFile">
        <form
          id="article"
          action="http://47.108.173.62/upload-avatar"
          method="post"
          enctype="multipart/form-data"
          onsubmit="return false"
        >
          <input
            type="file"
            id="realInputFile"
            name="inputFile"
            style="display: none"
            @change="uploadAvatar"
          />
        </form>
        <div id="personalInformation">
          <div
            style="
              background-image: url('https://www.kilnonedreblog.net/upload/avatar/kilnoneblogAvatar.jpg');
            "
          ></div>
          <p></p>
        </div>
        <div></div>
        <div>
          <img src="" id="previewing" />
          <div id="fakeInputFile" @click="fakeInputFile">
            <img src="../img/image1.png" alt="" srcset="" />
          </div>
        </div>
        <div>
          <div></div>
          <div></div>
        </div>
        <div>
          <p></p>
        </div>
      </div>
      <div
        class="dataPresentationShow"
        v-for="item in swiperList"
        :key="item._id"
      >
        <div><img :src="item.content" alt="" /></div>
        <div>
          <div>占位0504</div>
          <div>
            <div>2022-05-04 22:57:13</div>
            <div>已锁定</div>
            <ul class="articleOperate">
              <li>
                <el-button type="danger" plain @click="deleteImg(item._id)"
                  >删除</el-button
                >
              </li>
            </ul>
          </div>
          <div style="font-size: 12px">赞</div>
        </div>
      </div>
    </div>
  </div>
</template>
  <script>
import axios from "axios";

export default {
  name: "carousel",
  data() {
    return {
      swiperList: [],
    };
  },
  methods: {
    fakeInputFile() {
      var realInputFile = document.getElementById("realInputFile");
      realInputFile.click();
    },
    uploadAvatar() {
      const realInputFile = document.getElementById("realInputFile");
      const article = document.getElementById("article");
      let data = new FormData(article);
      article.submit(data);
      // location.reload();
    },
    deleteImg(id) {
      console.log(id);
      axios({
        method: "delete",
        url: "http://47.108.173.62/admin/deleteImg",
        data: {
          id: id,
        },
      }).then(() => {
        console.log(1);
        axios({
          method: "get",
          url: "http://47.108.173.62/home/corsurl",
        }).then((data) => {
          data.data.map((data) => {
            data.content = "http://47.108.173.62/" + data.content;
          });
          this.swiperList = data.data;
        });
      });
    },
  },
  beforeMount() {
    axios({
      method: "get",
      url: "http://47.108.173.62/home/corsurl",
    }).then((data) => {
      data.data.map((data) => {
        data.content = "http://47.108.173.62/" + data.content;
      });
      this.swiperList = data.data;
    });
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}
#ca {
  background-color: #fafafa;
  width: 84vw;
}
#ca > div {
  overflow: auto;
  margin: 0 auto;
  background-color: #ffffff;
  width: 55vw;
  height: calc(100vh - 60px);
  padding: 20px;
}
.inputFile {
  width: 23.5vw;
  min-height: 16vw;
  background-color: #ffffff;
  border-radius: 8px;
  border: 1px solid #cbd0d8;
  padding: 10px;
  box-sizing: border-box;
}

.inputFile > div:nth-child(2) > div {
  width: 4vw;
  height: 2vw;
  border-radius: 15px;
  float: left;
  background-color: black;
}

.inputFile > div:nth-child(2) > p {
  line-height: 30px;
  float: left;
  color: #99a6c4;
  padding-left: 5px;
}

.inputFile > div:nth-child(2)::after {
  content: "";
  display: block;
  clear: both;
}

.inputFile > div:nth-child(3) {
  width: 100%;
  height: 2vw;
  background-color: #f4f5f7;
  margin: 5px 0;
}

.inputFile > div:nth-child(4) {
  width: 23vw;
  height: 6vw;
  margin-left: -10px;
  background-color: #f4f5f7;
  position: relative;
  overflow: hidden;
}

.inputFile > div:nth-child(4) > div {
  width: 3vw;
  height: 3vw;
  background-color: rgba(128, 128, 128, 0.5);
  position: absolute;
  right: 0;
  bottom: 0;
  cursor: pointer;
}

.inputFile > div:nth-child(4) > div > img {
  width: 100%;
}

.inputFile > div:nth-child(4) > img {
  position: absolute;
}

.inputFile > div:nth-child(5) > div {
  width: 100%;
  height: 15px;
  margin: 5px 0;
  background-color: #f4f5f7;
}

.inputFile > div:nth-child(6) > p {
  font-size: 14px;
  color: #99a6c4;
}

.dataPresentationShow {
  width: 100%;
  min-height: 140px;
  border-radius: 4px;
  padding: 20px;
  box-sizing: border-box;
  border-bottom: 1px solid #e7e7e7;
  overflow: hidden;
}

.dataPresentationShow::after {
  content: "";
  display: block;
  clear: both;
}

.dataPresentationShow img {
  width: 100%;
}

.dataPresentationShow > div:nth-child(1) {
  border-radius: 4px;
  width: 154px;
  height: 96px;
  background-color: black;
  float: left;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}

.dataPresentationShow > div:nth-child(2) {
  float: right;
  min-width: calc(100% - 180px);
}

.dataPresentationShow > div:nth-child(2) > div:nth-child(1) {
  height: 24px;
  line-height: 24px;
  font-size: 16px;
  color: #212121;
}

.dataPresentationShow > div:nth-child(2) > div:nth-child(2) {
  padding: 12px 0;
  font-size: 14px;
  color: #505050;
}

.dataPresentationShow > div:nth-child(2) > div:nth-child(2)::after {
  content: "";
  display: block;
  clear: both;
}

.dataPresentationShow > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) {
  float: left;
  font-size: 14px;
  color: #505050;
  line-height: 32px;
  padding-right: 24px;
  border-right: 1px solid #e7e7e7;
}

.dataPresentationShow > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) {
  font-size: 14px;
  line-height: 16px;
  padding-left: 24px;
  max-width: 330px;
  float: left;
}

.dataPresentationShow > div:nth-child(2) > div:nth-child(2) > ul {
  float: right;
}

.dataPresentationShow > div:nth-child(2) > div:nth-child(2) > ul::after {
  content: "";
  display: block;
  clear: both;
}

.dataPresentationShow > div:nth-child(2) > div:nth-child(2) > ul > li {
  width: 84px;
  height: 32px;
  border-radius: 2px;
  font-size: 14px;
  color: #505050;
  margin-right: 12px;
  box-sizing: border-box;
  line-height: 28px;
  text-align: center;
  float: right;
}
</style>

