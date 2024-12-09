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
    const dynamicRoutes = [
      {
        path: "/dashboard",
        name: "Dashboard",
        component: () => import("@/views/DashBoard.vue"),
        children: generateRoutes(menuData),
      },
    ];
    // 将动态路由保存到 sessionStorage
    sessionStorage.setItem("dynamicRoutes", JSON.stringify(dynamicRoutes));
    dynamicRoutes.forEach((route) => {
      router.addRoute(route);
    });
  };
  // 从 sessionStorage 加载动态路由
  const loadDynamicRoutes = () => {
    const savedRoutes = sessionStorage.getItem("dynamicRoutes");
    const dynamicRoutes = JSON.parse(savedRoutes);
    dynamicRoutes.forEach((route) => {
      router.addRoute(route);
    });
  };
  return { TreeMenuData, getMenuData, loadDynamicRoutes };
});
