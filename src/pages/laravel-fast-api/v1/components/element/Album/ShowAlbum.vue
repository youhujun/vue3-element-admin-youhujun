<!--
 * @Descripttion: 
 * @version: v1
 * @Author: youhujun youhu8888@163.com
 * @Date: 2025-12-09 15:34:13
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-12-10 12:41:22
 * @FilePath: d:\wwwroot\Open\Vue\vue3-element-admin-youhujun\src\pages\laravel-fast-api\v1\components\element\Album\ShowAlbum.vue
 * Copyright (C) 2025 youhujun. All rights reserved.
-->
<template>
  <div
    v-loading="loading"
    element-loading-text="拼命加载中"
    :element-loading-spinner="svg"
    element-loading-svg-view-box="-10, -10, 50, 50"
    element-loading-background="rgba(38, 38, 38, 0.8)"
  >
    <slot name="albumLine" />
    <slot name="paginate" />
  </div>
</template>
<script setup lang="ts">
defineOptions({
  name: "ShowAlbum",
});

//定义的svg图标
const svg = `
	<path class="path" d="
		M 30 15
		L 28 17
		M 25.61 25.61
		A 15 15, 0, 0, 1, 15 30
		A 15 15, 0, 1, 1, 27.99 7.5
		L 15 15
	" style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
`;
//定义传入属性
const { loading = false } = defineProps<{
  //加载动画效果
  loading?: boolean;
}>();
</script>
<style lang="scss" scoped></style>
