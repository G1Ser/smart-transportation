<template>
    <dv-border-box-10>
        <div class="header">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>homepage</el-breadcrumb-item>
                <el-breadcrumb-item>promotion list</el-breadcrumb-item>
                <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
            </el-breadcrumb>
            <UserAvatar :avatarUrl="avatarUrl" :nickName="nickName" @updateUserInfo="emits('updateUserInfo')" />
        </div>
    </dv-border-box-10>
</template>

<script lang="ts" setup>
import { UserInfo } from '@/type/dashboard';
import { ref, watch } from 'vue';
import UserAvatar from '@/components/UserAvatar.vue';
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
</style>