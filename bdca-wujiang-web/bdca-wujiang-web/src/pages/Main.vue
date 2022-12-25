<template>
  <el-container>
    <el-aside width="300px">
      <common-aside></common-aside>
    </el-aside>
    <el-main>
      <router-view v-slot="{ Component }">
        <transition name="component-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </el-main>
  </el-container>
</template>

<script setup>
import CommonAside from "#/CommonAside.vue";
</script>

<style lang="scss" scoped>
.el-container {
  width: 100%;
  height: 100vh;
  background: #f0f2f5 url("../assets/img/bg.png") left bottom no-repeat;
  background-size: 500px 500px;
  padding: 24px 24px 24px 0;
  overflow: scroll;
  .el-aside {
    height: 100%;
  }
  .el-main {
    width: 100%;
    min-width: 920px;
    height: 100%;
    background-color: #fff;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.08);
    border-radius: 16px;
    padding: 0;
    overflow: hidden;
  }
}
.component-fade-enter-active,
.component-fade-leave-active {
  transition: 0.1s;
}

.component-fade-enter-from,
.component-fade-leave-to {
  opacity: 0;
  transform: translateX(10px);
}
</style>
