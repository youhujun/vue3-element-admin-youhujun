<!--
 * @Descripttion: 
 * @version: v1
 * @Author: youhujun 2900976495@qq.com
 * @Date: 2025-09-29 09:25:38
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-12-10 04:56:37
 * @FilePath: d:\wwwroot\Open\Vue\vue3-element-admin-youhujun\src\pages\laravel-fast-api\v1\user\admin\adminList\index.vue
 * Copyright (C) 2025 youhujun. All rights reserved.
-->
<template>
  <div>
    <!-- 页面内容开始 -->
    <YhCard>
      <template #cardTitle>管理员管理</template>
      <template #cardNotice>
        <el-tag size="small" type="danger" effect="plain">
          管理员从用户中添加,编辑角色时必须要添加用户角色
        </el-tag>
      </template>
      <template #cardButton>
        <el-row type="flex" :gutter="20">
          <el-col :span="24">
            <el-button
              v-has-role="['develop', 'super']"
              style="float: right"
              type="primary"
              round
              @click="handleAddAdmin()"
            >
              添加管理员
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
            <AdminSearch @update:handle-change-search="toSearch"></AdminSearch>
          </template>
          <!-- 搜索区结束 -->
          <!-- 批量操作区开始 -->
          <template #batch>
            <el-divider content-position="left">批量操作</el-divider>
            <el-row type="flex" justify="space-around">
              <el-col :span="8" class="btn-action">
                <el-button type="primary" @click="handleReverse()">反选</el-button>
              </el-col>
              <el-col :span="8" class="btn-action">
                <el-button type="danger" @click="handleMultipleDelete()">删除</el-button>
              </el-col>
              <el-col :span="8" class="btn-action">
                <el-button type="warning" @click="handleMultipleDisable()">禁用</el-button>
              </el-col>
            </el-row>
          </template>
          <!-- 批量操作区结束-->
          <!-- 表格区开始 -->
          <template #table>
            <el-divider content-position="left">列表</el-divider>
            <AdminTableList
              v-model:data-list="dataList"
              v-model:dialog-visible="dialogVisible"
              v-model:dialog-title="dialogTitle"
              v-model:dialog-type="dialogType"
              v-model:before-admin-form="beforeAdminForm"
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
        <CreateAdminForm
          ref="createFormRef"
          @update:close-dialog="listenToCloseDialog"
        ></CreateAdminForm>
      </template>
      <!-- 修改表单 -->
      <template #updateForm>
        <UpdateAdminForm
          ref="updateFormRef"
          :props-update-form="propsUpdateForm"
          @update:close-dialog="listenToCloseDialog"
        ></UpdateAdminForm>
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
import AdminSearch from "./components/AdminSearch.vue";
import AdminTableList from "./components/AdminTableList.vue";
import CreateAdminForm from "./components/CreateAdminForm.vue";
import UpdateAdminForm from "./components/UpdateAdminForm.vue";
//store
import { useUserStore } from "@/store";
//业务接口
import AdminAPI from "@/api/laravel-fast-api/v1/user/admin/admin-api";
import type { UpdateAdmin, AdminListItem } from "@/api/laravel-fast-api/v1/user/admin/admin-type";

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
const beforeAdminForm = ref<AdminListItem>({
  id: 0,
  user_id: 0,
  switch: 0,
  account_name: "",
  phone: "",
  created_at: "",
  nick_name: "",
  real_name: "",
  solar_birthday_at: "",
  chinese_birthday_at: "",
  sex: 0,
  id_number: "",
  introduction: "",
  avatar: "",
  role: [],
  role_id: [],
});

//监听beforeAdminForm的变化
watch(
  () => beforeAdminForm.value,
  (newValue) => {
    //console.log('当前表单', newValue)
    //console.log('之前表单', oldValue)
    if (newValue) {
      //Object.assign(propsUpdateForm.value,newValue)
      propsUpdateForm.value.id = newValue.id;
      propsUpdateForm.value.phone = newValue.phone;
      propsUpdateForm.value.roleIdArray = [];
      if (newValue.role_id && newValue.role_id.length) {
        const role_id: number[][] = [];
        const roleArray: number[] = [];
        // 确保循环的是数组类型
        const roleList = Array.isArray(newValue.role_id) ? newValue.role_id : [];
        for (const item of roleList) {
          let array: number[];
          if (typeof item === "string") {
            try {
              array = JSON.parse(item);
              // 验证解析结果是否为数组
              if (!Array.isArray(array)) throw new Error("不是数组");
            } catch {
              array = [];
            }
          } else if (Array.isArray(item)) {
            array = item;
          } else {
            array = [];
          }
          role_id.push(array);
          roleArray.push(array[array.length - 1] || 0); // 避免空数组导致的问题
        }
        propsUpdateForm.value.role = role_id;
        propsUpdateForm.value.roleIdArray = roleArray;
      }
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
  getAdminList();
});

//修改表单
const propsUpdateForm = ref<UpdateAdmin>({
  id: 0,
  roleIdArray: [],
  role: [],
  phone: "",
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
const getAdminList = async () => {
  const result = await AdminAPI.getAdmin(where.value);
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

//批量禁用
const handleMultipleDisable = () => {
  multipleDisable.value = multipleDisable.value + 1;
};

//添加
const handleAddAdmin = () => {
  dialogTitle.value = "添加管理员";
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
  getAdminList();
};

//监听更新数据
const toUpdateData = () => {
  loading.value = true;
  //重新获取用户列表
  getAdminList();
};

//监听关闭弹窗
const listenToCloseDialog = () => {
  loading.value = true;
  //重新获取用户列表
  getAdminList();
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
    roleIdArray: [],
    role: [],
    phone: "",
  };
};

//页面加载
onMounted(() => {
  //监听用户角色
  unwatchRole = userStore.watchRoles();
  getAdminList();
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
