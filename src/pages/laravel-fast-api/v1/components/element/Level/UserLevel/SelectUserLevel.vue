<!--
 * @Descripttion: 
 * @version: v1
 * @Author: youhujun youhu8888@163.com
 * @Date: 2025-11-04 12:53:58
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-12-10 02:02:30
 * @FilePath: d:\wwwroot\Open\Vue\vue3-element-admin-youhujun\src\pages\laravel-fast-api\v1\components\element\Level\UserLevel\SelectUserLevel.vue
 * Copyright (C) 2025 youhujun. All rights reserved.
-->
<template>
  <div class="select-album-box">
    <el-row :gutter="10">
      <el-col :span="12" style="text-align: center">
        <el-select
          v-model="selectUserLevelListItemId"
          clearable
          placeholder="选择用户级别"
          :empty-values="[null, undefined]"
          :value-on-clear="null"
          filterable
          remote
          :loading="loading"
          :remote-method="remoteMethod"
          :validate-event="false"
          style="width: 240px"
          @clear="handleClearSelect"
        >
          <el-option
            v-for="item in bankListOptions"
            :key="item.id"
            :label="item.level_name"
            :value="item.id"
          ></el-option>
          <template #loading>
            <el-icon class="is-loading">
              <svg class="circular" viewBox="0 0 20 20">
                <g
                  class="path2 loading-path"
                  stroke-width="0"
                  style="stroke: none; animation: none"
                >
                  <circle r="3.375" class="dot1" rx="0" ry="0" />
                  <circle r="3.375" class="dot2" rx="0" ry="0" />
                  <circle r="3.375" class="dot4" rx="0" ry="0" />
                  <circle r="3.375" class="dot3" rx="0" ry="0" />
                </g>
              </svg>
            </el-icon>
          </template>
        </el-select>
      </el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts">
//api和type
import UserLevelOptionAPI from "@/api/laravel-fast-api/v1/business/level/userLevel/option/user-level-option-api";
import type { FindOption } from "@/api/laravel-fast-api/v1/api-option-type";
import type { UserLevelListItem } from "@/api/laravel-fast-api/v1/business/level/userLevel/user-level-type";

defineOptions({
  name: "SelectUserLevel",
});

//选择的相册id
const selectUserLevelListItemId = defineModel<number>("selectUserLevelListItemId", {
  default: 0,
});
//加载效果
const loading = ref(false);

//初始化银行对象
const initUserLevelListItemObject = {
  id: 0,
  created_at: "",
  updated_at: "",
  sort: 100,
  switch: 1,
  type: 0,
  level_name: "",
  level_code: "",
  note: "",
};
//相册选项
const bankListOptions = ref<UserLevelListItem[]>([initUserLevelListItemObject]);

//条件
const where = ref<FindOption>({
  //查找内容
  find: null,
});

//获取默认银行
const getDefaultUserLevel = async () => {
  // 明确 API 返回结果中 data 的类型为 AlbumListItem[]
  const result = await UserLevelOptionAPI.defaultUserLevel();
  const { data } = result as { data: UserLevelListItem[] }; // 断言 data 类型

  // 明确 newOptions 为 AlbumListItem[] 类型
  const newOptions: UserLevelListItem[] = data.length > 0 ? data : [initUserLevelListItemObject];
  bankListOptions.value = newOptions;
  // 等待DOM更新后再检查匹配性（关键修改）
  await nextTick();

  // 此时 item 会被自动推断为 AlbumListItem 类型
  const isExist = newOptions.some((item) => item.id === selectUserLevelListItemId.value);
  if (!isExist) {
    selectUserLevelListItemId.value = newOptions[0].id;
  }
};

//查找银行
const findUserLevel = async () => {
  const result = await UserLevelOptionAPI.findUserLevel(where.value);
  const { data } = result as { data: UserLevelListItem[] }; // 断言 data 类型
  const newOptions: UserLevelListItem[] = data.length > 0 ? data : [initUserLevelListItemObject];
  bankListOptions.value = newOptions;
  // 等待DOM更新后再检查匹配性（关键修改）
  await nextTick();
  const isExist = newOptions.some((item) => item.id === selectUserLevelListItemId.value);
  if (!isExist) {
    selectUserLevelListItemId.value = newOptions[0].id;
  }
};

//远程搜索
const remoteMethod = (query: string) => {
  loading.value = true;
  if (query) {
    where.value.find = query;
    findUserLevel();
  } else {
    getDefaultUserLevel();
  }

  setTimeout(() => {
    loading.value = false;
  }, 500);
};
//初始化
const initSelect = () => {
  loading.value = false;
  where.value.find = null;
};

// 处理清空选择
const handleClearSelect = () => {
  // 清空后重置为当前选项列表的第一个值
  selectUserLevelListItemId.value = bankListOptions.value[0].id;
};
//组件加载
onMounted(() => {
  //获取默认银行
  getDefaultUserLevel();
});

//组件卸载
onUnmounted(() => [initSelect()]);
</script>

<style lang="scss" scoped>
.select-album-box {
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
