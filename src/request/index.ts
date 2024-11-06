import axios from "axios";
import globalConfig from "@/global.config";
import { ElMessage } from "element-plus";
import storageUtils from "@/utils/storageUtils";
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
    const token = storageUtils.getItem("user_token");
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
    } else if (status === 1) {
      ElMessage.error(message);
    }
    return res.data.data;
  },
  (error) => {
    return Promise.reject(new Error(error));
  }
);

export default http;
