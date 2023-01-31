<template>
  <div id="app">
    <Header v-show="!istrue" />
    <AdminHeader v-show="istrue" />
    <div v-bind:class="{ main: istrue }">
      <AdminNav v-show="istrue" />
      <keep-alive> <router-view /></keep-alive>
    </div>
    <Footer v-show="!istrue" />
    <Login />
  </div>
</template>
<style scoped>
.main {
  display: flex;
}
</style>
<script>
import AdminHeader from "./view/AdminHeader";
import AdminNav from "./view/AdminNav";
import Login from "./view/Login";
export default {
  name: "App",
  components: {
    AdminHeader,
    AdminNav,
    Login,
  },
  methods: {},
  computed: {
    istrue() {
      return window.location.href.includes("admin");
    },
  },
};
</script>
