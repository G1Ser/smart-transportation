<template>
    <dv-border-box-9 style="height: 1075px">
        <div class="aside">
            <el-menu active-text-color="#ffd04b" background-color="#96C6F0" :default-active="DefaultActive"
                text-color="#fff" @select="handleSelect" router>
                <TreeMenu :menu-data="TreeMenuData" />
            </el-menu>
        </div>
    </dv-border-box-9>
</template>

<script lang="ts" setup>
import TreeMenu from '@/components/TreeMenu.vue'
import router from '@/router';
import { asideData } from '@/type/dashboard';
import axios from 'axios';
import { ref, onMounted } from 'vue';
const TreeMenuData = ref<asideData[]>();
const DefaultActive = ref<number | string>('');
const handleSelect = (index, indexPath) => {
    console.log(index);
    console.log(indexPath);
}
onMounted(async () => {
    const res = await axios.get('./mock/asideData.json');
    TreeMenuData.value = res.data.asideData;
    DefaultActive.value = TreeMenuData.value[0].children.length > 0 ? TreeMenuData.value[0].children[0].path : TreeMenuData.value[0].path;
    router.push(DefaultActive.value);
})
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