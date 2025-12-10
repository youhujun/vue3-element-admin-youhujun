<!--
 * @Descripttion: 
 * @version: v1
 * @Author: youhujun youhu8888@163.com
 * @Date: 2025-12-01 13:11:58
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-12-09 14:13:35
 * @FilePath: \src\pages\laravel-fast-api\v1\user\user\userTeam\index.vue
 * Copyright (C) 2025 youhujun. All rights reserved.
-->
<template>
  <div>
    <!-- 卡片容器开始 -->
    <YhCardList>
      <template #description>
        <UserDescription v-model:row-data="row"></UserDescription>
      </template>
      <template #cardContent>
        <div class="action-btn-box">
          <el-tag type="warning" style="margin-bottom: 1rem">推荐人</el-tag>
          <br />
          <YhCardItem>
            <template #item-content>
              <el-row v-show="sourceUser.id" :gutter="10">
                <el-col :span="3">
                  <el-row :gutter="10">
                    <el-tag type="info" style="margin-right: 1rem">头像</el-tag>
                    <el-avatar
                      v-if="sourceUser.avatar"
                      shape="circle"
                      :size="38"
                      fit="cover"
                      :src="sourceUser.avatar"
                      @error="sourceUserErrorHandler"
                    />
                    <el-avatar v-else :size="38">
                      <img src="~@/assets/images/avatar.gif" />
                    </el-avatar>
                  </el-row>
                </el-col>
                <el-col :span="3">
                  <el-row :gutter="10">
                    <el-tag type="info" style="margin-right: 1rem">昵称</el-tag>
                    <el-tag type="primary">
                      {{ sourceUser.nick_name ? sourceUser.nick_name : "暂无" }}
                    </el-tag>
                  </el-row>
                </el-col>
                <el-col :span="3">
                  <el-row :gutter="10">
                    <el-tag type="info" style="margin-right: 1rem">姓名</el-tag>
                    <el-tag type="primary">
                      {{ sourceUser.real_name ? sourceUser.real_name : "暂无" }}
                    </el-tag>
                  </el-row>
                </el-col>
                <el-col :span="3">
                  <el-row :gutter="10">
                    <el-tag type="info" style="margin-right: 1rem">手机号</el-tag>
                    <el-tag type="primary">
                      {{ sourceUser.phone ? sourceUser.phone : "暂无" }}
                    </el-tag>
                  </el-row>
                </el-col>
              </el-row>
              <el-tag v-show="!sourceUser.id" type="info">没有推荐人</el-tag>
            </template>
          </YhCardItem>
        </div>
        <!-- 分割线 -->
        <el-divider></el-divider>
        <el-tag type="primary" style="margin-bottom: 1rem">团队信息</el-tag>
        <br />
        <div>
          <el-row :gutter="10" style="margin-bottom: 1rem">
            <el-col :span="2">
              <el-tag type="info">查看用户团队类型</el-tag>
            </el-col>
            <el-col :span="4">
              <el-select v-model="userTeamWhere.lower_type" @change="handleToChange">
                <el-option label="全部" :value="0"></el-option>
                <el-option label="一级团队" :value="10"></el-option>
                <el-option label="二级团队" :value="20"></el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-table
            ref="userTeamTable"
            v-loading="loading"
            element-loading-text="拼命加载中"
            :element-loading-spinner="svg"
            element-loading-svg-view-box="-10, -10, 50, 50"
            element-loading-background="rgba(38, 38, 38, 0.8)"
            :data="dataList"
            border
            stripe
            highlight-current-row
            empty-text="暂无数据"
            fit
            height="50vh"
            style="width: 100%"
          >
            <el-table-column type="selection" align="center" width="55" />
            <el-table-column label="序号" type="index" width="55" align="center" fixed />
            <el-table-column label="头像" width="100" fixed align="center">
              <template #default="props">
                <el-avatar
                  v-if="props.row.avatar"
                  shape="circle"
                  :size="38"
                  fit="cover"
                  :src="props.row.avatar"
                  @error="errorHandler"
                />
                <el-avatar v-else :size="38">
                  <img src="~@/assets/images/avatar.gif" />
                </el-avatar>
              </template>
            </el-table-column>

            <el-table-column align="center" prop="phone" label="手机号" min-width="200" fixed />
            <el-table-column align="center" prop="account_name" label="账号" width="150" />
            <el-table-column align="center" prop="real_name" label="姓名" width="200" />
            <el-table-column align="center" prop="nick_name" label="昵称" min-width="300" />
            <el-table-column align="center" prop="created_at" label="注册时间" min-width="200" />
          </el-table>
        </div>
      </template>
      <template #paginate>
        <YhPaginate
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          v-model:total="total"
          :page-sizes="[5, 10, 20, 30, 40, 50]"
        />
      </template>
    </YhCardList>
    <!-- 卡片容器结束 -->
  </div>
</template>
<script setup lang="ts">
//系统
import { useRoute } from "vue-router";
//工具
import { decryptData } from "@/utils/crypt";
//公共组件
import YhCardList from "@/pages/laravel-fast-api/v1/components/element/Card/CardList/index.vue";
import YhCardItem from "@/pages/laravel-fast-api/v1/components/element/Card/CardList/CardItem.vue";
import YhPaginate from "@/pages/laravel-fast-api/v1/components/element/Paginate/index.vue";
//业务公共组件
import UserDescription from "../components/UserDescription.vue";
//store
import { useUserStore } from "@/store";

//api和type
import UserTeamAPI from "@/api/laravel-fast-api/v1/user/user/userDetails/userTeam/user-team-api";
import type { UserListItem } from "@/api/laravel-fast-api/v1/user/user/user-type";

defineOptions({
  name: "UserTeam",
});

//定义的svg图标
const svg = `
	<path class="path" d="
		M 30 15
		L 28 17
		M 25.61 25.61
		A 15 15, 0, 0, 1, 15 30
		A 15 15, 0, 1, 1, 27.99 7.5
		L 15 15
	" style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
`;

const route = useRoute();
const row = decryptData(route.query.row as string);
//store
const userStore = useUserStore();

let unwatchRole: (() => void) | null = null;
//初始化加载样式
const loading = ref(false);

//搜索查询条件
const userTeamWhere = ref({
  user_id: 0,
  // 0全部 10一级 20二级
  lower_type: 0,
  // 分页
  currentPage: 1,
  //每页条数
  pageSize: 10,
  //排序方式
  sortType: 2,
  //数据总数
  total: 0,
});

//将分页处理定义为计算属性
//当前页
const currentPage = computed({
  get() {
    return userTeamWhere.value.currentPage;
  },
  set(newValue) {
    userTeamWhere.value.currentPage = newValue;
  },
});
//页面条数
const pageSize = computed({
  get() {
    return userTeamWhere.value.pageSize;
  },
  set(newValue) {
    userTeamWhere.value.pageSize = newValue;
  },
});
//计算总数
const total = computed({
  get() {
    return userTeamWhere.value.total;
  },
  set(newValue) {
    userTeamWhere.value.total = newValue;
  },
});

//侦听分页变化
watch([currentPage, pageSize], () => {
  loading.value = true;
  getUserLowerTeam();
});

//用户推荐人id
const userSourceId = ref(0);

//定义用户推荐人
const sourceUser = ref<UserListItem>({
  id: 0,
  userId: "",
  created_at: "暂无",
  switch: 1,
  level_id: 1,
  parent_id: 0,
  account_name: "暂无",
  invite_code: "",
  phone: "暂无",
  real_auth_status: 0,
  source_user_id: 0,
  amount: "0",
  coin: "0",
  score: "0",
  nick_name: "暂无",
  real_name: "暂无",
  solar_birthday_at: "",
  chinese_birthday_at: "",
  sex: 0,
  id_number: "",
  introduction: "",
  avatar: "",
  user_level: "",
  role: [],
});

//数据列表容器
const dataList = ref<UserListItem[]>([]);

//定义推荐用户头像加载失败
const sourceUserErrorHandler = () => {
  return;
};

//列表加载失败
const errorHandler = () => {
  return;
};

//查看团队
const handleToChange = () => {
  getUserLowerTeam();
};

//获取用户团队
const getUserLowerTeam = async () => {
  loading.value = true;
  userTeamWhere.value.user_id = row.id;
  const result = await UserTeamAPI.getUserLowerTeam(userTeamWhere.value);
  if (result && result.data && result.meta) {
    dataList.value = result.data ? result.data : [];
    userTeamWhere.value.total = result.meta?.total;
    userTeamWhere.value.currentPage = result.meta?.current_page;
    userTeamWhere.value.pageSize = result.meta?.per_page;
  }

  setTimeout(() => {
    loading.value = false;
  }, 500);
};

//获取用户上级
const getUserSource = async () => {
  //如果有
  if (row.source_user_id) {
    userSourceId.value = row.source_user_id;
  }

  if (userSourceId.value) {
    const param = {
      source_id: userSourceId.value,
    };

    const result = await UserTeamAPI.getUserSource(param);

    if (result && result.data) {
      sourceUser.value = result.data;
      //console.log('推荐人信息:',sourceUser.value)
    }
  }
};

//页面加载
onMounted(() => {
  //监听用户角色
  unwatchRole = userStore.watchRoles();
  //console.log('页面加载')
  //console.log(row)
  userTeamWhere.value.user_id = row.id;

  //如果有
  if (row.source_user_id) {
    userSourceId.value = row.source_user_id;
  }

  //获取推荐人
  getUserSource();

  //获取用户团队
  getUserLowerTeam();
});

//组件卸载
onUnmounted(() => {
  // 组件卸载时停止监听，防止内存泄漏
  if (unwatchRole) {
    unwatchRole();
  }
});
</script>

<style lang="scss" scoped></style>
