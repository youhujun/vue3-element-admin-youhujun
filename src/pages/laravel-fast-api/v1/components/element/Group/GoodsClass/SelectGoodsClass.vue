<template>
  <div>
    <el-cascader
      ref="category"
      v-model="goodsClassIdItemArray"
      :options="goodsClassOptions"
      :props="{
        expandTrigger: 'hover',
        value: 'id',
        label: 'goods_class_name',
        // 修正：没有children的节点才是叶子节点（最末级）
        leaf: (data) => !data.children || data.children.length === 0,
        checkStrictly: true,
        multiple: true,
      }"
      filterable
      clearable
      :show-all-levels="false"
      @change="handleGoodsClassChange"
    >
      <template #default="{ node, data }">
        <!-- Vue3中推荐用#替代v-slot: -->
        <span>{{ data.goods_class_name }}</span>
        <span v-if="!node.isLeaf && data.children">({{ data.children.length }})</span>
      </template>
    </el-cascader>
  </div>
</template>
<script setup lang="ts">
//系统
import type { CascaderValue } from "element-plus";
//store
import { useGoodsClassStore } from "@/store";
defineOptions({
  name: "SelectGoodsClass",
});
//定义分类id数组
const goodsClassIdItemArray = defineModel<number[][]>("categoryIdItemArray", {
  default: [],
});

//定义分类数组
const goodsClassIdArray = defineModel<number[]>("categoryIdArray", {
  default: [],
});

//store
const goodsClassStore = useGoodsClassStore();

// 定义为计算属性，依赖categoryStore.treeCategory
const goodsClassOptions = computed(() => {
  return goodsClassStore.treeGoodsClass;
});

//选择分类
const handleGoodsClassChange = (goodsClass: CascaderValue | null | undefined) => {
  //console.log(category)
  const goodsClassArray: number[] = [];
  // 2. 先判断goodsClass是否为数组，避免forEach报错
  if (Array.isArray(goodsClass)) {
    goodsClass.forEach((element) => {
      // 3. 确保element是数组，再取最后一项（适配级联选择器的多选格式）
      if (Array.isArray(element)) {
        goodsClassArray.push(element[element.length - 1]);
      } else {
        // 若element不是数组，直接推入（兼容特殊场景）
        goodsClassArray.push(element);
      }
    });
  }
  goodsClassIdArray.value = goodsClassArray;
};
</script>

<style lang="scss" scoped></style>
