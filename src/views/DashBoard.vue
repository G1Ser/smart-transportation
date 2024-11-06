<template>
    <div claSS="dash-board">
        <el-container>
            <el-aside width="400px">
                <Aside />
            </el-aside>
            <el-container>
                <el-header>
                    <Header />
                </el-header>
                <el-main>
                    <Main />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { userLogin } from '@/api/dashboard'
import Aside from '@/components/dashboard/Aside.vue'
import Header from '@/components/dashboard/Header.vue'
import Main from '@/components/dashboard/Main.vue'

onMounted(async () => {
    const res = await userLogin();
    console.log(res);

})
</script>

<style lang="scss" scoped>
.dash-board {
    width: 100%;
    height: 100%;
    border: 1px solid;
}
</style>