<template>
  <div class="login">
    <h1 class="title">光谷智慧交通系统</h1>
    <div class="content">
      <el-tabs v-model="activeName">
        <el-tab-pane label="login" name="login" :key="new Date().getTime()">
          <div id="login-guide" class="guide" style="border-radius: 15px 0 0 15px">
            <h2>欢迎加入我们！</h2>
            <p @click="toRegister">去注册</p>
          </div>
          <LoginForm @forget-pwd="activeName = 'forgetpwd'" :class="isFade ? 'zoomOut' : ''" />
        </el-tab-pane>
        <el-tab-pane label="register" name="register" :key="new Date().getTime()">
          <RegisterForm :class="isFade ? '' : 'zoomOut'" />
          <div id="register-guide" class="guide" style="border-radius: 0 15px 15px 0">
            <h2>已经拥有账号！</h2>
            <p @click="toLogin">去登录</p>
          </div>
        </el-tab-pane>
        <el-tab-pane label="forgetpwd" name="forgetpwd" :key="new Date().getTime()">
          <ForgetPwd @reset-pwd="activeName = 'login'" class="bounceInDown" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import LoginForm from "@/components/login/LoginForm.vue";
import RegisterForm from "@/components/login/RegisterForm.vue";
import ForgetPwd from "@/components/login/ForgetPwd.vue";
const activeName = ref("login");
const isFade = ref(false);
const toRegister = () => {
  isFade.value = true;
  const loginGuide = document.getElementById("login-guide");
  loginGuide.classList.add("slideOutRight");
  setTimeout(() => {
    activeName.value = 'register'
  }, 1000)
}
const toLogin = () => {
  isFade.value = false;
  const registerGuide = document.getElementById("register-guide");
  registerGuide.classList.add("slideOutLeft");
  setTimeout(() => {
    activeName.value = 'login'
  }, 1000)
}
</script>

<style lang="scss" scoped>
.login {
  text-align: center;
  width: 1920px;
  height: 1080px;
  text-align: center;
  background: linear-gradient(rgba(183, 194, 194, 0.3),
      rgba(183, 194, 194, 0.7)),
    no-repeat center/cover url("@/assets/img/login/background.jpg");

  .title {
    transform: translateY(200px);
  }

  .content {
    display: flex;
    justify-content: center;

    .el-tabs {
      transform: translateY(300px);

      :deep(.el-tabs__header) {
        display: none;
      }

      .el-tab-pane {
        display: flex;
        justify-content: center;
        width: 850px;
        height: 500px;
      }
    }
  }
}
</style>