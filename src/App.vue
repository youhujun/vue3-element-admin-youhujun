<!--
 * @Descripttion: 
 * @version: v1
 * @Author: youhujun youhu8888@163.com
 * @Date: 2025-10-19 01:15:40
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-12-07 16:23:53
 * @FilePath: \src\App.vue
 * Copyright (C) 2025 youhujun. All rights reserved.
-->
<template>
  <el-config-provider :locale="locale" :size="size">
    <!-- 开启水印 -->
    <el-watermark
      :font="{ color: fontColor }"
      :content="showWatermark ? defaultSettings.watermarkContent : ''"
      :z-index="9999999"
      class="wh-full"
    >
      <router-view />
    </el-watermark>
  </el-config-provider>
</template>

<script setup lang="ts">
import { useAppStore, useSettingsStore } from "@/store";
import { defaultSettings } from "@/settings";
import { ThemeMode } from "@/enums/settings/theme-enum";
import { ComponentSize } from "@/enums/settings/layout-enum";

const appStore = useAppStore();
const settingsStore = useSettingsStore();

const locale = computed(() => appStore.locale);
const size = computed(() => {
  const currentSize = appStore.size as ComponentSize;
  // console.log("当前全局尺寸:", currentSize); // 检查值是否正确
  return currentSize;
});
const showWatermark = computed(() => settingsStore.showWatermark);

// 明亮/暗黑主题水印字体颜色适配
const fontColor = computed(() => {
  return settingsStore.theme === ThemeMode.DARK ? "rgba(255, 255, 255, .15)" : "rgba(0, 0, 0, .15)";
});
</script>
