<template>
  <el-date-picker
    v-model="pastTime"
    type="datetime"
    unlink-panels
    placeholder="请选择日期"
    :value-format="valueFormat"
    :shortcuts="dateShortcuts"
    :disabled-date="disabledFutureDate"
    :disabled-time="disabledFutureTime"
    clearable
    @change="handleToSelectTime()"
  />
</template>
<script setup lang="ts">
defineOptions({
  name: "PastSelectDateTime",
});

const emit = defineEmits(["update:pastTime"]);

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
];

/**
 * 禁用未来的日期
 * @param date 待判断的日期
 * @returns 是否禁用（true 表示禁用）
 */
const disabledFutureDate = (date: Date) => {
  // 只保留日期部分进行比较（去除时间戳的时分秒毫秒）
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const targetDate = new Date(date);
  targetDate.setHours(0, 0, 0, 0);

  // 禁用大于今天的日期
  return targetDate > today;
};

/**
 * 禁用未来的时间（仅对今天生效）
 * @param date 选中的日期
 * @returns 时间禁用配置
 */
const disabledFutureTime = (date: Date) => {
  // 获取当前时间
  const now = new Date();

  // 只保留日期部分进行比较
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const targetDate = new Date(date);
  targetDate.setHours(0, 0, 0, 0);

  // 如果选中的是今天，禁用当前时间之后的时间
  if (targetDate.getTime() === today.getTime()) {
    return {
      // 禁用大于当前小时的小时数
      disabledHours: () => {
        const currentHour = now.getHours();
        return Array.from({ length: 24 }, (_, i) => i).filter((hour) => hour > currentHour);
      },
      // 禁用当前小时中大于当前分钟的分钟数
      disabledMinutes: (selectedHour: number) => {
        const currentHour = now.getHours();
        if (selectedHour !== currentHour) return [];

        const currentMinute = now.getMinutes();
        return Array.from({ length: 60 }, (_, i) => i).filter((minute) => minute > currentMinute);
      },
      // 禁用当前分钟中大于当前秒数的秒数（可选，根据需求决定是否需要）
      disabledSeconds: (selectedHour: number, selectedMinute: number) => {
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        if (selectedHour !== currentHour || selectedMinute !== currentMinute) return [];

        const currentSecond = now.getSeconds();
        return Array.from({ length: 60 }, (_, i) => i).filter((second) => second > currentSecond);
      },
    };
  }

  // 选中的是过去的日期，不禁用任何时间
  return {
    disabledHours: () => [],
    disabledMinutes: () => [],
    disabledSeconds: () => [],
  };
};

//
const pastTime = defineModel<string>({
  default: "",
});

const handleToSelectTime = () => {
  emit("update:pastTime", pastTime.value);
};
</script>

<style lang="scss" scoped></style>
