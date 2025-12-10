<!--
 * @Descripttion: 
 * @version: v1
 * @Author: youhujun 2900976495@qq.com
 * @Date: 2025-09-29 09:25:38
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-12-10 03:58:41
 * @FilePath: d:\wwwroot\Open\Vue\vue3-element-admin-youhujun\src\pages\laravel-fast-api\v1\log\event\adminEvent\index.vue
 * Copyright (C) 2025 youhujun. All rights reserved.
-->
<template>
  <div>
    <!-- 页面内容开始 -->
    <YhCard>
      <template #cardTitle>后台事件日志</template>
      <template #cardNotice>
        <el-tag size="small" type="danger" effect="plain">提示消息</el-tag>
      </template>
      <template #cardContent>
        <!-- 表格布局开始 -->
        <YhTableLayout>
          <!-- 搜索区开始 -->
          <template #search>
            <!-- <el-tag type="success">搜索区</el-tag> -->
            <el-divider content-position="left">搜索</el-divider>
            <AdminEventSearch @update:handle-change-search="toSearch"></AdminEventSearch>
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
                <el-button
                  v-has-role="['develop', 'super']"
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
            <AdminEventTableList
              v-model:data-list="dataList"
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
  </div>
</template>

<script setup lang="ts">
// 公共级组件
import YhCard from "@/pages/laravel-fast-api/v1/components/element/Card/index.vue";
import YhTableLayout from "@/pages/laravel-fast-api/v1/components/element/Table/Layout/index.vue";
import YhPaginate from "@/pages/laravel-fast-api/v1/components/element/Paginate/index.vue";
//页面级组件
import AdminEventSearch from "./components/AdminEventSearch.vue";
import AdminEventTableList from "./components/AdminEventTableList.vue";

//store
import { useUserStore } from "@/store";
//api和type
import AdminEventAPI from "@/api/laravel-fast-api/v1/log/event/admin/admin-event-log-api";

//store
const userStore = useUserStore();

let unwatchRole: (() => void) | null = null;
//初始化加载样式
const loading = ref(true);

//搜索查询条件
const where = ref({
  //管理员id
  admin_id: 0,
  // 事件类型
  eventType: 0,
  //时间范围
  timeRange: [],
  //排序方式
  sortType: 2,
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
  getAdminEventList();
});

//初始化分页条件
const initPageWhere = () => {
  where.value.currentPage = 1;
  where.value.pageSize = 10;
  where.value.admin_id = 0;
  where.value.eventType = 0;
};

//获取列表
const getAdminEventList = async () => {
  const result = await AdminEventAPI.getAdminEventLog(where.value);
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

//监听搜索
const toSearch = (param: any) => {
  //console.log(param)
  initPageWhere();
  Object.assign(where.value, param);
  loading.value = true;
  getAdminEventList();
};

//监听更新数据
const toUpdateData = () => {
  loading.value = true;
  //重新获取用户列表
  getAdminEventList();
};

//页面加载
onMounted(() => {
  //监听用户角色
  unwatchRole = userStore.watchRoles();
  getAdminEventList();
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
