<!--
 * @Descripttion: 
 * @version: v1
 * @Author: youhujun youhu8888@163.com
 * @Date: 2025-10-30 00:53:02
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-12-05 17:41:18
 * @FilePath: \src\pages\laravel-fast-api\v1\log\login\phoneLogin\components\UserLoginSearch.vue
 * Copyright (C) 2025 youhujun. All rights reserved.
-->
<template>
  <div>
    <!-- 第一行开始 -->
    <el-row :gutter="20">
      <!-- 第一列开始 -->
      <el-col :span="12">
        <div class="inline">
          <el-tag style="height: 2rem; line-height: 2rem" type="info">管理员选项</el-tag>
          <SelectUser v-model:select-admin-id="where.user_id"></SelectUser>
        </div>
      </el-col>
      <!-- 第一列结束 -->
      <!-- 第二列开始 -->
      <el-col :span="12">
        <div class="inline">
          <el-tag style="height: 2rem; line-height: 2rem" type="info">时间</el-tag>
          <RangeSelectDateTime v-model:past-time-range="where.timeRange"></RangeSelectDateTime>
        </div>
      </el-col>
      <!-- 第二列结束 -->
    </el-row>
    <!-- 第一行结束 -->
    <!-- 第二行开始 -->
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="inline">
          <el-tag style="height: 2rem; line-height: 2rem" type="info">排序</el-tag>
          <el-select
            v-model="where.sortType"
            placeholder="请选择排序方式"
            style="margin-right: 0.5rem"
          >
            <el-option
              v-for="item in sortOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </el-col>
      <el-col :span="2" :push="14">
        <div class="inline-right">
          <el-button type="primary" @click="handleToSearch">搜索</el-button>
        </div>
      </el-col>
    </el-row>
    <!-- 第二行结束 -->
  </div>
</template>

<script setup lang="ts">
import RangeSelectDateTime from "@/pages/laravel-fast-api/v1/components/element/Time/RangeSelectDateTime.vue";
import SelectUser from "@/pages/laravel-fast-api/v1/components/element/User/SelectUser.vue";
import { throttle } from "@/utils";

//定义组件名称
defineOptions({
  name: "UserLoginSearch",
});

// 定义搜索条件类型
interface SearchWhere {
  //管理员id
  user_id: number;
  // 事件类型
  eventType: number;
  //时间范围
  timeRange: string[];
  //排序方式
  sortType: number;
  // 分页
  currentPage: number;
  //每页条数
  pageSize: number;
  //数据总数
  total: number;
}

// 定义选项类型
interface OptionItem {
  value: string | number;
  label: string;
}

// 搜索条件
const where = ref<SearchWhere>({
  //管理员id
  user_id: 0,
  // 事件类型
  eventType: 0,
  //时间范围
  timeRange: [],
  //排序方式
  sortType: 2,
  // 分页
  currentPage: 1,
  //每页条数
  pageSize: 10,
  //数据总数
  total: 0,
});

// 排序选项
const sortOptions: OptionItem[] = [
  { value: 1, label: "按时间升序" },
  { value: 2, label: "按时间降序" },
];

// 定义 emits
const emit = defineEmits(["update:handleChangeSearch"]);

// 执行搜索
const handleToSearch = throttle(() => {
  emit("update:handleChangeSearch", where.value);
}, 1000);
</script>

<style lang="scss" scoped>
.inline {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-top: 1rem;
}
.inline-right {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 1rem;
}
</style>
