<!--
 * @Descripttion: 
 * @version: v1
 * @Author: youhujun youhu8888@163.com
 * @Date: 2025-11-08 22:31:17
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-12-10 02:00:30
 * @FilePath: d:\wwwroot\Open\Vue\vue3-element-admin-youhujun\src\pages\laravel-fast-api\v1\components\element\Time\FutureRangeSelectDateTime.vue
 * Copyright (C) 2025 youhujun. All rights reserved.
-->
<template>
  <el-date-picker
    v-model="timeRange"
    type="datetimerange"
    unlink-panels
    range-separator="至"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    value-format="YYYY-MM-DD HH:mm:ss"
    :shortcuts="rangeDateShortcuts"
    @change="handleToSelectTime()"
  />
</template>
<script setup lang="ts">
defineOptions({
  name: "FutureRangeSelectDateTime",
});

const emit = defineEmits(["update:futureTimeRange"]);
// 日期范围快捷选项（返回 [开始日期, 结束日期]）
const rangeDateShortcuts = [
  {
    text: "明天",
    value: () => {
      const start = new Date();
      start.setTime(start.getTime() + 3600 * 1000 * 24); // 加1天
      const end = new Date(start); // 结束时间也是明天
      // 通常这类选择器会默认选择一整天，所以结束时间可以设置为当天的23:59:59
      end.setHours(23, 59, 59, 999);
      return [start, end];
    },
  },
  {
    text: "后天",
    value: () => {
      const start = new Date();
      start.setTime(start.getTime() + 3600 * 1000 * 24 * 2); // 加2天
      const end = new Date(start);
      end.setHours(23, 59, 59, 999);
      return [start, end];
    },
  },
  {
    text: "三天后",
    value: () => {
      const start = new Date();
      start.setTime(start.getTime() + 3600 * 1000 * 24 * 3); // 加3天
      const end = new Date(start);
      end.setHours(23, 59, 59, 999);
      return [start, end];
    },
  },
  {
    text: "一周后",
    value: () => {
      const start = new Date();
      start.setTime(start.getTime() + 3600 * 1000 * 24 * 7); // 加7天
      const end = new Date(start);
      end.setHours(23, 59, 59, 999);
      return [start, end];
    },
  },
];

//
const timeRange = defineModel<[string, string]>({
  default: [],
});

const handleToSelectTime = () => {
  emit("update:futureTimeRange", timeRange.value);
};
</script>

<style lang="scss" scoped></style>
