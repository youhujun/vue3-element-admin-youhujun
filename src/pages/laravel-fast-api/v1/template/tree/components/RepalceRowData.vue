<!--
 * @Descripttion: 
 * @version: v1
 * @Author: youhujun youhu8888@163.com
 * @Date: 2025-10-19 01:15:40
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-11-25 16:43:30
 * @FilePath: \src\pages\laravel-fast-api\v1\template\tree\components\RepalceRowData.vue
 * Copyright (C) 2025 youhujun. All rights reserved.
-->
<template>
  <div v-if="propsShowIndex === 0">
    <div class="header">
      <el-row type="flex">
        <el-button type="primary" icon="FullScreen" size="small" @click="handleClick(0)">
          菜单详情
        </el-button>
      </el-row>
    </div>
    <div class="content">
      <!-- 真正的一行 -->
      <el-row class="row-one" :gutter="10">
        <el-tag type="info" style="margin-right: 1rem">id</el-tag>
        <el-tag style="margin-right: 1rem" type="primary">{{ rowData.id }}</el-tag>
      </el-row>
      <!-- 真正的一行结束 -->
      <!-- 真正的一行 -->
      <el-row class="row-one" :gutter="10">
        <el-tag type="info" style="margin-right: 1rem">菜单级别</el-tag>
        <el-tag style="margin-right: 1rem" type="primary">{{ rowData.deep }}级</el-tag>
      </el-row>
      <!-- 真正的一行结束 -->
    </div>
  </div>
</template>
<script lang="ts" setup>
//api和type
import type { ReplaceItem } from "@/api/laravel-fast-api/v1/replace/replace/tree-replace-type";
//定义组件名称
defineOptions({
  name: "ReplaceRowData",
});
// 定义事件
const emit = defineEmits(["update:ShowIndex"]);
//定义rowData
const rowData = reactive<ReplaceItem>({
  id: 0,
  parent_id: 0,
  deep: 1,
  replace_name: "",
  sort: 100,
  children: [],
});
//定义props
const props = withDefaults(
  defineProps<{
    propsRowData?: ReplaceItem;
    propsShowIndex?: number;
  }>(),
  {
    propsRowData: () => ({
      id: 0,
      parent_id: 0,
      deep: 1,
      replace_name: "",
      sort: 100,
      children: [],
    }),
    propsShowIndex: 0,
  }
);

//监听父级表单值的变化
watch(
  () => props.propsRowData,
  (newVal) => {
    //console.log('整个对象变化：', newVal, oldVal)
    Object.assign(rowData, newVal);
  },
  { deep: true, immediate: true } // 因为是对象，需要开启深度监听
);
//组件加载
onMounted(() => {
  Object.assign(rowData, props.propsRowData);
});

const handleClick = (index: number) => {
  //console.log(index)
  emit("update:ShowIndex", index);
};
</script>
<style lang="scss" scoped>
.row-one {
  width: 100rem;
  height: auto;
  margin-bottom: 1rem;
}
.header {
  margin-bottom: 1rem;
}
</style>
