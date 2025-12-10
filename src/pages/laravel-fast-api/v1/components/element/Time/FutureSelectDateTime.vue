<!--
 * @Descripttion: 
 * @version: v1
 * @Author: youhujun youhu8888@163.com
 * @Date: 2025-11-08 23:02:45
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-12-10 02:01:13
 * @FilePath: d:\wwwroot\Open\Vue\vue3-element-admin-youhujun\src\pages\laravel-fast-api\v1\components\element\Time\FutureSelectDateTime.vue
 * Copyright (C) 2025 youhujun. All rights reserved.
-->
<template>
  <el-date-picker
    v-model="futureTime"
    type="datetime"
    placeholder="请选择时间"
    :value-format="valueFormat"
    :shortcuts="dateShortcuts"
    :disabled-date="disabledDate"
    :disabled-time="disabledTime"
    @change="handleToSelectTime()"
  />
</template>
<script setup lang="ts">
defineOptions({
  name: "FutureSelectDateTime",
});

const emit = defineEmits(["update:futureTime"]);

const { valueFormat } = withDefaults(
  defineProps<{
    valueFormat?: string;
  }>(),
  {
    valueFormat: "YYYY-MM-DD HH:mm:ss",
  }
);
// 日期范围快捷选项（返回 [开始日期, 结束日期]）
const dateShortcuts = [
  {
    text: "明天",
    value: () => {
      const date = new Date();
      date.setTime(date.getTime() + 3600 * 1000 * 24);
      date.setHours(0, 0, 0, 0); // 可以根据需求设置具体时间（如0点）
      return date; // 返回单个日期对象
    },
  },
  {
    text: "后天",
    value: () => {
      const date = new Date();
      date.setTime(date.getTime() + 3600 * 1000 * 24 * 2);
      date.setHours(0, 0, 0, 0);
      return date;
    },
  },
  {
    text: "三天后",
    value: () => {
      const date = new Date();
      date.setTime(date.getTime() + 3600 * 1000 * 24 * 3);
      date.setHours(0, 0, 0, 0);
      return date;
    },
  },
  {
    text: "一周后",
    value: () => {
      const date = new Date();
      date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
      date.setHours(0, 0, 0, 0);
      return date;
    },
  },
];

// 禁用过去的日期
const disabledDate = (time: Date) => {
  // 获取当前时间的年月日（0点0分0秒）
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  // 禁用今天之前的日期
  return time.getTime() < today.getTime();
};

// 禁用当天过去的时间
const disabledTime = (date: Date) => {
  // 如果不是今天，不限制时间
  const today = new Date();
  if (
    date.getDate() !== today.getDate() ||
    date.getMonth() !== today.getMonth() ||
    date.getFullYear() !== today.getFullYear()
  ) {
    return {
      disabledHours: () => [],
      disabledMinutes: () => [],
      disabledSeconds: () => [],
    };
  }

  // 是今天，禁用当前时间之前的时分秒
  const currentHour = today.getHours();
  const currentMinute = today.getMinutes();
  const currentSecond = today.getSeconds();

  return {
    // 禁用当前小时之前的小时
    disabledHours: () => Array.from({ length: currentHour }, (_, i) => i),
    // 禁用当前小时中当前分钟之前的分钟
    disabledMinutes: (selectedHour: number) => {
      if (selectedHour !== currentHour) return [];
      return Array.from({ length: currentMinute }, (_, i) => i);
    },
    // 禁用当前分钟中当前秒数之前的秒
    disabledSeconds: (selectedHour: number, selectedMinute: number) => {
      if (selectedHour !== currentHour || selectedMinute !== currentMinute) return [];
      return Array.from({ length: currentSecond }, (_, i) => i);
    },
  };
};

//定义默认未来时间
const futureTime = defineModel<string>({
  default: () => {
    const date = new Date();
    // 增加1小时（3600秒 * 1000毫秒）
    date.setTime(date.getTime() + 3600 * 1000);
    // 格式化时间为 YYYY-MM-DD HH:mm:ss
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  },
});

const handleToSelectTime = () => {
  emit("update:futureTime", futureTime.value);
};
</script>

<style lang="scss" scoped></style>
