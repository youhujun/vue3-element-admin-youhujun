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
        <el-tag type="info" style="margin-right: 1rem">菜单id</el-tag>
        <el-tag style="margin-right: 1rem" type="primary">{{ rowData.id }}</el-tag>
        <el-tag style="margin-right: 1rem" type="info">菜单parent_id</el-tag>
        <el-tag style="margin-right: 1rem" type="primary">
          {{ rowData.parent_id ? rowData.parent_id : 0 }}
        </el-tag>
      </el-row>
      <!-- 真正的一行结束 -->
      <!-- 真正的一行 -->
      <el-row class="row-one" :gutter="10">
        <el-tag type="info" style="margin-right: 1rem">菜单级别</el-tag>
        <el-tag style="margin-right: 1rem" type="primary">{{ rowData.deep }}级</el-tag>
        <el-tag style="margin-right: 1rem" type="info">菜单类型</el-tag>
        <el-tag style="margin-right: 1rem" type="primary">{{ menuType }}</el-tag>
      </el-row>
      <!-- 真正的一行结束 -->
      <!-- 真正的一行 -->
      <el-row class="row-one" :gutter="10">
        <el-tag type="info" style="margin-right: 1rem">菜单路径</el-tag>
        <el-tag style="margin-right: 1rem" type="primary">
          {{ rowData.route_path ? rowData.route_path : "暂无" }}
        </el-tag>
        <el-tag style="margin-right: 1rem" type="info">组件名称</el-tag>
        <el-tag style="margin-right: 1rem" type="primary">
          {{ rowData.component ? rowData.component : "暂无" }}
        </el-tag>
      </el-row>
      <!-- 真正的一行结束 -->
      <!-- 真正的一行 -->
      <el-row class="row-one" :gutter="10">
        <el-tag type="info" style="margin-right: 1rem">逻辑名称</el-tag>
        <el-tag style="margin-right: 1rem" type="primary">
          {{ rowData.route_name ? rowData.route_name : "暂无" }}
        </el-tag>
        <el-tag style="margin-right: 1rem" type="info">显示名称</el-tag>
        <el-tag style="margin-right: 1rem" type="primary">
          {{ rowData.title ? rowData.title : "暂无" }}
        </el-tag>
      </el-row>
      <!-- 真正的一行结束 -->
      <!-- 真正的一行 -->
      <el-row class="row-one" :gutter="10">
        <el-tag type="info" style="margin-right: 1rem">图标标识</el-tag>
        <el-tag style="margin-right: 1rem" type="primary">
          {{ rowData.icon ? rowData.icon : "暂无" }}
        </el-tag>
        <el-tag style="margin-right: 1rem" type="info">跳转路径</el-tag>
        <el-tag style="margin-right: 1rem" type="primary">
          {{ rowData.redirect ? rowData.redirect : "暂无" }}
        </el-tag>
      </el-row>
      <!-- 真正的一行结束 -->
      <!-- 真正的一行 -->
      <el-row class="row-one" :gutter="10">
        <el-tag type="info" style="margin-right: 1rem">是否始终显示</el-tag>
        <el-tag style="margin-right: 1rem" type="primary">
          {{ rowData.always_show === 1 ? "是" : "否" }}
        </el-tag>
        <el-tag style="margin-right: 1rem" type="info">是否隐藏</el-tag>
        <el-tag style="margin-right: 1rem" type="primary">
          {{ rowData.hidden === 1 ? "是" : "否" }}
        </el-tag>
      </el-row>
      <!-- 真正的一行结束 -->
      <!-- 真正的一行 -->
      <el-row class="row-one" :gutter="10">
        <el-tag type="info" style="margin-right: 1rem">活动路由</el-tag>
        <el-tag style="margin-right: 1rem" type="primary">{{ menuActive }}</el-tag>
        <el-tag style="margin-right: 1rem" type="info">是否缓存</el-tag>
        <el-tag style="margin-right: 1rem" type="primary">
          {{ rowData.cache === 1 ? "是" : "否" }}
        </el-tag>
      </el-row>
      <!-- 真正的一行结束 -->
      <!-- 真正的一行 -->
      <el-row class="row-one" :gutter="10">
        <el-tag type="info" style="margin-right: 1rem">是否固定在视图中</el-tag>
        <el-tag style="margin-right: 1rem" type="primary">
          {{ rowData.affix === 1 ? "是" : "否" }}
        </el-tag>
        <el-tag style="margin-right: 1rem" type="info">是否在面包屑显示</el-tag>
        <el-tag style="margin-right: 1rem" type="primary">
          {{ rowData.breadcrumb === 1 ? "是" : "否" }}
        </el-tag>
      </el-row>
      <!-- 真正的一行结束 -->
    </div>
  </div>
</template>
<script lang="ts" setup>
//api和type
import type { TreeMenuItem, MenuForm } from "@/api/laravel-fast-api/v1/system/menu/menu.type";
//定义组件名称
defineOptions({
  name: "MenuRowData",
});
// 定义事件
const emit = defineEmits(["update:ShowIndex"]);
//定义rowData
const rowData = reactive<MenuForm>({
  id: 0,
  parent_id: 0,
  deep: 1,
  type: 20,
  route_name: "",
  route_path: "",
  component: "",
  hidden: 0,
  always_show: 1,
  perm: "",
  switch: 1,
  sort: 100,
  icon: "",
  title: "",
  cache: 0,
  affix: 0,
  breadcrumb: 1,
  active_menu: "",
  redirect: "",
});
//定义props
const props = withDefaults(
  defineProps<{
    propsRowData?: TreeMenuItem;
    propsShowIndex?: number;
  }>(),
  {
    propsRowData: () => ({
      id: 0,
      parent_id: 0,
      deep: 1,
      type: 20,
      route_name: "",
      route_path: "",
      component: "",
      hidden: 0,
      always_show: 1,
      perm: "",
      switch: 1,
      sort: 100,
      icon: "",
      title: "",
      cache: 0,
      affix: 0,
      breadcrumb: 1,
      active_menu: "",
      redirect: "",
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

//菜单类型
const menuType = computed(() => {
  let type = "暂无";
  if (rowData.type == 10) {
    type = "菜单";
  }
  if (rowData.type == 20) {
    type = "目录";
  }
  if (rowData.type == 30) {
    type = "外链";
  }
  if (rowData.type == 40) {
    type = "按钮";
  }
  return type;
});

const menuActive = computed(() => {
  let activeMenu = rowData.active_menu;
  // 判断是否为空白字符（包括空字符串）
  const isBlank = activeMenu === undefined || activeMenu === null || activeMenu.trim() === "";

  if (isBlank) {
    activeMenu = "暂无";
  }
  return activeMenu;
});

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
