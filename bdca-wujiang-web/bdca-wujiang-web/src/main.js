import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'dayjs/locale/zh-cn';
import App from './App.vue'
import "./assets/scss/main.scss";
import router from '@/router'
import store from "@/store";

createApp(App).use(ElementPlus, { locale: zhCn, zIndex: 3000 }).use(router).use(store)
.mount('#app')
