<!--
 * @Descripttion: 
 * @version: v1
 * @Author: youhujun 2900976495@qq.com
 * @Date: 2025-09-29 09:25:38
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-12-10 03:32:50
 * @FilePath: d:\wwwroot\Open\Vue\vue3-element-admin-youhujun\src\pages\laravel-fast-api\v1\system\system\systemConfig\index.vue
 * Copyright (C) 2025 youhujun. All rights reserved.
-->
<template>
  <div>
    <!-- 页面内容开始 -->
    <YhCard>
      <template #cardTitle>配置参数</template>
      <template #cardNotice>
        <el-tag size="small" type="danger" effect="plain">
          该配置涉及到代码运行,不了解请勿操作
        </el-tag>
      </template>
      <template #cardButton>
        <el-row type="flex" :gutter="20">
          <el-col :span="12">
            <!-- <el-button style="float: right; " type="success" round v-has-role="['develop','super']" @click="">下载导入模板</el-button>  -->
          </el-col>
          <el-col :span="12">
            <el-button
              v-has-role="['develop', 'super', 'config_admin']"
              style="float: right"
              type="primary"
              round
              @click="handleAddSystemConfig()"
            >
              添加
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
            <SystemConfigSearch @update:handle-change-search="toSearch"></SystemConfigSearch>
          </template>
          <!-- 搜索区结束 -->
          <!-- 批量操作区开始 -->
          <template #batch>
            <el-divider content-position="left">批量操作</el-divider>
            <el-row type="flex" justify="space-around">
              <el-col :span="12" class="btn-action">
                <el-button
                  v-has-role="['develop', 'super', 'config_admin']"
                  type="primary"
                  @click="handleReverse()"
                >
                  反选
                </el-button>
              </el-col>
              <el-col :span="12" class="btn-action">
                <el-button
                  v-has-role="['develop', 'super', 'config_admin']"
                  type="danger"
                  @click="handleMultipleDelete()"
                >
                  删除
                </el-button>
              </el-col>
            </el-row>
          </template>
          <!-- 批量操作区结束-->
          <!-- 表格区开始 -->
          <template #table>
            <el-divider content-position="left">列表</el-divider>
            <SystemConfigTableList
              v-model:data-list="dataList"
              v-model:dialog-visible="dialogVisible"
              v-model:dialog-title="dialogTitle"
              v-model:dialog-type="dialogType"
              v-model:before-system-config-form="beforeSystemConfigForm"
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
        <CreateSystemConfigForm
          ref="createFormRef"
          :props-create-form="propsCreateForm"
          @update:close-dialog="listenToCloseDialog"
        ></CreateSystemConfigForm>
      </template>
      <!-- 修改表单 -->
      <template #updateForm>
        <UpdateSystemConfigForm
          ref="updateFormRef"
          :props-update-form="propsUpdateForm"
          @update:close-dialog="listenToCloseDialog"
        ></UpdateSystemConfigForm>
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
// import YhUploadFile from '@/pages/laravel-fast-api/v1/components/element/Upload/UploadFile/index.vue'
//页面级组件
import SystemConfigSearch from "./components/SystemConfigSearch.vue";
import SystemConfigTableList from "./components/SystemConfigTableList.vue";
import CreateSystemConfigForm from "./components/CreateSystemConfigForm.vue";
import UpdateSystemConfigForm from "./components/UpdateSystemConfigForm.vue";
//业务接口
import SystemConfigAPi from "@/api/laravel-fast-api/v1/system/system/config/system-config-api";
import { ItemType } from "@/api/laravel-fast-api/v1/system/system/config/system-config-enum";
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
const beforeSystemConfigForm = ref({
  id: 0,
  item_type: ItemType.string,
  item_label: "",
  item_name: "",
  item_price: 0,
  item_value: "",
  item_path: "",
  item_introduction: "",
  sort: 100,
  created_at: "",
  updated_at: "",
});

//监听beforeSystemConfigForm的变化
watch(
  () => beforeSystemConfigForm.value,
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
watch([currentPage, pageSize], ([newPage, newSize]) => {
  // 处理分页逻辑
  if (newPage) {
    //console.log(newPage)
    currentPage.value = newPage;
  }
  if (newSize) {
    //console.log(newSize)
    pageSize.value = newSize;
  }
  getSystemConfigList();
});
//

//创建表单
const propsCreateForm = ref({
  item_type: ItemType.string,
  item_label: "",
  item_name: "",
  item_price: 0,
  item_value: "",
  item_path: "",
  item_introduction: "",
  sort: 100,
});

//修改表单
const propsUpdateForm = ref({
  id: 0,
  item_type: ItemType.string,
  item_label: "",
  item_name: "",
  item_price: 0,
  item_value: "",
  item_path: "",
  item_introduction: "",
  sort: 100,
});

//页面加载
onMounted(() => {
  getSystemConfigList();
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
const getSystemConfigList = async () => {
  const result = await SystemConfigAPi.getSystemConfig(where.value);
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
const handleAddSystemConfig = () => {
  dialogTitle.value = "添加系统配置";
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
  getSystemConfigList();
};

//监听更新数据
const toUpdateData = () => {
  loading.value = true;
  //重新获取用户列表
  getSystemConfigList();
};

//监听关闭弹窗
const listenToCloseDialog = () => {
  loading.value = true;
  //重新获取用户列表
  getSystemConfigList();
  //初始化表单
  initPropsCreateForm();
  //初始化修改表单
  initPropsUpdateForm();
  //初始化查看详情
  //initPropsRowData()
  dialogVisible.value = false;
};

//初始化表单
const initPropsCreateForm = () => {
  propsCreateForm.value = {
    item_type: ItemType.string,
    item_label: "",
    item_name: "",
    item_price: 0,
    item_value: "",
    item_path: "",
    item_introduction: "",
    sort: 100,
  };
};

//初始化更新表单
const initPropsUpdateForm = () => {
  propsUpdateForm.value = {
    id: 0,
    item_type: ItemType.string,
    item_label: "",
    item_name: "",
    item_price: 0,
    item_value: "",
    item_path: "",
    item_introduction: "",
    sort: 100,
  };
};
</script>
<style scoped></style>
