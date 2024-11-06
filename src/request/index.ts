import axios from "axios";
import globalConfig from "@/global.config";
import { ElMessage } from "element-plus";
import router from "@/router";

const http = axios.create({
  baseURL: "/api",
  timeout: 3000,
  responseType: "json",
});

//请求拦截器
http.interceptors.request.use(
  (config) => {
    const whiteList = globalConfig.whiteListApi;
    const url = config.url;
    const token = localStorage.getItem("token");
    if (whiteList.indexOf(url) === -1 && token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(new Error(error));
  }
);

//响应拦截器
http.interceptors.response.use(
  (res) => {
    const status = res.data.code;
    const message = res.data.message;
    if (status === 401) {
      ElMessage.error(message);
      router.push("/login");
      return Promise.reject(new Error(message));
    } else if (status === 1) {
      ElMessage.error(message);
      return Promise.reject(new Error(message));
    }
    return res.data;
  },
  (error) => {
    return Promise.reject(new Error(error));
  }
);

export default http;
