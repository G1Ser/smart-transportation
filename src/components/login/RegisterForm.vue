<template>
  <div class="register-form">
    <el-form ref="ruleFormRef" :label-position="labelPosition" label-width="auto" :model="ruleForm" :rules="rules">
      <el-form-item label="用户名：" prop="username">
        <el-input v-model="ruleForm.username" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="手机号：" prop="phone">
        <el-input v-model="ruleForm.phone" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input v-model="ruleForm.password" type="password" show-password placeholder="请输入用户密码" />
      </el-form-item>
      <el-form-item label="确认密码：" prop="confirmPassword">
        <el-input v-model="ruleForm.confirmPassword" type="password" show-password placeholder="再次输入用户密码" />
      </el-form-item>
    </el-form>
    <div class="btns">
      <el-button type="primary" round @click="handleRegister()">注册</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { ElMessage } from 'element-plus'
import type { FormInstance, FormProps, FormRules } from "element-plus";
import { userRegister } from '@/api/login'
import type { RegisterParamter } from "@/type/login";
const labelPosition = ref<FormProps["labelPosition"]>("left");
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  username: "",
  phone: "",
  password: "",
  confirmPassword: "",
});
interface RuleForm {
  username: string;
  phone: string;
  password: string;
  confirmPassword: string;
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
const rules = reactive<FormRules<RuleForm>>({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }, { min: 5, max: 16, message: '用户名必须是5-16位非空字符', trigger: 'blur' }],
  phone: [{ required: true, message: "请输入手机号", trigger: "blur" }, { validator: validatePhone, trigger: "blur" }],
  password: [{ required: true, message: "请输入用户密码", trigger: "blur" }, { min: 5, max: 16, message: '用户密码必须是5-16位非空字符', trigger: 'blur' }],
  confirmPassword: [
    { required: true, message: "请输入用户密码", trigger: "blur" },
    { validator: validatePwd, trigger: "blur" }
  ],
});
const handleRegister = () => {
  if (!ruleFormRef.value) return
  ruleFormRef.value.validate((valid) => {
    if (!valid) return
    const data: RegisterParamter = {
      username: ruleForm.username,
      password: ruleForm.password,
      phone: ruleForm.phone
    }
    userRegister(data).then(() => {
      ElMessage({
        message: '注册成功！',
        type: 'success',
      })
      ruleFormRef.value.resetFields()
    })
  })
}
</script>

<style lang="scss" scoped>
.register-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  width: 550px;
  height: 350px;
  padding: 20px 20px 20px 20px;
  border-radius: 15px 0 0 15px;
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