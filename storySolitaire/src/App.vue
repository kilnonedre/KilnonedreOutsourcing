<template>
  <div id="app">
    <bodyContent :userNow="userNow" @logOut="logOut" />
    <loginAndSignUp :user="user" @addNewAccount="addNewAccount" @isShow="isShow" :ddd="ddd"
      :style="{ display: isShows }" />
  </div>
</template>

<script>
import bodyContent from "./components/bodyContent.vue";
import loginAndSignUp from "./components/loginAndSignUp.vue";
import user from "./data/user.json";

export default {
  name: "App",
  components: {
    bodyContent,
    loginAndSignUp,
  },
  data () {
    return {
      user: user,
      isShows: "block",
      userNow: {},
      ddd: true
    };
  },
  methods: {
    logOut () {
      this.isShows = "block";
    },
    addNewAccount (data) {
      this.user.users.push(data);
      this.userNow = data;
      this.isShows = "none";
    },
    isShow (data) {
      this.userNow = data.user;
      this.isShows = data.display;
    },
  },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

li {
  list-style: none;
}
</style>
