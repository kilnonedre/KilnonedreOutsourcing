import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
import HomePage from "@/view/HomePage.vue";
import AdminPage from "@/view/AdminPage.vue";
const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    name: "home",
    component: HomePage,
    meta: {
      title: "云南楚业建筑工程有限公司"
    }
  },
  {
    path: "/admin",
    name: "admin",

    component: AdminPage,
    meta: {
      title: "云南楚业建筑工程有限公司"
    }
  },

  {
    path: "/admin/carousel",
    name: "carousel",
    component: () => import("@/view/carousel.vue"),
    meta: {
      title: "carousel"
    }
  },
  {
    path: "/admin/reinforcementDesign",
    name: "reinforcementDesign",
    component: () => import("@/view/AdminExample.vue"),
    meta: {
      title: "carousel"
    }
  },
  {
    path: "/admin/fieldExample",
    name: "fieldExample",
    component: () => import("@/view/fieldExample.vue"),
    meta: {
      title: "fieldExample"
    }
  },
  {
    path: "/admin/AdminDatePicker",
    name: "AdminDatePicker",
    component: () => import("@/view/AdminDatePicker.vue"),
    meta: {
      title: "AdminDatePicker"
    }
  },
  {
    path: "/admin/WorkChance",
    name: "WorkChance",
    component: () => import("@/view/WorkChance.vue"),
    meta: {
      title: "WorkChance"
    }
  },

  {
    path: "/Login",
    name: "Login",
    component: () => import("@/view/Login.vue"),
    meta: {
      title: "Login"
    }
  },

  {
    path: "/Example",
    name: "Example",
    component: () => import("../view/Example.vue"),
    meta: {
      title: "工程案例"
    },
    children: [
      {
        path: "/Example",
        redirect: "/Example/ReinforcementDesign"
      },
      {
        path: "/Example/ReinforcementDesign",
        name: "Example_ReinforcementDesign",
        component: () => import("@/view/ReinforcementDesign.vue"),
        meta: {
          title: "工程案例丨加固设计"
        }
      },
      {
        path: "/Example/Construction",
        name: "Example_Construction",
        component: () => import("@/view/Construction"),
        meta: {
          title: "工程案例丨加固施工"
        }
      },
      {
        path: "/Example/shejishigon",
        name: "Example_shejishigon",
        component: () => import("@/view/shejishigon"),
        meta: {
          title: "工程案例丨加固设计施工"
        }
      },
      {
        path: "/Example/newDesign",
        name: "Example_newDesign",
        component: () => import("@/view/newDesign"),
        meta: {
          title: "工程案例丨新建设计"
        }
      },
      {
        path: "/Example/newCustra",
        name: "Example_newCustra",
        component: () => import("@/view/newCustra"),
        meta: {
          title: "工程案例丨新建施工"
        }
      }
    ]
  },
  {
    path: "/service",
    name: "service",
    component: () => import("@/view/Service"),
    meta: {
      title: "现场实例"
    }
  },
  {
    path: "/newsinformation",
    name: "newsinformation",
    component: () => import("@/view/NewsInformation"),
    meta: {
      title: "公司动态"
    }
  },
  {
    path: "/companyintroduction",
    name: "companyintroduction",
    component: () => import("@/view/CompanyIntroduction"),
    meta: {
      title: "公司介绍"
    }
  },
  {
    path: "/jobchance",
    name: "jobchance",
    component: () => import("@/view/JobChance"),
    meta: {
      title: "工作机会"
    }
  },
  {
    path: "/contactus",
    name: "contactus",
    component: () => import("@/view/ContactUs"),
    meta: {
      title: "联系我们"
    }
  }
];
const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});
export default router;
