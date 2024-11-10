<template>
    <dv-border-box-9 style="height: 1075px">
        <div class="aside">
            <el-menu active-text-color="#ffd04b" background-color="#96C6F0" default-active="1" text-color="#fff"
                @select="handleSelect">
                <el-menu-item index="1">
                    <el-icon>
                        <MapLocation />
                    </el-icon>
                    <span>地图看板</span>
                </el-menu-item>
                <el-menu-item index="2">
                    <el-icon>
                        <TrendCharts />
                    </el-icon>
                    <span>数据看板</span>
                </el-menu-item>
                <el-menu-item index="3">
                    <el-icon>
                        <User />
                    </el-icon>
                    <span>账号管理</span>
                </el-menu-item>
                <el-sub-menu index="4">
                    <template #title>
                        <el-icon>
                            <Setting />
                        </el-icon>
                        <span>系统管理</span>
                    </template>
                    <el-menu-item index="1-1">菜单管理</el-menu-item>
                    <el-menu-item index="1-2">人员管理</el-menu-item>
                    <el-menu-item index="1-3">事件管理</el-menu-item>
                </el-sub-menu>
            </el-menu>
        </div>
    </dv-border-box-9>
</template>

<script lang="ts" setup>
const handleSelect = (index, indexPath) => {
    console.log(index);
    console.log(indexPath)
}
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

    :deep(.el-sub-menu__title),
    .el-menu-item {
        letter-spacing: 10px;
        text-shadow: 2px 2px 4px #545c64;
    }
}
</style>