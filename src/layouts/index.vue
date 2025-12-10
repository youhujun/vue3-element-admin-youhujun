<!--
 * @Descripttion: 
 * @version: v1
 * @Author: youhujun youhu8888@163.com
 * @Date: 2025-10-19 01:15:40
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-11-30 20:05:46
 * @FilePath: \src\layouts\index.vue
 * Copyright (C) 2025 youhujun. All rights reserved.
-->
<template>
  <div class="layout-wrapper">
    <component :is="currentLayoutComponent" />

    <!-- 设置面板 - 独立于布局组件 -->
    <Settings v-if="isShowSettings" />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useLayout } from "@/composables/layout/useLayout";
import LeftLayout from "@/layouts/modes/left/index.vue";
import TopLayout from "@/layouts/modes/top/index.vue";
import MixLayout from "@/layouts/modes/mix/index.vue";
import Settings from "./components/Settings/index.vue";
import { LayoutMode } from "@/enums/settings/layout-enum";
import { defaultSettings } from "@/settings";
//store
import { useCategoryStore, useGoodsClassStore, useLabelStore, useRegionStore } from "@/store";

const { currentLayout } = useLayout();
const route = useRoute();

/// Select the corresponding component based on the current layout mode
const currentLayoutComponent = computed(() => {
  const override = route.meta?.layout as LayoutMode | undefined;
  const layoutToUse = override ?? currentLayout.value;
  switch (layoutToUse) {
    case LayoutMode.TOP:
      return TopLayout;
    case LayoutMode.MIX:
      return MixLayout;
    case LayoutMode.LEFT:
    default:
      return LeftLayout;
  }
});

/// Whether to show the settings panel
const isShowSettings = computed(() => defaultSettings.showSettings);

//文章分类store
const categoryStore = useCategoryStore();
//产品分类
const goodsClassStore = useGoodsClassStore();
//标签
const labelStore = useLabelStore();
//地区
const regionStore = useRegionStore();

onMounted(() => {
  categoryStore.getTreeCategory();
  goodsClassStore.getTreeGoodsClass();
  labelStore.getTreeLabel();
  regionStore.getTreeRegion();
});
</script>

<style lang="scss" scoped>
.layout-wrapper {
  width: 100%;
  height: 100%;
}
</style>
