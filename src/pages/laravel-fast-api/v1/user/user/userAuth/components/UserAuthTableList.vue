<!--
 * @Descripttion: 
 * @version: v1
 * @Author: youhujun 2900976495@qq.com
 * @Date: 2025-10-05 10:03:17
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-12-10 04:01:01
 * @FilePath: d:\wwwroot\Open\Vue\vue3-element-admin-youhujun\src\pages\laravel-fast-api\v1\user\user\userAuth\components\UserAuthTableList.vue
 * Copyright (C) 2025 youhujun. All rights reserved.
-->
<template>
  <div>
    <el-table
      ref="userTable"
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
      height="70vh"
      style="width: 100%"
      :row-key="getRowKeys"
      :expand-row-keys="expandIds"
      @selection-change="handleSelectionChange"
      @expand-change="handleExpandChange"
    >
      <el-table-column type="selection" align="center" width="55" />
      <el-table-column label="序号" type="index" width="55" align="center" fixed />
      <el-table-column label="头像" width="100" fixed align="center">
        <template #default="scope">
          <el-avatar
            v-if="scope.row.avatar"
            shape="circle"
            :size="38"
            fit="cover"
            :src="scope.row.avatar"
            @error="errorHandler"
          />
          <el-avatar v-else :size="38">
            <img src="~@/assets/images/avatar.gif" />
          </el-avatar>
        </template>
      </el-table-column>
      <el-table-column label="详情" type="expand" align="center" fixed>
        <template #default="scope">
          <UserListItemDetails
            v-model:row-data="scope.row"
            v-model:show-index="showIndex"
          ></UserListItemDetails>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="phone" label="手机号" min-width="200" fixed />
      <el-table-column align="center" prop="account_name" label="账号" width="150" />
      <el-table-column align="center" prop="real_name" label="姓名" width="200" />
      <el-table-column align="center" prop="nick_name" label="昵称" min-width="300" />
      <el-table-column
        prop="real_auth_status"
        label="认证状态"
        width="150"
        :filters="[
          { text: '未认证', value: '10' },
          { text: '认证中', value: '20' },
          { text: '未通过', value: '30' },
          { text: '已通过', value: '40' },
        ]"
        :filter-method="filterAuthStauts"
        filter-placement="bottom-end"
        align="center"
      >
        <template #default="scope">
          <el-tag v-show="scope.row.real_auth_status == 10" type="info">未认证</el-tag>
          <el-tag v-show="scope.row.real_auth_status == 20" type="warning">认证中</el-tag>
          <el-tag v-show="scope.row.real_auth_status == 30" type="danger">未通过</el-tag>
          <el-tag v-show="scope.row.real_auth_status == 40" type="success">已通过</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别"
        width="120"
        :filters="[
          { text: '男', value: '10' },
          { text: '女', value: '20' },
          { text: '未知', value: '0' },
        ]"
        :filter-method="filterSex"
        filter-placement="bottom-end"
        align="center"
      >
        <template #default="scope">
          <el-tag v-if="scope.row.sex == 10" type="primary">男</el-tag>
          <el-tag v-else-if="scope.row.sex == 20" type="danger">女</el-tag>
          <el-tag v-else type="info">未知</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="switch"
        label="是否可用"
        width="100"
        :filters="[
          { text: '否', value: '0' },
          { text: '是', value: '1' },
        ]"
        :filter-method="filterSwitchStatus"
        filter-placement="bottom-end"
        align="center"
      >
        <template #default="scope">
          <el-tag v-show="scope.row.switch == 0" type="info">否</el-tag>
          <el-tag v-show="scope.row.switch == 1" type="success">是</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="created_at" label="注册时间" min-width="200" />
      <el-table-column label="操作" align="center" fixed="right" width="400">
        <template #default="scope">
          <!-- 添加下级 -->
          <el-button
            v-has-role="['develop', 'super']"
            size="small"
            type="primary"
            plain
            @click="handleToAddSub(scope.$index, scope.row)"
          >
            添加下级
          </el-button>
          <!-- 编辑 -->
          <el-button
            v-has-role="['develop', 'super']"
            size="small"
            type="primary"
            plain
            @click="handleToEditPage(scope.$index, scope.row)"
          >
            编辑
          </el-button>
          <!-- 禁用/解禁 -->
          <el-button
            size="small"
            :type="scope.row.switch === 1 ? 'warning' : 'success'"
            plain
            @click="handleToDisabled(scope.row)"
          >
            {{ scope.row.switch === 1 ? "禁用" : "解禁" }}
          </el-button>
          <el-button
            size="small"
            type="danger"
            el-button
            @click="handleToDelete(scope.$index, scope.row)"
          >
            删除
            <!-- 删除(禁用)结束 -->
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script setup lang="ts">
//系统
import { useRouter } from "vue-router";
import type { TableInstance } from "element-plus";
//工具
import { encryptData } from "@/utils/crypt";

//组件
import UserListItemDetails from "./UserAuthListItemDetails.vue";

//api
import type { UserListItem } from "@/api/laravel-fast-api/v1/user/user/user-type";
import UserAPi from "@/api/laravel-fast-api/v1/user/user/user-api";

//定义组件
defineOptions({
  name: "UserAuthTableList",
});
//定义传入属性
const props = withDefaults(
  defineProps<{
    //加载动画效果
    loading?: boolean;
    //反选标记
    reverseSelect?: number;
    //批量删除标记
    multipleDelete?: number;
    //批量禁用标记
    multipleDisable?: number;
  }>(),
  {
    loading: false,
    reverseSelect: 0,
    multipleDelete: 0,
    multipleDisable: 0,
  }
);

//弹框是否开启
const dialogVisible = defineModel<boolean>("dialogVisible", {
  default: false,
});
//弹框标题
const dialogTitle = defineModel<string>("dialogTitle", {
  default: "弹框标题",
});
//弹框类型
const dialogType = defineModel<number>("dialogType", {
  default: 10,
});
//
const beforeUserForm = defineModel<UserListItem>("beforeUserForm", {
  default: () => {
    return {
      id: 0,
      userId: "",
      created_at: "",
      switch: 1,
      level_id: 1,
      parent_id: 0,
      account_name: "",
      invite_code: "",
      phone: "",
      real_auth_status: 0,
      source_id: 0,
      amount: "0",
      coin: "0",
      score: "0",
      nick_name: "",
      real_name: "",
      solar_birthday_at: "",
      chinese_birthday_at: "",
      sex: 10,
      id_number: "",
      introduction: "",
      avatar: "",
      user_level: "1",
      role: [],
    };
  },
});

//选中对象的数组
const multipleSelection = ref<UserListItem[]>([]);

//选中元素的下标
const selectIndex = ref<number[]>([]);

//反选元素的下标
const diffIndex = ref<number[]>([]);
//选中的下标
const selectId = ref<number[]>([]);

// 存放展开的id, 每次只展开一行
const getRowKeys = (row: UserListItem) => {
  return row.id.toString();
};

const expandIds = ref<string[]>([]);

//emit
const emit = defineEmits(["update:hanldeUpdateData"]);

//定义数据列表
const dataList = defineModel<UserListItem[]>("dataList", {
  default: () => [],
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
//初始化路由
const router = useRouter();

// 获取表格实例（需与模板中ref对应）
const userTable = ref<TableInstance | null>(null);

//头像加载失败
const errorHandler = () => {
  return false;
};

//过滤认证状态
const filterAuthStauts = (value: string, row: UserListItem) => {
  return row.real_auth_status == value;
};

//过滤性别
const filterSex = (value: string, row: UserListItem) => {
  return row.sex && row.sex == value;
};

//过滤Switch状态
const filterSwitchStatus = (value: string, row: UserListItem) => {
  return row.switch == value;
};

//添加下级
const handleToAddSub = (index: number, row: UserListItem) => {
  dialogVisible.value = true;
  dialogTitle.value = "添加下级用户";
  dialogType.value = 10;
  beforeUserForm.value = row;
};

//编辑
const handleToEditPage = (index: number, row: UserListItem) => {
  //复杂情景跳转页面
  //console.log(row)
  const encryptString = encryptData(row);
  router.push({
    name: "editUser",
    query: { row: encryptString }, // 注意：query参数建议序列化，避免对象类型问题
  });
};

//禁用/解禁
const handleToDisabled = (row: UserListItem) => {
  // 在外部先声明param变量
  const param = {
    id: row.id,
    switch: row.switch === 1 ? 0 : 1, // 用三元表达式简化逻辑
  };

  let title = "";
  let text = "";
  let confirmButtonText = "";

  if (row.switch === 1) {
    title = "确认禁用";
    text = "确认禁用用户吗?";
    confirmButtonText = "禁用";
  } else {
    title = "确认解禁";
    text = "确认解禁用户吗?";
    confirmButtonText = "解禁";
  }
  ElMessageBox.confirm(title, text, {
    // confirmButtonText: 'Re-Login',
    confirmButtonText,
    // cancelButtonText: 'Cancel',
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      try {
        const result = await UserAPi.disable(param);
        ElMessage.success(result.msg);
        emit("update:hanldeUpdateData", true);
      } catch {
        //const err = error as Error;
        //ElMessage.error(`提交失败：${err.message || '未知错误'}`);
      }
    })
    .catch(() => {
      return;
    });
};

//删除
const handleToDelete = (index: number, row: UserListItem) => {
  const param = { id: row.id };

  ElMessageBox.confirm("确认删除用户吗?", "确认删除", {
    // confirmButtonText: 'Re-Login',
    confirmButtonText: "删除",
    // cancelButtonText: 'Cancel',
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      try {
        const result = await UserAPi.delete(param);
        ElMessage.success(result.msg);
        emit("update:hanldeUpdateData", true);
      } catch {
        //const err = error as Error;
        //ElMessage.error(`提交失败：${err.message || '未知错误'}`);
      }
    })
    .catch(() => {
      return;
    });
};

// 多选处理
const handleSelectionChange = (val: any[]) => {
  multipleSelection.value = val;
  selectIndex.value = []; // 重置选中索引数组

  // 遍历选中项，收集它们在数据列表中的索引
  multipleSelection.value.forEach((item) => {
    const index = dataList.value.findIndex((dataItem) => dataItem.id === item.id);
    if (index !== -1) {
      selectIndex.value.push(index);
    }
  });
};

// 展开行处理
const handleExpandChange = (row: any, expandedRows: any[]) => {
  // 假设原有逻辑中的show是控制某些显示状态，这里保留类似逻辑
  // 可根据实际需求补充show的定义和用途
  // const show = ref(0);
  // show.value = 1;

  // 判断当前行是否在已展开的行数组中（即是否展开状态）
  const isExpanded = expandedRows.includes(row);

  if (isExpanded) {
    // 展开时：只保留当前行的展开状态（关闭其他行）
    expandIds.value = [row.id.toString()];
  } else {
    // 收起时：清空展开状态
    expandIds.value = [];
  }
};

//列表详情显示的下标
const showIndex = ref(1);

// 监听反选（对应props.reverseSelect）
watch(
  () => props.reverseSelect,
  (newValue) => {
    if (!newValue) return; // 非触发状态不执行

    diffIndex.value = [];
    const allIndexes: number[] = [];

    // 生成所有行的索引数组
    for (let i = 0; i < dataList.value.length; i++) {
      allIndexes.push(i);
    }

    // 计算反选索引（不在已选索引中的索引）
    diffIndex.value = allIndexes.filter((index) => !selectIndex.value.includes(index));

    // 执行反选操作
    userTable.value?.clearSelection();
    diffIndex.value.forEach((index) => {
      const row = dataList.value[index];
      if (row) {
        userTable.value?.toggleRowSelection(row, true);
      }
    });

    // 更新选中索引为反选索引
    selectIndex.value = [...diffIndex.value];
  }
);

// 监听批量删除（对应props.multipleDelete）
watch(
  () => props.multipleDelete,
  (newValue) => {
    if (!newValue) return;

    selectId.value = []; // 重置为id数组
    const params = {
      selectId: [] as number[],
    };

    // 直接收集选中项的id（核心修正）
    multipleSelection.value.forEach((item) => {
      selectId.value.push(item.id); // 存储id
      params.selectId.push(item.id);
    });

    if (selectId.value.length === 0) {
      ElMessage.error("请先选择要删除的选项");
      return;
    }

    // 确认对话框逻辑不变...
    ElMessageBox.confirm("确认要批量删除用户吗？", "确认信息", {
      distinguishCancelAndClose: true,
      confirmButtonText: "删除",
      cancelButtonText: "取消",
    })
      .then(() => {
        UserAPi.multipleDeleteUser(params).then((result) => {
          ElMessage.success(result.msg);
          emit("update:hanldeUpdateData", true);
        });
      })
      .catch(() => {});
  }
);

// 监听批量禁用（对应props.multipleDisable）
watch(
  () => props.multipleDisable,
  (newValue) => {
    if (!newValue) return;

    selectId.value = []; // 重置为id数组
    const params = {
      selectId: [] as number[],
      switch: 0,
    };

    // 收集选中项的id，并判断状态（核心修正）
    multipleSelection.value.forEach((item) => {
      selectId.value.push(item.id); // 存储id
      if (!item.switch) {
        params.switch = 1; // 标记存在已禁用用户
      }
      params.selectId.push(item.id);
    });

    if (selectId.value.length === 0) {
      ElMessage.error("请先选择要禁用的选项");
      return;
    }

    if (params.switch) {
      ElMessage.error("含有已禁用用户，不可批量禁用");
      return;
    }

    // 确认对话框逻辑不变...
    ElMessageBox.confirm("确认要批量禁用用户吗？", "确认信息", {
      distinguishCancelAndClose: true,
      confirmButtonText: "禁用",
      cancelButtonText: "取消",
    })
      .then(() => {
        UserAPi.multipleDisableUser(params).then((res) => {
          ElMessage.success(res.msg);
          emit("update:hanldeUpdateData", true);
        });
      })
      .catch(() => {});
  }
);
</script>
<style lang="scss" scoped></style>
