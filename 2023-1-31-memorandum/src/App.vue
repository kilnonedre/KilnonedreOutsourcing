<template>
  <div id="app">
    <HelloWorld v-if="isShow" :user="user" @logout="logout" />
    <loginAndSignUp @login="login" v-if="!isShow" />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import loginAndSignUp from "./components/loginAndSignUp.vue";

export default {
  name: "App",
  data () {
    return {
      user: [],
      isShow: false
    }
  },
  components: {
    HelloWorld,
    loginAndSignUp
  },
  methods: {
    login (data) {
      this.user = data
      this.isShow = true
    },
    logout (data) {
      this.isShow = data
    }
  }
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  font-size: 16px;
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  border-radius: 3px;
  background: rgba(0, 0, 0, 0.06);
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.08);
}

/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background: rgba(0, 0, 0, 0.12);
  -webkit-box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
}
</style>