<template>
  <div class="login">
    <h1 class="title">光谷智慧交通系统</h1>
    <div class="login-form">
      <el-form :label-position="labelPosition" label-width="auto">
        <el-form-item label="用户名：">
          <el-input />
        </el-form-item>
        <el-form-item label="密码：">
          <el-input />
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { FormProps } from "element-plus";
const labelPosition = ref<FormProps['labelPosition']>('left')
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
    no-repeat center/cover url("@/assets/img/background.jpg");
  .title {
    transform: translateY(150px);
  }
  .login-form{
    display: flex;
    justify-content: center;
    transform: translateY(250px);
    .el-form{
      width: 500px;
      padding: 20px 20px 2px 20px;
      border-radius: 6px;
      border: 1px solid;
    }
  }
}
</style>