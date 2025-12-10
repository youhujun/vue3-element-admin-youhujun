<!--
 * @Descripttion: 
 * @version: v1
 * @Author: youhujun youhu8888@163.com
 * @Date: 2025-10-19 01:15:40
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-11-09 19:48:27
 * @FilePath: \src\layouts\modes\base\index.vue
 * Copyright (C) 2025 youhujun. All rights reserved.
-->
<template>
  <div class="layout" :class="layoutClass">
    <!-- 移动端遮罩层 - 当侧边栏打开时显示 -->
    <div v-if="isMobile && isSidebarOpen" class="layout__overlay" @click="closeSidebar" />

    <!-- 布局内容插槽 - 各种布局模式的具体内容 -->
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { useLayout, useDeviceDetection } from "@/composables";

/// Layout-related functionality and state management
const { layoutClass, isSidebarOpen, closeSidebar } = useLayout();

/// Device detection for responsive layout
const { isMobile } = useDeviceDetection();
</script>

<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;

  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
  }
}
</style>
