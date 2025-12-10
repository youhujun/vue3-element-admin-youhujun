<!--
 * @Descripttion: 
 * @version: v1
 * @Author: youhujun 2900976495@qq.com
 * @Date: 2025-10-12 14:44:30
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-11-22 11:00:16
 * @FilePath: \src\pages\laravel-fast-api\v1\system\bank\components\BankListItemDetails.vue
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
        <!-- <el-button type="primary" :icon="Avatar" size="small" @click="handleClick(2)">BankTwo</el-button> -->
      </el-row>
    </div>
    <div class="content">
      <!-- 复杂处理开始 -->
      <!-- <div :class="{'show':showIndex==1, 'hidden':showIndex!=1}">
        <BankOne  :bank="rowData" :upload-data="{id:0, use_type:30, file_type: '', save_path: 'avatar', bank_id: rowData.id }" />

      </div>
      <div :class="{'show':showIndex==2, 'hidden':showIndex!=2}">
        <BankTwo v-if="showComponent === 2" :row-list="rowData" />
      </div> -->
      <!-- 复杂处理结束 -->
      <!-- 简单的处理开始 -->
      <div :class="{ show: showIndex == 1, hidden: showIndex != 1 }">
        <!-- 真正的一行 -->
        <el-row class="row-one">
          <el-tag style="margin-right: 1rem" type="info">银行名称</el-tag>
          <el-tag style="margin-right: 1rem" type="primary">{{ rowData.bank_name }}</el-tag>
          <el-tag style="margin-right: 1rem" type="info">银行编码</el-tag>
          <el-tag style="margin-right: 1rem" type="primary">
            {{ rowData.bank_code ? rowData.bank_code : "无" }}
          </el-tag>
        </el-row>
        <el-row class="row-one">
          <el-tag style="margin-right: 1rem" type="info">排序</el-tag>
          <el-tag style="margin-right: 1rem" type="primary">{{ rowData.sort }}</el-tag>
          <el-tag style="margin-right: 1rem" type="info">创建时间</el-tag>
          <el-tag style="margin-right: 1rem" type="primary">{{ rowData.created_at }}</el-tag>
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
// import BankOne from './ListItemDetails/BankOne.vue'
//import BankTwo from './ListItemDetails/BankTwo.vue'

//api
import type { BankItem } from "@/api/laravel-fast-api/v1/system/bank/bank-type";

//定义组件名称
defineOptions({
  name: "BankListItemDetails",
});
//控制显示的组件
const showComponent = ref(1);
//定义行数据
const rowData = defineModel<BankItem>("rowData", {
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
