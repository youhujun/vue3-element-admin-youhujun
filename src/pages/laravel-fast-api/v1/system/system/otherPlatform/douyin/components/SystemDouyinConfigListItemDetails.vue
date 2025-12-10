<!--
 * @Descripttion: 
 * @version: v1
 * @Author: youhujun 2900976495@qq.com
 * @Date: 2025-10-12 14:44:30
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-11-23 12:03:54
 * @FilePath: \src\pages\laravel-fast-api\v1\system\system\otherPlatform\douyin\components\SystemDouyinConfigListItemDetails.vue
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
        <!-- <el-button type="primary" :icon="Avatar" size="small" @click="handleClick(2)">SystemDouyinConfigTwo</el-button> -->
      </el-row>
    </div>
    <div class="content">
      <!-- 简单的处理开始 -->
      <div :class="{ show: showIndex == 1, hidden: showIndex != 1 }">
        <!-- 真正的一行 -->
        <el-row class="row-one" :gutter="10">
          <el-tag type="info" style="margin-right: 1rem">类型</el-tag>
          <el-tag v-if="Number(rowData.type) === 10" style="margin-right: 1rem" type="primary">
            小程序
          </el-tag>
          <el-tag v-if="Number(rowData.type) === 20" style="margin-right: 1rem" type="warning">
            小游戏
          </el-tag>
        </el-row>
        <!-- 真正的一行结束 -->
        <!-- 真正的一行 -->
        <el-row class="row-one">
          <el-tag style="margin-right: 1rem" type="info">标记名称</el-tag>
          <el-tag style="margin-right: 1rem" type="primary">{{ rowData.name }}</el-tag>
          <el-tag style="margin-right: 1rem" type="info">创建时间</el-tag>
          <el-tag style="margin-right: 1rem" type="primary">{{ rowData.created_at }}</el-tag>
        </el-row>
        <el-row class="row-one">
          <el-tag style="margin-right: 1rem" type="info">appid</el-tag>
          <el-tag style="margin-right: 1rem" type="primary">{{ rowData.appid }}</el-tag>
          <el-tag style="margin-right: 1rem" type="info">appsecret</el-tag>
          <el-tag style="margin-right: 1rem" type="primary">{{ rowData.appsecret }}</el-tag>
        </el-row>
        <el-row class="row-one">
          <el-tag style="margin-right: 1rem" type="info">备注</el-tag>
          <el-tag style="margin-right: 1rem" type="primary">{{ rowData.note }}</el-tag>
          <el-tag style="margin-right: 1rem" type="info">排序</el-tag>
          <el-tag style="margin-right: 1rem" type="primary">{{ rowData.sort }}</el-tag>
        </el-row>
      </div>
      <!-- 简单的处理结束 -->
    </div>
  </div>
</template>
<script setup lang="ts">
//系统
import { Document } from "@element-plus/icons-vue";
//组件(复杂逻辑使用)
// import SystemDouyinConfigOne from './ListItemDetails/SystemDouyinConfigOne.vue'
//import SystemDouyinConfigTwo from './ListItemDetails/SystemDouyinConfigTwo.vue'

//api
import type { SystemDouyinConfigItem } from "@/api/laravel-fast-api/v1/system/system/otherPlatform/douyin/system-douyin-config-type";

//定义组件名称
defineOptions({
  name: "SystemDouyinConfigListItemDetails",
});
//控制显示的组件
const showComponent = ref(1);
//定义行数据
const rowData = defineModel<SystemDouyinConfigItem>("rowData", {
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
