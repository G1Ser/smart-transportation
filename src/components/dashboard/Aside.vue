<template>
    <dv-border-box-9 style="height: 1075px">
        <div class="aside">
            <el-menu active-text-color="#ffd04b" background-color="#96C6F0" :default-active="DefaultActive"
                text-color="#fff" router>
                <TreeMenu :menu-data="TreeMenuData" />
            </el-menu>
        </div>
    </dv-border-box-9>
</template>

<script lang="ts" setup>
import TreeMenu from '@/components/TreeMenu.vue'
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';
const DefaultActive = ref<number | string>('');
import { storeToRefs } from 'pinia';
import { useRouterStore } from '@/store/router';
const routerStore = useRouterStore();
const { TreeMenuData } = storeToRefs(routerStore);
const { getBreadcrumb } = routerStore;
const route = useRoute()
watch(() => route.path, () => {
    DefaultActive.value = route.path
    getBreadcrumb(route.path)
}, { immediate: true })
</script>

<style lang="scss" scoped>
:deep(.border-box-content) {
    display: flex;
    align-items: center;
    justify-content: center;
}

:deep(.dv-border-svg-container) {
    z-index: 1;
    pointer-events: none;
}

.aside {
    width: 285px;
    height: 1065px;
    backdrop-filter: blur(2px);

    .el-menu {
        display: flex;
        flex-direction: column;
        gap: 5px;
        height: 100%;
    }
}
</style>