<!--
 * @Descripttion: 
 * @version: v1
 * @Author: youhujun 2900976495@qq.com
 * @Date: 2025-09-22 15:20:43
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-12-10 03:59:08
 * @FilePath: d:\wwwroot\Open\Vue\vue3-element-admin-youhujun\src\pages\laravel-fast-api\v1\system\region\index.vue
 * Copyright (C) 2025 youhujun. All rights reserved.
-->
<template>
  <div>
    <!-- 页面内容开始 -->
    <YhCard :loading="loading">
      <template #cardTitle>地区管理</template>
      <template #cardNotice>
        <el-tag size="small" type="danger" effect="plain">提示:地区级别可以继续向下添加</el-tag>
      </template>
      <template #cardButton>
        <el-button
          v-has-role="['develop']"
          style="float: right"
          type="primary"
          @click="handleAddTop()"
        >
          添加顶级地区
        </el-button>
      </template>
      <template #cardContent>
        <div class="custom-node">
          <el-tree
            :data="dataList"
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
        <CreateRegionTreeForm
          ref="createFormRef"
          :props-create-form="propsCreateForm"
          @close-dialog="listenToCloseDialog"
        ></CreateRegionTreeForm>
      </template>
      <!-- 修改表单 -->
      <template #updateForm>
        <UpdateRegionTreeForm
          ref="updateFormRef"
          :props-update-form="propsUpdateForm"
          @close-dialog="listenToCloseDialog"
        ></UpdateRegionTreeForm>
      </template>
      <!-- 显示内容 -->
      <template #showContent>
        <RegionRowData
          :props-row-data="propsRowData"
          :props-show-index="propsShowIndex"
          @update:show-index="listenToUpdateIndex"
          @close-dialog="listenToCloseDialog"
        ></RegionRowData>
      </template>
    </YhDialog>
    <!-- 弹窗内容结束 -->
  </div>
</template>
<script setup lang="ts">
//系统级
import type { NodeDropType, RenderContentContext, TreeNode } from "element-plus";
//store
import { useUserStore } from "@/store";
//重置路由
import { debounce } from "@/utils/index";
// 公共级组件
import YhCard from "@/pages/laravel-fast-api/v1/components/element/Card/index.vue";
import YhDialog from "@/pages/laravel-fast-api/v1/components/element/Dialog/index.vue";
//页面级组件
import CreateRegionTreeForm from "./components/CreateRegionTreeForm.vue";
import UpdateRegionTreeForm from "./components/UpdateRegionTreeForm.vue";
import RegionRowData from "./components/RegionRowData.vue";

//api和type
import RegionAPI from "@/api/laravel-fast-api/v1/system/region/region-api";
import type {
  TreeRegionItem,
  AddRegion,
  UpdateRegion,
} from "@/api/laravel-fast-api/v1/system/region/region-type";

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

//定义拖拽参数
const dragParam = ref<{ id: number; parent_id: number; sort: number; dropType: string }>({
  id: 0,
  parent_id: 0,
  sort: 0,
  dropType: "",
});

//源数据
const soureTreeData = ref<TreeRegionItem[]>([]);

//计算数据列表
const dataList = computed({
  get() {
    return soureTreeData.value;
  },
  set(newValue) {
    //console.log('newValue',newValue)
    soureTreeData.value = newValue;
  },
});

//创建表单
const propsCreateForm = ref<AddRegion>({
  id: 0,
  parent_id: 0,
  deep: 1,
  region_name: "",
  sort: 100,
});
// 更新表单
const propsUpdateForm = ref<UpdateRegion>({
  id: 0,
  parent_id: 0,
  deep: 1,
  region_name: "",
  sort: 100,
});
//查看单挑数据
const propsRowData = ref<TreeRegionItem>({
  id: 0,
  parent_id: 0,
  deep: 1,
  region_name: "",
  region_area: "",
  created_at: "",
  sort: 100,
  children: [],
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
  setDialogStatus(true, "添加顶级", 10);
};

/**
 * 处理添加下级
 */
const handleAddChild = (node: TreeNode, data: TreeRegionItem) => {
  //console.log('data',data)
  propsCreateForm.value.parent_id = data.id;
  propsCreateForm.value.deep = (data.deep as number) + 1;
  setDialogStatus(true, "添加下级", 10);
};

/**
 * 更新
 */
const handleToUpdate = (node: TreeNode, data: TreeRegionItem) => {
  //console.log('data',data)
  Object.assign(propsUpdateForm.value, data);
  setDialogStatus(true, "修改", 20);
};

/**
 * 删除
 */
const handleToRemove = (node: TreeNode, data: TreeRegionItem) => {
  ElMessageBox.confirm("确认删除吗?", "确认删除", {
    // confirmButtonText: 'Re-Login',
    confirmButtonText: "删除",
    // cancelButtonText: 'Cancel',
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      try {
        const result = await RegionAPI.deleteRegion(data);

        getTreeRegion();
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
const handleToShow = (node: TreeNode, data: TreeRegionItem) => {
  Object.assign(propsRowData.value, data);
  setDialogStatus(true, "查看", 30);
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

  RegionAPI.moveRegion(dragParam.value).then(() => {
    //console.log(res)
    //初始化拖拽参数
    initDragParam();
    //重新加载
    getTreeRegion();
    ElMessage.success("移动成功");
  });
}, 1000);

//是否可以拖动
const allowDrag = () => {
  return true;
};
//树形组件props
const defaultProps = {
  children: "children",
  label: "region_name",
};
//获取服务器树形路由
const getTreeRegion = async () => {
  loading.value = true;
  const result = await RegionAPI.getTreeRegions();
  const { data } = result;
  soureTreeData.value = data;
  loading.value = false;
};

//监听关闭弹窗
const listenToCloseDialog = () => {
  //重新加载
  getTreeRegion();
  //初始化表单
  initPropsCreateForm();
  initPropsUpdateForm();
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
  propsCreateForm.value.deep = 1;
};

//初始化更新表单传值
const initPropsUpdateForm = () => {
  propsUpdateForm.value.id = 0;
  propsUpdateForm.value.region_name = "";
  propsUpdateForm.value.sort = 100;
};
//初始化查看详情
const initPropsRowData = () => {
  propsRowData.value.id = 0;
  propsRowData.value.parent_id = 0;
  propsRowData.value.deep = 1;
  propsRowData.value.region_name = "";
  propsRowData.value.children = [];
  propsRowData.value.sort = 100;
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
  console.log("查看登录角色", userStore.roles);
  //监听用户角色
  unwatchRole = userStore.watchRoles();
  getTreeRegion();
  //加载效果
  setTimeout(() => {
    loading.value = false;
  }, 1000);
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
