/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun youhu8888@163.com
 * @Date: 2025-11-07 23:01:18
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-11-08 11:30:37
 * @FilePath: \src\store\modules\label-store.ts
 * Copyright (C) 2025 youhujun. All rights reserved.
 */
import { store } from "@/store";

import LabelAPI from "@/api/laravel-fast-api/v1/business/group/label/label-api";
import type { TreeLabelItem } from "@/api/laravel-fast-api/v1/business/group/label/label-type";

export const useLabelStore = defineStore("label", () => {
  //树形产品分类
  const treeLabel = ref<TreeLabelItem[]>([]);

  //获取树形产品分类
  const getTreeLabel = () => {
    return new Promise((resolve, reject) => {
      LabelAPI.getTreeLabel()
        .then((result) => {
          const { data } = result;
          treeLabel.value = data;
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  return {
    treeLabel,
    getTreeLabel,
  };
});

/**
 * 在组件外部使用UserStore的钩子函数
 * @see https://pinia.vuejs.org/core-concepts/outside-component-usage.html
 */
export function useLabelStoreHook() {
  return useLabelStore(store);
}
