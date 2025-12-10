/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun youhu8888@163.com
 * @Date: 2025-10-19 01:15:40
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-11-15 11:09:01
 * @FilePath: \src\api\laravel-fast-api\v1\replace\replace\replace-api.ts
 * Copyright (C) 2025 youhujun. All rights reserved.
 */

import request from "@/utils/request";

import type { ApiResult, MultipleSelectId, DeleteById } from "@/api/laravel-fast-api/v1/api-type";

import type {
  GetReplace,
  AddReplace,
  UpdateReplace,
} from "@/api/laravel-fast-api/v1/replace/replace/replace-type";

const REPLACE_BASE_URL = "/api/v1/admin/replace/replace";

const ReplaceAPI = {
  getReplace(data: GetReplace) {
    return request<any, ApiResult>({
      url: `${REPLACE_BASE_URL}/getReplace`,
      method: "post",
      data,
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
  deleteReplace(data: DeleteById) {
    return request<any, ApiResult>({
      url: `${REPLACE_BASE_URL}/deleteReplace`,
      method: "post",
      data,
    });
  },
  multipleDeleteReplace(data: MultipleSelectId) {
    return request<any, ApiResult>({
      url: `${REPLACE_BASE_URL}/multipleDeleteReplace`,
      method: "post",
      data,
    });
  },
};

export default ReplaceAPI;
