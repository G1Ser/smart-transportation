<template>
  <div class="login-form">
    <el-form ref="ruleFormRef" :label-position="labelPosition" label-width="auto" :model="ruleForm" :rules="rules">
      <el-form-item label="用户名：" prop="username">
        <el-input v-model="ruleForm.username" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input v-model="ruleForm.password" type="password" show-password placeholder="请输入用户密码" />
      </el-form-item>
    </el-form>
    <div class="btns">
      <el-button type="primary" round @click="handleLogin()">登录</el-button>
      <el-button type="info" round @click="emit('forgetPwd')">
        忘记密码
      </el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import type { FormInstance, FormProps, FormRules } from "element-plus";
import { userLogin } from '@/api/login'
import { ElMessage } from 'element-plus'
import type { LoginParamter } from "@/type/login";
import { debounce } from "lodash-es";
import storageUtils from '@/utils/storageUtils'
import router from "@/router";
const labelPosition = ref<FormProps["labelPosition"]>("left");
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  username: "",
  password: "",
});
interface RuleForm {
  username: string;
  password: string;
}
const rules = reactive<FormRules<RuleForm>>({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }, { min: 5, max: 16, message: '用户名必须是5-16位非空字符', trigger: 'blur' }],
  password: [{ required: true, message: "请输入用户密码", trigger: "blur" }, { min: 5, max: 16, message: '用户密码必须是5-16位非空字符', trigger: 'blur' }],
});
const emit = defineEmits(["forgetPwd"]);
const debounceLogin = debounce(() => {
  const params: LoginParamter = {
    username: ruleForm.username,
    password: ruleForm.password
  }
  userLogin(params).then((res) => {
    if (!res) return
    storageUtils.setItem("user_token", res)
    ElMessage({
      message: '登录成功!',
      type: 'success',
    })
    router.push('/dashboard')
  })
}, 500)
const handleLogin = () => {
  if (!ruleFormRef.value) return
  ruleFormRef.value.validate((valid) => {
    if (!valid) return
    debounceLogin()
  })
}
</script>

<style lang="scss" scoped>
.login-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  width: 550px;
  height: 350px;
  padding: 20px 20px 20px 20px;
  border-radius: 0 15px 15px 0;
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