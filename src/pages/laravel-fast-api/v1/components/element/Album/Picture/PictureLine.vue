<!--
 * @Descripttion: 
 * @version: v1
 * @Author: youhujun youhu8888@163.com
 * @Date: 2025-11-03 17:34:45
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-11-12 02:17:14
 * @FilePath: \src\pages\laravel-fast-api\v1\components\element\Album\Picture\PictureLine.vue
 * Copyright (C) 2025 youhujun. All rights reserved.
-->
<template>
  <el-row style="margin-bottom: 0.5rem" :gutter="8">
    <slot name="pictureItem" />
  </el-row>
</template>
<script setup lang="ts">
defineOptions({
  name: "PictureLine",
});
</script>

<style lang="scss" scoped></style>
