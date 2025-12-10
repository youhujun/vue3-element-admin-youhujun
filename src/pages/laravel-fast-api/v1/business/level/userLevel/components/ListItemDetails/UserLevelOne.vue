<!--
 * @Descripttion: 
 * @version: v1
 * @Author: youhujun youhu8888@163.com
 * @Date: 2025-10-24 09:12:11
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-11-27 11:09:27
 * @FilePath: \src\pages\laravel-fast-api\v1\business\level\userLevel\components\ListItemDetails\UserLevelOne.vue
 * Copyright (C) 2025 youhujun. All rights reserved.
-->
<template>
  <div>
    <!-- 真正的一行 -->
    <el-row class="row-one">
      <el-tag style="margin-right: 1rem" type="info">名称</el-tag>
      <el-tag style="margin-right: 1rem" type="primary">{{ rowData.level_name }}</el-tag>
      <el-tag style="margin-right: 1rem" type="info">值</el-tag>
      <el-tag style="margin-right: 1rem" type="primary">
        {{ rowData.level_code ? rowData.level_code : "无" }}
      </el-tag>
    </el-row>
    <el-row class="row-one">
      <el-tag style="margin-right: 1rem" type="info">金额</el-tag>
      <el-tag style="margin-right: 1rem" type="primary">{{ rowData.amount }}</el-tag>
      <el-tag style="margin-right: 1rem" type="info">排序</el-tag>
      <el-tag style="margin-right: 1rem" type="primary">{{ rowData.sort }}</el-tag>
    </el-row>
    <el-row class="row-one">
      <el-tag style="margin-right: 1rem" type="info">备注</el-tag>
      <el-tag style="margin-right: 1rem" type="primary">{{ rowData.note }}</el-tag>
    </el-row>
    <el-row class="row-one">
      <el-tag style="margin-right: 1rem" type="info">创建时间</el-tag>
      <el-tag style="margin-right: 1rem" type="primary">{{ rowData.created_at }}</el-tag>
      <el-tag style="margin-right: 1rem" type="info">更新时间</el-tag>
      <el-tag style="margin-right: 1rem" type="primary">{{ rowData.updated_at }}</el-tag>
    </el-row>
    <el-row class="row-one">
      <el-tag style="margin-right: 1rem" type="info">级别logo</el-tag>
      <el-image
        v-if="rowData.background"
        style="width: 100px; height: 100px"
        :src="rowData.background"
      ></el-image>
      <el-tag v-else type="primary">暂无</el-tag>
    </el-row>
  </div>
</template>
<script setup lang="ts">
//api和type
import type { UserLevelListItem } from "@/api/laravel-fast-api/v1/business/level/userLevel/user-level-type";
//定义组件名称
defineOptions({
  name: "UserLevelOne",
});

//定义props
const { rowData } = withDefaults(
  defineProps<{
    rowData?: UserLevelListItem;
  }>(),
  {
    rowData: () => ({
      id: 1,
      sort: 100,
      created_at: "",
      updated_at: "",
      switch: 1,
      level_name: "",
      level_code: "",
      amount: "0.00",
      background_id: 0,
      note: "",
      background: "",
      level_item: [
        {
          user_level_item_unon_id: 1,
          level_item_id: 0,
          item_name: "",
          item_code: "",
          description: "",
          value_type: 40,
          value: "",
        },
      ],
    }),
  }
);
</script>
<style lang="scss" scoped></style>
