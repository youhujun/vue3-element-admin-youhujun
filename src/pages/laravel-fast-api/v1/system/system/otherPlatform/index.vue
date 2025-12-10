<!--
 * @Descripttion: 
 * @version: v1
 * @Author: youhujun youhu8888@163.com
 * @Date: 2025-10-23 16:51:35
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-11-23 01:27:51
 * @FilePath: \src\pages\laravel-fast-api\v1\system\system\otherPlatform\index.vue
 * Copyright (C) 2025 youhujun. All rights reserved.
-->
<template>
  <div>
    <!-- 页面内容开始 -->
    <YhCard>
      <template #cardTitle>三方平台</template>
      <template #cardNotice>
        <el-tag size="small" type="danger" effect="plain">第三方平台配置</el-tag>
      </template>
      <template #cardButton>
        <!-- <el-button v-has-role="['develop']" style="float:right;" type="primary" @click="handleAddTop()">添加顶级</el-button> -->
      </template>
      <template #cardContent>
        <el-divider content-position="left">点击下方按钮-去配置</el-divider>
        <div class="custom-node">
          <el-button type="primary" plain @click="handleToShowPaltform(0)">配置微信</el-button>
          <el-button type="primary" plain @click="handleToShowPaltform(1)">配置抖音</el-button>
        </div>
      </template>
    </YhCard>
    <!-- 页面内容结束 -->
  </div>
</template>
<script setup lang="ts">
//系统
import { useRouter } from "vue-router";
// 公共级组件
import YhCard from "@/pages/laravel-fast-api/v1/components/element/Card/index.vue";
//工具
//import { encryptData } from '@/utils/crypt'
//定义组件名称
defineOptions({
  name: "OtherPlatform",
});

//初始化路由
const router = useRouter();

//定义点击查看不同的平台
const handleToShowPaltform = (param: number) => {
  const navigateRoute = ["wechatPlatform", "douyinPlatform"];
  //let encryptString =  encryptData();

  router.push({
    name: navigateRoute[param],
    query: {}, // 注意：query参数建议序列化，避免对象类型问题
  });
};
</script>
<style lang="scss" scoped></style>
