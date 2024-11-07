<template>
    <dv-border-box-10>
        <div class="header">
            <UserAvatar :avatarUrl :nickName />
        </div>
    </dv-border-box-10>
</template>

<script lang="ts" setup>
import { UserInfo } from '@/type/dashboard';
import { ref, onMounted, watch } from 'vue';
import UserAvatar from '@/components/UserAvatar.vue';
const props = defineProps<{
    userInfo: UserInfo
}>();
const avatarUrl = ref('')
const nickName = ref('')
onMounted(() => {
    console.log(props.userInfo);
    console.log(avatarUrl.value);
    console.log(nickName.value)
    avatarUrl.value = props.userInfo.avatar === null ? 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png' : props.userInfo.avatar;
    nickName.value = props.userInfo.nickname;
})
</script>

<style lang="scss" scoped>
.header {
    display: flex;
    align-items: center;
    justify-content: end;
    width: 100%;
    height: 100%;
    padding: 0 50px 0 5px;
}
</style>