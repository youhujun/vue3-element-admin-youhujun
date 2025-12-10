<!-- 使用示例:
 <SelectCategory 
	v-model:category-id-item-array="createForm.category_id"
	v-model:category-id-array="createForm.categoryArray"
	/>
  -->
<template>
  <div>
    <el-cascader
      ref="category"
      v-model="categoryIdItemArray"
      :options="noticeCategoryOptions"
      :props="{
        expandTrigger: 'hover',
        value: 'id',
        label: 'category_name',
        // 修正：没有children的节点才是叶子节点（最末级）
        leaf: (data) => !data.children || data.children.length === 0,
        checkStrictly: true,
        multiple: true,
      }"
      filterable
      clearable
      :show-all-levels="false"
      @change="handleCategoryChange"
    >
      <template #default="{ node, data }">
        <!-- Vue3中推荐用#替代v-slot: -->
        <span>{{ data.category_name }}</span>
        <span v-if="!node.isLeaf && data.children">({{ data.children.length }})</span>
      </template>
    </el-cascader>
  </div>
</template>
<script setup lang="ts">
//系统
import type { CascaderValue } from "element-plus";
//store
import { useCategoryStore } from "@/store";

defineOptions({
  name: "SelectCategory",
});

//定义分类id数组
const categoryIdItemArray = defineModel<number[][]>("categoryIdItemArray", {
  default: [],
});

//定义分类数组
const categoryIdArray = defineModel<number[]>("categoryIdArray", {
  default: [],
});

//store
const categoryStore = useCategoryStore();

// 定义为计算属性，依赖categoryStore.treeCategory
const noticeCategoryOptions = computed(() => {
  return categoryStore.treeCategory;
});

//选择分类
const handleCategoryChange = (category: CascaderValue | null | undefined) => {
  //console.log(category)
  const categoryArray: number[] = [];
  // 2. 先判断category是否为数组，避免forEach报错
  if (Array.isArray(category)) {
    category.forEach((element) => {
      // 3. 确保element是数组，再取最后一项（适配级联选择器的多选格式）
      if (Array.isArray(element)) {
        categoryArray.push(element[element.length - 1]);
      } else {
        // 若element不是数组，直接推入（兼容特殊场景）
        categoryArray.push(element);
      }
    });
  }
  categoryIdArray.value = categoryArray;
};
</script>

<style lang="scss" scoped></style>
