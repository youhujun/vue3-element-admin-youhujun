<template>
  <div v-if="propsShowIndex === 0">
    <div class="header">
      <el-row type="flex">
        <el-button type="primary" size="small" @click="handleClick(0)">
          <el-icon><Document /></el-icon>
          角色详情
        </el-button>
      </el-row>
    </div>
    <div class="content">
      <!-- 真正的一行 -->
      <el-row class="row-one" :gutter="10">
        <el-tag type="info" style="margin-right: 1rem">角色名称</el-tag>
        <el-tag style="margin-right: 1rem" type="primary">{{ rowData.role_name }}</el-tag>
        <el-tag style="margin-right: 1rem" type="info">逻辑名称</el-tag>
        <el-tag style="margin-right: 1rem" type="primary">{{ rowData.logic_name }}</el-tag>
      </el-row>
      <!-- 真正的一行结束 -->
      <!-- 真正的一行 -->
      <el-row class="row-one" :gutter="10">
        <el-tag type="info" style="margin-right: 1rem">角色深度</el-tag>
        <el-tag style="margin-right: 1rem" type="primary">{{ rowData.deep }}</el-tag>
        <el-tag style="margin-right: 1rem" type="info">下级角色数量</el-tag>
        <el-tag style="margin-right: 1rem" type="primary">
          {{ Array.isArray(rowData.children) ? rowData.children.length : 0 }}
        </el-tag>
      </el-row>
      <!-- 真正的一行结束 -->
    </div>
  </div>
</template>
<script lang="ts" setup>
//api和type
import type { TreeRoleItem } from "@/api/laravel-fast-api/v1/system/role/role-type";
//定义组件名称
defineOptions({
  name: "RoleRowData",
});
// 定义事件
const emit = defineEmits(["update:ShowIndex"]);
//定义rowData
const rowData = reactive<TreeRoleItem>({
  id: 0,
  parent_id: 0,
  deep: 1,
  switch: 0,
  role_name: "",
  logic_name: "",
  sort: 100,
  permission: [],
});
//定义props
const props = withDefaults(
  defineProps<{
    propsRowData?: TreeRoleItem;
    propsShowIndex?: number;
  }>(),
  {
    propsRowData: () => ({
      id: 0,
      parent_id: 0,
      deep: 1,
      switch: 0,
      role_name: "",
      logic_name: "",
      sort: 100,
      permission: [],
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
