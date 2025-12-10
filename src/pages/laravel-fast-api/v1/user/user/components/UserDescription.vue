<!--
 * @Descripttion: 
 * @version: v1
 * @Author: youhujun youhu8888@163.com
 * @Date: 2025-12-01 16:19:28
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-12-02 22:01:22
 * @FilePath: \src\pages\laravel-fast-api\v1\user\user\components\UserDescription.vue
 * Copyright (C) 2025 youhujun. All rights reserved.
-->
<template>
  <div>
    <el-descriptions title="用户信息">
      <el-descriptions-item label="头像">
        <el-avatar
          v-if="rowData.avatar"
          shape="circle"
          :size="38"
          fit="cover"
          :src="rowData.avatar"
          @error="errorHandler"
        />
        <el-avatar v-else :size="38">
          <img src="~@/assets/images/avatar.gif" />
        </el-avatar>
      </el-descriptions-item>
      <el-descriptions-item label="姓名">
        <el-tag size="small" plain>
          {{ rowData.real_name ? rowData.real_name : "暂无" }}
        </el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="昵称">
        <el-tag size="small" plain>
          {{ rowData.nick_name ? rowData.nick_name : "暂无" }}
        </el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="账号">
        <el-tag size="small" plain>
          {{ rowData.account_name ? rowData.account_name : "暂无" }}
        </el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="手机号">
        <el-tag size="small" plain>
          {{ rowData.phone ? rowData.phone : "暂无" }}
        </el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="性别">
        <el-tag size="small" plain>
          {{ showSex }}
        </el-tag>
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>
<script setup lang="ts">
import type { UserListItem } from "@/api/laravel-fast-api/v1/user/user/user-type";
defineOptions({
  name: "UserDescription",
});

const rowData = defineModel<UserListItem>("rowData", {
  default: () => {
    return {
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
      source_id: 0,
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
  },
});

//定义头像加载失败
const errorHandler = () => {
  return;
};

//定义显示性别
const showSex = computed(() => {
  let showText = "暂无";
  if (rowData.value.sex === 0) {
    showText = "未知";
  }
  if (rowData.value.sex === 10) {
    showText = "男";
  }
  if (rowData.value.sex === 20) {
    showText = "女";
  }
  return showText;
});
</script>

<style lang="scss" scoped></style>
