import "./assets/main.css";
import router from "./router";

import { createApp } from "vue";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import DataVVue3Plugin from "@kjgl77/datav-vue3";
import * as echarts from "echarts";
import Vcharts from "vue-echarts";
import "animate.css";

import App from "./App.vue";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(ElementPlus);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(DataVVue3Plugin);
app.component("VChart", Vcharts);

app.mount("#app");
