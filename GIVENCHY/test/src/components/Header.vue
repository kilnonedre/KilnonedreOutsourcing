<template>
  <!-- 头部整体盒子 -->
  <div id="header" class="container-fuild">
    <!-- 头部顶部 -->
    <div class="header-top container-fuild hidden-xs">
      <div class="container">
        <div class="server pull-left">
          <span class="glyphicon glyphicon-earphone"></span
          ><span @click="call1">13888888888</span>
          <span class="glyphicon glyphicon-earphone"></span
          ><span @click="call2">13888888888</span>
          <span class="glyphicon glyphicon-time"></span
          >上午：9：00--12：00，下午：2：00--17：30；
        </div>
      </div>
    </div>
    <!-- 电脑导航 -->
    <div class="header-nav container hidden-xs">
      <!-- 导航logo -->
      <div class="header-nav-logo" @click="goToindex(0, '首页')">
        <img src="../assets/img/logo.png" />
      </div>
      <!-- 导航内容 -->
      <ul class="header-nav-wrapper">
        <li
          v-for="(item, index) in navList"
          :key="index"
          :class="index == navIndex ? 'active' : ''"
          @click="navClick(index, item.name)"
        >
          <router-link :to="item.path">
            {{ item.name }}
            <span
              v-if="item.children.length > 0"
              class="glyphicon glyphicon-menu-down"
            ></span>
            <i class="underline"></i>
          </router-link>
          <dl v-if="item.children.length > 0">
            <dt v-for="(i, n) in item.children" :key="n">
              <router-link :to="i.path">{{ i.name }}</router-link>
            </dt>
          </dl>
        </li>
      </ul>
    </div>
    <!-- 手机导航 -->
    <div class="header-nav-m container-fuild visible-xs">
      <div class="header-nav-m-logo">
        <img class="center-block" src="@/assets/img/logo.png" alt="logo" />
      </div>
      <!-- 导航栏 -->
      <div class="header-nav-m-menu text-center">
        {{ menuName }}
        <div
          class="header-nav-m-menu-wrapper"
          data-toggle="collapse"
          data-target="#menu"
          @click="menuClick"
        >
          <span :class="menuClass"></span>
        </div>
        <!-- 导航内容 -->
        <ul id="menu" class="header-nav-m-wrapper collapse">
          <li
            v-for="(item, index) in navList"
            :key="index"
            :class="index == navIndex ? 'active' : ''"
            @click="navClick(index, item.name)"
            data-toggle="collapse"
            data-target="#menu"
          >
            <router-link :to="item.path">
              {{ item.name }}
              <i class="underline"></i>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Header",
  data() {
    return {
      navIndex: sessionStorage.getItem("navIndex")
        ? sessionStorage.getItem("navIndex")
        : 0,
      menuName: "首页",
      menuClass: "glyphicon glyphicon-menu-down",
      navList: [
        {
          name: "首页",
          path: "/",
          children: [],
        },
        {
          name: "工程实例",
          path: "/Example",
          children: [
            {
              name: "加固设计",
              path: "/Example/ReinforcementDesign",
            },
            {
              name: "加固施工",
              path: "/Example/Construction",
            },
            {
              name: "加固设计施工",
              path: "/Example/shejishigon",
            },
            {
              name: "新建设计",
              path: "/Example/newDesign",
            },
            {
              name: "新建施工",
              path: "/Example/newCustra",
            },
          ],
        },
        {
          name: "现场实例",
          path: "/service",
          children: [],
        },
        {
          name: "公司动态",
          path: "/newsinformation",
          children: [],
        },
        {
          name: "公司介绍",
          path: "/companyintroduction",
          children: [],
        },
        {
          name: "工作机会",
          path: "/jobchance",
          children: [],
        },
        {
          name: "联系我们",
          path: "/contactus",
          children: [],
        },
        {
          name: "内部",
          path: "/admin",
          children: [],
        },
      ],
    };
  },
  methods: {
    goToindex(index, name) {
      sessionStorage.clear();
      this.navIndex = index;
      window.sessionStorage.setItem("navIndex", index);
      this.menuName = name;
      this.$router.push("/").catch((err) => {
        return err;
      });
    },
    call1() {
      window.location.href = "tel:/" + 13888888888;
    },
    call2() {
      window.location.href = "tel:/" + 13888888888;
    },
    navClick(index, name) {
      sessionStorage.clear();
      this.navIndex = index;
      window.sessionStorage.setItem("navIndex", index);
      this.menuName = name;
      if (name == "内部") {
        location.reload();
      }
    },
    menuClick() {
      if (this.menuClass == "glyphicon glyphicon-menu-down") {
        this.menuClass = "glyphicon glyphicon-menu-up";
      } else {
        this.menuClass = "glyphicon glyphicon-menu-down";
      }
    },
  },
};
</script>
<style scoped>
@import "../assets/css/global.css";
</style>
