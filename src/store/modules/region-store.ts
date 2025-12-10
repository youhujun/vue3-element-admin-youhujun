/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun youhu8888@163.com
 * @Date: 2025-11-30 19:54:06
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-11-30 20:03:27
 * @FilePath: \src\store\modules\region-store.ts
 * Copyright (C) 2025 youhujun. All rights reserved.
 */
import { store } from "@/store";

import RegionAPI from "@/api/laravel-fast-api/v1/system/region/region-api";
import type { TreeRegionItem } from "@/api/laravel-fast-api/v1/system/region/region-type";

//定义属性地区
export const useRegionStore = defineStore("region", () => {
  //定义树形地区
  const treeRegion = ref<TreeRegionItem[]>([]);

  //获取树形地区
  const getTreeRegion = () => {
    return new Promise((resovle, reject) => {
      RegionAPI.getTreeRegions()
        .then((result) => {
          const { data } = result;
          treeRegion.value = data;
          resovle(treeRegion.value);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  return {
    treeRegion,
    getTreeRegion,
  };
});
/**
 * 在组件外部使用UserStore的钩子函数
 * @see https://pinia.vuejs.org/core-concepts/outside-component-usage.html
 */
export function useRegionStoreHook() {
  return useRegionStore(store);
}
