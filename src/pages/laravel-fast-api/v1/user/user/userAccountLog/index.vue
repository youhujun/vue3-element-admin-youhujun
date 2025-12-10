<!--
 * @Descripttion: 
 * @version: v1
 * @Author: youhujun youhu8888@163.com
 * @Date: 2025-12-01 13:12:35
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-12-03 17:52:15
 * @FilePath: \src\pages\laravel-fast-api\v1\user\user\userAccountLog\index.vue
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
          <el-tag type="warning" style="margin-bottom: 1rem">账户信息</el-tag>
          <br />
          <YhCardItem>
            <template #item-content>
              <el-row :gutter="10">
                <el-col :span="8" style="text-align: center">
                  <el-statistic title="余额" :value="userAmount" />
                </el-col>
                <el-col :span="8" style="text-align: center">
                  <el-statistic title="系统币" :value="userCoin" />
                </el-col>
                <el-col :span="8" style="text-align: center">
                  <el-statistic title="积分" :value="userScore" />
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="12" style="text-align: center">
                  <el-statistic title="累计获取奖金" :value="userBonus" />
                </el-col>
                <el-col :span="12" style="text-align: center">
                  <el-statistic title="预计获取奖金" :value="userPrepareBonus" />
                </el-col>
              </el-row>
            </template>
          </YhCardItem>
          <el-tag type="warning" style="margin-bottom: 1rem">账户操作</el-tag>
          <br />
          <YhCardItem>
            <template #item-content>
              <el-row :gutter="10">
                <el-col :span="2">
                  <el-tag type="info">账户类型</el-tag>
                </el-col>
                <el-col :span="4" style="text-align: center">
                  <el-select v-model="selectAccountType">
                    <el-option
                      v-for="item in accountTypeOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-col>
                <el-col :span="2">
                  <el-tag type="info">变动类型</el-tag>
                </el-col>
                <el-col :span="4" style="text-align: center">
                  <el-select v-model="selectActionType">
                    <el-option
                      v-for="item in selectActionTypeOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-col>
                <el-col :span="2">
                  <el-tag type="info">金额数值</el-tag>
                </el-col>
                <el-col :span="4" style="text-align: center">
                  <el-input v-model="activeAmount" placeholder="请输入金额数值"></el-input>
                </el-col>
                <el-col :span="6" style="text-align: center">
                  <el-button type="primary" @click="handleToChangeAccount()">确定</el-button>
                </el-col>
              </el-row>
            </template>
          </YhCardItem>
        </div>
        <!-- 分割线 -->
        <el-divider></el-divider>
        <el-tag type="primary" style="margin-bottom: 1rem">账户日志</el-tag>
        <br />
        <div>
          <el-row :gutter="10" style="margin-bottom: 1rem">
            <el-col :span="2">
              <el-tag type="info">账户类型</el-tag>
            </el-col>
            <el-col :span="6">
              <el-select v-model="where.account_type" @change="handleToChange">
                <el-option
                  v-for="item in accountTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-col>
            <el-col :span="2">
              <el-tag type="info">变动类型</el-tag>
            </el-col>
            <el-col :span="6">
              <el-select v-model="where.action_type" @change="handleToChange">
                <el-option
                  v-for="item in actionTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-col>
          </el-row>
          <el-row :gutter="10" style="margin-bottom: 1rem">
            <el-col :span="2">
              <el-tag type="info">时间范围</el-tag>
            </el-col>
            <el-col :span="8" style="text-align: center">
              <PastRangeSelectDateTime v-model:past-time-range="where.timeRange" />
            </el-col>
            <el-col :span="2">
              <el-tag type="info">排序</el-tag>
            </el-col>
            <el-col :span="4" style="text-align: center">
              <el-select
                v-model="where.sortType"
                placeholder="请选择排序方式"
                style="margin-right: 0.5rem"
              >
                <el-option
                  v-for="item in sortOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-col>
            <el-col :span="6" style="text-align: center">
              <el-button type="primary" @click="handleToShowLog()">点击查看</el-button>
            </el-col>
          </el-row>
          <el-table
            ref="userAccountLogTable"
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
            <el-table-column align="center" prop="amount" label="账户金额" width="100" />
            <el-table-column align="center" prop="change_type" label="变动类型" width="100">
              <template #default="props">
                <el-tag v-show="props.row.change_type == 10" type="success">增加</el-tag>
                <el-tag v-show="props.row.change_type == 20" type="danger">扣除</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="change_value" label="变动金额" width="100" />
            <el-table-column align="center" prop="before_amount" label="变动之前金额" width="200" />
            <el-table-column align="center" prop="note" label="备注" min-width="300" />
            <el-table-column align="center" prop="created_at" label="时间" min-width="200" />
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
import PastRangeSelectDateTime from "@/pages/laravel-fast-api/v1/components/element/Time/PastRangeSelectDateTime.vue";
//业务公共组件
import UserDescription from "../components/UserDescription.vue";
//store
import { useUserStore } from "@/store";
//api和type
import UserAccountAPI from "@/api/laravel-fast-api/v1/user/user/userDetails/userAccount/user-account-api";
import type { UserAccountLogItem } from "@/api/laravel-fast-api/v1/user/user/userDetails/userAccount/user-account-type";

defineOptions({
  name: "UserAccountLog",
});
// 定义选项类型
interface OptionItem {
  value: string | number;
  label: string;
}
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
//将分页处理定义为计算属性
//搜索查询条件
const where = ref({
  user_id: 0,
  // 10 余额 20系统币 30积分
  account_type: 10,
  // 0全部 10充值 20扣除
  action_type: 0,
  // 分页
  currentPage: 1,
  //每页条数
  pageSize: 10,
  //排序方式
  sortType: 2,
  //时间范围
  timeRange: [],
  //数据总数
  total: 0,
});
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
  getUserAccountLog();
});

//定义 账户类型选项
const accountTypeOptions: OptionItem[] = [
  { label: "余额", value: 10 },
  { label: "系统币", value: 20 },
  { label: "积分", value: 30 },
];
//定义操作类型选项
const actionTypeOptions: OptionItem[] = [
  { label: "全部", value: 0 },
  { label: "充值", value: 10 },
  { label: "扣除", value: 20 },
];
//定义操作的变动类型选项
const selectActionTypeOptions: OptionItem[] = [
  { label: "充值", value: 10 },
  { label: "扣除", value: 20 },
];

// 排序选项
const sortOptions: OptionItem[] = [
  { value: 1, label: "按时间升序" },
  { value: 2, label: "按时间降序" },
];

//定义用余额
const userAmount = ref(0);
//定义用户系统币
const userCoin = ref(0);
//定义用户积分
const userScore = ref(0);
//定义用户获得奖金金额
const userBonus = ref(0);
//定义用户准备获得奖金金额
const userPrepareBonus = ref(0);

//定义操作选择的账户类型
const selectAccountType = ref(10);
//定义操作选择的变动类型
const selectActionType = ref(10);
//定义变动数值和金额
const activeAmount = ref<string | number | null>(null);
//数据列表容器
const dataList = ref<UserAccountLogItem[]>([]);

//获取用户账户日志
const getUserAccountLog = async () => {
  loading.value = true;
  where.value.user_id = row.id;
  const result = await UserAccountAPI.getUserAccountLog(where.value);

  if (result && result.data && result.meta) {
    dataList.value = result.data ? result.data : [];
    where.value.total = result.meta?.total;
    where.value.currentPage = result.meta?.current_page;
    where.value.pageSize = result.meta?.per_page;
  }

  setTimeout(() => {
    loading.value = false;
  }, 500);
};

//监听修改
const handleToChange = () => {
  getUserAccountLog();
};

//监听修改账户
const handleToChangeAccount = async () => {
  const param = {
    user_id: row.id,
    account_type: selectAccountType.value,
    action_type: selectActionType.value,
    amount: Number(activeAmount.value),
  };
  const result = await UserAccountAPI.setUserAccount(param);
  //初始化操作金额
  activeAmount.value = "";
  //搜索条件根据操作变化
  where.value.account_type = selectAccountType.value;
  ElMessage.success(result.msg);
  getUserAccountInfo();
  getUserAccountLog();
};

//查看日志
const handleToShowLog = async () => {
  getUserAccountLog();
};

//获取用户奖金信息
const getUserAccountInfo = async () => {
  const param = {
    user_id: row.id,
  };
  const result = await UserAccountAPI.getUserAccountInfo(param);
  if (result && result.data) {
    userAmount.value = result.data.amount;
    userCoin.value = result.data.coin;
    userScore.value = result.data.score;
    userBonus.value = result.data.bonus;
    userPrepareBonus.value = result.data.prepare_bonus;
  }
};

//页面加载
onMounted(() => {
  //监听用户角色
  unwatchRole = userStore.watchRoles();
  //console.log('页面加载')
  //console.log(row)
  where.value.user_id = row.id;
  userAmount.value = Number(row.amount);
  userCoin.value = Number(row.coin);
  userScore.value = Number(row.score);
  getUserAccountLog();
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
