/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun youhu8888@163.com
 * @Date: 2025-10-19 01:15:40
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-11-14 17:30:00
 * @FilePath: \src\api\laravel-fast-api\v1\replace\replace\tree-replce-api.ts
 * Copyright (C) 2025 youhujun. All rights reserved.
 */

import request from "@/utils/request";

import type { ApiResult, DeleteById } from "@/api/laravel-fast-api/v1/api-type";

import type {
  AddReplace,
  UpdateReplace,
  MoveReplace,
} from "@/api/laravel-fast-api/v1/replace/replace/tree-replace-type";

const REPLACE_BASE_URL = "/api/v1/admin/replace/replace";

const ReplaceAPI = {
  getTreeReplace() {
    return request<any, ApiResult>({
      url: `${REPLACE_BASE_URL}/getTreeReplace`,
      method: "post",
    });
  },

  addReplace(data: AddReplace) {
    return request<any, ApiResult>({
      url: `${REPLACE_BASE_URL}/addReplace`,
      method: "post",
      data,
    });
  },

  updateReplace(data: UpdateReplace) {
    return request<any, ApiResult>({
      url: `${REPLACE_BASE_URL}/updateReplace`,
      method: "post",
      data,
    });
  },
  moveReplace(data: MoveReplace) {
    return request<any, ApiResult>({
      url: `${REPLACE_BASE_URL}/moveReplace`,
      method: "post",
      data,
    });
  },
  deleteReplace(data: DeleteById) {
    return request<any, ApiResult>({
      url: `${REPLACE_BASE_URL}/deleteReplace`,
      method: "post",
      data,
    });
  },
};

export default ReplaceAPI;
