<template>
    <el-dropdown placement="bottom">
        <div class="user-avatar">
            <el-avatar :src="avatarUrl || InitialAvatar" />
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
    <UserManager :label-position="labelPosition" :nick-name="nickName" :avatar-url="avatarUrl" v-if="userFormVisible"
        @close-dialog="userFormVisible = false" @change-user-info="handleChangeUserInfo" />
    <ChangePwd :label-position="labelPosition" v-if="pwdFormVisible" @close-dialog="pwdFormVisible = false"
        @change-password="handleChangePwd" />
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus'
import type { FormProps } from "element-plus";
import { updatePwd, updateUserInfo, uploadFile } from '@/api/dashboard'
import { updatePwdParam, updateUserInfoParam, uploadFileParam } from '@/type/dashboard'
import storageUtils from "@/utils/storageUtils"
import User from '@/assets/img/user-avatar/user.png'
import PassWord from '@/assets/img/user-avatar/password.png'
import LogOut from '@/assets/img/user-avatar/logout.png'
import InitialAvatar from '@/assets/img/user-avatar/userAvatar.png'
import router from '@/router';
import ChangePwd from './user-avatar/ChangePwd.vue'
import UserManager from './user-avatar/UserManager.vue';

const props = defineProps<{
    avatarUrl: string;
    nickName: string
}>();
const nickName = ref('');
const avatarUrl = ref()
const userFormVisible = ref(false)
const pwdFormVisible = ref(false)
const labelPosition = ref<FormProps["labelPosition"]>("left");
const emits = defineEmits(['updateUserInfo'])
const handleChangeUserInfo = async (nickName, avatarUrl) => {
    let url = null;
    if (avatarUrl !== props.avatarUrl) {
        const res = await fetch(avatarUrl);
        const blob = await res.blob();
        if (blob.size > 2 * 1024 * 1024) {
            ElMessage({
                message: '用户头像不能超过2MB！',
                type: 'error',
            })
            return
        }
        const fileParams: uploadFileParam = {
            folderName: 'user_avatar',
            file: blob
        }
        url = await uploadFile(fileParams);
    }
    const InfoParams: updateUserInfoParam = {};
    if (nickName && nickName !== props.nickName) {
        InfoParams.nickname = nickName
    }
    if (url) {
        InfoParams.avatarUrl = url
    }
    if (Object.keys(InfoParams).length !== 0) {
        updateUserInfo(InfoParams).then(() => {
            emits('updateUserInfo')
        })
    }
    ElMessage({
        message: '修改个人信息成功！',
        type: 'success',
    });
}
const handleChangePwd = (form) => {
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