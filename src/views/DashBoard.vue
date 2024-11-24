<template>
    <div class="dash-board">
        <el-container>
            <el-aside width="300px" style="padding: 2px 0 2px 0;">
                <Aside />
            </el-aside>
            <el-container>
                <el-header style="padding: 3px 5px 0 5px !important;">
                    <Header :user-info="userInfo" @update-user-info="getUserInfo" />
                </el-header>
                <el-main style="padding: 0 0 6px 0 !important">
                    <Main />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { userLogin } from '@/api/dashboard'
import Aside from '@/components/dashboard/Aside.vue'
import Header from '@/components/dashboard/Header.vue'
import Main from '@/components/dashboard/Main.vue'
const userInfo = ref()
const getUserInfo = async () => {
    userInfo.value = await userLogin();
}

onMounted(() => {
    getUserInfo()
})
</script>

<style lang="scss" scoped>
.dash-board {
    width: 1920px;
    height: 1080px;
}
</style>