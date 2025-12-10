<!--
 * @Descripttion: 
 * @version: v1
 * @Author: youhujun 2900976495@qq.com
 * @Date: 2025-10-12 14:44:30
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-11-27 11:13:33
 * @FilePath: \src\pages\laravel-fast-api\v1\business\level\userLevel\components\UserLevelListItemDetails.vue
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
        <el-button type="primary" size="small" @click="handleClick(2)">
          <el-icon style="vertical-align: middle">
            <Document />
          </el-icon>
          用户级别配置项
        </el-button>
      </el-row>
    </div>
    <div class="content">
      <!-- 简单的处理开始 -->
      <div :class="{ show: showIndex == 1, hidden: showIndex != 1 }">
        <UserLevelOne :row-data="rowData" />
      </div>
      <div :class="{ show: showIndex == 2, hidden: showIndex != 2 }">
        <UserLevelTwo :row-data="rowData" />
      </div>
      <!-- 简单的处理结束 -->
    </div>
  </div>
</template>
<script setup lang="ts">
//系统
import { Document } from "@element-plus/icons-vue";
//组件(复杂逻辑使用)
import UserLevelOne from "./ListItemDetails/UserLevelOne.vue";
import UserLevelTwo from "./ListItemDetails/UserLevelTwo.vue";

//api
import type { UserLevelListItem } from "@/api/laravel-fast-api/v1/business/level/userLevel/user-level-type";

//定义组件名称
defineOptions({
  name: "UserLevelListItemDetails",
});
//控制显示的组件
const showComponent = ref(1);
//定义行数据
const rowData = defineModel<UserLevelListItem>("rowData", {
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
