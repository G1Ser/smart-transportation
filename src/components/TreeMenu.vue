<template>
    <template v-for="item in menuData" :key="item.id">
        <el-sub-menu :index="item.id" v-if="item.children.length > 0">
            <template #title>
                <el-icon>
                    <component :is="item.icon" />
                </el-icon>
                <span>{{ item.name }}</span>
            </template>
            <TreeMenu :menu-data="item.children" />
        </el-sub-menu>
        <el-menu-item :index="item.path" v-else>
            <el-icon>
                <component :is="item.icon" />
            </el-icon>
            <span>{{ item.name }}</span>
        </el-menu-item>
    </template>
</template>

<script lang="ts" setup>
import TreeMenu from './TreeMenu.vue'
import { asideData } from '@/type/dashboard';
defineProps<{
    menuData: asideData[]
}>();
</script>

<style lang="scss" scoped>
:deep(.el-sub-menu__title),
.el-menu-item {
    letter-spacing: 10px;
    text-shadow: 2px 2px 4px #545c64;
}
</style>