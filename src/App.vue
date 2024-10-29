<template>
  <router-view />
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
const appElement: HTMLElement | null = document.querySelector("#app");
const ratio = ref<number>(1);

// 计算缩放比例
const getRatio = () => {
  return (window.innerWidth / window.innerHeight) * 9 - 16 > 0
    ? window.innerHeight / 1080
    : window.innerWidth / 1920;
};
// 监听窗口大小变化
window.addEventListener("resize", () => {
  ratio.value = getRatio();
});

// 应用缩放到 appElement
const windowTrans = (ratio: number) => {
  if (!appElement) return;
  appElement.style.transform = `scale(${ratio})`;
};

onMounted(() => {
  ratio.value = getRatio();
  windowTrans(ratio.value); // 初始设置缩放
});

// 监听 ratio 变化并更新缩放
watch(
  () => ratio.value,
  (newRatio) => {
    windowTrans(newRatio);
  }
);
</script>

<style lang="scss" scoped>
</style>