<!--
 * @Descripttion: 
 * @version: v1
 * @Author: youhujun 2900976495@qq.com
 * @Date: 2025-10-12 14:44:30
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-12-10 03:35:59
 * @FilePath: d:\wwwroot\Open\Vue\vue3-element-admin-youhujun\src\pages\laravel-fast-api\v1\system\system\systemConfig\components\SystemConfigListItemDetails.vue
 * Copyright (C) 2025 youhujun. All rights reserved.
-->

<template>
  <div class="expanded">
    <div class="header">
      <el-row type="flex">
        <el-button type="primary" :icon="Document" size="small" @click="handleClick(1)">
          详情
        </el-button>
        <!-- <el-button type="primary" :icon="Avatar" size="small" @click="handleClick(2)">SystemConfigTwo</el-button> -->
      </el-row>
    </div>
    <div class="content">
      <!-- 复杂处理开始 -->
      <!-- <div :class="{'show':showIndex==1, 'hidden':showIndex!=1}">
        <SystemConfigOne  :systemConfig="rowData" :upload-data="{id:0, use_type:30, file_type: '', save_path: 'avatar', systemConfig_id: rowData.id }" />

      </div>
      <div :class="{'show':showIndex==2, 'hidden':showIndex!=2}">
        <SystemConfigTwo v-if="showComponent === 2" :row-list="rowData" />
      </div> -->
      <!-- 复杂处理结束 -->
      <!-- 简单的处理开始 -->
      <div :class="{ show: showIndex == 1, hidden: showIndex != 1 }">
        <!-- 真正的一行 -->
        <el-row class="row-one" :gutter="10">
          <el-tag type="info" style="margin-right: 1rem">配置项类型</el-tag>
          <el-tag v-if="Number(rowData.item_type) === 20" style="margin-right: 1rem" type="primary">
            字符串
          </el-tag>
          <el-tag v-if="Number(rowData.item_type) === 30" style="margin-right: 1rem" type="success">
            数值
          </el-tag>
          <el-tag v-if="Number(rowData.item_type) === 40" style="margin-right: 1rem" type="warning">
            路径
          </el-tag>
        </el-row>
        <!-- 真正的一行结束 -->
        <!-- 真正的一行 -->
        <el-row class="row-one">
          <el-tag style="margin-right: 1rem" type="info">配置项标签</el-tag>
          <el-tag style="margin-right: 1rem" type="primary">{{ rowData.item_label }}</el-tag>
          <el-tag style="margin-right: 1rem" type="info">配置项值</el-tag>
          <el-tag style="margin-right: 1rem" type="primary">
            {{ rowData.item_value ? rowData.item_value : "无" }}
          </el-tag>
        </el-row>
        <el-row class="row-one">
          <el-tag style="margin-right: 1rem" type="info">配置项说明</el-tag>
          <el-tag style="margin-right: 1rem" type="primary">{{ rowData.item_introduction }}</el-tag>
        </el-row>
        <el-row class="row-one">
          <el-tag style="margin-right: 1rem" type="info">配置项排序</el-tag>
          <el-tag style="margin-right: 1rem" type="primary">{{ rowData.sort }}</el-tag>
        </el-row>
        <el-row class="row-one">
          <el-tag style="margin-right: 1rem" type="info">创建时间</el-tag>
          <el-tag style="margin-right: 1rem" type="primary">{{ rowData.created_at }}</el-tag>
          <el-tag style="margin-right: 1rem" type="info">更新时间</el-tag>
          <el-tag style="margin-right: 1rem" type="primary">{{ rowData.updated_at }}</el-tag>
        </el-row>
      </div>
      <!-- 简单的处理结束 -->
    </div>
  </div>
</template>
<script setup lang="ts">
//系统
import { Document } from "@element-plus/icons-vue";
//组件
//api
import type { SystemConfigItem } from "@/api/laravel-fast-api/v1/system/system/config/system-config-type";
//定义组件名称
defineOptions({
  name: "SystemConfigListItemDetails",
});
//控制显示的组件
const showComponent = ref(1);
//定义行数据
const rowData = defineModel<SystemConfigItem>("rowData", {
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
