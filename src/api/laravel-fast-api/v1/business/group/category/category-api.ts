/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun 2900976495@qq.com
 * @Date: 2025-10-15 14:10:02
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-11-25 11:55:31
 * @FilePath: \src\api\laravel-fast-api\v1\business\group\category\category-api.ts
 * Copyright (C) 2025 youhujun. All rights reserved.
 */
import request from "@/utils/request";

import type { ApiResult, DeleteData, MoveTreeData } from "@/api/laravel-fast-api/v1/api-type";

import type {
  AddCategory,
  UpdateCategory,
} from "@/api/laravel-fast-api/v1/business/group/category/category-type";

const BUSINESS_GROUP_GOODS_CLASS_BASE_URL = "/api/v1/admin/group/category";

const CategoryAPI = {
  getTreeCategory() {
    return request<any, ApiResult>({
      url: `${BUSINESS_GROUP_GOODS_CLASS_BASE_URL}/getTreeCategory`,
      method: "get",
    });
  },
  addCategory(data: AddCategory) {
    return request<any, ApiResult>({
      url: `${BUSINESS_GROUP_GOODS_CLASS_BASE_URL}/addCategory`,
      method: "post",
      data,
    });
  },
  updateCategory(data: UpdateCategory) {
    return request<any, ApiResult>({
      url: `${BUSINESS_GROUP_GOODS_CLASS_BASE_URL}/updateCategory`,
      method: "post",
      data,
    });
  },
  moveCategory(data: MoveTreeData) {
    return request<any, ApiResult>({
      url: `${BUSINESS_GROUP_GOODS_CLASS_BASE_URL}/moveCategory`,
      method: "post",
      data,
    });
  },

  deleteCategory(data: DeleteData) {
    return request<any, ApiResult>({
      url: `${BUSINESS_GROUP_GOODS_CLASS_BASE_URL}/deleteCategory`,
      method: "post",
      data,
    });
  },
};

export default CategoryAPI;
