<template>
    <el-dropdown placement="bottom-start">
        <div class="user-avatar">
            <el-avatar :src="avatarUrl" />
            <p>{{ nickName }}</p>
        </div>
        <template #dropdown>
            <el-dropdown-menu class="header-drop">
                <el-dropdown-item @click="userFormVisible = true"><img :src="User">账号管理</el-dropdown-item>
                <el-dropdown-item @click="pwdFormVisible = true"><img :src="PassWord">修改密码</el-dropdown-item>
                <el-dropdown-item @click="handleLogOut"><img :src="LogOut">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
    <el-dialog v-model="userFormVisible" title="修改个人信息" width="500" :modal="false" :align-center="true" center
        :close-on-click-modal="false" class="change-pwd-dialog" modal-class="change-pwd-modal">
        <el-form :label-position="labelPosition" label-width="auto" ref="ruleFormRef" :rules="rules">
            <el-form-item label="个人头像：">
                <img :src="avatarUrl">
            </el-form-item>
            <el-form-item label="昵称：">
                <el-input />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="userFormVisible = false">取消</el-button>
                <el-button type="primary">
                    确定
                </el-button>
            </div>
        </template>
    </el-dialog>
    <el-dialog v-model="pwdFormVisible" title="修改密码" width="500" :modal="false" :align-center="true" center
        :close-on-click-modal="false" class="change-pwd-dialog" modal-class="change-pwd-modal">
        <el-form :model="form" :label-position="labelPosition" label-width="auto" ref="ruleFormRef" :rules="rules">
            <el-form-item label="旧密码：" prop="old_password">
                <el-input v-model="form.old_password" placeholder="请输入旧密码" />
            </el-form-item>
            <el-form-item label="新密码：" prop="new_password">
                <el-input v-model="form.new_password" type="password" show-password placeholder="请输入新密码" />
            </el-form-item>
            <el-form-item label="确认密码：" prop="re_password">
                <el-input v-model="form.re_password" type="password" show-password placeholder="请输入确认密码" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="pwdFormVisible = false">取消</el-button>
                <el-button type="primary" @click="handleChangePwd()">
                    确定
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, watch } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus'
import type { FormProps, FormInstance, FormRules } from "element-plus";
import { updatePwd } from '@/api/dashboard'
import { updatePwdParam } from '@/type/dashboard'
import { debounce } from "lodash-es";
import storageUtils from "@/utils/storageUtils"
import User from '@/assets/img/user.png'
import PassWord from '@/assets/img/password.png'
import LogOut from '@/assets/img/logout.png'
import InitialAvatar from '@/assets/img/userAvatar.png'
import router from '@/router';

const props = defineProps<{
    avatarUrl: string;
    nickName: string
}>();
const nickName = ref('');
const avatarUrl = ref(InitialAvatar)
const pwdFormVisible = ref(false)
const userFormVisible = ref(false)
const labelPosition = ref<FormProps["labelPosition"]>("left");
const form = reactive({
    old_password: '',
    new_password: '',
    re_password: ''
})
const ruleFormRef = ref<FormInstance>();
interface RuleForm {
    old_password: string;
    new_password: string;
    re_password: string;
}
const validatePwd = (rule: any, value: string, callback: any) => {
    if (value !== form.new_password) {
        callback(new Error("两次输入密码不匹配"))
    } else {
        callback()
    }
}
const rules = reactive<FormRules<RuleForm>>({
    old_password: [{ required: true, message: "请输入旧密码", trigger: "blur" }],
    new_password: [{ required: true, message: "请输入新密码", trigger: "blur" }, { min: 5, max: 16, message: '新密码必须是5-16位非空字符', trigger: 'blur' }],
    re_password: [
        { required: true, message: "请输入确认密码", trigger: "blur" },
        { validator: validatePwd, trigger: "blur" }
    ],
});
const debounceChangePwd = debounce(() => {
    const data: updatePwdParam = {
        old_password: form.old_password,
        new_password: form.new_password,
        re_password: form.re_password
    }
    updatePwd(data).then(() => {
        ElMessage({
            message: '修改密码成功！',
            type: 'success',
        });
        pwdFormVisible.value = false;
        setTimeout(() => {
            ElMessageBox.confirm(
                '请重新登录',
                {
                    confirmButtonText: '确定',
                    showCancelButton: false,
                    showClose: false,
                    closeOnClickModal: false,
                    customClass: "messageBox",
                }
            )
                .then(() => {
                    router.push("/login");
                    storageUtils.removeItem("user_token");
                });
        }, 500)
        ruleFormRef.value.resetFields()
    })
}, 500)
const handleChangePwd = () => {
    if (!ruleFormRef.value) return
    ruleFormRef.value.validate((valid) => {
        if (!valid) return
        debounceChangePwd()
    })
}
const handleLogOut = () => {
    ElMessageBox.confirm(
        '确定要退出登录？',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            closeOnClickModal: false,
            type: 'warning',
        }
    )
        .then(() => {
            router.push("/login");
            storageUtils.removeItem("user_token");
            ElMessage({
                message: '退出登录成功！',
                type: 'success',
            })
        })
}
watch(() => [props.avatarUrl, props.nickName], () => {
    if (props.avatarUrl) {
        avatarUrl.value = props.avatarUrl;
    }
    if (props.nickName) {
        nickName.value = props.nickName;
    }
})
</script>

<style lang="scss" scoped>
.user-avatar {
    display: flex;
    align-items: center;
    gap: 20px;

    p {
        font-family: "Constellation";
        font-weight: 600;
        font-size: 20px;
        letter-spacing: 2px;
    }
}
</style>