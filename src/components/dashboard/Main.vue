<template>
    <dv-border-box-1>
        <router-view />
    </dv-border-box-1>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
:deep(.dv-border) {
    pointer-events: none;
    z-index: 1;
}
</style>