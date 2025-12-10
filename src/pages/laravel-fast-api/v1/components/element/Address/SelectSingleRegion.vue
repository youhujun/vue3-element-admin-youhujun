<!--
 * @Descripttion: 
 * @version: v1
 * @Author: youhujun youhu8888@163.com
 * @Date: 2025-11-30 12:19:33
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-12-01 03:20:44
 * @FilePath: \src\pages\laravel-fast-api\v1\components\element\Address\SelectSingleRegion.vue
 * Copyright (C) 2025 youhujun. All rights reserved.
 注意:单选本身就是id组成的数组
-->
<template>
  <div>
    <el-cascader
      ref="region"
      v-model="regionIdArray"
      :options="regionOptions"
      :props="{
        expandTrigger: 'hover',
        value: 'id',
        label: 'region_name',
        // 指定选项的叶子节点的标志位为选项对象的某个属性值
        //修正：没有children的节点才是叶子节点（最末级）
        leaf: (data) => !data.children || data.children.length === 0,
        //是否严格的遵守父子节点不互相关联
        checkStrictly: false,
        //是否多选
        multiple: false,
      }"
      filterable
      clearable
      :show-all-levels="true"
      @change="handleRegionChange"
    >
      <template #default="{ node, data }">
        <!-- Vue3中推荐用#替代v-slot: -->
        <span>{{ data.region_name }}</span>
        <span v-if="!node.isLeaf && data.children">({{ data.children.length }})</span>
      </template>
    </el-cascader>
  </div>
</template>
<script setup lang="ts">
//系统
import type { CascaderValue } from "element-plus";
//store
import { useRegionStore } from "@/store";

defineOptions({
  name: "SelectSingleRegion",
});

//定义分类数组
const regionIdArray = defineModel<number[]>("regionIdArray", {
  default: [],
});

//store
const regionStore = useRegionStore();

// 定义为计算属性，依赖regionStore.treeCategory
const regionOptions = computed(() => {
  return regionStore.treeRegion;
});

//选择地区
const handleRegionChange = (region: CascaderValue | null | undefined) => {
  //console.log(region)

  regionIdArray.value = (region as number[] | null) ?? [];
};
</script>

<style lang="scss" scoped>
.select,
.el-cascader {
  width: 300px;
}
</style>
