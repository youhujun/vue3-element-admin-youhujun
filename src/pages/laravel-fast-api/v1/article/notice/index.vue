<!--
 * @Descripttion: 
 * @version: v1
 * @Author: youhujun 2900976495@qq.com
 * @Date: 2025-09-29 09:25:38
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-12-10 04:39:04
 * @FilePath: d:\wwwroot\Open\Vue\vue3-element-admin-youhujun\src\pages\laravel-fast-api\v1\article\notice\index.vue
 * Copyright (C) 2025 youhujun. All rights reserved.
-->
<template>
  <div>
    <!-- 页面内容开始 -->
    <YhCard>
      <template #cardTitle>公告管理</template>
      <template #cardNotice>
        <el-tag size="small" type="danger" effect="plain">
          提示:公告可以提前编辑,设置好发布时间,可以自动发布
        </el-tag>
      </template>
      <template #cardButton>
        <el-row type="flex" :gutter="20">
          <el-col :span="12"></el-col>
          <el-col :span="12">
            <el-button
              v-has-role="['develop', 'super']"
              style="float: right"
              type="primary"
              round
              @click="handleAddArticle()"
            >
              添加公告
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
            <NoticeSearch @update:handle-change-search="toSearch"></NoticeSearch>
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
            <NoticeTableList
              v-model:data-list="dataList"
              v-model:dialog-visible="dialogVisible"
              v-model:dialog-title="dialogTitle"
              v-model:dialog-type="dialogType"
              v-model:before-article-form="beforeArticleForm"
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
        <CreateNoticeForm
          ref="createFormRef"
          @close-dialog="listenToCloseDialog"
        ></CreateNoticeForm>
      </template>
      <!-- 修改表单 -->
      <template #updateForm>
        <UpdateNoticeForm
          ref="updateFormRef"
          :props-update-form="propsUpdateForm"
          @close-dialog="listenToCloseDialog"
        ></UpdateNoticeForm>
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
import NoticeSearch from "./components/NoticeSearch.vue";
import NoticeTableList from "./components/NoticeTableList.vue";
import CreateNoticeForm from "./components/CreateNoticeForm.vue";
import UpdateNoticeForm from "./components/UpdateNoticeForm.vue";
//业务接口
import ArticleAPi from "@/api/laravel-fast-api/v1/article/article-api";
import type { UpdateArticle } from "@/api/laravel-fast-api/v1/article/article-type";

//初始化加载样式
const loading = ref(false);
//是否开启弹窗
const dialogVisible = ref(false);
//弹窗标题
const dialogTitle = ref("");
//弹窗类型 10添加 20修改 30内容
const dialogType = ref(10);
//弹窗宽度
const dialogWidth = ref("92%");

//搜索查询条件
const where = ref({
  //查找内容
  find: "",
  //查找下标
  findSelectIndex: 0,
  //是否置顶
  is_top: null,
  //发布状态
  status: null,
  //发布时间
  timeRangePublis: [],
  //创建时间
  timeRangeCreat: [],
  //文章分类
  categoryArray: [],
  //标签分类
  labelArray: [],
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
const beforeArticleForm = ref({
  id: 0,
  admin_id: 0,
  user_id: 0,
  title: "",
  status: 0,
  type: 10,
  is_top: 0,
  check_status: 0,
  published_at: "",
  checked_at: "",
  created_at: "",
  updated_at: "",
  category_id: [],
  label_id: [],
  sort: 100,
  admin_account_name: "",
  admin_phone: "",
  admin_nick_name: "",
  category: [],
  label: [],
  content: "",
});

//监听beforeArticleForm的变化
watch(
  () => beforeArticleForm.value,
  (newValue) => {
    //console.log('当前表单', newValue)
    //console.log('之前表单', oldValue)
    if (newValue) {
      //Object.assign(propsUpdateForm.value,newValue)
      propsUpdateForm.value.id = newValue.id;
      propsUpdateForm.value.type = newValue.type;
      propsUpdateForm.value.title = newValue.title;

      if (newValue.category_id && newValue.category_id.length) {
        const category_id: number[][] = [];
        const categoryArray: number[] = [];
        // 确保循环的是数组类型
        const categoryList = Array.isArray(newValue.category_id) ? newValue.category_id : [];
        for (const item of categoryList) {
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
          category_id.push(array);
          categoryArray.push(array[array.length - 1] || 0); // 避免空数组导致的问题
        }
        propsUpdateForm.value.category_id = category_id;
        propsUpdateForm.value.categoryArray = categoryArray;
      }

      if (newValue.label_id && newValue.label_id.length) {
        const label_id: number[][] = [];
        const labelArray: number[] = [];
        const labelList = Array.isArray(newValue.label_id) ? newValue.label_id : [];
        for (const item of labelList) {
          let array: number[];
          if (typeof item === "string") {
            try {
              array = JSON.parse(item);
              if (!Array.isArray(array)) throw new Error("不是数组");
            } catch {
              array = [];
            }
          } else if (Array.isArray(item)) {
            array = item;
          } else {
            array = [];
          }
          label_id.push(array);
          labelArray.push(array[array.length - 1] || 0);
        }
        propsUpdateForm.value.label_id = label_id;
        propsUpdateForm.value.labelArray = labelArray;
      }
      propsUpdateForm.value.is_top = newValue.is_top;
      propsUpdateForm.value.content = newValue.content;
      propsUpdateForm.value.published_time = newValue.published_at;
      propsUpdateForm.value.sort = newValue.sort;
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
  getArticleList();
});

//修改表单
const propsUpdateForm = ref<UpdateArticle>({
  id: 0,
  type: 10,
  title: "",
  category_id: [],
  categoryArray: [],
  label_id: [],
  labelArray: [],
  is_top: 0,
  content: "",
  published_time: "",
  sort: 100,
});

//页面加载
onMounted(() => {
  getArticleList();
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
const getArticleList = async () => {
  loading.value = false;
  const result = await ArticleAPi.getArticle(where.value);
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
const handleAddArticle = () => {
  dialogTitle.value = "添加公告";
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
  getArticleList();
};

//监听更新数据
const toUpdateData = () => {
  loading.value = true;
  //重新获取用户列表
  getArticleList();
};

//监听关闭弹窗
const listenToCloseDialog = () => {
  loading.value = true;
  //重新获取公告列表
  getArticleList();
  //初始化修改表单
  initPropsUpdateForm();
  dialogVisible.value = false;
};

//初始化更新表单
const initPropsUpdateForm = () => {
  propsUpdateForm.value = {
    id: 0,
    type: 10,
    title: "",
    category_id: [],
    categoryArray: [],
    label_id: [],
    labelArray: [],
    is_top: 0,
    content: "",
    published_time: "",
    sort: 100,
  };
};
</script>
<style scoped></style>
