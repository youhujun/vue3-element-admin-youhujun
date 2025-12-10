<!--
 * @Descripttion: 
 * @version: v1
 * @Author: youhujun youhu8888@163.com
 * @Date: 2025-12-04 20:55:00
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-12-04 21:11:54
 * @FilePath: \src\pages\laravel-fast-api\v1\components\element\Role\SelectRole.vue
 * Copyright (C) 2025 youhujun. All rights reserved.
-->
<!-- 使用示例:
 <SelectRole v-model:role-id-array="createForm.role"></SelectRole>
  -->
<template>
  <div>
    <el-cascader
      ref="role"
      v-model="roleIdItemArray"
      :options="roleOptions"
      :props="{
        expandTrigger: 'hover',
        value: 'id',
        label: 'role_name',
        // 修正：没有children的节点才是叶子节点（最末级）
        leaf: (data) => !data.children || data.children.length === 0,
        checkStrictly: true,
        multiple: true,
      }"
      filterable
      clearable
      :show-all-levels="false"
      @change="handleRoleChange"
    >
      <template #default="{ node, data }">
        <!-- Vue3中推荐用#替代v-slot: -->
        <span>{{ data.role_name }}</span>
        <span v-if="!node.isLeaf && data.children">({{ data.children.length }})</span>
      </template>
    </el-cascader>
  </div>
</template>
<script setup lang="ts">
//系统
import type { CascaderValue } from "element-plus";
//api 和 type

import SystemRoleAPI from "@/api/laravel-fast-api/v1/system/role/role-api";
import type { TreeRoleItem } from "@/api/laravel-fast-api/v1/system/role/role-type";

defineOptions({
  name: "SelectRole",
});

//定义分类id数组
const roleIdItemArray = defineModel<number[][]>("roleIdItemArray", {
  default: [],
});

//定义分类数组
const roleIdArray = defineModel<number[]>("roleIdArray", {
  default: [],
});

//定义角色选项
const roleOptions = ref<TreeRoleItem[]>([]);

//选择分类
const handleRoleChange = (role: CascaderValue | null | undefined) => {
  //console.log(role)
  const roleArray: number[] = [];
  // 2. 先判断role是否为数组，避免forEach报错
  if (Array.isArray(role)) {
    role.forEach((element) => {
      // 3. 确保element是数组，再取最后一项（适配级联选择器的多选格式）
      if (Array.isArray(element)) {
        roleArray.push(element[element.length - 1]);
      } else {
        // 若element不是数组，直接推入（兼容特殊场景）
        roleArray.push(element);
      }
    });
  }
  roleIdArray.value = roleArray;
};

//定义获取树形角色
const getTreeRole = async () => {
  const result = await SystemRoleAPI.getTreeRole();
  roleOptions.value = result.data;
};

//组件加载
onMounted(() => {
  getTreeRole();
});
</script>

<style lang="scss" scoped></style>
