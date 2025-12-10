<!--
 * @Descripttion: 
 * @version: v1
 * @Author: youhujun youhu8888@163.com
 * @Date: 2025-11-13 02:45:51
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-12-10 02:30:21
 * @FilePath: d:\wwwroot\Open\Vue\vue3-element-admin-youhujun\src\pages\laravel-fast-api\v1\components\element\Time\RangeSelectDateTime.vue
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
  name: "RangeSelectDateTime",
});

const emit = defineEmits(["update:timeRange"]);
// 日期范围快捷选项（返回 [开始日期, 结束日期]）
const rangeDateShortcuts = [
  {
    text: "最近一周",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      return [start, end];
    },
  },
  {
    text: "最近一个月",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      return [start, end];
    },
  },
  {
    text: "最近三个月",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
      return [start, end];
    },
  },
  {
    text: "本月初至今",
    value: () => {
      const end = new Date();
      const start = new Date(end.getFullYear(), end.getMonth(), 1); // 本月第一天
      return [start, end];
    },
  },
  {
    text: "未来三天",
    value: () => {
      const start = new Date();
      const end = new Date();
      end.setTime(end.getTime() + 3600 * 1000 * 24 * 3);
      return [start, end];
    },
  },
  {
    text: "未来一周",
    value: () => {
      const start = new Date();
      const end = new Date();
      end.setTime(end.getTime() + 3600 * 1000 * 24 * 7);
      return [start, end];
    },
  },
  {
    text: "未来一个月",
    value: () => {
      const start = new Date();
      const end = new Date();
      end.setTime(end.getTime() + 3600 * 1000 * 24 * 30);
      return [start, end];
    },
  },
];

//
const timeRange = defineModel<[string, string]>({
  default: [],
});

const handleToSelectTime = () => {
  emit("update:timeRange", timeRange.value);
};
</script>

<style lang="scss" scoped></style>
