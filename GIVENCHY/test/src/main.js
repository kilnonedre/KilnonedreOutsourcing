import Vue from "vue";
import App from "./App";
/* 路由 */
import router from "./router";
/* swiper */
// import 'swiper/dist/css/swiper.min.css';
/* 重置样式 */
import "./assets/css/reset.min.css";

/* jquery */
// import 'jquery'

/* bootstarp */
import "./assets/js/bootstrap.min";

/* animate.css */
import "animate.css";

import {
  Table,
  TableColumn,
  Button,
  Input,
  Upload,
  DatePicker,
  Dialog
} from "element-ui";
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Button);
Vue.use(Input);
Vue.use(Upload);
Vue.use(DatePicker);
Vue.use(Dialog);

/* 头部组件 */
import Header from "./components/Header";
Vue.component(Header.name, Header);

// /* 尾部组件 */
import Footer from "./components/Footer";
Vue.component(Footer.name, Footer);

// /* 回到顶部 */
import GoTop from "./components/GoTop";
Vue.component(GoTop.name, GoTop);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
