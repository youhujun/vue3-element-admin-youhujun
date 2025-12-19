<!--
 * @Descripttion: 
 * @version: v1
 * @Author: youhujun 2900976495@qq.com
 * @Date: 2025-09-22 15:20:43
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-12-10 04:41:40
 * @FilePath: d:\wwwroot\Open\Vue\vue3-element-admin-youhujun\src\pages\laravel-fast-api\v1\business\group\category\index.vue
 * Copyright (C) 2025 youhujun. All rights reserved.
-->
<template>
  <div>
    <!-- 页面内容开始 -->
    <YhCard :loading="loading">
      <template #cardTitle>产品分类</template>
      <template #cardNotice>
        <el-tag size="small" type="danger" effect="plain">
          分类有子级分类或者关联文章以后,均无法删除
        </el-tag>
      </template>
      <template #cardButton>
        <el-button
          v-has-role="['develop']"
          style="float: right"
          type="primary"
          @click="handleAddTop()"
        >
          添加顶级分类
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
                    v-has-role="['develop', 'super', 'config_admin']"
                    type="primary"
                    size="small"
                    plain
                    round
                    @click.stop="() => handleAddChild(node, data)"
                  >
                    添加下级
                  </el-button>
                  <el-button
                    type="success"
                    size="small"
                    plain
                    round
                    @click.stop="() => handleToShow(node, data)"
                  >
                    查 看
                  </el-button>
                  <el-button
                    v-has-role="['develop', 'super', 'config_admin']"
                    type="warning"
                    size="small"
                    plain
                    round
                    @click.stop="() => handleToUpdate(node, data)"
                  >
                    修改
                  </el-button>
                  <el-button
                    v-has-role="['develop', 'super', 'config_admin']"
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
        <CreateCategoryTreeForm
          ref="createFormRef"
          :props-create-form="propsCreateForm"
          @close-dialog="listenToCloseDialog"
        ></CreateCategoryTreeForm>
      </template>
      <!-- 修改表单 -->
      <template #updateForm>
        <UpdateCategoryTreeForm
          ref="updateFormRef"
          :props-update-form="propsUpdateForm"
          @close-dialog="listenToCloseDialog"
        ></UpdateCategoryTreeForm>
      </template>
      <!-- 显示内容 -->
      <template #showContent>
        <CategoryRowData
          :props-row-data="propsRowData"
          :props-show-index="propsShowIndex"
          @update:show-index="listenToUpdateIndex"
          @close-dialog="listenToCloseDialog"
        ></CategoryRowData>
      </template>
    </YhDialog>
    <!-- 弹窗内容结束 -->
  </div>
</template>
<script setup lang="ts">
import type { NodeDropType, RenderContentContext, TreeNode } from "element-plus";
//store
import { useUserStore } from "@/store";
//重置路由
import { debounce } from "@/utils/index";
// 公共级组件
import YhCard from "@/pages/laravel-fast-api/v1/components/element/Card/index.vue";
import YhDialog from "@/pages/laravel-fast-api/v1/components/element/Dialog/index.vue";
//页面级组件
import CreateCategoryTreeForm from "./components/CreateCategoryTreeForm.vue";
import UpdateCategoryTreeForm from "./components/UpdateCategoryTreeForm.vue";
import CategoryRowData from "./components/CategoryRowData.vue";

//api和type
import CategoryAPI from "@/api/laravel-fast-api/v1/business/group/category/category-api";
import type {
  TreeCategoryItem,
  AddCategory,
  UpdateCategory,
} from "@/api/laravel-fast-api/v1/business/group/category/category-type";

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
const soureTreeData = ref<TreeCategoryItem[]>([]);

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
const propsCreateForm = ref<AddCategory>({
  id: 0,
  category_name: "",
  category_code: "",
  category_picture_id: null,
  deep: 1,
  parent_id: 0,
  rate: 0,
  note: "",
  sort: 100,
});
// 更新表单
const propsUpdateForm = ref<UpdateCategory>({
  id: 0,
  category_name: "",
  category_code: "",
  category_picture_id: null,
  deep: 1,
  parent_id: 0,
  rate: 0,
  note: "",
  sort: 100,
});
//查看单挑数据
const propsRowData = ref<TreeCategoryItem>({
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
const handleAddChild = (node: TreeNode, data: TreeCategoryItem) => {
  //console.log('data',data)
  propsCreateForm.value.parent_id = data.id;
  propsCreateForm.value.deep = (data.deep as number) + 1;
  setDialogStatus(true, "添加下级", 10);
};

/**
 * 更新
 */
const handleToUpdate = (node: TreeNode, data: TreeCategoryItem) => {
  //console.log('data',data)
  Object.assign(propsUpdateForm.value, data);
  console.log(propsUpdateForm.value);
  setDialogStatus(true, "修改", 20);
};

/**
 * 删除
 */
const handleToRemove = (node: TreeNode, data: TreeCategoryItem) => {
  ElMessageBox.confirm("确认删除吗?", "确认删除", {
    // confirmButtonText: 'Re-Login',
    confirmButtonText: "删除",
    // cancelButtonText: 'Cancel',
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      try {
        const result = await CategoryAPI.deleteCategory(data);
        getTreeCategory();
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
const handleToShow = (node: TreeNode, data: TreeCategoryItem) => {
  //初始化查看详情
  initPropsRowData();
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

  CategoryAPI.moveCategory(dragParam.value).then(() => {
    //console.log(res)
    //初始化拖拽参数
    initDragParam();
    //重新加载
    getTreeCategory();
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
  label: "category_name",
};
//获取服务器树形路由
const getTreeCategory = async () => {
  loading.value = true;
  const result = await CategoryAPI.getTreeCategory();
  const { data } = result;
  soureTreeData.value = data;
  loading.value = false;
};

//监听关闭弹窗
const listenToCloseDialog = () => {
  //重新加载
  getTreeCategory();
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
  propsCreateForm.value.id = 0;
  propsCreateForm.value.category_name = "";
  propsCreateForm.value.category_code = "";
  propsCreateForm.value.category_picture_id = 0;
  propsCreateForm.value.deep = 1;
  propsCreateForm.value.parent_id = 0;
  propsCreateForm.value.rate = 0;
  propsCreateForm.value.note = "";
  propsCreateForm.value.sort = 100;
};

//初始化更新表单传值
const initPropsUpdateForm = () => {
  propsUpdateForm.value.id = 0;
  propsUpdateForm.value.category_name = "";
  propsUpdateForm.value.category_code = "";
  propsUpdateForm.value.category_picture_id = 0;
  propsUpdateForm.value.deep = 1;
  propsUpdateForm.value.parent_id = 0;
  propsUpdateForm.value.rate = 0;
  propsUpdateForm.value.note = "";
  propsUpdateForm.value.sort = 100;
};
//初始化查看详情
const initPropsRowData = () => {
  propsRowData.value.id = 0;
  propsRowData.value.parent_id = 0;
  propsRowData.value.deep = 1;
  propsRowData.value.category_name = "";
  propsRowData.value.category_code = "";
  propsRowData.value.category_picture_id = 0;
  propsRowData.value.rate = 0;
  propsRowData.value.children = [];
  propsRowData.value.sort = 100;
  propsRowData.value.picture = "";
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
  getTreeCategory();
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
