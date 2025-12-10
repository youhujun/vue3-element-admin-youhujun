/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun 2900976495@qq.com
 * @Date: 2025-10-15 10:26:21
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-11-23 11:38:50
 * @FilePath: \src\api\laravel-fast-api\v1\system\system\otherPlatform\douyin\system-douyin-config-api.ts
 * Copyright (C) 2025 youhujun. All rights reserved.
 */
import request from "@/utils/request";

import type { ApiResult, DeleteData, MultipleDeleteData } from "@/api/laravel-fast-api/v1/api-type";

import type {
  GetSystemDouyinConfig,
  AddSystemDouyinConfig,
  UpdateSystemDouyinConfig,
} from "@/api/laravel-fast-api/v1/system/system/otherPlatform/douyin/system-douyin-config-type";

const SYSTEM_DOUYIN_CONFIG_BASE_URL = "/api/v1/admin/system/other-platform";

const SystemDouyinConfigAPI = {
  getSystemDouyinConfig(data: GetSystemDouyinConfig) {
    return request<any, ApiResult>({
      url: `${SYSTEM_DOUYIN_CONFIG_BASE_URL}/getSystemDouyinConfig`,
      method: "post",
      data,
    });
  },
  addSystemDouyinConfig(data: AddSystemDouyinConfig) {
    return request<any, ApiResult>({
      url: `${SYSTEM_DOUYIN_CONFIG_BASE_URL}/addSystemDouyinConfig`,
      method: "post",
      data,
    });
  },
  updateSystemDouyinConfig(data: UpdateSystemDouyinConfig) {
    return request<any, ApiResult>({
      url: `${SYSTEM_DOUYIN_CONFIG_BASE_URL}/updateSystemDouyinConfig`,
      method: "post",
      data,
    });
  },
  deleteSystemDouyinConfig(data: DeleteData) {
    return request<any, ApiResult>({
      url: `${SYSTEM_DOUYIN_CONFIG_BASE_URL}/deleteSystemDouyinConfig`,
      method: "post",
      data,
    });
  },
  multipleDeleteSystemDouyinConfig(data: MultipleDeleteData) {
    return request<any, ApiResult>({
      url: `${SYSTEM_DOUYIN_CONFIG_BASE_URL}/multipleDeleteSystemDouyinConfig`,
      method: "post",
      data,
    });
  },
};

export default SystemDouyinConfigAPI;
