<template>
  <div class="login">
    <h1 class="title">光谷智慧交通系统</h1>
    <div class="content">
      <el-tabs v-model="activeName">
        <el-tab-pane label="login" name="login">
          <LoginForm />
        </el-tab-pane>
        <el-tab-pane label="register" name="register">register</el-tab-pane>
        <el-tab-pane label="forgetpwd" name="forgetpwd">forgetpwd</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import LoginForm from "@/components/login/LoginForm.vue";
const activeName = ref("login");
</script>

<style lang="scss" scoped>
.login {
  text-align: center;
  width: 1920px;
  height: 1080px;
  text-align: center;
  background: linear-gradient(
      rgba(183, 194, 194, 0.3),
      rgba(183, 194, 194, 0.7)
    ),
    no-repeat center/cover url("@/assets/img/login/background.jpg");

  .title {
    transform: translateY(200px);
  }

  .content {
    display: flex;
    justify-content: center;
    .el-tabs {
      transform: translateY(300px);
      .el-tab-pane{
        display: flex;
        justify-content: center;
        width: 600px;
        height: 500px;
      }
    }
  }
}
</style>