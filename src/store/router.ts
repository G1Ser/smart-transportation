import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import { asideData } from "@/type/dashboard";
import router from "@/router";
export const useRouterStore = defineStore("router-store", () => {
  const TreeMenuData = ref<asideData[]>([]);
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
    dynamicRoutes.forEach((route) => {
      router.addRoute(route);
    });
  };
  const Crumbs = ref<string[]>([]);
  const getBreadcrumb = (path: string) => {
    const result: string[] = [];

    // 递归查找并生成面包屑路径
    const findBreadcrumb = (
      data: any[],
      path: string,
      breadcrumb: string[] = []
    ): boolean => {
      for (const item of data) {
        // 将当前项的名称加入到 breadcrumb 中
        const currentBreadcrumb = [...breadcrumb, item.name];

        // 如果当前项的 path 匹配，直接返回当前 breadcrumb
        if (item.path === path) {
          result.push(...currentBreadcrumb); // 找到路径时直接加入到结果中
          return true; // 返回 true，表示路径已找到，终止递归
        }

        // 如果当前项有子菜单，递归查找子菜单
        if (item.children && item.children.length > 0) {
          if (findBreadcrumb(item.children, path, currentBreadcrumb)) {
            return true; // 如果子菜单找到，直接返回
          }
        }
      }
      return false; // 如果没有找到，返回 false
    };

    findBreadcrumb(TreeMenuData.value, path); // 从根节点开始查找
    Crumbs.value = result; // 更新 Crumbs 数组
  };

  return { TreeMenuData, Crumbs, getMenuData, getBreadcrumb };
});
