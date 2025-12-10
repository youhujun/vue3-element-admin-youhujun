<!--
 * @Descripttion: 
 * @version: v1
 * @Author: youhujun 2900976495@qq.com
 * @Date: 2025-07-27 14:54:11
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2025-09-22 15:33:18
 * @FilePath: \src\components\SizeSelect\index.vue
 * Copyright (C) 2025 youhujun. All rights reserved.
-->
<template>
  <!-- 布局大小 -->
  <el-tooltip :content="t('sizeSelect.tooltip')" effect="dark" placement="bottom">
    <el-dropdown trigger="click" @command="handleSizeChange">
      <div class="i-svg:size" />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="item of sizeOptions"
            :key="item.value"
            :disabled="appStore.size == item.value"
            :command="item.value"
          >
            {{ item.label }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-tooltip>
</template>

<script setup lang="ts">
import { ComponentSize } from "@/enums/settings/layout-enum";
import { useAppStore } from "@/store/modules/app-store";

const { t } = useI18n();
const sizeOptions = computed(() => {
  return [
    { label: t("sizeSelect.default"), value: ComponentSize.DEFAULT },
    { label: t("sizeSelect.large"), value: ComponentSize.LARGE },
    { label: t("sizeSelect.small"), value: ComponentSize.SMALL },
  ];
});

const appStore = useAppStore();
function handleSizeChange(size: string) {
  appStore.changeSize(size);
  ElMessage.success(t("sizeSelect.message.success"));
}
</script>
