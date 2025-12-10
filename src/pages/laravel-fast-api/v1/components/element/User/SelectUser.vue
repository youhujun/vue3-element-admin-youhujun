<!--
 * @Descripttion: 
 * @version: v1
 * @Author: youhujun youhu8888@163.com
 * @Date: 2025-11-04 12:53:58
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-12-10 02:34:26
 * @FilePath: d:\wwwroot\Open\Vue\vue3-element-admin-youhujun\src\pages\laravel-fast-api\v1\components\element\User\SelectUser.vue
 * Copyright (C) 2025 youhujun. All rights reserved.
 使用示例:
 <SelectUser v-model:select-user-id="createForm.user_id"></SelectUser>
-->
<template>
  <div class="select-user-box">
    <el-row :gutter="10">
      <el-col v-if="isShowRealAuthStatus" :span="12" style="text-align: center">
        <el-tag type="primary" size="large">认证状态</el-tag>
        <el-select
          v-model="where.real_auth_status"
          clearable
          placeholder="认证状态"
          :empty-values="[null, undefined]"
          :value-on-clear="null"
          style="width: 240px"
          :validate-event="false"
          @change="handleChangeRealAuthStatus"
        >
          <el-option
            v-for="item in userTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="12" style="text-align: center">
        <el-tag v-if="isShowRealAuthStatus" type="primary" size="large">请选择用户</el-tag>
        <el-select
          v-model="selectUserId"
          clearable
          placeholder="手机号,姓名,昵称,账户"
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
            v-for="item in userListOptions"
            :key="item.id"
            :label="`${item.phone || '暂无手机号'} (姓名: ${item.real_name || '暂无账号'})(昵称: ${item.nick_name || '暂无昵称'})`"
            :value="item.id"
          >
            <span style="float: left">手机号:{{ item.phone ? item.phone : "暂无" }}&nbsp;</span>
            <span style="float: right; font-size: 13px; color: var(--el-text-color-secondary)">
              姓名:{{ item.real_name ? item.real_name : "暂无" }}&nbsp;
            </span>
            <span style="float: right; font-size: 13px; color: var(--el-text-color-secondary)">
              昵称:{{ item.nick_name ? item.nick_name : "暂无" }}&nbsp;
            </span>
          </el-option>
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
import UserOptionAPI from "@/api/laravel-fast-api/v1/user/user/option/user-option-api";
import type { FindUser } from "@/api/laravel-fast-api/v1/user/user/option/user-option-type";
import type { UserListItem } from "@/api/laravel-fast-api/v1/user/user/user-type";

defineOptions({
  name: "SelectUser",
});

//选择的相册id
const selectUserId = defineModel<number>("selectUserId", {
  default: 0,
});

//定义 props
const { isShowRealAuthStatus } = withDefaults(
  defineProps<{
    isShowRealAuthStatus?: boolean;
  }>(),
  {
    isShowRealAuthStatus: false,
  }
);
//加载效果
const loading = ref(false);

//相册类型选项
const userTypeOptions = [
  {
    value: 10,
    label: "未认证",
  },
  {
    value: 20,
    label: "认证中",
  },
  {
    value: 30,
    label: "未通过",
  },
  {
    value: 40,
    label: "认证通过",
  },
];

const initUserObject = {
  id: 0,
  userId: "",
  created_at: "",
  switch: 1,
  level_id: 1,
  parent_id: 0,
  account_name: "",
  invite_code: "",
  phone: "",
  real_auth_status: 0,
  source_user_id: 0,
  amount: "0",
  coin: "0",
  score: "0",
  nick_name: "",
  real_name: "",
  solar_birthday_at: "",
  chinese_birthday_at: "",
  sex: 0,
  id_number: "",
  introduction: "",
  avatar: "",
  user_level: "",
  role: [],
};
//相册选项
const userListOptions = ref<UserListItem[]>([initUserObject]);

//条件
const where = ref<FindUser>({
  //相册类型
  find: null,
  real_auth_status: 10,
  //查找内容
});

//获取默认相册
const getDefaultUser = async () => {
  // 明确 API 返回结果中 data 的类型为 UserListItem[]
  const result = await UserOptionAPI.getDefaultUser(where.value);
  const { data } = result as { data: UserListItem[] }; // 断言 data 类型

  // 明确 newOptions 为 UserListItem[] 类型
  const newOptions: UserListItem[] = data.length > 0 ? data : [initUserObject];
  userListOptions.value = newOptions;
  // 等待DOM更新后再检查匹配性（关键修改）
  await nextTick();

  // 此时 item 会被自动推断为 UserListItem 类型
  const isExist = newOptions.some((item) => item.id === selectUserId.value);
  if (!isExist) {
    selectUserId.value = newOptions[0].id;
  }
};

//查找相册
const findUser = async () => {
  const result = await UserOptionAPI.findUser(where.value);
  const { data } = result as { data: UserListItem[] }; // 断言 data 类型
  const newOptions: UserListItem[] = data.length > 0 ? data : [initUserObject];
  userListOptions.value = newOptions;
  // 等待DOM更新后再检查匹配性（关键修改）
  await nextTick();
  const isExist = newOptions.some((item) => item.id === selectUserId.value);
  if (!isExist) {
    selectUserId.value = newOptions[0].id;
  }
};

//远程搜索
const remoteMethod = (query: string) => {
  loading.value = true;
  if (query) {
    where.value.find = query;
    findUser();
  } else {
    getDefaultUser();
  }

  setTimeout(() => {
    loading.value = false;
  }, 500);
};
//初始化
const initSelect = () => {
  loading.value = false;
  where.value.find = null;
  where.value.real_auth_status = 10;
};

//更改用户认证类型
const handleChangeRealAuthStatus = () => {
  getDefaultUser();
};
// 处理清空选择
const handleClearSelect = () => {
  // 清空后重置为当前选项列表的第一个值
  selectUserId.value = userListOptions.value[0].id;
};
//组件加载
onMounted(() => {
  //获取默认相册
  getDefaultUser();
});

//组件卸载
onUnmounted(() => [initSelect()]);
</script>

<style lang="scss" scoped>
.select-user-box {
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
