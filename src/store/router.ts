import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import { asideData } from "@/type/dashboard";
import router from "@/router";
export const useRouterStore = defineStore("router-store", () => {
  const modules = import.meta.glob("@/views/*/*.vue");
  const TreeMenuData = ref<asideData[]>();
  const getMenuData = async () => {
    const res = await axios.get("./mock/asideData.json");
    TreeMenuData.value = res.data.asideData;
    addRouter(TreeMenuData.value);
  };
  const addRouter = (menuData) => {
    const generateRoutes = (menuList) => {
      const modules = import.meta.glob("../views/**");
      return menuList.map((item) => {
        const route = {
          path: item.path,
          name: item.name,
          component: () => modules[`@/views${item.component}`],
          children: item.children ? generateRoutes(item.children) : [],
        };
        return route;
      });
    };
    const dynamicRoutes = generateRoutes(menuData);
    dynamicRoutes.forEach((route) => {
      router.addRoute(route);
    });
  };
  return { TreeMenuData, getMenuData };
});
