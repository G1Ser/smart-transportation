import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import { asideData } from "@/type/dashboard";
import router from "@/router";
export const useRouterStore = defineStore("router-store", () => {
  const TreeMenuData = ref<asideData[]>();
  const getMenuData = async () => {
    const res = await axios.get("./mock/asideData.json");
    TreeMenuData.value = res.data.asideData;
    addRouter(TreeMenuData.value);
  };
  const addRouter = (menuData) => {
    const modules = import.meta.glob("@/views/*/*.vue");
    console.log(modules);
    const generateRoutes = (menuList) => {
      return menuList.map((item) => {
        const route = {
          path: item.path,
          name: item.name,
          component: modules[`/src/views${item.component}`],
          children: item.children ? generateRoutes(item.children) : [],
        };
        return route;
      });
    };
    const dynamicRoutes = generateRoutes(menuData);
    console.log(dynamicRoutes);
    dynamicRoutes.forEach((route) => {
      router.addRoute(route);
    });
  };
  return { TreeMenuData, getMenuData };
});
