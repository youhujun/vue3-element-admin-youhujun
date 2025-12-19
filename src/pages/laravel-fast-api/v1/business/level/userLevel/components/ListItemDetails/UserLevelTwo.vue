<!--
 * @Descripttion: 
 * @version: v1
 * @Author: youhujun youhu8888@163.com
 * @Date: 2025-10-24 09:12:11
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-12-10 04:12:53
 * @FilePath: d:\wwwroot\Open\Vue\vue3-element-admin-youhujun\src\pages\laravel-fast-api\v1\business\level\userLevel\components\ListItemDetails\UserLevelTwo.vue
 * Copyright (C) 2025 youhujun. All rights reserved.
-->
<template>
  <div :key="componentKey">
    <el-button type="primary" size="small" plain style="margin-bottom: 10px" @click="handleAdd()">
      添加配置项
    </el-button>
    <el-row v-for="(item, index) in levelItemList" :key="index" class="row-one" :gutter="10">
      <el-tag style="margin-right: 1rem" type="info">级别配置项名称</el-tag>
      <el-tag style="margin-right: 1rem" type="primary">
        {{ item.item_name ? item.item_name : "暂无" }}
      </el-tag>
      <el-tag style="margin-right: 1rem" type="info">级别配置项编码</el-tag>
      <el-tag style="margin-right: 1rem" type="primary">
        {{ item.item_code ? item.item_code : "暂无" }}
      </el-tag>
      <el-tag style="margin-right: 1rem" type="info">配置项值</el-tag>
      <el-tag style="margin-right: 1rem" type="primary">
        {{ String(item.value) ? item.value : "暂无" }}
      </el-tag>
      <el-tag style="margin-right: 1rem" type="info">配置项与值之间的关系</el-tag>
      <el-tag style="margin-right: 1rem" type="primary">
        {{ getValueTypeLabel(item.value_type) }}
      </el-tag>
      <el-button
        type="warning"
        size="small"
        plain
        style="margin-left: 20px"
        @click="handleUpdate(item)"
      >
        编辑
      </el-button>
      <el-button
        type="danger"
        size="small"
        plain
        @click="handleDelete(item.user_level_item_unon_id)"
      >
        删除
      </el-button>
    </el-row>
    <!-- 弹窗内容开始 -->
    <YhDialog
      v-model="dialogVisible"
      :dialog-width="dialogWidth"
      :dialog-title="dialogTitle"
      :dialog-type="dialogType"
    >
      <!-- 添加表单 -->
      <template #addForm>
        <CreateUserLevelItemForm
          ref="createFormRef"
          :user-level-id="rowData.id"
          @close-dialog="listenToCloseDialog"
        ></CreateUserLevelItemForm>
      </template>
      <!-- 修改表单 -->
      <template #updateForm>
        <UpdateUserLevelItemForm
          ref="updateFormRef"
          :user-level-id="rowData.id"
          :props-update-form="propsUpdateForm"
          @close-dialog="listenToCloseDialog"
        ></UpdateUserLevelItemForm>
      </template>
    </YhDialog>
    <!-- 弹窗内容结束 -->
  </div>
</template>
<script setup lang="ts">
//公共组件
import YhDialog from "@/pages/laravel-fast-api/v1/components/element/Dialog/index.vue";
import CreateUserLevelItemForm from "./components/CreateUserLevelItemForm.vue";
import UpdateUserLevelItemForm from "./components/UpdateUserLevelItemForm.vue";
//api和type
import type {
  UserLevelListItem,
  LevelItem,
} from "@/api/laravel-fast-api/v1/business/level/userLevel/user-level-type";
import UserLevelItemUnionAPI from "@/api/laravel-fast-api/v1/business/level/userLevel/union/user-level-item-union-api";
import type { UpdateUserLevelItemUnion } from "@/api/laravel-fast-api/v1/business/level/userLevel/union/user-level-item-union-type";
//引入bus
import bus from "@/utils/eventBus";
//定义组件名称
defineOptions({
  name: "UserLevelTwo",
});
//定义props
const { rowData } = withDefaults(
  defineProps<{
    rowData?: UserLevelListItem;
  }>(),
  {
    rowData: () => ({
      id: 1,
      sort: 100,
      created_at: "",
      updated_at: "",
      switch: 1,
      level_name: "",
      level_code: "",
      amount: "0.00",
      background_id: 0,
      note: "",
      background: "",
      level_item: [
        {
          user_level_item_unon_id: 1,
          level_item_id: 0,
          item_name: "",
          item_code: "",
          description: "",
          value_type: 40,
          value: "",
        },
      ],
    }),
  }
);
//定义级别配置项数组容器
const levelItemList = ref<LevelItem[]>([]);
// 定义一个用于触发重新渲染的key
const componentKey = ref(0);

//是否开启弹窗
const dialogVisible = ref(false);
//弹窗标题
const dialogTitle = ref("");
//弹窗类型 10添加 20修改 30内容
const dialogType = ref(10);
//弹窗宽度
const dialogWidth = ref("65%");
//修改表单
const propsUpdateForm = ref<UpdateUserLevelItemUnion>({
  id: 0,
  sort: 100,
  user_level_id: 1,
  level_item_id: 1,
  value: 0,
  value_type: 0,
});

// 定义valueTypeOptions
const valueTypeOptions = [
  { value: 10, label: "=" },
  { value: 20, label: ">" },
  { value: 30, label: "<" },
  { value: 40, label: ">=" },
  { value: 50, label: "<=" },
];

// 计算属性：根据value_type值获取对应的label
const getValueTypeLabel = (valueType: number | string) => {
  const option = valueTypeOptions.find((item) => item.value === valueType);
  return option ? option.label : "暂无";
};

//监听级别配置项
watch(
  () => rowData.level_item,
  (newVal) => {
    // 当新值存在且长度大于0时赋值
    if (newVal && newVal.length > 0) {
      levelItemList.value = newVal;
    }
  },
  {
    // 初始时立即执行一次监听回调
    immediate: true,
  }
);

//添加系统配置项
const handleAdd = () => {
  dialogTitle.value = "添加系统配置项";
  dialogType.value = 10;
  dialogVisible.value = true;
};

//更新系统配置项
const handleUpdate = (param: LevelItem) => {
  propsUpdateForm.value.id = param.user_level_item_unon_id;
  propsUpdateForm.value.user_level_id = rowData.id;
  propsUpdateForm.value.level_item_id = param.level_item_id;
  propsUpdateForm.value.value = param.value;
  propsUpdateForm.value.value_type = param.value_type;

  dialogTitle.value = "编辑系统配置项";
  dialogType.value = 20;
  dialogVisible.value = true;
};

//初始化更新表单
const initPropsUpdateForm = () => {
  propsUpdateForm.value = {
    id: 0,
    sort: 100,
    user_level_id: 1,
    level_item_id: 1,
    value: 0,
    value_type: 0,
  };
};

//定义删除
const handleDelete = async (id: number) => {
  const param = { id };

  const result = await UserLevelItemUnionAPI.deleteUserLevelItemUnion(param);

  ElMessage.success(result.msg);

  // 关键修复：本地立即移除已删除的数据，视图会同步更新
  levelItemList.value = levelItemList.value.filter((item) => item.user_level_item_unon_id !== id);

  // 重新加载用户级别列表
  bus.emit("reloadUserLevelList", true);

  componentKey.value++;
};

//监听关闭弹窗
const listenToCloseDialog = () => {
  //重新获取用户列表
  //getUserLevelList()
  //初始化修改表单
  initPropsUpdateForm();
  //初始化查看详情
  //initPropsRowData()
  dialogVisible.value = false;
};
</script>
<style lang="scss" scoped></style>
