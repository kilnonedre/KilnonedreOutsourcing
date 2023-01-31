<template>
  <div>
    <div id="Software" class="container">
      <div class="row">
        <div id="left" class="col-md-4 col-xs-12">
          <ul class="left-container wow bounceInLeft">
            <p>案例类型</p>
            <li v-for="(item, index) in softwareList" :key="index">
              <router-link :to="item.path">{{ item.name }}</router-link>
            </li>
          </ul>
        </div>
        <div id="right" class="col-md-8 col-xs-12 wow bounceInRight">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { WOW } from "wowjs";
import Header from "@/components/Header.vue";
export default {
  components: { Header },
  name: "Example",
  data() {
    return {
      softwareList: [
        { path: "/Example/ReinforcementDesign", name: "加固设计" },
        { path: "/Example/Construction", name: "加固施工" },
        { path: "/Example/shejishigon", name: "加固设计施工" },
        { path: "/Example/newDesign", name: "新建设计" },
        { path: "/Example/newCustra", name: "新建施工" }
      ]
    };
  },
  mounted() {
    var wow = new WOW({ live: false });
    wow.init();
  }
};
</script>
<style scoped>
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
}
@media screen and (max-width: 768px) {
  #right {
    padding: 15px;
  }
}
</style>
