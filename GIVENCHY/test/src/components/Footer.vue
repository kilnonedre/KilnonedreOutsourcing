<template>
  <div id="footer" class="container-fluid">
    <p class="title">北京XXX公司</p>
    <div class="address_tel_fax">
      <p>地址：西郊大厦 &emsp;西郊大厦</p>
      <span @click="call1">Tel:13888888888</span>
      <span @click="call2">Tel:13888888888</span>
      <p class="copy">Copyright &copy;2022北京XXX公司</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "Footer",
  data() {
    return {};
  },
  methods: {
    call1() {
      window.location.href = "tel:/" + 13888888888;
    },
    call2() {
      window.location.href = "tel:/" + 13888888888;
    }
  }
};
</script>
<style scoped>
@import "../assets/css/global.css";
</style>
