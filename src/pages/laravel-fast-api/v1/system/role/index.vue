<!--
 * @Descripttion: 
 * @version: v1
 * @Author: youhujun 2900976495@qq.com
 * @Date: 2025-09-22 15:20:43
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-12-10 03:49:25
 * @FilePath: d:\wwwroot\Open\Vue\vue3-element-admin-youhujun\src\pages\laravel-fast-api\v1\system\role\index.vue
 * Copyright (C) 2025 youhujun. All rights reserved.
-->
<template>
  <div>
    <!-- 页面内容开始 -->
    <YhCard :loading="loading">
      <template #cardTitle>角色管理</template>
      <template #cardNotice>
        <el-tag size="small" type="danger" effect="plain">
          角色的逻辑名称logic_name就是代码中指令使用的依据
        </el-tag>
      </template>
      <template #cardButton>
        <el-button
          v-has-role="['develop']"
          style="float: right"
          type="primary"
          @click="handleAddTop()"
        >
          添加顶级角色
        </el-button>
      </template>
      <template #cardContent>
        <div class="custom-node">
          <el-tree
            :data="treeData"
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
                    round
                    @click.stop="() => handleRolePermission(node, data)"
                  >
                    权限管理
                  </el-button>
                  <el-button
                    v-has-role="['develop']"
                    type="primary"
                    size="small"
                    plain
                    round
                    @click.stop="() => handleAddChild(node, data)"
                  >
                    添加下级
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
        <CreateRoleTreeForm
          ref="createFormRef"
          :props-create-form="propsCreateForm"
          @close-dialog="listenToCloseDialog"
        ></CreateRoleTreeForm>
      </template>
      <!-- 修改表单 -->
      <template #updateForm>
        <UpdateRoleTreeForm
          ref="updateFormRef"
          :props-update-form="propsUpdateForm"
          @close-dialog="listenToCloseDialog"
        ></UpdateRoleTreeForm>
      </template>
      <!-- 显示内容 -->
      <template #showContent>
        <RoleRowData
          :props-row-data="propsRowData"
          :props-show-index="propsShowIndex"
          @update:show-index="listenToUpdateIndex"
          @close-dialog="listenToCloseDialog"
        ></RoleRowData>
      </template>
    </YhDialog>
    <!-- 弹窗内容结束 -->
    <!-- 权限管理开始 -->
    <RolePermissionDialog
      v-model:call-album-dialog-visible="rolePermissionVisible"
      :before-checked-key-id-array="beforeCheckedIdArray"
      :role-id="roleId"
      @update:reload-role-perimission="listenToReloadRolePermission()"
    ></RolePermissionDialog>
    <!-- 权限管理结束 -->
  </div>
</template>
<script setup lang="ts">
//系统级
import type { NodeDropType, RenderContentContext, TreeNode } from "element-plus";
//store
import { useUserStore } from "@/store";

// 公共级组件
import YhCard from "@/pages/laravel-fast-api/v1/components/element/Card/index.vue";
import YhDialog from "@/pages/laravel-fast-api/v1/components/element/Dialog/index.vue";
//页面级组件
import CreateRoleTreeForm from "./components/CreateRoleTreeForm.vue";
import UpdateRoleTreeForm from "./components/UpdateRoleTreeForm.vue";
import RoleRowData from "./components/RoleRowData.vue";
import RolePermissionDialog from "./components/RolePermissionDialog.vue";

//api和type
import SystemRoleAPI from "@/api/laravel-fast-api/v1/system/role/role-api";
import type {
  TreeRoleItem,
  AddRole,
  UpdateRole,
} from "@/api/laravel-fast-api/v1/system/role/role-type";

type Node = RenderContentContext["node"];

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
//定义权限管理弹窗
const rolePermissionVisible = ref(false);

//定义拖拽参数
const dragParam = ref<{ id: number; parent_id: number; sort: number; dropType: string }>({
  id: 0,
  parent_id: 0,
  sort: 0,
  dropType: "",
});

// 初始化表单初始状态（简化重置逻辑）
const INIT_CREATE_FORM: AddRole = {
  id: 0,
  parent_id: 0,
  deep: 1,
  logic_name: "",
  role_name: "",
  sort: 100,
};

const INIT_UPDATE_FORM: UpdateRole = {
  id: 0,
  logic_name: "",
  role_name: "",
  sort: 100,
};

const INIT_ROW_DATA: TreeRoleItem = {
  id: 0,
  parent_id: 0,
  deep: 1,
  logic_name: "",
  role_name: "",
  switch: 0,
  sort: 100,
  permission: [],
};

//源数据
const treeData = ref<TreeRoleItem[]>([]);

// 表单数据
const propsCreateForm = ref<AddRole>({ ...INIT_CREATE_FORM });
const propsUpdateForm = ref<UpdateRole>({ ...INIT_UPDATE_FORM });
const propsRowData = ref<TreeRoleItem>({ ...INIT_ROW_DATA });
//定义查看下标
const propsShowIndex = ref(0);

// 表单ref（添加类型定义）
const createFormRef = ref<InstanceType<typeof CreateRoleTreeForm> | null>(null);
const updateFormRef = ref<InstanceType<typeof UpdateRoleTreeForm> | null>(null);

//定义权限id容器
const beforeCheckedIdArray = ref<number[]>([]);
//角色id
const roleId = ref(0);
/**
 * 设置对话框状态
 */
const setDialogStatus = (visible: boolean, title: string, type: number) => {
  dialogVisible.value = visible;
  dialogTitle.value = title;
  dialogType.value = type;
};

/**
 * 处理添加顶级
 */
const handleAddTop = () => {
  // 简化表单重置
  propsCreateForm.value = { ...INIT_CREATE_FORM };
  setDialogStatus(true, "添加顶级角色", 10);
};

/**
 * 权限管理
 * @param node
 * @param data
 */
const handleRolePermission = (node: TreeNode, data: TreeRoleItem) => {
  //console.log('data:')
  //console.log(data)
  roleId.value = data.id;
  // 判断 permission 是否有效
  if (data.permission !== undefined && data.permission !== null) {
    // 处理权限数据
    beforeCheckedIdArray.value = data.permission;
  } else {
    // 处理 permission 不存在的情况
    beforeCheckedIdArray.value = [];
  }
  console.log("beforeCheckedIdArray", beforeCheckedIdArray);
  //开启弹窗
  rolePermissionVisible.value = true;
};

/**
 * 处理添加下级
 */
const handleAddChild = (node: TreeNode, data: TreeRoleItem) => {
  //console.log('data',data)
  propsCreateForm.value.parent_id = data.id;
  propsCreateForm.value.deep = (data.deep as number) + 1;
  setDialogStatus(true, "添加下级角色", 10);
};

/**
 * 更新
 */
const handleToUpdate = (node: TreeNode, data: TreeRoleItem) => {
  //console.log('data',data)
  Object.assign(propsUpdateForm.value, data);
  setDialogStatus(true, "修改角色", 20);
};

/**
 * 删除
 */
const handleToRemove = (node: TreeNode, data: TreeRoleItem) => {
  ElMessageBox.confirm("确认删除吗?", "确认删除", {
    // confirmButtonText: 'Re-Login',
    confirmButtonText: "删除",
    // cancelButtonText: 'Cancel',
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      try {
        const result = await SystemRoleAPI.deleteRole(data);
        getTreeRole();
        ElMessage.success(result.msg);
      } catch {
        ElMessage.error("删除失败");
      }
    })
    .catch(() => {
      return;
    });
};

/**
 * 查看详情
 */
const handleToShow = (node: TreeNode, data: TreeRoleItem) => {
  Object.assign(propsRowData.value, data);
  setDialogStatus(true, "查看", 30);
};

//拖拽
const handleDrop = async (draggingNode: Node, dropNode: Node, dropType: NodeDropType) => {
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

  SystemRoleAPI.moveRole(dragParam.value).then(() => {
    //console.log(res)
    //初始化拖拽参数
    initDragParam();
    //重新加载
    getTreeRole();
    ElMessage.success("移动成功");
  });
};

//是否可以拖动
const allowDrag = () => {
  return true;
};
//树形组件props
const defaultProps = {
  children: "children",
  label: "role_name",
};

//获取服务器树形路由
const getTreeRole = async () => {
  loading.value = true;
  const result = await SystemRoleAPI.getTreeRole();
  treeData.value = result.data;
  loading.value = false;
};

//监听关闭弹窗
const listenToCloseDialog = async () => {
  //重新加载
  await getTreeRole();
  dialogVisible.value = false;
  // 重置表单（避免下次打开残留旧数据）
  propsCreateForm.value = { ...INIT_CREATE_FORM };
  propsUpdateForm.value = { ...INIT_UPDATE_FORM };
  propsRowData.value = { ...INIT_ROW_DATA };
};

//监听切换下标
const listenToUpdateIndex = () => {
  //console.log('index',index)
  //updateIndex.value = index
};

//初始化拖拽容器
const initDragParam = () => {
  dragParam.value.id = 0;
  dragParam.value.parent_id = 0;
  dragParam.value.sort = 0;
  dragParam.value.dropType = "";
};

//监听修改权限
const listenToReloadRolePermission = async () => {
  await getTreeRole();
  loading.value = false;
};

//页面加载完成
onMounted(() => {
  //监听用户角色
  unwatchRole = userStore.watchRoles();
  getTreeRole();
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
