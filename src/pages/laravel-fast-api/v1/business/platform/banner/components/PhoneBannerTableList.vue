<!--
 * @Descripttion: 
 * @version: v1
 * @Author: youhujun 2900976495@qq.com
 * @Date: 2025-10-05 10:03:17
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-12-10 02:25:07
 * @FilePath: d:\wwwroot\Open\Vue\vue3-element-admin-youhujun\src\pages\laravel-fast-api\v1\business\platform\banner\components\PhoneBannerTableList.vue
 * Copyright (C) 2025 youhujun. All rights reserved.
-->
<template>
  <div>
    <el-table
      ref="phoneBannerTable"
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
      <el-table-column label="详情" type="expand" align="center" fixed>
        <template #default="scope">
          <PhoneBannerListItemDetails
            v-model:row-data="scope.row"
            v-model:show-index="showIndex"
          ></PhoneBannerListItemDetails>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="picture" label="图片" min-width="500">
        <template #default="scope">
          <el-image
            style="width: 300px; height: auto"
            :src="scope.row.picture"
            fit="fill"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="redirect_url" label="跳转链接" min-width="500" />

      <el-table-column align="center" prop="sort" label="排序" min-width="100" />
      <el-table-column align="center" prop="created_at" label="注册时间" min-width="200" />
      <el-table-column label="操作" align="center" fixed="right" width="200">
        <template #default="scope">
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
import type { TableInstance } from "element-plus";
//store
import { useUserStore } from "@/store";
//组件
import PhoneBannerListItemDetails from "./PhoneBannerListItemDetails.vue";

//api
//api和type
import PhoneBannerAPI from "@/api/laravel-fast-api/v1/business/platform/banner/banner-api";
import type { PhoneBannerListItem } from "@/api/laravel-fast-api/v1/business/platform/banner/banner-type";

//定义组件
defineOptions({
  name: "PhoneBannerTableList",
});

const userStore = useUserStore();
let unwatchRole: (() => void) | null = null;

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
const beforePhoneBannerForm = defineModel<PhoneBannerListItem>("beforePhoneBannerForm", {
  default: () => {
    return {
      id: 0,
      user_id: 0,
      album_picture_id: 0,
      redirect_url: "",
      note: "",
      sort: 100,
      created_at: "",
      updated_at: "",
      picture: "",
    };
  },
});

//选中对象的数组
const multipleSelection = ref<PhoneBannerListItem[]>([]);

//选中元素的下标
const selectIndex = ref<number[]>([]);

//反选元素的下标
const diffIndex = ref<number[]>([]);
//选中的下标
const selectId = ref<number[]>([]);

// 存放展开的id, 每次只展开一行
const getRowKeys = (row: PhoneBannerListItem) => {
  return row.id.toString();
};

const expandIds = ref<string[]>([]);

//emit
const emit = defineEmits(["update:hanldeUpdateData"]);

//定义数据列表
const dataList = defineModel<PhoneBannerListItem[]>("dataList", {
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
// 获取表格实例（需与模板中ref对应）
const phoneBannerTable = ref<TableInstance | null>(null);
//编辑
const handleToEditPage = (index: number, row: PhoneBannerListItem) => {
  //复杂情景跳转页面
  //console.log(row)
  //  let encryptString =  encryptData(row);
  //  router.push({
  //   name: 'editPhoneBanner',
  //   query: { row: encryptString }  // 注意：query参数建议序列化，避免对象类型问题
  // })
  //简单情景弹框修改
  dialogVisible.value = true;
  dialogTitle.value = "编辑系统配置";
  dialogType.value = 20;
  beforePhoneBannerForm.value = row;
};

//删除
const handleToDelete = (index: number, row: PhoneBannerListItem) => {
  const param = { id: row.id, is_delete: 1 };

  ElMessageBox.confirm("确认删除吗?", "确认删除", {
    // confirmButtonText: 'Re-Login',
    confirmButtonText: "删除",
    // cancelButtonText: 'Cancel',
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      try {
        const result = await PhoneBannerAPI.deletePhoneBanner(param);
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
    phoneBannerTable.value?.clearSelection();
    diffIndex.value.forEach((index) => {
      const row = dataList.value[index];
      if (row) {
        phoneBannerTable.value?.toggleRowSelection(row, true);
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
      is_delete: 1,
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
    ElMessageBox.confirm("确认要批量删除吗？", "确认信息", {
      distinguishCancelAndClose: true,
      confirmButtonText: "删除",
      cancelButtonText: "取消",
    })
      .then(() => {
        PhoneBannerAPI.multipleDeletePhoneBanner(params).then((result) => {
          ElMessage.success(result.msg);
          emit("update:hanldeUpdateData", true);
        });
      })
      .catch(() => {});
  }
);

//组件加载
onMounted(() => {
  //监听用户角色
  unwatchRole = userStore.watchRoles();
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
