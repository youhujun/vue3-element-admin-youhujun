/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun youhu8888@163.com
 * @Date: 2025-11-07 23:00:33
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-12-09 04:19:58
 * @FilePath: \src\store\modules\goods-calss-store.ts
 * Copyright (C) 2025 youhujun. All rights reserved.
 */

import { store } from "@/store";

import GoodsClassAPI from "@/api/laravel-fast-api/v1/business/group/goodsClass/goods-class-api";
import type { TreeGoodsClassItem } from "@/api/laravel-fast-api/v1/business/group/goodsClass/goods-class-type";

export const useGoodsClassStore = defineStore("goodsClass", () => {
  //树形产品分类
  const treeGoodsClass = ref<TreeGoodsClassItem[]>([]);

  //获取树形产品分类
  const getTreeGoodsClass = () => {
    return new Promise((resolve, reject) => {
      GoodsClassAPI.getTreeGoodsClass()
        .then((result) => {
          const { data } = result;
          treeGoodsClass.value = data;
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  return {
    treeGoodsClass,
    getTreeGoodsClass,
  };
});

/**
 * 在组件外部使用UserStore的钩子函数
 * @see https://pinia.vuejs.org/core-concepts/outside-component-usage.html
 */
export function useGoodsClassStoreHook() {
  return useGoodsClassStore(store);
}
