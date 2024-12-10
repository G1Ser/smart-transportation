<template>
    <dv-border-box-10>
        <div class="header">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item v-for="item in Crumbs" :key="item">{{ item }}</el-breadcrumb-item>
            </el-breadcrumb>
            <UserAvatar :avatarUrl="avatarUrl" :nickName="nickName" @updateUserInfo="emits('updateUserInfo')" />
        </div>
    </dv-border-box-10>
</template>

<script lang="ts" setup>
import { UserInfo } from '@/type/dashboard';
import { ref, watch } from 'vue';
import UserAvatar from '@/components/UserAvatar.vue';
import { storeToRefs } from "pinia";
import { useRouterStore } from "@/store/router";
const routerStore = useRouterStore();
const { Crumbs } = storeToRefs(routerStore);
const emits = defineEmits(['updateUserInfo'])
const props = defineProps<{
    userInfo: UserInfo
}>();
const avatarUrl = ref('')
const nickName = ref('')
watch(() => props.userInfo, () => {
    if (!props.userInfo) return;
    avatarUrl.value = props.userInfo.avatar;
    nickName.value = props.userInfo.nickname;
})
</script>

<style lang="scss" scoped>
.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    padding: 0 50px 0 50px;
}

.el-breadcrumb__item {
    font-size: 16px;
    letter-spacing: 2px;
    font-family: 'Microsoft Yahei';
    text-shadow: 2px 2px 4px #545c64;
}

:deep(.el-breadcrumb__inner) {
    color: #fff !important;
}

.el-breadcrumb__item:last-child :deep(.el-breadcrumb__inner) {
    color: #ffd04b !important;
}
</style>