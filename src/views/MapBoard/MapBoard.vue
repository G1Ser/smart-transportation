<template>
    <div class="mapboard">
        <div id="map" />
    </div>
</template>

<script lang="ts" setup>
import mapboxgl from 'mapbox-gl'
import { onMounted } from 'vue';
import globalConfig from "@/global.config";
import { getCameraData } from '@/api/mapboard';
import { bbox } from '@turf/turf';
import { BBox } from 'geojson';
onMounted(async () => {
    mapboxgl.accessToken = globalConfig.mapboxToken;
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [114.3, 30.5],
        zoom: 2,
        projection: 'globe',
        doubleClickZoom: false,
    });
    map.on("style.load", () => {
        map.setFog({
            "color": "#000022",
            "high-color": "#000022",
            "space-color": "#4169e1"
        })
    })
    const cameraGeoJSON = await getCameraData();
    const bounds: BBox = bbox(cameraGeoJSON) as [number, number, number, number];
    map.on('load', () => {
        map.addSource('camera-data', {
            type: 'geojson',
            data: cameraGeoJSON
        });
        map.addLayer({
            id: 'camera-layer',
            type: 'circle',
            source: 'camera-data',
            paint: {
                'circle-radius': 6,
                'circle-color': '#FF5733'
            }
        })
    })
    map.fitBounds(bounds, { padding: 20 });
})
</script>

<style lang="scss" scoped>
.mapboard {
    width: 1620px;
    height: 1021px;
    padding: 5px 5px 5px 5px;
}

#map {
    width: 100%;
    height: 100%;
}

:deep(.mapboxgl-canvas) {
    border-radius: 50px;
}

:deep(.mapboxgl-ctrl-bottom-right) {
    display: none;
}
</style>