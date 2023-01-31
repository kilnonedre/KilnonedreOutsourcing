<template>
  <div id="JobChance">
    <div class="banner container-fuild text-center">工作机会</div>
    <div class="container">
      <div
        class="JobChance-container wow pulse"
        v-for="item in data"
        :key="item._id"
      >
        <h2>岗位：{{ item.title }}</h2>
        <p>岗位职责：{{ item.content }}</p>
        <p>任职要求：{{ item.need }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { WOW } from "wowjs";
export default {
  name: "JobChance",
  data() {
    return { data: [] };
  },
  mounted() {
    var wow = new WOW({ live: false });
    wow.init();
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
  margin: 100px;
  padding: 30px;
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
</style>
