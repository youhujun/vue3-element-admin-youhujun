<!--
 * @Descripttion: 
 * @version: v1
 * @Author: youhujun youhu8888@163.com
 * @Date: 2025-10-23 16:51:35
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-12-10 04:46:17
 * @FilePath: d:\wwwroot\Open\Vue\vue3-element-admin-youhujun\src\pages\laravel-fast-api\v1\template\init\index.vue
 * Copyright (C) 2025 youhujun. All rights reserved.
-->
<template>
  <div>
    <!-- 页面内容开始 -->
    <YhCard :loading="loading">
      <template #cardTitle>页面标题</template>
      <template #cardNotice>
        <el-tag size="small" type="danger" effect="plain">注意:提示信息</el-tag>
      </template>
      <template #cardButton>
        <el-button
          v-has-role="['develop']"
          style="float: right"
          type="primary"
          @click="handleAddTop()"
        >
          添加顶级
        </el-button>
      </template>
      <template #cardContent>
        <div class="custom-node">页面内容</div>
      </template>
    </YhCard>
    <!-- 页面内容结束 -->
    <!-- 弹窗内容开始 -->
    <YhDialog
      v-model="dialogVisible"
      :dialog-width="dialogWidth"
      :dialog-title="dialogTitle"
      :dialog-type="dialogType"
    >
      <!-- 添加表单 -->
      <template #addForm>
        <!-- <CreateReplaceForm ref="createFormRef" :props-create-form="propsCreateForm"   @update:CloseDialog="listenToCloseDialog"></CreateReplaceForm> -->
      </template>
      <!-- 修改表单 -->
      <template #updateForm>
        <!-- <UpdateReplaceForm ref="updateFormRef" :props-update-form="propsUpdateForm"   @update:CloseDialog="listenToCloseDialog"></UpdateReplaceForm> -->
      </template>
      <!-- 显示内容 -->
      <template #showContent>
        <!-- <ReplaceRowData :props-row-data="propsRowData" :props-show-index="propsShowIndex" @update:ShowIndex="listenToUpdateIndex"  @update:CloseDialog="listenToCloseDialog"></ReplaceRowData> -->
      </template>
    </YhDialog>
    <!-- 弹窗内容结束 -->
  </div>
</template>
<script setup lang="ts">
// 公共级组件
import YhCard from "@/pages/laravel-fast-api/v1/components/element/Card/index.vue";
import YhDialog from "@/pages/laravel-fast-api/v1/components/element/Dialog/index.vue";
//定义组件名称
defineOptions({
  name: "Name",
});
//初始化加载样式
const loading = ref(true);
//是否开启弹窗
const dialogVisible = ref(false);
//弹窗标题
const dialogTitle = ref("");
//弹窗类型 10添加 20修改 30内容
const dialogType = ref(10);
//弹窗宽度
const dialogWidth = ref("65%");

/**
 * 设置对话框状态
 */
const setDialogStatus = (visible: boolean, title: string, type: number) => {
  dialogVisible.value = visible;
  dialogTitle.value = title;
  dialogType.value = type;
};

/**
 * 处理添加顶级菜单
 */
const handleAddTop = () => {
  //initPropsCreateForm()
  setDialogStatus(true, "添加顶级", 10);
};
</script>
<style lang="scss" scoped></style>
