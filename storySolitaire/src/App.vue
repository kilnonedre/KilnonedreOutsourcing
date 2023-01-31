<template>
  <div id="app">
    <bodyContent />
  </div>
</template>

<script>
import bodyContent from "./components/bodyContent.vue";

export default {
  name: "App",
  components: {
    bodyContent,
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
