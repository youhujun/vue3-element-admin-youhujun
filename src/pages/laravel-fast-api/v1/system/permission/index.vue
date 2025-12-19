<!--
 * @Descripttion: 
 * @version: v1
 * @Author: youhujun 2900976495@qq.com
 * @Date: 2025-09-22 15:20:43
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-12-10 02:54:45
 * @FilePath: d:\wwwroot\Open\Vue\vue3-element-admin-youhujun\src\pages\laravel-fast-api\v1\system\permission\index.vue
 * Copyright (C) 2025 youhujun. All rights reserved.
-->
<template>
  <div>
    <!-- 页面内容开始 -->
    <YhCard :loading="loading">
      <template #cardTitle>菜单管理</template>
      <template #cardNotice>
        <el-tag size="small" type="danger" effect="plain">
          提示:路由标题就是显示的名称,路由名称不要重复,不是一级目录的话component写组件路径不要添加/
        </el-tag>
      </template>
      <template #cardButton>
        <el-button
          v-has-role="['develop']"
          style="float: right"
          type="primary"
          @click="handleAddTop()"
        >
          添加顶级菜单
        </el-button>
      </template>
      <template #cardContent>
        <div class="custom-node">
          <el-tree
            :data="treeSoureData"
            :props="defaultProps"
            node-key="id"
            draggable
            :allow-drag="allowDrag"
            @node-drop="handleDrop"
          >
            <template #default="{ node, data }">
              <div class="custom-tree-node">
                <div>{{ node.label }}</div>
                <div>
                  <el-button
                    v-has-role="['develop']"
                    type="primary"
                    size="small"
                    plain
                    round
                    @click.stop="() => handleAddChild(node, data)"
                  >
                    添加下级菜单
                  </el-button>
                  <el-button
                    v-has-role="['develop']"
                    type="success"
                    size="small"
                    plain
                    round
                    @click.stop="() => handleToShow(node, data)"
                  >
                    查 看
                  </el-button>
                  <el-button
                    v-has-role="['develop']"
                    type="warning"
                    size="small"
                    plain
                    round
                    @click.stop="() => handleToUpdate(node, data)"
                  >
                    修改
                  </el-button>
                  <el-button
                    v-has-role="['develop']"
                    type="danger"
                    size="small"
                    plain
                    round
                    @click.stop="() => handleToRemove(node, data)"
                  >
                    删除
                  </el-button>
                </div>
              </div>
            </template>
          </el-tree>
        </div>
      </template>
    </YhCard>
    <!-- 页面内容结束 -->
    <!-- 弹窗内容开始 -->
    <YhDialog
      v-model="dialogVisible"
      :dialog-width="dialogWidth"
      :dialog-title="dialogTitle"
      :dialog-type="dialogType"
    >
      <!-- 添加表单 -->
      <template #addForm>
        <CreateMenuForm
          ref="createFormRef"
          :props-create-form="propsCreateForm"
          @close-dialog="listenToCloseDialog"
        ></CreateMenuForm>
      </template>
      <!-- 修改表单 -->
      <template #updateForm>
        <UpdateMenuForm
          ref="updateFormRef"
          :props-update-form="propsUpdateForm"
          @close-dialog="listenToCloseDialog"
        ></UpdateMenuForm>
      </template>
      <!-- 显示内容 -->
      <template #showContent>
        <MenuRowData
          :props-row-data="propsRowData"
          :props-show-index="propsShowIndex"
          @update:show-index="listenToUpdateIndex"
          @close-dialog="listenToCloseDialog"
        ></MenuRowData>
      </template>
    </YhDialog>
    <!-- 弹窗内容结束 -->
  </div>
</template>
<script setup lang="ts">
import type { NodeDropType, RenderContentContext } from "element-plus";
import { TreeNode } from "element-plus";

//store
import { usePermissionStore, useUserStore } from "@/store";
import { debounce } from "@/utils/index";
// 公共级组件
import YhCard from "@/pages/laravel-fast-api/v1/components/element/Card/index.vue";
import YhDialog from "@/pages/laravel-fast-api/v1/components/element/Dialog/index.vue";
//页面级组件
// import CreateMenuForm from './components/createForm.vue'
// import UpdateMenuForm from './components/updateForm.vue'
// import RowData from './components/rowData.vue'

//api和type
import MenuAPI from "@/api/laravel-fast-api/v1/system/menu/menu-api";
import type { TreeMenuItem } from "@/api/laravel-fast-api/v1/system/menu/menu.type";

type Node = RenderContentContext["node"];

//store
const permissionStore = usePermissionStore();
const userStore = useUserStore();
let unwatchRole: (() => void) | null = null;

//初始化加载样式
const loading = ref(true);
//是否开启弹窗
const dialogVisible = ref(false);
//弹窗标题
const dialogTitle = ref("");
//弹窗类型 10添加 20修改 30内容
const dialogType = ref(10);
//弹窗宽度
const dialogWidth = ref("65%");

//定义拖拽参数
const dragParam = ref<{ id: number; parent_id: number; sort: number; dropType: string }>({
  id: 0,
  parent_id: 0,
  sort: 0,
  dropType: "",
});

//源数据
const treeSoureData = ref<TreeMenuItem[]>([]);

//创建表单
const propsCreateForm = ref<TreeMenuItem>({
  id: 0,
  parent_id: 0,
  deep: 1,
  type: 20,
});
// 更新表单
const propsUpdateForm = ref<TreeMenuItem>({
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
//查看单挑数据
const propsRowData = ref<TreeMenuItem>({
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
//定义查看下标
const propsShowIndex = ref(0);
/**
 * 设置对话框状态
 */
const setDialogStatus = (visible: boolean, title: string, type: number) => {
  dialogVisible.value = visible;
  dialogTitle.value = title;
  dialogType.value = type;
};

/**
 * 处理添加顶级菜单
 */
const handleAddTop = () => {
  initPropsCreateForm();
  setDialogStatus(true, "添加顶级菜单", 10);
};

/**
 * 处理添加下级
 */
const handleAddChild = (node: TreeNode, data: TreeMenuItem) => {
  //console.log('data',data)
  propsCreateForm.value.id = 0;
  propsCreateForm.value.parent_id = data.id;
  propsCreateForm.value.deep = (data.deep as number) + 1;
  propsCreateForm.value.type = 10;
  setDialogStatus(true, "添加下级菜单", 10);
};

/**
 * 更新
 */
const handleToUpdate = (node: TreeNode, data: TreeMenuItem) => {
  //console.log('data',data)
  Object.assign(propsUpdateForm.value, data);
  setDialogStatus(true, "修改菜单", 20);
};

/**
 * 删除
 */
const handleToRemove = (node: TreeNode, data: TreeMenuItem) => {
  ElMessageBox.confirm("确认删除菜单吗?", "确认删除", {
    // confirmButtonText: 'Re-Login',
    confirmButtonText: "删除",
    // cancelButtonText: 'Cancel',
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      try {
        const param = { id: Number(data.id) };
        await MenuAPI.deleteMenu(param);
        //重置路由
        permissionStore.resetRouter();
        getServerMenu();
        ElMessage.success("删除菜单成功");
      } catch {
        //const err = error as Error;
        //ElMessage.error(`提交失败：${err.message || '未知错误'}`);
      }
    })
    .catch(() => {
      return;
    });
};

/**
 * 查看详情
 */
const handleToShow = (node: TreeNode, data: TreeMenuItem) => {
  Object.assign(propsRowData.value, data);
  setDialogStatus(true, "查看菜单", 30);
};

//拖拽
const handleDrop = debounce(function (draggingNode: Node, dropNode: Node, dropType: NodeDropType) {
  //console.log('tree drop:', draggingNode,dropNode.label, dropType)

  dragParam.value.id = draggingNode.data.id;
  dragParam.value.parent_id = draggingNode.data.parent_id;
  dragParam.value.sort = draggingNode.data.sort;
  dragParam.value.dropType = dropType;

  // 如果是inner,那么parent_id就是 dropNode.data.id,否则就是同级的父id
  if (dropType === "inner") {
    dragParam.value.parent_id = dropNode.data.id;
  } else {
    dragParam.value.parent_id = dropNode.data.parent_id;

    if (dropType === "after") {
      dragParam.value.sort = dropNode.data.sort + 1;
    }

    if (dropType === "before") {
      dragParam.value.sort = dropNode.data.sort + 1;
    }
  }

  MenuAPI.moveMenu(dragParam.value).then(() => {
    //console.log(res)
    //初始化拖拽参数
    initDragParam();
    //重置路由
    permissionStore.resetRouter();
    //重新加载菜单
    getServerMenu();
    ElMessage.success("移动菜单成功");
  });
}, 1000);

//是否可以拖动
const allowDrag = () => {
  return true;
};
//树形组件props
const defaultProps = {
  children: "children",
  label: "title",
};
//获取服务器树形路由
const getServerMenu = async () => {
  const result = await MenuAPI.getTreeMenu();
  const { data } = result;
  treeSoureData.value = data;
};

//监听关闭弹窗
const listenToCloseDialog = () => {
  //重新加载新路由
  getServerMenu();
  //重置路由
  permissionStore.resetRouter();
  //初始化表单
  initPropsCreateForm();
  initpropsUpdateForm();
  //初始化查看详情
  initPropsRowData();
  dialogVisible.value = false;
};

//监听切换下标
const listenToUpdateIndex = () => {
  //console.log('index',index)
  //updateIndex.value = index
};

//初始化创建表单传值
const initPropsCreateForm = () => {
  propsCreateForm.value.parent_id = 0;
  propsCreateForm.value.id = 0;
  propsCreateForm.value.deep = 1;
  propsCreateForm.value.type = 20;
};

//初始化更新表单传值
const initpropsUpdateForm = () => {
  propsUpdateForm.value.parent_id = 0;
  propsUpdateForm.value.id = 0;
  propsUpdateForm.value.deep = 1;
  propsUpdateForm.value.type = 20;
  propsUpdateForm.value.route_name = "";
  propsUpdateForm.value.route_path = "";
  propsUpdateForm.value.component = "";
  propsUpdateForm.value.hidden = 0;
  propsUpdateForm.value.always_show = 1;
  propsUpdateForm.value.perm = "";
  propsUpdateForm.value.switch = 1;
  propsUpdateForm.value.sort = 100;
  propsUpdateForm.value.icon = "";
  propsUpdateForm.value.title = "";
  propsUpdateForm.value.cache = 0;
  propsUpdateForm.value.affix = 0;
  propsUpdateForm.value.breadcrumb = 1;
  propsUpdateForm.value.active_menu = "";
  propsUpdateForm.value.redirect = "";
};
//初始化查看详情
const initPropsRowData = () => {
  propsRowData.value.parent_id = 0;
  propsRowData.value.id = 0;
  propsRowData.value.deep = 1;
  propsRowData.value.type = 20;
  propsRowData.value.route_name = "";
  propsRowData.value.route_path = "";
  propsRowData.value.component = "";
  propsRowData.value.hidden = 0;
  propsRowData.value.always_show = 1;
  propsRowData.value.perm = "";
  propsRowData.value.switch = 1;
  propsRowData.value.sort = 100;
  propsRowData.value.icon = "";
  propsRowData.value.title = "";
  propsRowData.value.cache = 0;
  propsRowData.value.affix = 0;
  propsRowData.value.breadcrumb = 1;
  propsRowData.value.active_menu = "";
  propsRowData.value.redirect = "";
};

//初始化拖拽容器
const initDragParam = () => {
  dragParam.value.id = 0;
  dragParam.value.parent_id = 0;
  dragParam.value.sort = 0;
  dragParam.value.dropType = "";
};

//页面加载完成
onMounted(() => {
  //监听用户角色
  unwatchRole = userStore.watchRoles();
  getServerMenu();
  //加载效果
  setTimeout(() => {
    loading.value = false;
  }, 500);
});

//组件卸载
onUnmounted(() => {
  // 组件卸载时停止监听，防止内存泄漏
  if (unwatchRole) {
    unwatchRole();
  }
});
</script>
<style lang="scss" scoped>
.custom-tree-node {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  padding-right: 1rem;
  font-size: 1rem;
}
</style>
