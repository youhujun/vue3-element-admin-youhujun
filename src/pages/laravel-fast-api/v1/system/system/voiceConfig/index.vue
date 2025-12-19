<!--
 * @Descripttion: 
 * @version: v1
 * @Author: youhujun 2900976495@qq.com
 * @Date: 2025-09-29 09:25:38
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-11-19 11:52:47
 * @FilePath: \src\pages\laravel-fast-api\v1\system\system\voiceConfig\index.vue
 * Copyright (C) 2025 youhujun. All rights reserved.
-->
<template>
  <div>
    <!-- 页面内容开始 -->
    <YhCard>
      <template #cardTitle>提示音配置</template>
      <template #cardNotice>
        <el-tag size="small" type="danger" effect="plain">
          提示:该配置项是socket通信使用,由开发人员配置,如不清楚,请勿操作
        </el-tag>
      </template>
      <template #cardButton>
        <el-row type="flex" :gutter="20">
          <el-col :span="12"></el-col>
          <el-col :span="12">
            <el-button
              v-has-role="['develop']"
              style="float: right"
              type="primary"
              round
              @click="handleAddVoiceConfig()"
            >
              添加配置
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
            <VoiceConfigSearch @update:handle-change-search="toSearch"></VoiceConfigSearch>
          </template>
          <!-- 搜索区结束 -->
          <!-- 批量操作区开始 -->
          <template #batch>
            <el-divider content-position="left">批量操作</el-divider>
            <el-row type="flex" justify="space-around">
              <el-col :span="12" class="btn-action">
                <el-button v-has-role="['develop']" round type="primary" @click="handleReverse()">
                  反选
                </el-button>
              </el-col>
              <el-col :span="12" class="btn-action">
                <el-button
                  v-has-role="['develop']"
                  round
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
            <VoiceConfigTableList
              v-model:data-list="dataList"
              v-model:dialog-visible="dialogVisible"
              v-model:dialog-title="dialogTitle"
              v-model:dialog-type="dialogType"
              v-model:before-voice-config-form="beforeVoiceConfigForm"
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
        <CreateVoiceConfigForm
          ref="createFormRef"
          @close-dialog="listenToCloseDialog"
        ></CreateVoiceConfigForm>
      </template>
      <!-- 修改表单 -->
      <template #updateForm>
        <UpdateVoiceConfigForm
          ref="updateFormRef"
          :props-update-form="propsUpdateForm"
          @close-dialog="listenToCloseDialog"
        ></UpdateVoiceConfigForm>
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
import VoiceConfigSearch from "./components/VoiceConfigSearch.vue";
import VoiceConfigTableList from "./components/VoiceConfigTableList.vue";
import CreateVoiceConfigForm from "./components/CreateVoiceConfigForm.vue";
import UpdateVoiceConfigForm from "./components/UpdateVoiceConfigForm.vue";
//store
import { useUserStore } from "@/store";
//业务接口
import SystemVoiceAPI from "@/api/laravel-fast-api/v1/system/system/voice/system-voice-api";

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

//修改用户的容器
const beforeVoiceConfigForm = ref({
  id: 0,
  voice_title: "",
  channle_name: "",
  channle_event: "",
  voice_save_type: 10,
  voice_url: "",
  voice_path: "",
  voice_file: "",
  note: "",
  created_at: "",
  sort: 100,
  voice_use_url: "",
});

//监听beforeVoiceConfigForm的变化
watch(
  () => beforeVoiceConfigForm.value,
  (newValue) => {
    //console.log('当前表单', newValue)
    //console.log('之前表单', oldValue)
    if (newValue) {
      //Object.assign(propsUpdateForm.value,newValue)
      propsUpdateForm.value.id = newValue.id;
      propsUpdateForm.value.voice_title = newValue.voice_title;
      propsUpdateForm.value.channle_name = newValue.channle_name;
      propsUpdateForm.value.channle_event = newValue.channle_event;
      propsUpdateForm.value.voice_save_type = newValue.voice_save_type;
      propsUpdateForm.value.voice_path = newValue.voice_path;
      propsUpdateForm.value.voice_url = newValue.voice_url;
      propsUpdateForm.value.note = newValue.note;
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
  getVoiceConfigList();
});

//修改表单
const propsUpdateForm = ref({
  id: 0,
  voice_title: "",
  channle_name: "",
  channle_event: "",
  voice_save_type: 0,
  voice_url: "",
  voice_path: "",
  note: "",
});

//初始化分页条件
const initPageWhere = () => {
  where.value.currentPage = 1;
  where.value.pageSize = 10;
};

//获取列表
const getVoiceConfigList = async () => {
  loading.value = true;
  const result = await SystemVoiceAPI.getVoiceConfig(where.value);
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
const handleAddVoiceConfig = () => {
  dialogTitle.value = "添加提示配置";
  dialogType.value = 10;
  dialogVisible.value = true;
};

//监听搜索
const toSearch = (param: any) => {
  //console.log(param)
  initPageWhere();
  Object.assign(where.value, param);
  getVoiceConfigList();
};

//监听更新数据
const toUpdateData = () => {
  //重新获取用户列表
  getVoiceConfigList();
};

//监听关闭弹窗
const listenToCloseDialog = () => {
  //重新获取用户列表
  getVoiceConfigList();
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
    voice_title: "",
    channle_name: "",
    channle_event: "",
    voice_save_type: 0,
    voice_url: "",
    voice_path: "",
    note: "",
  };
};

//页面加载
onMounted(() => {
  //监听用户角色
  unwatchRole = userStore.watchRoles();
  getVoiceConfigList();
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
