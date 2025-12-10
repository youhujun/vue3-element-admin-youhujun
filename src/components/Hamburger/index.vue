<!--
 * @Descripttion: 
 * @version: v1
 * @Author: youhujun 2900976495@qq.com
 * @Date: 2025-07-27 14:54:11
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2025-09-22 15:34:24
 * @FilePath: \src\components\Hamburger\index.vue
 * Copyright (C) 2025 youhujun. All rights reserved.
-->
<template>
  <div class="hamburger-wrapper" @click="toggleClick">
    <div :class="['i-svg:collapse', { hamburger: true, 'is-active': isActive }, hamburgerClass]" />
  </div>
</template>

<script setup lang="ts">
import { useSettingsStore } from "@/store";
import { ThemeMode, SidebarColor } from "@/enums/settings/theme-enum";
import { LayoutMode } from "@/enums/settings/layout-enum";

defineProps({
  isActive: { type: Boolean, required: true },
});

const emit = defineEmits(["toggleClick"]);

const settingsStore = useSettingsStore();
const layout = computed(() => settingsStore.layout);

const hamburgerClass = computed(() => {
  // 如果暗黑主题
  if (settingsStore.theme === ThemeMode.DARK) {
    return "hamburger--white";
  }

  // 如果是混合布局 && 侧边栏配色方案是经典蓝
  if (
    layout.value === LayoutMode.MIX &&
    settingsStore.sidebarColorScheme === SidebarColor.CLASSIC_BLUE
  ) {
    return "hamburger--white";
  }

  // 默认返回空字符串
  return "";
});

function toggleClick() {
  emit("toggleClick");
}
</script>

<style scoped lang="scss">
.hamburger-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 15px;
  cursor: pointer;

  .hamburger {
    vertical-align: middle;
    transform: scaleX(-1);
    transition: transform 0.3s ease;

    &--white {
      color: #fff;
    }

    &.is-active {
      transform: scaleX(1);
    }
  }
}
</style>
