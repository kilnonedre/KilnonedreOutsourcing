import axios from "axios";
import { ElMessage } from "element-plus";
import router from "@/router";

const service = axios.create({
  baseURL: window.config.baseUrl,
  withCredentials: true,
  // timeout: 5000, // 请求超时时间
});

// request拦截器
service.interceptors.request.use(
  config => {
    if (["post", "put", "delete"].includes(config.method)) {
      config.headers["Content-Type"] = "application/json";
      config.headers["Access-Control-Allow-Credentials"] = true;
      if (config.type === "form") config.headers["Content-Type"] = "multipart/form-data";
      else if (config.type === "formData") {
        config.headers["Content-Type"] = "application/x-www-form-urlencoded";
        config.transformRequest = [
          function (data) {
            let ret = "";
            for (let it in data) {
              ret += encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
            }
            return ret;
          },
        ];
      } else config.data = JSON.stringify(config.data);
    }
    if(config.method == 'get') {
      let str = '?'
      for(let i in config.data) {
        if(config.data[i] !== '' && config.data[i] !== null && config.data[i] !== undefined) {
          str += i + '=' + config.data[i] + '&'
        }
      }
      str = str.slice(0, -1)
      config.url += str
    }
    return config;
  },
  error => {
    console.log(error);
    Promise.reject(error);
  }
);

// respone拦截器
service.interceptors.response.use(
  response => {
    if (response.status == 200 || response.status == 201 || response.status == 204)
      return response.data;
  },
  error => {
    switch (error.response.status) {
      case 0:
        ElMessage.error("登陆超时，请重新登陆！");
        setTimeout(() => {
          router.replace({
            path: "/login",
          });
        }, 1000);
        break;
      case 400:
        ElMessage.error(error.response.data.message);
        break;
      case 401:
        ElMessage.error("登陆超时，请重新登陆！");
        setTimeout(() => {
          router.replace({
            path: "/login",
            query: {
              redirect: router.currentRoute.fullPath,
            },
          });
        }, 1000);
        break;
      case 403:
        ElMessage.error("您的权限不足！");
        setTimeout(() => {
          router.replace({
            path: "/login",
            query: {
              redirect: router.currentRoute.fullPath,
            },
          });
        }, 1000);
        break;
      case 404:
        ElMessage.error("请求的页面不存在！");
        break;
      case 406:
        ElMessage.error(error.response.data.message);
        break;
      default:
        ElMessage.error(error.response.data.message);
    }
    return Promise.reject(error.response.data.message);
  }
);

export default service;
