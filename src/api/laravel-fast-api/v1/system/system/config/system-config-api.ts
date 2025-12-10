/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun youhu8888@163.com
 * @Date: 2025-10-19 01:15:40
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-10-30 14:21:45
 * @FilePath: \src\api\laravel-fast-api\v1\system\system\config\system-config-api.ts
 * Copyright (C) 2025 youhujun. All rights reserved.
 */
import request from "@/utils/request";

import type { ApiResult, MultipleSelectId, DeleteById } from "@/api/laravel-fast-api/v1/api-type";

import type {
  GetSystemConfig,
  AddSystemConfig,
  UpdateSystemConfig,
} from "@/api/laravel-fast-api/v1/system/system/config/system-config-type";

const SYSTEM_CONFIG_BASE_URL = "/api/v1/admin/system/config";

const SystemConfigAPI = {
  getSystemConfig(data: GetSystemConfig) {
    return request<any, ApiResult>({
      url: `${SYSTEM_CONFIG_BASE_URL}/getSystemConfig`,
      method: "post",
      data,
    });
  },
  addSystemConfig(data: AddSystemConfig) {
    return request<any, ApiResult>({
      url: `${SYSTEM_CONFIG_BASE_URL}/addSystemConfig`,
      method: "post",
      data,
    });
  },
  updateSystemConfig(data: UpdateSystemConfig) {
    return request<any, ApiResult>({
      url: `${SYSTEM_CONFIG_BASE_URL}/updateSystemConfig`,
      method: "post",
      data,
    });
  },
  deleteSystemConfig(data: DeleteById) {
    return request<any, ApiResult>({
      url: `${SYSTEM_CONFIG_BASE_URL}/deleteSystemConfig`,
      method: "post",
      data,
    });
  },
  multipleDeleteSystemConfig(data: MultipleSelectId) {
    return request<any, ApiResult>({
      url: `${SYSTEM_CONFIG_BASE_URL}/multipleDeleteSystemConfig`,
      method: "post",
      data,
    });
  },
};

export default SystemConfigAPI;
