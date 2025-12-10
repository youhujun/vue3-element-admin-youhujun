<!--
 * @Descripttion: 
 * @version: v1
 * @Author: youhujun youhu8888@163.com
 * @Date: 2025-10-19 01:15:40
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-12-01 16:33:57
 * @FilePath: \src\pages\laravel-fast-api\v1\user\user\userList\components\ListItemDetails\UserInfo.vue
 * Copyright (C) 2025 youhujun. All rights reserved.
-->
<template>
  <div>
    <!-- 详情 -->
    <el-row class="row-one">
      <el-tag type="info" style="margin-right: 1rem">账号</el-tag>
      <el-tag style="margin-right: 1rem" type="primary">
        {{ rowData.account_name ? rowData.account_name : "暂无" }}
      </el-tag>
      <el-tag style="margin-right: 1rem" type="info">手机号</el-tag>
      <el-tag style="margin-right: 1rem" type="primary">
        {{ rowData.phone ? rowData.phone : "暂无" }}
      </el-tag>
      <el-tag style="margin-right: 1rem" type="info">用户状态</el-tag>
      <el-tag style="margin-right: 1rem" :type="userStatus.type">{{ userStatus.text }}</el-tag>
    </el-row>
    <el-row class="row-one">
      <el-tag style="margin-right: 1rem" type="info">用户邀请码</el-tag>
      <el-tag style="margin-right: 1rem" type="primary">
        {{ rowData.invite_code ? rowData.invite_code : "暂无" }}
      </el-tag>
      <el-tag style="margin-right: 1rem" type="info">用户级别</el-tag>
      <el-tag style="margin-right: 1rem" type="primary">
        {{ rowData.user_level ? rowData.user_level : "暂无" }}
      </el-tag>
      <el-tag style="margin-right: 1rem" type="info">注册时间</el-tag>
      <el-tag style="margin-right: 1rem" type="primary">{{ rowData.created_at }}</el-tag>
    </el-row>
    <el-row class="row-one">
      <el-tag style="margin-right: 1rem" type="info">用户昵称</el-tag>
      <el-tag style="margin-right: 1rem" type="primary">
        {{ rowData.nick_name ? rowData.nick_name : "暂无" }}
      </el-tag>
      <el-tag style="margin-right: 1rem" type="info">用户姓名</el-tag>
      <el-tag style="margin-right: 1rem" type="primary">
        {{ rowData.real_name ? rowData.real_name : "暂无" }}
      </el-tag>
      <el-tag style="margin-right: 1rem" type="info">用户性别</el-tag>
      <el-tag style="margin-right: 1rem" type="primary">{{ showUserSex }}</el-tag>
    </el-row>
    <el-row class="row-one">
      <el-tag style="margin-right: 1rem" type="info">用户身份证</el-tag>
      <el-tag style="margin-right: 1rem" type="primary">
        {{ rowData.id_number ? rowData.id_number : "暂无" }}
      </el-tag>
      <el-tag style="margin-right: 1rem" type="info">出生日期(阴历)</el-tag>
      <el-tag style="margin-right: 1rem" type="primary">
        {{ rowData.solar_birthday_at ? rowData.solar_birthday_at : "暂无" }}
      </el-tag>
      <el-tag style="margin-right: 1rem" type="info">出生日期(阳历)</el-tag>
      <el-tag style="margin-right: 1rem" type="primary">
        {{ rowData.chinese_birthday_at ? rowData.chinese_birthday_at : "暂无" }}
      </el-tag>
    </el-row>
    <el-row class="row-one">
      <el-tag style="margin-right: 1rem" type="info">用户角色</el-tag>
      <el-tag style="margin-right: 1rem" type="primary">{{ showUserRole }}</el-tag>
    </el-row>
    <el-row class="row-one">
      <el-tag style="margin-right: 1rem" type="info">userId</el-tag>
      <el-tag style="margin-right: 1rem" type="primary">{{ rowData.userId }}</el-tag>
    </el-row>
  </div>
</template>
<script setup lang="ts">
//api
import type { UserListItem } from "@/api/laravel-fast-api/v1/user/user/user-type";
//定义组件名称
defineOptions({
  name: "UserInfo",
});

//定义行数据
const rowData = defineModel<UserListItem>("rowData", {
  default: () => ({
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
  }),
});

// 定义用户状态时显式指定类型
const userStatus = computed<{
  type: "primary" | "danger" | "success" | "warning" | "info";
  text: string;
}>(() => {
  return rowData.value.switch === 1
    ? { type: "primary", text: "正常" }
    : { type: "danger", text: "禁用" };
});

//定义用户显示性别
const showUserSex = computed(() => {
  let showText = "";
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

//定义显示的角色
const showUserRole = computed(() => {
  let showText = "";
  const roleListArray = rowData?.value.role;
  if (roleListArray.length > 0) {
    roleListArray.forEach((item) => {
      showText += "|" + item.role_name + "-" + item.logic_name;
    });
  } else {
    showText = "暂无";
  }
  return showText;
});
</script>
<style lang="scss" scoped>
.row-one {
  width: 100rem;
  height: 46px;
  margin-bottom: 1rem;
  line-height: 46px;
}
.input,
.select {
  width: 250px;
}
.level-title {
  display: inline-flex;
  height: 46px;
  font-size: 14px;
  font-weight: 700;
  line-height: 46px;
  color: #606266;
}
</style>
