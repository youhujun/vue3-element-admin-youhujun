<!--
 * @Descripttion: 
 * @version: v1
 * @Author: youhujun youhu8888@163.com
 * @Date: 2025-10-30 00:53:02
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-11-13 02:52:57
 * @FilePath: \src\pages\laravel-fast-api\v1\article\notice\components\ArticleSearch.vue
 * Copyright (C) 2025 youhujun. All rights reserved.
-->
<template>
  <div>
    <!-- 第一行标题开始 -->
    <el-row :gutter="20">
      <!-- 第一列开始 -->
      <el-col :span="24">
        <div class="inline">
          <el-tag style="height: 2rem; line-height: 2rem" type="info">标题检索</el-tag>
          <el-input
            v-model="where.find"
            clearable
            :placeholder="findSelect[where.findSelectIndex].label"
          >
            <template #prepend>
              <el-select v-model="where.findSelectIndex" placeholder="请输入标题" disabled>
                <el-option label="标题" :value="0" />
              </el-select>
            </template>
            <template #append>
              <el-button icon="Search" @click="handleSearchFind()" />
            </template>
          </el-input>
        </div>
      </el-col>
      <!-- 第一列结束 -->
    </el-row>
    <!-- 第一行标题结束 -->
    <!-- 第二行时间开始 -->
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="inline">
          <el-tag style="height: 2rem; line-height: 2rem" type="info">创建时间</el-tag>
          <PastRangeSelectDateTime
            v-model:past-time-range="where.timeRangeCreate"
          ></PastRangeSelectDateTime>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="inline">
          <el-tag style="height: 2rem; line-height: 2rem" type="info">发布时间</el-tag>
          <RangeSelectDateTime v-model:time-range="where.timeRangePublish"></RangeSelectDateTime>
        </div>
      </el-col>
    </el-row>
    <!-- 第二行时间结束-->
    <!-- 第三行分类标签开始 -->
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="inline">
          <el-tag style="height: 2rem; line-height: 2rem" type="info">分类</el-tag>
          <el-cascader
            ref="category"
            v-model="where.category_id"
            :options="treeCategoryOptions"
            :props="{
              expandTrigger: 'hover',
              value: 'id',
              label: 'category_name',
              leaf: (data) => Number(data.parent_id) > 0,
              checkStrictly: true,
              multiple: true,
            }"
            filterable
            clearable
            :show-all-levels="false"
            class="tree-select"
            @change="handleCategoryChange"
          >
            <template #default="{ node, data }">
              <!-- Vue3中推荐用#替代v-slot: -->
              <span>{{ data.category_name }}</span>
              <span v-if="!node.isLeaf && data.children">({{ data.children.length }})</span>
            </template>
          </el-cascader>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="inline">
          <el-tag style="height: 2rem; line-height: 2rem" type="info">标签</el-tag>
          <el-cascader
            ref="label"
            v-model="where.label_id"
            :options="treeLabelOptions"
            :props="{
              expandTrigger: 'hover',
              value: 'id',
              label: 'label_name',
              leaf: (data) => Number(data.parent_id) > 0,
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
      </el-col>
      <el-col :span="6">
        <div class="inline">
          <el-tag style="height: 2rem; line-height: 2rem" type="info">置顶状态</el-tag>
          <el-select
            v-model="where.is_top"
            placeholder="是否置顶"
            clearable
            :empty-values="[null, undefined]"
            :value-on-clear="null"
          >
            <el-option label="是" :value="1" />
            <el-option label="否" :value="0" />
          </el-select>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="inline">
          <el-tag style="height: 2rem; line-height: 2rem" type="info">发布状态</el-tag>
          <el-select
            v-model="where.status"
            placeholder="是否发布"
            clearable
            :empty-values="[null, undefined]"
            :value-on-clear="null"
          >
            <el-option label="已发布" :value="10" />
            <el-option label="未发布" :value="0" />
          </el-select>
        </div>
      </el-col>
    </el-row>
    <!-- 第三行分类标签结束 -->
    <!-- 第五行开始 -->
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="inline">
          <el-tag style="height: 2rem; line-height: 2rem" type="info">排序</el-tag>
          <el-select
            v-model="where.sortType"
            placeholder="请选择排序方式"
            style="margin-right: 0.5rem"
          >
            <el-option
              v-for="item in sortOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </el-col>
      <el-col :span="2" :push="14">
        <div class="inline-right">
          <el-button type="primary" @click="handleToSearch">搜索</el-button>
        </div>
      </el-col>
    </el-row>
    <!-- 第五行结束 -->
  </div>
</template>

<script setup lang="ts">
//store
import { useCategoryStore, useLabelStore } from "@/store";
import PastRangeSelectDateTime from "@/pages/laravel-fast-api/v1/components/element/Time/PastRangeSelectDateTime.vue";
import RangeSelectDateTime from "@/pages/laravel-fast-api/v1/components/element/Time/RangeSelectDateTime.vue";
//系统
import type { CascaderValue } from "element-plus";
import { throttle } from "@/utils";

//定义组件名称
defineOptions({
  name: "ArticleSearch",
});
//store
const categoryStore = useCategoryStore();
const labelStore = useLabelStore();

// 定义为计算属性，依赖categoryStore.treeCategory
const treeCategoryOptions = computed(() => {
  return categoryStore.treeCategory;
});
const treeLabelOptions = computed(() => {
  return labelStore.treeLabel;
});
// 定义搜索条件类型
interface SearchWhere {
  find: string;
  findSelectIndex: number;
  timeRangePublish: [string, string] | [];
  timeRangeCreate: [string, string] | [];
  category_id: number[][];
  categoryArray: number[];
  label_id: number[][];
  labelArray: number[];
  is_top: number | null;
  status: number | null;
  sortType: number;
}

// 定义选项类型
interface OptionItem {
  value: string | number;
  label: string;
}

// 搜索条件
const where = ref<SearchWhere>({
  find: "",
  findSelectIndex: 0,
  // 发布时间
  timeRangePublish: [],
  // 创建时间
  timeRangeCreate: [],
  // 分类选择默认数组
  category_id: [],
  // 分类id 处理完的id数组
  categoryArray: [],
  // 标签选择默认数组
  label_id: [],
  // 标签id 处理完的id数组
  labelArray: [],
  //是否置顶
  is_top: null,
  //发布状态
  status: null,
  //排序方式
  sortType: 4,
});

// 搜索类型选项
const findSelect: OptionItem[] = [{ label: "请输入标题", value: 0 }];

// 排序选项
const sortOptions: OptionItem[] = [
  { value: 1, label: "发布时间从早到晚" },
  { value: 2, label: "发布时间从晚到早" },
  { value: 3, label: "创建时间从早到晚" },
  { value: 4, label: "创建时间从晚到早" },
];

// 定义 emits
const emit = defineEmits(["update:handleChangeSearch"]);

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
  where.value.categoryArray = categoryArray;
};
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
  where.value.labelArray = labelArray;
};

// 执行搜索
const handleToSearch = throttle(() => {
  emit("update:handleChangeSearch", where.value);
}, 1000);

// 单独查找
const handleSearchFind = throttle(() => {
  emit("update:handleChangeSearch", where.value);
}, 1000);
</script>

<style lang="scss" scoped>
.inline {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-top: 1rem;
}
.inline-right {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 1rem;
}

.tree-select .el-cascader__search-input {
  width: 70rem;
}
</style>
