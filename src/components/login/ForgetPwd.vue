<template>
  <div class="forgetpwd-form">
    <el-form ref="ruleFormRef" :label-position="labelPosition" label-width="auto" :model="ruleForm" :rules="rules">
      <el-form-item label="手机号：" prop="phone">
        <el-input v-model="ruleForm.phone" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input v-model="ruleForm.password" type="password" show-password placeholder="请输入用户密码" />
      </el-form-item>
      <el-form-item label="确认密码：" prop="confirmPassword">
        <el-input v-model="ruleForm.confirmPassword" type="password" show-password placeholder="再次输入用户密码" />
      </el-form-item>
      <el-form-item label="验证码：" prop="verificationCode">
        <el-input v-model="ruleForm.verificationCode" placeholder="请输入验证码" style="width: 250px;" />
        <div class="verificationCode" @click="generateCode()">{{ code }}</div>
      </el-form-item>
    </el-form>
    <div class="btns">
      <el-button type="primary" round @click="handleForgetPwd()">
        重置密码
      </el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { ElMessage } from 'element-plus'
import type { FormInstance, FormProps, FormRules } from "element-plus";
const code = ref('');
const generateCode = () => {
  const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  code.value = result;
}
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
const validatePhone = (rule: any, value: string, callback: any) => {
  const phonePattern = /^1[3456789][0-9]{9}$/;
  if (!phonePattern.test(value)) {
    callback(new Error("请输入正确的手机号格式"))
  } else {
    callback()
  }
}
const validatePwd = (rule: any, value: string, callback: any) => {
  if (value !== ruleForm.password) {
    callback(new Error("两次输入密码不匹配"))
  } else {
    callback()
  }
}
const validateCode = (rule: any, value: string, callback: any) => {
  if (value !== code.value) {
    callback(new Error("验证码输入错误"))
    ruleForm.verificationCode = ''
    generateCode()
  } else {
    callback()
  }
}
const rules = reactive<FormRules<RuleForm>>({
  phone: [{ required: true, message: "请输入手机号", trigger: "blur" }, { validator: validatePhone, trigger: "blur" }],
  password: [{ required: true, message: "请输入用户密码", trigger: "blur" }, { min: 5, max: 16, message: '用户密码必须是5-16位非空字符', trigger: 'blur' }],
  confirmPassword: [
    { required: true, message: "请输入用户密码", trigger: "blur" },
    { validator: validatePwd, trigger: "blur" }
  ],
  verificationCode: [
    { required: true, message: "请输入验证码", trigger: "blur" },
    { validator: validateCode, trigger: "blur" }
  ],
});
const emit = defineEmits(["resetPwd"]);
const handleForgetPwd = () => {
  if (!ruleFormRef.value) return
  ruleFormRef.value.validate((valid) => {
    if (!valid) return
    ElMessage({
      message: '重置密码成功！',
      type: 'success',
    })
    emit("resetPwd");
  })
}
onMounted(() => {
  generateCode();
})
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

  .verificationCode {
    margin-left: 25px;
    font-weight: 600;
    font-style: italic;
    color: #fff;
    letter-spacing: 5px;
    padding: 0 10px 0 10px;
    background: black;
    cursor: pointer;
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