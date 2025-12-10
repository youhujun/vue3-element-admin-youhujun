<!--
 * @Descripttion: 
 * @version: v1
 * @Author: youhujun 2900976495@qq.com
 * @Date: 2025-10-09 14:16:54
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-12-05 17:44:58
 * @FilePath: \src\pages\laravel-fast-api\v1\user\user\userAuth\components\UserAuthSearch.vue
 * Copyright (C) 2025 youhujun. All rights reserved.
-->
<template>
  <div>
    <!-- 第一行开始 -->
    <el-row :gutter="20">
      <!-- 第一列开始 -->
      <el-col :span="12">
        <div class="inline">
          <el-tag style="height: 2rem; line-height: 2rem" type="info">搜索选项</el-tag>
          <el-input
            v-model="where.find"
            clearable
            :placeholder="findSelect[where.findSelectIndex].label"
          >
            <template #prepend>
              <el-select v-model="where.findSelectIndex" placeholder="请选择">
                <el-option label="手机号" value="0" />
                <el-option label="账号" value="1" />
                <el-option label="昵称" value="2" />
                <el-option label="姓名" value="3" />
                <el-option label="身份证号" value="4" />
              </el-select>
            </template>
            <template #append>
              <el-button icon="Search" @click="handleSearchFind" />
            </template>
          </el-input>
        </div>
      </el-col>
      <!-- 第一列结束 -->
      <!-- 第二列开始 -->
      <el-col :span="12">
        <div class="inline">
          <el-tag style="height: 2rem; line-height: 2rem" type="info">时间</el-tag>
          <RangeSelectDateTime v-model:time-range="where.timeRange"></RangeSelectDateTime>
        </div>
      </el-col>
      <!-- 第二列结束 -->
    </el-row>
    <!-- 第一行结束 -->
    <!-- 第二行开始 -->
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="inline">
          <el-tag style="height: 2rem; line-height: 2rem" type="info">认证状态</el-tag>
          <el-select
            v-model="where.is_real_auth"
            placeholder="请选择"
            clearable
            @change="handleRealAuthChange"
          >
            <el-option
              v-for="item in authenticationOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="inline">
          <el-tag style="height: 2rem; line-height: 2rem" type="info">审核状态</el-tag>
          <el-select v-model="where.status" placeholder="请选择" clearable>
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="inline">
          <el-tag style="height: 2rem; line-height: 2rem" type="info">用户状态</el-tag>
          <el-select v-model="where.switch" placeholder="请选择" clearable>
            <el-option
              v-for="item in switchOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </el-col>
    </el-row>
    <!-- 第二行结束 -->
    <!-- 第三行开始 -->
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
  </div>
</template>

<script setup lang="ts">
import { throttle } from "@/utils";
import RangeSelectDateTime from "@/pages/laravel-fast-api/v1/components/element/Time/RangeSelectDateTime.vue";

//定义组件名称
defineOptions({
  name: "UserAuthSearch",
});

// 定义搜索条件类型
interface SearchWhere {
  find: string;
  findSelectIndex: number;
  timeRange: [string, string] | [];
  switch: number | null;
  is_real_auth: string;
  status: number;
  sortType: number;
}

// 定义选项类型
interface OptionItem {
  value: string | number;
  label: string;
}

// 搜索条件
const where = ref<SearchWhere>({
  find: "",
  findSelectIndex: 0,
  timeRange: [],
  switch: null,
  is_real_auth: "",
  status: 0,
  sortType: 2,
});

// 搜索类型选项
const findSelect: OptionItem[] = [
  { label: "手机号", value: "0" },
  { label: "账号", value: "1" },
  { label: "昵称", value: "2" },
  { label: "姓名", value: "3" },
  { label: "身份证号", value: "4" },
];

// 用户状态选项
const switchOptions: OptionItem[] = [
  { value: 1, label: "正常" },
  { value: 0, label: "禁用" },
];

// 排序选项
const sortOptions: OptionItem[] = [
  { value: 1, label: "按时间升序" },
  { value: 2, label: "按时间降序" },
];

// 认证状态选项
const authenticationOptions: OptionItem[] = [
  { value: "0", label: "未认证" },
  { value: "1", label: "已认证" },
];

// 审核状态选项
const statusOptions: OptionItem[] = [
  { value: 0, label: "未申请" },
  { value: 10, label: "待审核" },
  { value: 20, label: "已通过" },
  { value: 30, label: "已拒绝" },
];

// 定义 emits
const emit = defineEmits(["update:handleChangeSearch"]);
// 认证状态改变
const handleRealAuthChange = (id: string) => {
  where.value.is_real_auth = id;
  handleToSearch();
};

// 执行搜索
const handleToSearch = throttle(() => {
  emit("update:handleChangeSearch", where.value);
}, 1000);

// 单独查找
const handleSearchFind = throttle(() => {
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
