<!--
 * @Descripttion: 
 * @version: v1
 * @Author: youhujun 2900976495@qq.com
 * @Date: 2025-09-29 09:25:38
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-12-10 04:21:55
 * @FilePath: d:\wwwroot\Open\Vue\vue3-element-admin-youhujun\src\pages\laravel-fast-api\v1\system\system\otherPlatform\douyin\index.vue
 * Copyright (C) 2025 youhujun. All rights reserved.
-->
<template>
  <div>
    <!-- 页面内容开始 -->
    <YhCard>
      <template #cardTitle>抖音配置</template>
      <template #cardNotice>
        <el-tag size="small" type="danger" effect="plain">抖音配置微信小程序,小游戏</el-tag>
      </template>
      <template #cardButton>
        <el-row type="flex" :gutter="20">
          <el-col :span="24">
            <el-button
              v-has-role="['develop', 'super']"
              style="float: right"
              type="primary"
              round
              @click="handleAddSystemDouyinConfig()"
            >
              添加抖音配置
            </el-button>
          </el-col>
        </el-row>
      </template>
      <template #cardContent>
        <!-- 表格布局开始 -->
        <YhTableLayout>
          <!-- 搜索区开始 -->
          <template #search>
            <!-- <el-tag type="success">搜索区</el-tag> -->
            <el-divider content-position="left">搜索</el-divider>
            <SystemDouyinConfigSearch
              @update:handle-change-search="toSearch"
            ></SystemDouyinConfigSearch>
          </template>
          <!-- 搜索区结束 -->
          <!-- 批量操作区开始 -->
          <template #batch>
            <el-divider content-position="left">批量操作</el-divider>
            <el-row type="flex" justify="space-around">
              <el-col :span="12" class="btn-action">
                <el-button type="primary" @click="handleReverse()">反选</el-button>
              </el-col>
              <el-col :span="12" class="btn-action">
                <el-button type="danger" @click="handleMultipleDelete()">删除</el-button>
              </el-col>
            </el-row>
          </template>
          <!-- 批量操作区结束-->
          <!-- 表格区开始 -->
          <template #table>
            <el-divider content-position="left">列表</el-divider>
            <SystemDouyinConfigTableList
              v-model:data-list="dataList"
              v-model:dialog-visible="dialogVisible"
              v-model:dialog-title="dialogTitle"
              v-model:dialog-type="dialogType"
              v-model:before-system-douyin-config-form="beforeSystemDouyinConfigForm"
              :loading="loading"
              :reverse-select="reverseSelect"
              :multiple-delete="multipleDelete"
              :multiple-disable="multipleDisable"
              @update:hanlde-update-data="toUpdateData"
            />
          </template>
          <!-- 表格区结束 -->
          <!-- 分页区开始 -->
          <template #paginate>
            <div>
              <YhPaginate
                v-model:current-page="currentPage"
                v-model:page-size="pageSize"
                v-model:total="total"
                :page-sizes="[5, 10, 20, 30, 40, 50, 100]"
              />
            </div>
          </template>
          <!-- 分页区结束 -->
        </YhTableLayout>
        <!-- 表格布局结束-->
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
        <CreateSystemDouyinConfigForm
          ref="createFormRef"
          @close-dialog="listenToCloseDialog"
        ></CreateSystemDouyinConfigForm>
      </template>
      <!-- 修改表单 -->
      <template #updateForm>
        <UpdateSystemDouyinConfigForm
          ref="updateFormRef"
          :props-update-form="propsUpdateForm"
          @close-dialog="listenToCloseDialog"
        ></UpdateSystemDouyinConfigForm>
      </template>
    </YhDialog>
    <!-- 弹窗内容结束 -->
  </div>
</template>

<script setup lang="ts">
// 公共级组件
import YhCard from "@/pages/laravel-fast-api/v1/components/element/Card/index.vue";
import YhDialog from "@/pages/laravel-fast-api/v1/components/element/Dialog/index.vue";
import YhTableLayout from "@/pages/laravel-fast-api/v1/components/element/Table/Layout/index.vue";
import YhPaginate from "@/pages/laravel-fast-api/v1/components/element/Paginate/index.vue";
//页面级组件
import SystemDouyinConfigSearch from "./components/SystemDouyinConfigSearch.vue";
import SystemDouyinConfigTableList from "./components/SystemDouyinConfigTableList.vue";
import CreateSystemDouyinConfigForm from "./components/CreateSystemDouyinConfigForm.vue";
import UpdateSystemDouyinConfigForm from "./components/UpdateSystemDouyinConfigForm.vue";
//store
import { useUserStore } from "@/store";
//业务接口
import SystemDouyinConfigAPi from "@/api/laravel-fast-api/v1/system/system/otherPlatform/douyin/system-douyin-config-api";
import type {
  UpdateSystemDouyinConfig,
  SystemDouyinConfigItem,
} from "@/api/laravel-fast-api/v1/system/system/otherPlatform/douyin/system-douyin-config-type";

//store
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

//搜索查询条件
const where = ref({
  //查找内容
  find: "",
  //查找下标
  findSelectIndex: 0,
  //时间范围
  timeRange: [],
  //是否禁用
  switch: null,
  //排序方式
  sortType: 2,
  // 0 不导出 1导出
  isExport: 0,
  // 导出类型 1本页 2全部
  exportType: 1,
  // 分页
  currentPage: 1,
  //每页条数
  pageSize: 10,
  //数据总数
  total: 0,
});

//思路是加1,在子组件监听变化来触发
//标记反选
const reverseSelect = ref(0);
//标记批量删除
const multipleDelete = ref(0);
//标记批量禁用
const multipleDisable = ref(0);

//数据列表容器
const dataList = ref([]);

//修改用户的容器
const beforeSystemDouyinConfigForm = ref<SystemDouyinConfigItem>({
  id: 0,
  name: "",
  type: 30,
  appid: "",
  appsecret: "",
  note: "",
  created_at: "",
  sort: 100,
});

//监听beforeSystemDouyinConfigForm的变化
watch(
  () => beforeSystemDouyinConfigForm.value,
  (newValue) => {
    //console.log('当前表单', newValue)
    //console.log('之前表单', oldValue)
    if (newValue) {
      Object.assign(propsUpdateForm.value, newValue);
    }
  }
);

//将分页处理定义为计算属性
//当前页
const currentPage = computed({
  get() {
    return where.value.currentPage;
  },
  set(newValue) {
    where.value.currentPage = newValue;
  },
});
//页面条数
const pageSize = computed({
  get() {
    return where.value.pageSize;
  },
  set(newValue) {
    where.value.pageSize = newValue;
  },
});
//计算总数
const total = computed({
  get() {
    return where.value.total;
  },
  set(newValue) {
    where.value.total = newValue;
  },
});

//侦听分页变化
watch([currentPage, pageSize], () => {
  loading.value = true;
  getSystemDouyinConfigList();
});

//修改表单
const propsUpdateForm = ref<UpdateSystemDouyinConfig>({
  id: 0,
  name: "",
  type: 10,
  appid: "",
  appsecret: "",
  note: "",
  sort: 100,
});

//初始化分页条件
const initPageWhere = () => {
  where.value.isExport = 0;
  where.value.exportType = 1;
  where.value.currentPage = 1;
  where.value.pageSize = 10;
};

//初始化导出
const initExport = () => {
  where.value.isExport = 0;
  where.value.exportType = 1;
};

//获取列表
const getSystemDouyinConfigList = async () => {
  const result = await SystemDouyinConfigAPi.getSystemDouyinConfig(where.value);
  const { data, meta } = result;
  dataList.value = data;
  where.value.total = meta.total;
  where.value.currentPage = meta.current_page;
  where.value.pageSize = meta.per_page;
  setTimeout(() => {
    loading.value = false;
  }, 500);
};

//反选
const handleReverse = () => {
  reverseSelect.value = reverseSelect.value + 1;
};

//批量删除
const handleMultipleDelete = () => {
  multipleDelete.value = multipleDelete.value + 1;
};

//添加
const handleAddSystemDouyinConfig = () => {
  dialogTitle.value = "添加抖音配置";
  dialogType.value = 10;
  dialogVisible.value = true;
};

//监听搜索
const toSearch = (param: any) => {
  //console.log(param)
  initPageWhere();
  initExport();
  Object.assign(where.value, param);
  loading.value = true;
  getSystemDouyinConfigList();
};

//监听更新数据
const toUpdateData = () => {
  loading.value = true;
  //重新获取用户列表
  getSystemDouyinConfigList();
};

//监听关闭弹窗
const listenToCloseDialog = () => {
  loading.value = true;
  //重新获取用户列表
  getSystemDouyinConfigList();
  //初始化修改表单
  initPropsUpdateForm();
  //初始化查看详情
  //initPropsRowData()
  dialogVisible.value = false;
};

//初始化更新表单
const initPropsUpdateForm = () => {
  propsUpdateForm.value = {
    id: 0,
    name: "",
    type: 10,
    appid: "",
    appsecret: "",
    note: "",
    sort: 100,
  };
};

//页面加载
onMounted(() => {
  //监听用户角色
  unwatchRole = userStore.watchRoles();
  getSystemDouyinConfigList();
});

//组件卸载
onUnmounted(() => {
  // 组件卸载时停止监听，防止内存泄漏
  if (unwatchRole) {
    unwatchRole();
  }
});
</script>
<style scoped></style>
