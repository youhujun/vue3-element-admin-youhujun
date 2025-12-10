<!--
 * @Descripttion: 
 * @version: v1
 * @Author: youhujun 2900976495@qq.com
 * @Date: 2025-10-05 17:38:31
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-12-10 04:38:48
 * @FilePath: d:\wwwroot\Open\Vue\vue3-element-admin-youhujun\src\pages\laravel-fast-api\v1\business\common\collection\index.vue
 * Copyright (C) 2025 youhujun. All rights reserved.
-->
<template>
  <div>
    <!-- 页面内容开始 -->
    <YhCard :loading="loading">
      <template #cardTitle>集合设置</template>
      <template #cardNotice>
        <el-tag size="small" type="danger" effect="plain">用于处理特殊配置</el-tag>
      </template>
      <template #cardButton></template>
      <template #cardContent>
        <div class="custom-node">
          <el-card shadow="always" class="config-item">
            <template #header>
              <el-tag effect="plain" type="primary">提现配置</el-tag>
              <el-tag style="margin-left: 1rem" type="primary">
                小于等于阈值金额固定扣除,大于阈值金额按设定比例
              </el-tag>
            </template>
            <el-row :gutter="10" class="line-item">
              <el-col :span="8">
                <el-row :gutter="10">
                  <el-tag effect="plain" type="info" size="large" style="margin-right: 1rem">
                    阈值金额
                  </el-tag>
                  <el-col :span="12">
                    <el-input
                      v-model="handingFeeReasonAmount"
                      placeholder="请输入阈值金额"
                    ></el-input>
                  </el-col>
                  <el-col :span="4">
                    <el-button
                      v-has-role="['develop', 'super']"
                      type="primary"
                      @click="handleToUpdate('handing_fee_reason_amount')"
                    >
                      修改
                    </el-button>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="8">
                <el-row :gutter="10">
                  <el-tag effect="plain" type="info" size="large" style="margin-right: 1rem">
                    固定金额
                  </el-tag>
                  <el-col :span="12">
                    <el-input v-model="handingFeeUseAmount" placeholder="请输入固定金额"></el-input>
                  </el-col>
                  <el-col :span="4">
                    <el-button
                      v-has-role="['develop', 'super']"
                      type="primary"
                      @click="handleToUpdate('handing_fee_use_amount')"
                    >
                      修改
                    </el-button>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="8">
                <el-row :gutter="10">
                  <el-tag effect="plain" type="info" size="large" style="margin-right: 1rem">
                    扣除比例%
                  </el-tag>
                  <el-col :span="12">
                    <el-input v-model="handingFeeUsePercentage" placeholder="请输入比例"></el-input>
                  </el-col>
                  <el-col :span="4">
                    <el-button
                      v-has-role="['develop', 'super']"
                      type="primary"
                      @click="handleToUpdate('handing_fee_use_percentage')"
                    >
                      修改
                    </el-button>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-card>
          <el-card shadow="always" class="config-item">
            <template #header>
              <el-tag effect="plain" type="primary">个税扣除</el-tag>
              <el-tag style="margin-left: 1rem" type="primary">
                个税扣除比例,超过阈值金额部分,按比例扣除
              </el-tag>
            </template>
            <el-row :gutter="10" class="line-item">
              <el-col :span="8">
                <el-row :gutter="10">
                  <el-tag effect="plain" type="info" size="large" style="margin-right: 1rem">
                    阈值金额
                  </el-tag>
                  <el-col :span="12">
                    <el-input
                      v-model="incomeTaxReasonAmount"
                      placeholder="请输入阈值金额"
                    ></el-input>
                  </el-col>
                  <el-col :span="4">
                    <el-button
                      v-has-role="['develop', 'super']"
                      type="primary"
                      @click="handleToUpdate('income_tax_reason_amount')"
                    >
                      修改
                    </el-button>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="8">
                <el-row :gutter="10">
                  <el-tag effect="plain" type="info" size="large" style="margin-right: 1rem">
                    扣除比例%
                  </el-tag>
                  <el-col :span="12">
                    <el-input v-model="incomeTaxUsePercentage" placeholder="请输入比例"></el-input>
                  </el-col>
                  <el-col :span="4">
                    <el-button
                      v-has-role="['develop', 'super']"
                      type="primary"
                      @click="handleToUpdate('income_tax_use_percentage')"
                    >
                      修改
                    </el-button>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row :gutter="10" class="line-item"></el-row>
          </el-card>
        </div>
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
        <!-- <CreateReplaceForm ref="createFormRef" :props-create-form="propsCreateForm"   @update:CloseDialog="listenToCloseDialog"></CreateReplaceForm> -->
      </template>
      <!-- 修改表单 -->
      <template #updateForm>
        <!-- <UpdateReplaceForm ref="updateFormRef" :props-update-form="propsUpdateFrom"   @update:CloseDialog="listenToCloseDialog"></UpdateReplaceForm> -->
      </template>
      <!-- 显示内容 -->
      <template #showContent>
        <!-- <ReplaceRowData :props-row-data="propsRowData" :props-show-index="propsShowIndex" @update:ShowIndex="listenToUpdateIndex"  @update:CloseDialog="listenToCloseDialog"></ReplaceRowData> -->
      </template>
    </YhDialog>
    <!-- 弹窗内容结束 -->
  </div>
</template>
<script setup lang="ts">
// 公共级组件
import YhCard from "@/pages/laravel-fast-api/v1/components/element/Card/index.vue";
import YhDialog from "@/pages/laravel-fast-api/v1/components/element/Dialog/index.vue";

//api和type
import SystemWithdrawConfigAPI from "@/api/laravel-fast-api/v1/business/common/withdraw/withdraw-api";
import type { WithdrawConfigItem } from "@/api/laravel-fast-api/v1/business/common/withdraw/withdraw-type";
//store
import { useUserStore } from "@/store";

//store
const userStore = useUserStore();
let unwatchRole: (() => void) | null = null;

//初始化加载样式
const loading = ref(false);
//是否开启弹窗
const dialogVisible = ref(false);
//弹窗标题
const dialogTitle = ref("");
//弹窗类型 10添加 20修改 30内容
const dialogType = ref(10);
//弹窗宽度
const dialogWidth = ref("65%");

//定义 提现阈值金额
const handingFeeReasonAmount = ref(0);
//定义 提现固定金额
const handingFeeUseAmount = ref(0);
//定义 提现百分比
const handingFeeUsePercentage = ref(0);
//定义 个税阈值金额
const incomeTaxReasonAmount = ref(0);
//定义 提现阈值百分比
const incomeTaxUsePercentage = ref(0);

//定义数组容器
const mapConfigArray = ref<WithdrawConfigItem[]>([]);

// 定义配置项的键类型
type ConfigKey =
  | "handing_fee_reason_amount"
  | "handing_fee_use_amount"
  | "handing_fee_use_percentage"
  | "income_tax_reason_amount"
  | "income_tax_use_percentage";

// 定义配置项映射关系（指定索引类型）
const configMap: Record<ConfigKey, Ref<number>> = {
  handing_fee_reason_amount: handingFeeReasonAmount,
  handing_fee_use_amount: handingFeeUseAmount,
  handing_fee_use_percentage: handingFeeUsePercentage,
  income_tax_reason_amount: incomeTaxReasonAmount,
  income_tax_use_percentage: incomeTaxUsePercentage,
};

// 获取系统配置
const getWithdrawConfig = async () => {
  loading.value = true;
  try {
    const result = await SystemWithdrawConfigAPI.getWithdrawConfig();
    if (result.code === 0 && result.data) {
      mapConfigArray.value = result.data;
      // 遍历数据并通过映射关系赋值
      result.data.forEach((item: WithdrawConfigItem) => {
        // 使用类型断言明确 item.item_name 是 ConfigKey 类型
        const key = item.item_name as ConfigKey;
        const refItem = configMap[key];
        if (refItem) {
          refItem.value = Number(item.item_value);
        }
      });
    }
  } catch (error) {
    console.error("获取提现配置失败:", error);
  } finally {
    loading.value = false;
  }
};

//更新
const handleToUpdate = async (item_name: ConfigKey) => {
  // 从映射关系中获取对应的ref变量
  const refItem = configMap[item_name];
  if (!refItem) return;

  // 查找对应id
  const targetItem = mapConfigArray.value.find((item) => item.item_name === item_name);
  if (!targetItem) return;

  const param = {
    id: Number(targetItem.id),
    item_value: refItem.value,
  };

  const result = await SystemWithdrawConfigAPI.updateWithdrawConfig(param);
  ElMessage.success(result.msg);

  getWithdrawConfig();
};
//加载
onMounted(() => {
  //监听用户角色
  unwatchRole = userStore.watchRoles();
  getWithdrawConfig();
});

//组件卸载
onUnmounted(() => {
  // 组件卸载时停止监听，防止内存泄漏
  if (unwatchRole) {
    unwatchRole();
  }
});
</script>
<style lang="scss" scoped>
.card-box {
  margin-bottom: 1rem;
}
.line-item {
  margin-bottom: 1rem;
}
.config-item {
  margin-bottom: 1rem;
}
</style>
