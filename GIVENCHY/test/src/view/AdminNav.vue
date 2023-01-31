<template>
  <div id="nav">
    <div><router-link to="/admin/carousel">轮播图</router-link></div>
    <div><router-link to="/admin/reinforcementDesign">实例</router-link></div>

    <div @click="router('fieldExample')">图</div>
    <div><router-link to="/admin/AdminDatePicker">公司动态</router-link></div>
    <div>
      <router-link to="/admin/WorkChance">工作机会</router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: "AdminNav",
  methods: {
    router(data) {
      this.$router.push(`/admin/${data}`);
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}
#nav {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  width: 16vw;
  height: calc(100vh - 60px);
  font-size: 1.5vw;
  padding: 1vw;
}
#nav > div {
  padding: 10px 0;
}

#nav > div:hover {
  background-color: #b3c0d1;
}
</style>