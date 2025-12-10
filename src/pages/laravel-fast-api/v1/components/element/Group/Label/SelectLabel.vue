<!-- 
 使用示例:
  <SelectLabel 
		v-model:label-id-item-array="createForm.label_id"
		v-model:label-id-array="createForm.labelArray"
	/>
  -->
<template>
  <div>
    <el-cascader
      ref="label"
      v-model="labelIdItemArray"
      :options="treeLabelOptions"
      :props="{
        expandTrigger: 'hover',
        value: 'id',
        label: 'label_name',
        // 修正：没有children的节点才是叶子节点（最末级）
        leaf: (data) => !data.children || data.children.length === 0,
        checkStrictly: true,
        multiple: true,
      }"
      filterable
      clearable
      :show-all-levels="false"
      @change="handleLabelChange"
    >
      <template #default="{ node, data }">
        <span>{{ data.label_name }}</span>
        <span v-if="!node.isLeaf && data.children">({{ data.children.length }})</span>
      </template>
    </el-cascader>
  </div>
</template>
<script setup lang="ts">
//系统
import type { CascaderValue } from "element-plus";
//store
import { useLabelStore } from "@/store";

defineOptions({
  name: "SelectLabel",
});

//定义分类id数组
const labelIdItemArray = defineModel<number[][]>("labelIdItemArray", {
  default: [],
});

//定义分类数组
const labelIdArray = defineModel<number[]>("labelIdArray", {
  default: [],
});

//store
const labelStore = useLabelStore();

// 定义为计算属性
const treeLabelOptions = computed(() => {
  return labelStore.treeLabel;
});

//选择标签
const handleLabelChange = (label: CascaderValue | null | undefined) => {
  //console.log(label)
  const labelArray: number[] = [];
  // 2. 先判断category是否为数组，避免forEach报错
  if (Array.isArray(label)) {
    label.forEach((element) => {
      // 3. 确保element是数组，再取最后一项（适配级联选择器的多选格式）
      if (Array.isArray(element)) {
        labelArray.push(element[element.length - 1]);
      } else {
        // 若element不是数组，直接推入（兼容特殊场景）
        labelArray.push(element);
      }
    });
  }
  labelIdArray.value = labelArray;
};
</script>

<style lang="scss" scoped></style>
