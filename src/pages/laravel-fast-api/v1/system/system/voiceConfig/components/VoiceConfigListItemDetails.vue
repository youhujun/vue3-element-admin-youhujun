<!--
 * @Descripttion: 
 * @version: v1
 * @Author: youhujun 2900976495@qq.com
 * @Date: 2025-10-12 14:44:30
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-11-19 12:54:38
 * @FilePath: \src\pages\laravel-fast-api\v1\system\system\voiceConfig\components\VoiceConfigListItemDetails.vue
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
        <!-- <el-button type="primary" :icon="Avatar" size="small" @click="handleClick(2)">VoiceConfigTwo</el-button> -->
      </el-row>
    </div>
    <div class="content">
      <!-- 复杂处理开始 -->
      <!-- <div :class="{'show':showIndex==1, 'hidden':showIndex!=1}">
        <VoiceConfigOne  :voiceConfig="rowData" :upload-data="{id:0, use_type:30, file_type: '', save_path: 'avatar', voiceConfig_id: rowData.id }" />

      </div>
      <div :class="{'show':showIndex==2, 'hidden':showIndex!=2}">
        <VoiceConfigTwo v-if="showComponent === 2" :row-list="rowData" />
      </div> -->
      <!-- 复杂处理结束 -->
      <!-- 简单的处理开始 -->
      <div :class="{ show: showIndex == 1, hidden: showIndex != 1 }">
        <!-- 真正的一行 -->
        <el-row class="row-one">
          <el-tag style="margin-right: 1rem" type="info">提示音类型</el-tag>
          <el-tag style="margin-right: 1rem" type="primary">
            {{ rowData.voice_save_type === 10 ? "本地" : "云端" }}
          </el-tag>
        </el-row>
        <el-row class="row-one">
          <el-tag style="margin-right: 1rem" type="info">提示音地址</el-tag>
          <el-link :href="rowData.voice_use_url" target="_blank">
            {{ rowData.voice_use_url }}
          </el-link>
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
// import VoiceConfigOne from './ListItemDetails/VoiceConfigOne.vue'
//import VoiceConfigTwo from './ListItemDetails/VoiceConfigTwo.vue'

//api
import type { VoiceConfigItem } from "@/api/laravel-fast-api/v1/system/system/voice/system-voice-type";

//定义组件名称
defineOptions({
  name: "VoiceConfigListItemDetails",
});
//控制显示的组件
const showComponent = ref(1);
//定义行数据
const rowData = defineModel<VoiceConfigItem>("rowData", {
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
