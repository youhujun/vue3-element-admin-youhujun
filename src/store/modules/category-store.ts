/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun youhu8888@163.com
 * @Date: 2025-11-07 11:13:01
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-11-30 20:04:13
 * @FilePath: \src\store\modules\category-store.ts
 * Copyright (C) 2025 youhujun. All rights reserved.
 */
import { store } from "@/store";

import CategoryAPI from "@/api/laravel-fast-api/v1/business/group/category/category-api";
import type { TreeCategoryItem } from "@/api/laravel-fast-api/v1/business/group/category/category-type";

//定义树形分类
export const useCategoryStore = defineStore("category", () => {
  //树形分类
  const treeCategory = ref<TreeCategoryItem[]>([]);

  //获取树形分类
  const getTreeCategory = () => {
    return new Promise((resovle, reject) => {
      //调用获取树形分类的接口
      CategoryAPI.getTreeCategory()
        .then((result) => {
          const { data } = result;
          treeCategory.value = data;
          resovle(treeCategory.value);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  return {
    treeCategory,
    getTreeCategory,
  };
});

/**
 * 在组件外部使用UserStore的钩子函数
 * @see https://pinia.vuejs.org/core-concepts/outside-component-usage.html
 */
export function useCategoryStoreHook() {
  return useCategoryStore(store);
}
