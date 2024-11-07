<template>
    <el-dropdown placement="bottom-start">
        <div class="user-avatar">
            <el-avatar :src="avatarUrl" />
            <p>{{ nickName }}</p>
        </div>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item><img :src="PassWord">修改密码</el-dropdown-item>
                <el-dropdown-item><img :src="LogOut">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import PassWord from '@/assets/img/password.png'
import LogOut from '@/assets/img/logout.png'

const props = defineProps<{
    avatarUrl: string;
    nickName: string
}>();
const nickName = ref('');
const avatarUrl = ref('https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png')
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