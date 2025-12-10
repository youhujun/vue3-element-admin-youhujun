<!--
 * @Descripttion: 
 * @version: v1
 * @Author: youhujun youhu8888@163.com
 * @Date: 2025-11-19 20:17:33
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-12-10 03:00:07
 * @FilePath: d:\wwwroot\Open\Vue\vue3-element-admin-youhujun\src\pages\laravel-fast-api\v1\system\region\components\RegionRowData.vue
 * Copyright (C) 2025 youhujun. All rights reserved.
-->
<template>
  <div v-if="propsShowIndex === 0">
    <div class="header">
      <el-row type="flex">
        <el-button type="primary" icon="FullScreen" size="small" @click="handleClick(0)">
          详情
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
        <el-tag type="info" style="margin-right: 1rem">地区级别</el-tag>
        <el-tag style="margin-right: 1rem" type="primary">{{ rowData.deep }}级</el-tag>
      </el-row>
      <!-- 真正的一行结束 -->
      <!-- 真正的一行 -->
      <el-row class="row-one" :gutter="10">
        <el-tag type="info" style="margin-right: 1rem">地区名称</el-tag>
        <el-tag style="margin-right: 1rem" type="primary">{{ rowData.region_name }}</el-tag>
      </el-row>
      <!-- 真正的一行结束 -->
      <!-- 真正的一行 -->
      <el-row class="row-one" :gutter="10">
        <el-tag type="info" style="margin-right: 1rem">所属地区</el-tag>
        <el-tag style="margin-right: 1rem" type="primary">
          {{ rowData.region_area ? rowData.region_area : "暂无" }}
        </el-tag>
      </el-row>
      <!-- 真正的一行结束 -->
      <!-- 真正的一行 -->
      <el-row class="row-one" :gutter="10">
        <el-tag type="info" style="margin-right: 1rem">子级地区</el-tag>
        <el-tag style="margin-right: 1rem" type="primary">
          {{ Array(rowData.children) ? rowData.children.length : 0 }}
        </el-tag>
      </el-row>
      <!-- 真正的一行结束 -->
    </div>
  </div>
</template>
<script lang="ts" setup>
//api和type
import type { TreeRegionItem } from "@/api/laravel-fast-api/v1/system/region/region-type";
//定义组件名称
defineOptions({
  name: "RegionRowData",
});
// 定义事件
const emit = defineEmits(["update:ShowIndex"]);
//定义rowData
const rowData = reactive<TreeRegionItem>({
  id: 0,
  parent_id: 0,
  deep: 1,
  region_name: "",
  region_area: "",
  created_at: "",
  sort: 100,
  children: [],
});
//定义props
const props = withDefaults(
  defineProps<{
    propsRowData?: TreeRegionItem;
    propsShowIndex?: number;
  }>(),
  {
    propsRowData: () => ({
      id: 0,
      parent_id: 0,
      deep: 1,
      region_name: "",
      region_area: "",
      created_at: "",
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
