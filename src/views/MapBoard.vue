<template>
    <div id="map" />
</template>

<script lang="ts" setup>
import mapboxgl from 'mapbox-gl'
import { onMounted } from 'vue';
import globalConfig from "@/global.config";

onMounted(() => {
    mapboxgl.accessToken = globalConfig.mapboxToken;
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [0, 0],
        zoom: 1
    });
    map.on("style.load", () => {
        map.setFog({
            "color": "#000022",
            "high-color": "#000022",
            "space-color": "#4169e1"
        })
    })
})
</script>

<style lang="scss" scoped>
</style>