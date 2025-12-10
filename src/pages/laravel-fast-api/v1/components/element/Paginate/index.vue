<!--
 * @Descripttion: 
 * @version: v1
 * @Author: youhujun 2900976495@qq.com
 * @Date: 2025-09-29 17:40:09
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-12-10 12:43:32
 * @FilePath: d:\wwwroot\Open\Vue\vue3-element-admin-youhujun\src\pages\laravel-fast-api\v1\components\element\Paginate\index.vue
 * Copyright (C) 2025 youhujun. All rights reserved.
-->
<template>
  <div>
    <el-row class="paginate-box" type="flex">
      <el-col :span="12" :push="8">
        <el-pagination
          :current-page="currentPage"
          :page-sizes="pageSizes"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts" setup>
import { throttle } from "@/utils/index";

defineOptions({
  name: "YhPaginate",
});
// 定义事件
const emit = defineEmits(["update:pageSize", "update:currentPage"]);

const { pageSizes = [10, 20, 30, 40], total = 0 } = defineProps<{
  pageSizes?: number[];
  total?: number;
}>();

//当前分页
const currentPage = defineModel<number>("currentPage", {
  default: 1,
});

//分页条数
const pageSize = defineModel<number>("pageSize", {
  default: 10,
});

const handleSizeChange = throttle((value: number) => {
  //console.log(`每页 ${value} 条`)
  emit("update:pageSize", value);
}, 500);

const handleCurrentChange = throttle((value: number) => {
  //console.log(`当前页: ${value}`)
  emit("update:currentPage", value);
}, 500);
</script>
<style lang="scss" scoped>
.paginate-box {
  margin-top: 1rem;
}
</style>
