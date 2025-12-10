<!--
 * @Descripttion: 
 * @version: v1
 * @Author: youhujun 2900976495@qq.com
 * @Date: 2025-10-12 14:44:30
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-12-05 02:29:15
 * @FilePath: \src\pages\laravel-fast-api\v1\user\admin\adminList\components\AdminListItemDetails.vue
 * Copyright (C) 2025 youhujun. All rights reserved.
-->

<template>
  <div class="expanded">
    <div class="header">
      <el-row type="flex">
        <el-button type="primary" size="small" @click="handleClick(1)">
          <el-icon style="vertical-align: middle">
            <Document />
          </el-icon>
          详情
        </el-button>
      </el-row>
    </div>
    <div class="content">
      <!-- 简单的处理开始 -->
      <div :class="{ show: showIndex == 1, hidden: showIndex != 1 }">
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
          <el-tag style="margin-right: 1rem" type="info">管理员状态</el-tag>
          <el-tag style="margin-right: 1rem" :type="userStatus.type">{{ userStatus.text }}</el-tag>
        </el-row>
        <el-row class="row-one">
          <el-tag style="margin-right: 1rem" type="info">注册时间</el-tag>
          <el-tag style="margin-right: 1rem" type="primary">{{ rowData.created_at }}</el-tag>
        </el-row>
        <el-row class="row-one">
          <el-tag style="margin-right: 1rem" type="info">管理员昵称</el-tag>
          <el-tag style="margin-right: 1rem" type="primary">
            {{ rowData.nick_name ? rowData.nick_name : "暂无" }}
          </el-tag>
          <el-tag style="margin-right: 1rem" type="info">管理员姓名</el-tag>
          <el-tag style="margin-right: 1rem" type="primary">
            {{ rowData.real_name ? rowData.real_name : "暂无" }}
          </el-tag>
          <el-tag style="margin-right: 1rem" type="info">管理员性别</el-tag>
          <el-tag style="margin-right: 1rem" type="primary">{{ showUserSex }}</el-tag>
        </el-row>
        <el-row class="row-one">
          <el-tag style="margin-right: 1rem" type="info">管理员角色</el-tag>
          <el-tag style="margin-right: 1rem" type="primary">{{ showUserRole }}</el-tag>
        </el-row>
      </div>
      <!-- 简单的处理结束 -->
    </div>
  </div>
</template>
<script setup lang="ts">
//系统
import { Document } from "@element-plus/icons-vue";
//api
import type { AdminListItem } from "@/api/laravel-fast-api/v1/user/admin/admin-type";

//定义组件名称
defineOptions({
  name: "AdminListItemDetails",
});
//控制显示的组件
const showComponent = ref(1);
//定义行数据
const rowData = defineModel<AdminListItem>("rowData", {
  default: () => {},
});
//定义显示的下标
const showIndex = defineModel<number>("showIndex", {
  default: () => 1,
});
//点击按钮
const handleClick = (index: number) => {
  showIndex.value = index;
  showComponent.value = index;
};

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
.expanded {
  padding: 15px;
}
.header {
  margin-bottom: 1rem;
}
.show {
  display: block;
}
.hidden {
  display: none;
}
</style>
