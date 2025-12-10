/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun youhu8888@163.com
 * @Date: 2025-10-19 01:15:40
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-11-21 08:56:35
 * @FilePath: \src\api\laravel-fast-api\v1\system\region\region-api.ts
 * Copyright (C) 2025 youhujun. All rights reserved.
 */
import request from "@/utils/request";

import type { ApiResult, DeleteById } from "@/api/laravel-fast-api/v1/api-type";

import type {
  AddRegion,
  UpdateRegion,
  MoveRegion,
} from "@/api/laravel-fast-api/v1/system/region/region-type";

const SYSTEM_REGION_BASE_URL = "/api/v1/admin/region";

const RegionAPI = {
  getTreeRegions() {
    return request<any, ApiResult>({
      url: `${SYSTEM_REGION_BASE_URL}/getTreeRegions`,
      method: "get",
    });
  },
  getRegions() {
    return request<any, ApiResult>({
      url: `${SYSTEM_REGION_BASE_URL}/getRegions`,
      method: "get",
    });
  },
  addRegion(data: AddRegion) {
    return request<any, ApiResult>({
      url: `${SYSTEM_REGION_BASE_URL}/addRegion`,
      method: "post",
      data,
    });
  },
  updateRegion(data: UpdateRegion) {
    return request<any, ApiResult>({
      url: `${SYSTEM_REGION_BASE_URL}/updateRegion`,
      method: "post",
      data,
    });
  },
  moveRegion(data: MoveRegion) {
    return request<any, ApiResult>({
      url: `${SYSTEM_REGION_BASE_URL}/moveRegion`,
      method: "post",
      data,
    });
  },
  deleteRegion(data: DeleteById) {
    return request<any, ApiResult>({
      url: `${SYSTEM_REGION_BASE_URL}/deleteRegion`,
      method: "post",
      data,
    });
  },
};

export default RegionAPI;
