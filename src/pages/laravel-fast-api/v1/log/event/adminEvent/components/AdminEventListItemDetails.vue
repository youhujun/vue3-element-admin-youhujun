<!--
 * @Descripttion: 
 * @version: v1
 * @Author: youhujun 2900976495@qq.com
 * @Date: 2025-10-12 14:44:30
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-12-05 11:59:42
 * @FilePath: \src\pages\laravel-fast-api\v1\log\event\adminEvent\components\AdminEventListItemDetails.vue
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
        <!-- <el-button type="primary" :icon="Avatar" size="small" @click="handleClick(2)">AdminEventTwo</el-button> -->
      </el-row>
    </div>
    <div class="content">
      <!-- 简单的处理开始 -->
      <div :class="{ show: showIndex == 1, hidden: showIndex != 1 }">
        <!-- 真正的一行 -->
        <el-row class="row-one">
          <el-tag style="margin-right: 1rem" type="info">手机号</el-tag>
          <el-tag style="margin-right: 1rem" type="primary">
            {{ rowData.phone ? rowData.phone : "暂无" }}
          </el-tag>
          <el-tag style="margin-right: 1rem" type="info">账号</el-tag>
          <el-tag style="margin-right: 1rem" type="primary">
            {{ rowData.account_name ? rowData.account_name : "暂无" }}
          </el-tag>
          <el-tag style="margin-right: 1rem" type="info">昵称</el-tag>
          <el-tag style="margin-right: 1rem" type="primary">
            {{ rowData.nick_name ? rowData.nick_name : "暂无" }}
          </el-tag>
        </el-row>
        <el-row class="row-one">
          <el-tag style="margin-right: 1rem" type="info">事件名称</el-tag>
          <el-tag style="margin-right: 1rem" type="primary">
            {{ rowData.event_name ? rowData.event_name : "暂无" }}
          </el-tag>
          <el-tag style="margin-right: 1rem" type="info">事件编码</el-tag>
          <el-tag style="margin-right: 1rem" type="primary">
            {{ rowData.event_code ? rowData.event_code : "暂无" }}
          </el-tag>
          <el-tag style="margin-right: 1rem" type="info">类型编号</el-tag>
          <el-tag style="margin-right: 1rem" type="primary">
            {{ rowData.event_type ? rowData.event_type : "暂无" }}
          </el-tag>
        </el-row>
        <el-row v-has-role="['develop', 'super']" class="row-one">
          <el-tag style="margin-right: 1rem" type="info">事件路由</el-tag>
          <el-tag style="margin-right: 1rem" type="primary">
            <div class="big-data-box">
              {{ rowData.event_route_action ? rowData.event_route_action : "暂无" }}
            </div>
          </el-tag>
        </el-row>
        <el-row v-has-role="['develop', 'super']" class="row-one">
          <el-tag style="margin-right: 1rem" type="info">事件数据</el-tag>
          <el-tag style="margin-right: 1rem" type="primary">
            <div class="big-data-box">
              {{ rowData.note ? rowData.note : "暂无" }}
            </div>
          </el-tag>
        </el-row>
        <el-row class="row-one">
          <el-tag style="margin-right: 1rem" type="info">记录时间</el-tag>
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
// import AdminEventOne from './ListItemDetails/AdminEventOne.vue'
//import AdminEventTwo from './ListItemDetails/AdminEventTwo.vue'

//api和type
import type { AdminEventLogListItem } from "@/api/laravel-fast-api/v1/log/event/admin/admin-event-log-type";

//定义组件名称
defineOptions({
  name: "AdminEventListItemDetails",
});
//控制显示的组件
const showComponent = ref(1);
//定义行数据
const rowData = defineModel<AdminEventLogListItem>("rowData", {
  default: () => ({
    id: 0,
    created_at: "",
    admin_id: 0,
    event_type: 10000,
    event_code: "",
    event_route_action: "",
    event_name: "",
    note: "",
    user_id: 0,
    phone: "",
    account_name: "",
    nick_name: "",
  }),
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
.big-data-box {
  max-width: 500px; /* 根据需要调整最大宽度 */
  word-break: break-all; /* 当单词超过容器宽度时强制换行 */
  word-wrap: break-word; /* 允许长单词或URL换行 */
  white-space: normal; /* 恢复默认的文本换行行为 */
}
</style>
