<!--
 * @Descripttion: 
 * @version: v1
 * @Author: youhujun 2900976495@qq.com
 * @Date: 2025-10-12 14:44:30
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-11-13 00:10:26
 * @FilePath: \src\pages\laravel-fast-api\v1\article\notice\components\ArticleListItemDetails.vue
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
          信息
        </el-button>
        <!-- <el-button type="primary" :icon="Avatar" size="small" @click="handleClick(2)">ArticleTwo</el-button> -->
      </el-row>
    </div>
    <div class="content">
      <!-- 复杂处理开始 -->
      <!-- <div :class="{'show':showIndex==1, 'hidden':showIndex!=1}">
        <ArticleOne  :article="rowData" :upload-data="{id:0, use_type:30, file_type: '', save_path: 'avatar', article_id: rowData.id }" />

      </div>
      <div :class="{'show':showIndex==2, 'hidden':showIndex!=2}">
        <ArticleTwo v-if="showComponent === 2" :row-list="rowData" />
      </div> -->
      <!-- 复杂处理结束 -->
      <!-- 简单的处理开始 -->
      <div :class="{ show: showIndex == 1, hidden: showIndex != 1 }">
        <!-- 真正的一行 -->
        <el-row class="row-one">
          <el-tag style="margin-right: 1rem" type="info">标题</el-tag>
          <el-tag style="margin-right: 1rem" type="primary">{{ rowData.title }}</el-tag>
        </el-row>
        <el-row class="row-one">
          <el-tag style="margin-right: 1rem" type="info">内容</el-tag>
        </el-row>
        <el-row>
          <div class="letter-paper-bg" v-html="rowData.content"></div>
        </el-row>
      </div>
      <!-- 简单的处理结束 -->
      <!-- 简单的处理开始 -->
      <div :class="{ show: showIndex == 2, hidden: showIndex != 2 }">
        <!-- 真正的一行 -->
        <el-row class="row-one">
          <el-tag type="info">分类</el-tag>
        </el-row>
        <el-row class="row-one">
          <el-col v-for="(item, index) in rowData.category" :key="index" :span="1">
            <el-tag type="primary">{{ item.category_name }}</el-tag>
          </el-col>
        </el-row>
        <el-row class="row-one">
          <el-tag type="info">标签</el-tag>
        </el-row>
        <el-row class="row-one">
          <el-col v-for="(item, index) in rowData.label" :key="index" :span="1">
            <el-tag type="primary">{{ item.label_name }}</el-tag>
          </el-col>
        </el-row>
      </div>
      <!-- 简单的处理结束 -->
    </div>
  </div>
</template>
<script setup lang="ts">
//组件(复杂逻辑使用)
// import ArticleOne from './ListItemDetails/ArticleOne.vue'
//import ArticleTwo from './ListItemDetails/ArticleTwo.vue'

//api
import type { ArticleListItem } from "@/api/laravel-fast-api/v1/article/article-type";

//定义组件名称
defineOptions({
  name: "ArticleListItemDetails",
});
//控制显示的组件
const showComponent = ref(1);
//定义行数据
const rowData = defineModel<ArticleListItem>("rowData", {
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
.letter-paper-bg {
  padding: 40px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.8;
  color: #333;
  //background-image: url('你的信纸图片地址');
  //background-repeat: repeat;
  //padding: 20px;
  /* 用CSS样式模拟信纸效果（无需图片） */
  /* 淡蓝色底色 */
  background-color: #f0f8ff;
  /* 波浪纹理（SVG背景） */
  background-image: url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='grad1' x1='0%25' y1='0%25' x2='100%25' y2='0%25'%3E%3Cstop offset='0%25' style='stop-color:rgba(144,202,249,0.1)'/ %3E%3Cstop offset='100%25' style='stop-color:rgba(144,202,249,0.5)'/ %3E%3C/linearGradient%3E%3C/defs%3E%3Cpath d='M0,20 C150,60 350,0 500,40 C650,80 750,20 900,50 C1050,80 1150,20 1300,40 C1450,60 1650,0 1800,40 C1950,80 2050,20 2200,50 C2350,80 2550,0 2700,40 C2850,80 2950,20 3100,40 C3250,60 3450,0 3600,40 v1000 H0 V0 Z' fill='url(%23grad1)' opacity='0.3'/%3E%3Cpath d='M0,60 C150,100 350,40 500,80 C650,120 750,60 900,90 C1050,120 1150,60 1300,90 C1450,120 1650,60 1800,90 C1950,120 2050,60 2200,90 C2350,120 2550,60 2700,90 C2850,120 2950,60 3100,90 C3250,120 3450,60 3600,90 v1000 H0 V0 Z' fill='url(%23grad1)' opacity='0.2'/%3E%3Cpath d='M0,100 C150,140 350,80 500,120 C650,160 750,100 900,130 C1050,160 1150,100 1300,130 C1450,160 1650,100 1800,130 C1950,160 2050,100 2200,130 C2350,160 2550,100 2700,130 C2850,160 2950,100 3100,130 C3250,160 3450,100 3600,130 v1000 H0 V0 Z' fill='url(%23grad1)' opacity='0.1'/%3E%3C/svg%3E");
  background-repeat: repeat-y;
  background-size: 100% 300px;
}
</style>
