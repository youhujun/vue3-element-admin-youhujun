<!--
 * @Descripttion: 
 * @version: v1
 * @Author: youhujun youhu8888@163.com
 * @Date: 2025-11-30 23:29:49
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-12-10 02:03:08
 * @FilePath: d:\wwwroot\Open\Vue\vue3-element-admin-youhujun\src\pages\laravel-fast-api\v1\components\element\Card\CardList\index.vue
 * Copyright (C) 2025 youhujun. All rights reserved.
-->
<template>
  <div>
    <el-card class="box-card">
      <div>
        <slot name="description" />
        <el-divider />
        <div
          v-loading="loading"
          element-loading-text="拼命加载中"
          :element-loading-spinner="svg"
          element-loading-svg-view-box="-10, -10, 50, 50"
          element-loading-background="rgba(38, 38, 38, 0.8)"
          class="custom-node"
        >
          <slot name="cardContent" />
        </div>
        <el-divider />
        <slot name="paginate" />
      </div>
    </el-card>
  </div>
</template>
<script setup lang="ts">
defineOptions({
  name: "YhCardList",
});

// 默认值可以通过 withDefaults 来设置
const { loading } = withDefaults(
  defineProps<{
    loading?: boolean;
  }>(),
  {
    loading: false,
  }
);
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
</script>

<style lang="scss" scoped>
/* 卡片 */
.box-card {
  width: 99%;
  height: auto;
  min-height: 88vh;
  margin-top: 0.5rem;
  margin-right: auto;
  margin-left: auto;
  .custom-node {
    height: auto;
    min-height: 40rem;
    margin-top: 0.5rem;
  }
}
/* 卡片结束 */
.custom-node :deep(.el-tree-node__content) {
  height: 2.5rem;
}
</style>
