<!--
 * @Descripttion: 
 * @version: v1
 * @Author: youhujun 2900976495@qq.com
 * @Date: 2025-09-29 09:25:38
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-12-10 04:49:11
 * @FilePath: d:\wwwroot\Open\Vue\vue3-element-admin-youhujun\src\pages\laravel-fast-api\v1\template\list\index.vue
 * Copyright (C) 2025 youhujun. All rights reserved.
-->
<template>
  <div>
    <!-- 页面内容开始 -->
    <YhCard>
      <template #cardTitle>替换列表</template>
      <template #cardNotice>
        <el-tag size="small" type="danger" effect="plain">提示消息</el-tag>
      </template>
      <template #cardButton>
        <el-row type="flex" :gutter="20">
          <el-col :span="12">
            <el-button
              v-has-role="['develop', 'super']"
              style="float: right"
              type="success"
              round
              @click="handleToDownload()"
            >
              下载导入模板
            </el-button>
          </el-col>
          <el-col :span="12">
            <el-button
              v-has-role="['develop', 'super']"
              style="float: right"
              type="primary"
              round
              @click="handleAddReplace()"
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
            <ReplaceSearch @update:handle-change-search="toSearch"></ReplaceSearch>
          </template>
          <!-- 搜索区结束 -->
          <!-- 批量操作区开始 -->
          <template #batch>
            <el-divider content-position="left">批量操作</el-divider>
            <el-row type="flex" justify="space-around">
              <el-col :span="6" class="btn-action">
                <el-button type="primary" @click="handleReverse()">反选</el-button>
              </el-col>
              <el-col :span="6" class="btn-action">
                <el-button type="danger" @click="handleMultipleDelete()">删除</el-button>
              </el-col>
              <el-col :span="6" class="btn-action">
                <el-button type="warning" @click="handleMultipleDisable()">禁用</el-button>
              </el-col>
              <el-col :span="6" class="btn-action">
                <el-button type="primary" @click="handleExport()">导出</el-button>
              </el-col>
              <!-- <el-col :span="6" class="btn-action">
												<YhUploadExcel
													file-name="file"
													action-url="uploadExcel"
													:upload-data="{type:'bank',use_type:20,save_path:'excel'}"
													accept=".xlsx,.xls"
													type="excel"
													@update:file-path="listenToUplaodFile"
												 />
											</el-col> -->
            </el-row>
          </template>
          <!-- 批量操作区结束-->
          <!-- 表格区开始 -->
          <template #table>
            <el-divider content-position="left">列表</el-divider>
            <ReplaceTableList
              v-model:data-list="dataList"
              v-model:dialog-visible="dialogVisible"
              v-model:dialog-title="dialogTitle"
              v-model:dialog-type="dialogType"
              v-model:before-replace-form="beforeReplaceForm"
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
        <CreateReplaceForm
          ref="createFormRef"
          @update:close-dialog="listenToCloseDialog"
        ></CreateReplaceForm>
      </template>
      <!-- 修改表单 -->
      <template #updateForm>
        <UpdateReplaceForm
          ref="updateFormRef"
          :props-update-form="propsUpdateForm"
          @update:close-dialog="listenToCloseDialog"
        ></UpdateReplaceForm>
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
// import YhUploadExcel from "@/pages/laravel-fast-api/v1/components/element/Upload/UploadFile/UploadExcel.vue";
//页面级组件
import ReplaceSearch from "./components/ReplaceSearch.vue";
import ReplaceTableList from "./components/ReplaceTableList.vue";
import CreateReplaceForm from "./components/CreateReplaceForm.vue";
import UpdateReplaceForm from "./components/UpdateReplaceForm.vue";
//store
import { useUserStore } from "@/store";
//业务接口
import ReplaceAPI from "@/api/laravel-fast-api/v1/replace/replace/replace-api";
import type {
  UpdateReplace,
  ReplaceItem,
} from "@/api/laravel-fast-api/v1/replace/replace/replace-type";
import DownloadAPI from "@/api/laravel-fast-api/v1/download/file/downlaod-file-api";

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
const beforeReplaceForm = ref<ReplaceItem>({
  id: 0,
  replace_name: "",
  replace_value: "",
  type: 10,
  replace_path: "",
  replace_url: "",
  category_id: [],
  categoryArray: [],
  time: "",
  note: "",
  sort: 100,
  created_at: "",
  updated_at: "",
});

//监听beforeReplaceForm的变化
watch(
  () => beforeReplaceForm.value,
  (newValue) => {
    //console.log('当前表单', newValue)
    //console.log('之前表单', oldValue)
    if (newValue) {
      Object.assign(propsUpdateForm.value, newValue);
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
  getReplaceList();
});

//修改表单
const propsUpdateForm = ref<UpdateReplace>({
  id: 0,
  replace_name: "",
  replace_value: "",
  type: 10,
  replace_path: "",
  replace_url: "",
  category_id: [],
  categoryArray: [],
  time: "",
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
const getReplaceList = async () => {
  const result = await ReplaceAPI.getReplace(where.value);
  const { data, meta } = result;
  dataList.value = data;
  where.value.total = meta.total;
  where.value.currentPage = meta.current_page;
  where.value.pageSize = meta.per_page;
  setTimeout(() => {
    loading.value = false;
  }, 500);
};

//下载导图模版
const handleToDownload = async () => {
  const result = await DownloadAPI.downloadBank();
  const { download } = result;
  window.location.href = download as string;
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

//导出
const handleExport = () => {
  where.value.isExport = 1;
  ElMessageBox.confirm("请选择导出本页数据或是全部导出?", "提示", {
    // confirmButtonText: 'Re-Login',
    confirmButtonText: "全部",
    // cancelButtonText: 'Cancel',
    cancelButtonText: "本页",
    type: "warning",
  })
    .then(async () => {
      where.value.exportType = 2;
      try {
        const result = await ReplaceAPI.getReplace(where.value);
        ElMessage.success(result.msg);
        window.location.href = result.download;
      } catch (error) {
        const err = error as Error;
        ElMessage.error(`导出失败：${err.message || "未知错误"}`);
      }
    })
    .catch(async (action) => {
      where.value.exportType = 1;
      if (action === "cancel") {
        try {
          const result = await ReplaceAPI.getReplace(where.value);
          ElMessage.success(result.msg);
          window.location.href = result.download;
        } catch (error) {
          const err = error as Error;
          ElMessage.error(`导出失败：${err.message || "未知错误"}`);
        }
      }
      if (action === "close") {
        where.value.isExport = 0;
      }

      return;
    });
};

//添加
const handleAddReplace = () => {
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
  getReplaceList();
};

//监听更新数据
const toUpdateData = () => {
  loading.value = true;
  //重新获取用户列表
  getReplaceList();
};

//监听关闭弹窗
const listenToCloseDialog = () => {
  loading.value = true;
  //重新获取用户列表
  getReplaceList();
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
    replace_name: "",
    replace_value: "",
    type: 10,
    replace_path: "",
    replace_url: "",
    category_id: [],
    categoryArray: [],
    time: "",
    note: "",
    sort: 100,
  };
};

//监听上传文件
// const listenToUplaodFile = (filePath: string) => {
//   loading.value = true;
//   //重新获取用户列表
//   getReplaceList();
//   //初始化修改表单
//   initPropsUpdateForm();
//   //初始化查看详情
//   //initPropsRowData()
//   dialogVisible.value = false;
// };

//页面加载
onMounted(() => {
  //监听用户角色
  unwatchRole = userStore.watchRoles();
  getReplaceList();
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
