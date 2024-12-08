import { createRouter, createWebHashHistory } from "vue-router";
import storageUtils from "@/utils/storageUtils";
import Login from "@/views/Login.vue";
import { ElMessageBox } from "element-plus";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      redirect: "/login",
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/dashboard",
      name: "DashBoard",
      component: () => import("@/views/DashBoard.vue"),
      redirect: "/mapboard",
      children: [
        {
          path: "/mapboard",
          name: "MapBoard",
          component: () => import("@/views/MapBoard/MapBoard.vue"),
        },
      ],
    },
  ],
});

//路由守卫
router.beforeEach((to, from, next) => {
  const token = storageUtils.getItem("user_token");
  if (token) {
    if (to.path === "/login") {
      next({
        path: "/dashboard",
      });
      return;
    }
    next();
  } else {
    if (to.path == "/login") {
      next();
    } else {
      ElMessageBox.confirm("登录已失效！请重新登录", {
        confirmButtonText: "确认",
        showCancelButton: false,
        showClose: false,
        customClass: "messageBox",
        closeOnClickModal: false,
      }).then(() => {
        next({
          path: "/login",
        });
      });
    }
  }
});

export default router;
