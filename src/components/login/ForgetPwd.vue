<template>
  <div class="forgetpwd-form">
    <el-form
      ref="ruleFormRef"
      :label-position="labelPosition"
      label-width="auto"
      :model="ruleForm"
      :rules="rules"
    >
      <el-form-item label="手机号：" prop="phone">
        <el-input v-model="ruleForm.phone" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input
          v-model="ruleForm.password"
          type="password"
          show-password
          placeholder="请输入用户密码"
        />
      </el-form-item>
      <el-form-item label="确认密码：" prop="confirmPassword">
        <el-input
          v-model="ruleForm.confirmPassword"
          type="password"
          show-password
          placeholder="再次输入用户密码"
        />
      </el-form-item>
      <el-form-item label="验证码：" prop="verificationCode">
        <el-input
          v-model="ruleForm.verificationCode"
          placeholder="请输入验证码"
        />
      </el-form-item>
    </el-form>
    <div class="btns">
      <el-button type="primary" round @click="emit('resetPwd')">
        重置密码
      </el-button>
    </div>
  </div>
</template>
  
  <script lang="ts" setup>
import { ref, reactive } from "vue";
import type { FormInstance, FormProps, FormRules } from "element-plus";
const labelPosition = ref<FormProps["labelPosition"]>("left");
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  phone: "",
  password: "",
  confirmPassword: "",
  verificationCode: "",
});
interface RuleForm {
  phone: string;
  password: string;
  confirmPassword: string;
  verificationCode: string;
}
const rules = reactive<FormRules<RuleForm>>({
  phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
  password: [{ required: true, message: "请输入用户密码", trigger: "blur" }],
  confirmPassword: [
    { required: true, message: "请输入用户密码", trigger: "blur" },
  ],
  verificationCode: [
    { required: true, message: "请输入验证码", trigger: "blur" },
  ],
});
const emit = defineEmits(["resetPwd"]);
</script>
  
<style lang="scss" scoped>
.forgetpwd-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  width: 550px;
  height: 350px;
  padding: 20px 20px 20px 20px;
  border-radius: 15px 15px 15px 15px;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);

  .el-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 500px;
  }

  :deep(.el-form-item__label) {
    color: black;
    font-size: 18px;
    &::before {
      color: rgb(255, 50, 50) !important;
      margin-right: 6px !important;
    }
  }

  :deep(.el-form-item__error) {
    margin-top: 4px;
    color: rgb(255, 50, 50);
  }

  .el-checkbox {
    position: absolute;
    left: 30px;
    bottom: 5px;
    color: black;
  }

  .btns {
    display: flex;
    justify-content: flex-end;
    gap: 20px;
    position: absolute;
    right: 20px;
    bottom: 10px;

    .el-button {
      width: 100px;
      color: black;
      font-size: 18px;
    }
  }
}
</style>