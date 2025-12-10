/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun 2900976495@qq.com
 * @Date: 2025-10-15 14:10:02
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-11-25 11:55:40
 * @FilePath: \src\api\laravel-fast-api\v1\business\group\label\label-api.ts
 * Copyright (C) 2025 youhujun. All rights reserved.
 */
import request from "@/utils/request";

import type { ApiResult, DeleteData, MoveTreeData } from "@/api/laravel-fast-api/v1/api-type";

import type {
  AddLabel,
  UpdateLabel,
} from "@/api/laravel-fast-api/v1/business/group/label/label-type";

const BUSINESS_GROUP_GOODS_CLASS_BASE_URL = "/api/v1/admin/group/label";

const LabelAPI = {
  getTreeLabel() {
    return request<any, ApiResult>({
      url: `${BUSINESS_GROUP_GOODS_CLASS_BASE_URL}/getTreeLabel`,
      method: "get",
    });
  },
  addLabel(data: AddLabel) {
    return request<any, ApiResult>({
      url: `${BUSINESS_GROUP_GOODS_CLASS_BASE_URL}/addLabel`,
      method: "post",
      data,
    });
  },
  updateLabel(data: UpdateLabel) {
    return request<any, ApiResult>({
      url: `${BUSINESS_GROUP_GOODS_CLASS_BASE_URL}/updateLabel`,
      method: "post",
      data,
    });
  },
  moveLabel(data: MoveTreeData) {
    return request<any, ApiResult>({
      url: `${BUSINESS_GROUP_GOODS_CLASS_BASE_URL}/moveLabel`,
      method: "post",
      data,
    });
  },

  deleteLabel(data: DeleteData) {
    return request<any, ApiResult>({
      url: `${BUSINESS_GROUP_GOODS_CLASS_BASE_URL}/deleteLabel`,
      method: "post",
      data,
    });
  },
};

export default LabelAPI;
