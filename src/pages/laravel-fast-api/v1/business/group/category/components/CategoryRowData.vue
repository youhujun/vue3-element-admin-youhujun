<template>
  <div v-if="propsShowIndex === 0">
    <div class="header">
      <el-row type="flex">
        <el-button type="primary" icon="FullScreen" size="small" @click="handleClick(0)">
          产品分类详情
        </el-button>
      </el-row>
    </div>
    <div class="content">
      <!-- 真正的一行 -->
      <el-row class="row-one" :gutter="10">
        <el-tag type="info" style="margin-right: 1rem">id</el-tag>
        <el-tag style="margin-right: 1rem" type="primary">{{ rowData.id }}</el-tag>
        <el-tag type="info" style="margin-right: 1rem">级别</el-tag>
        <el-tag style="margin-right: 1rem" type="primary">{{ rowData.deep }}级</el-tag>
      </el-row>
      <!-- 真正的一行结束 -->
      <!-- 真正的一行 -->
      <el-row class="row-one" :gutter="10">
        <el-tag type="info" style="margin-right: 1rem">分类名称</el-tag>
        <el-tag style="margin-right: 1rem" type="primary">{{ rowData.category_name }}</el-tag>
        <el-tag type="info" style="margin-right: 1rem">分类编码</el-tag>
        <el-tag style="margin-right: 1rem" type="primary">
          {{ rowData.category_code ? rowData.category_code : "暂无" }}
        </el-tag>
      </el-row>
      <!-- 真正的一行结束 -->
      <!-- 真正的一行结束 -->
      <!-- 真正的一行 -->
      <el-row class="row-one" :gutter="10">
        <el-tag type="info" style="margin-right: 1rem">分配比例</el-tag>
        <el-tag style="margin-right: 1rem" type="primary">{{ rowData.rate }}%</el-tag>
        <el-tag type="info" style="margin-right: 1rem">排序</el-tag>
        <el-tag style="margin-right: 1rem" type="primary">{{ rowData.sort }}</el-tag>
      </el-row>
      <!-- 真正的一行结束 -->
      <!-- 真正的一行 -->
      <el-row class="row-one" :gutter="10">
        <el-tag type="info" style="margin-right: 1rem">备注</el-tag>
        <el-tag style="margin-right: 1rem" type="primary">
          {{ rowData.note ? rowData.note : "暂无" }}
        </el-tag>
        <el-tag type="info" style="margin-right: 1rem">子级数量</el-tag>
        <el-tag style="margin-right: 1rem" type="primary">
          {{ rowData.children?.length ?? "暂无" }}
        </el-tag>
      </el-row>
      <!-- 真正的一行结束 -->
      <!-- 真正的一行 -->
      <el-row class="row-one" :gutter="10">
        <el-tag type="info" style="margin-right: 1rem">图片logo</el-tag>
        <el-image
          v-if="rowData.picture"
          style="width: 100px; height: 100px"
          :src="rowData.picture"
        ></el-image>
        <el-tag v-else type="primary">暂无</el-tag>
      </el-row>
      <!-- 真正的一行结束 -->
    </div>
  </div>
</template>
<script lang="ts" setup>
//api和type
import type { TreeCategoryItem } from "@/api/laravel-fast-api/v1/business/group/category/category-type";
//定义组件名称
defineOptions({
  name: "CategoryRowData",
});
// 定义事件
const emit = defineEmits(["update:ShowIndex"]);
//定义rowData
const rowData = reactive<TreeCategoryItem>({
  id: 0,
  category_name: "",
  category_code: "",
  category_picture_id: 0,
  deep: 1,
  parent_id: 0,
  rate: 0,
  note: "",
  sort: 100,
  switch: 1,
  created_at: "",
  children: [],
  picture: "",
});
//定义props
const props = withDefaults(
  defineProps<{
    propsRowData?: TreeCategoryItem;
    propsShowIndex?: number;
  }>(),
  {
    propsRowData: () => ({
      id: 0,
      category_name: "",
      category_code: "",
      category_picture_id: 0,
      deep: 1,
      parent_id: 0,
      rate: 0,
      note: "",
      sort: 100,
      switch: 1,
      created_at: "",
      children: [],
      picture: "",
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
