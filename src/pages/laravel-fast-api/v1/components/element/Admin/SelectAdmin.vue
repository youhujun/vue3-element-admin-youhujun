<!--
 * @Descripttion: 
 * @version: v1
 * @Author: youhujun youhu8888@163.com
 * @Date: 2025-11-04 12:53:58
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-12-10 01:36:08
 * @FilePath: d:\wwwroot\Open\Vue\vue3-element-admin-youhujun\src\pages\laravel-fast-api\v1\components\element\Admin\SelectAdmin.vue
 * Copyright (C) 2025 youhujun. All rights reserved.
 使用示例:
 <SelectAdmin v-model:select-admin-id="createForm.admin_id"></SelectAdmin>
-->
<template>
  <div class="select-admin-box">
    <el-select
      v-model="selectAdminId"
      clearable
      placeholder="手机号,账户"
      :empty-values="[null, undefined]"
      :value-on-clear="0"
      filterable
      remote
      :loading="loading"
      :remote-method="remoteMethod"
      :validate-event="false"
      style="width: 240px"
      @clear="handleClearSelect"
    >
      <el-option
        v-for="item in adminListOptions"
        :key="item.id"
        :label="`${item.phone || '暂无手机号'} (账号: ${item.account_name || '暂无账号'})`"
        :value="item.id"
      >
        <span style="float: left">手机号:{{ item.phone ? item.phone : "暂无" }}&nbsp;</span>
        <span style="float: right; font-size: 13px; color: var(--el-text-color-secondary)">
          账号:{{ item.account_name ? item.account_name : "暂无" }}&nbsp;
        </span>
      </el-option>
      <template #loading>
        <el-icon class="is-loading">
          <svg class="circular" viewBox="0 0 20 20">
            <g class="path2 loading-path" stroke-width="0" style="stroke: none; animation: none">
              <circle r="3.375" class="dot1" rx="0" ry="0" />
              <circle r="3.375" class="dot2" rx="0" ry="0" />
              <circle r="3.375" class="dot4" rx="0" ry="0" />
              <circle r="3.375" class="dot3" rx="0" ry="0" />
            </g>
          </svg>
        </el-icon>
      </template>
    </el-select>
  </div>
</template>
<script setup lang="ts">
//api和type
import AdminOptionAPI from "@/api/laravel-fast-api/v1/user/admin/option/admin-option-api";

defineOptions({
  name: "SelectAdmin",
});

//选择的相册id
const selectAdminId = defineModel<number>("selectAdminId", {
  default: 0,
});

interface SearchAdminListItem {
  id: number;
  user_id: number;
  switch: number;
  phone: string;
  created_at: string;
  account_name: string;
}

//加载效果
const loading = ref(false);

const initAdminObject = {
  id: 0,
  user_id: 0,
  switch: 0,
  phone: "",
  created_at: "",
  account_name: "",
};
//相册选项
const adminListOptions = ref<SearchAdminListItem[]>([initAdminObject]);

//条件
const where = ref({
  //相册类型
  find: "",
  //查找内容
});

//获取默认相册
const getDefaultAdmin = async () => {
  // 明确 API 返回结果中 data 的类型为 AdminListItem[]
  const result = await AdminOptionAPI.getDefaultAdmin();
  const { data } = result as { data: SearchAdminListItem[] }; // 断言 data 类型

  // 明确 newOptions 为 AdminListItem[] 类型
  const newOptions: SearchAdminListItem[] = data.length > 0 ? data : [initAdminObject];
  adminListOptions.value = newOptions;
  // 等待DOM更新后再检查匹配性（关键修改）
  await nextTick();

  // 此时 item 会被自动推断为 AdminListItem 类型
  const isExist = newOptions.some((item) => item.id === selectAdminId.value);
  if (!isExist) {
    selectAdminId.value = newOptions[0].id;
  }
};

//查找相册
const findAdmin = async () => {
  const result = await AdminOptionAPI.findAdmin(where.value);
  const { data } = result as { data: SearchAdminListItem[] }; // 断言 data 类型
  const newOptions: SearchAdminListItem[] = data.length > 0 ? data : [initAdminObject];
  adminListOptions.value = newOptions;
  // 等待DOM更新后再检查匹配性（关键修改）
  await nextTick();
  const isExist = newOptions.some((item) => item.id === selectAdminId.value);
  if (!isExist) {
    selectAdminId.value = newOptions[0].id;
  }
};

//远程搜索
const remoteMethod = (query: string) => {
  loading.value = true;
  if (query) {
    where.value.find = query;
    findAdmin();
  } else {
    getDefaultAdmin();
  }

  setTimeout(() => {
    loading.value = false;
  }, 500);
};
//初始化
const initSelect = () => {
  loading.value = false;
  where.value.find = "";
};

// 处理清空选择
const handleClearSelect = () => {
  // 清空后重置为当前选项列表的第一个值
  selectAdminId.value = adminListOptions.value[0].id;
};
//组件加载
onMounted(() => {
  //获取默认相册
  getDefaultAdmin();
});

//组件卸载
onUnmounted(() => [initSelect()]);
</script>

<style lang="scss" scoped>
.select-admin-box {
  width: 100;
  height: auto;
}
.el-select-dropdown__loading {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  font-size: 20px;
}

.circular {
  display: inline;
  width: 30px;
  height: 30px;
  animation: loading-rotate 2s linear infinite;
}
.path {
  stroke: var(--el-color-primary);
  stroke-width: 2;
  stroke-linecap: round;
  stroke-dasharray: 90, 150;
  stroke-dashoffset: 0;
  animation: loading-dash 1.5s ease-in-out infinite;
}
.loading-path .dot1 {
  opacity: 0.3;
  fill: var(--el-color-primary);
  transform: translate(3.75px, 3.75px);
  animation: custom-spin-move 1s infinite linear alternate;
}
.loading-path .dot2 {
  opacity: 0.3;
  fill: var(--el-color-primary);
  transform: translate(calc(100% - 3.75px), 3.75px);
  animation: custom-spin-move 1s infinite linear alternate;
  animation-delay: 0.4s;
}
.loading-path .dot3 {
  opacity: 0.3;
  fill: var(--el-color-primary);
  transform: translate(3.75px, calc(100% - 3.75px));
  animation: custom-spin-move 1s infinite linear alternate;
  animation-delay: 1.2s;
}
.loading-path .dot4 {
  opacity: 0.3;
  fill: var(--el-color-primary);
  transform: translate(calc(100% - 3.75px), calc(100% - 3.75px));
  animation: custom-spin-move 1s infinite linear alternate;
  animation-delay: 0.8s;
}
@keyframes loading-rotate {
  to {
    transform: rotate(360deg);
  }
}
@keyframes loading-dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -40px;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -120px;
  }
}
@keyframes custom-spin-move {
  to {
    opacity: 1;
  }
}
</style>
