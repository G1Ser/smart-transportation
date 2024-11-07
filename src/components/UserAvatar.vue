<template>
    <div class="user-avatar">
        <el-avatar :src="avatarUrl" />
        <p>{{ nickName }}</p>
    </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';

const props = defineProps<{
    avatarUrl: string;
    nickName: string
}>();
onMounted(() => {
    console.log(props.avatarUrl);
    console.log(props.nickName)
})
</script>

<style lang="scss" scoped>
.user-avatar {
    display: flex;
    align-items: center;
    gap: 20px;

    p {
        font-family: "constellation";
        letter-spacing: 2px;
    }
}
</style>