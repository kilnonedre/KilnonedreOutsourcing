<template>
  <div>
    <div id="root">
      <div v-for="item in swiperList" :key="item._id" class="item">
        <img class="itemImg" :src="item.content" />
        <div class="userInfo"><span class="username">现场实拍</span></div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      swiperList: [],
    };
  },
  beforeMount() {
    axios({
      method: "get",
      url: "http://47.108.173.62/home/FieldExample",
    }).then((data) => {
      data.data.map((data) => {
        data.content = "http://47.108.173.62/" + data.url;
      });
      this.swiperList = data.data;
    });
  },
};
</script>
<style scoped>
body {
  background: #e5e5e5;
}
#root {
  margin: 0 auto;
  width: 1200px;
  column-count: 5;
  column-width: 240px;
  column-gap: 20px;
}
.item {
  margin-bottom: 10px;
  break-inside: avoid;
  background: #fff;
}
.item:hover {
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
}
.itemImg {
  width: 100%;
  vertical-align: middle;
}
.itemImg:hover {
  box-shadow: 0 0 10px #0000001a;
  border-radius: 2%;
}
.userInfo {
  padding: 5px 10px;
}
.avatar {
  vertical-align: middle;
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.username {
  margin-left: 5px;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
}
@media screen and (max-width: 768px) {
  #root {
    margin: 10px auto;
    width: 370px;
    column-count: 1;
    column-width: 240px;
    column-gap: 0;
  }
}
@media screen and (min-width: 768px) and (max-width: 996px) {
  #root {
    margin: 0 auto;
    width: 700px;
    column-count: 5;
    column-width: 240px;
    column-gap: 10px;
  }
}
</style>
