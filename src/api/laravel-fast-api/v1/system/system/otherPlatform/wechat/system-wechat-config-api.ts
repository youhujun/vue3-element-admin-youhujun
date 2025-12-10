/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun 2900976495@qq.com
 * @Date: 2025-10-15 10:26:21
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2025-10-15 12:41:34
 * @FilePath: \src\api\laravel-fast-api\v1\system\system\otherPlatform\wechat\system-wechat-config-api.ts
 * Copyright (C) 2025 youhujun. All rights reserved.
 */
import request from "@/utils/request";

import type { ApiResult, DeleteData, MultipleDeleteData } from "@/api/laravel-fast-api/v1/api-type";

import type {
  GetSystemWechatConfig,
  AddSystemWechatConfig,
  UpdateSystemWechatConfig,
} from "@/api/laravel-fast-api/v1/system/system/otherPlatform/wechat/system-wechat-config-type";

const SYSTEM_WECHAT_CONFIG_BASE_URL = "/api/v1/admin/system/other-platform";

const SystemWechatConfigAPI = {
  getSystemWechatConfig(data: GetSystemWechatConfig) {
    return request<any, ApiResult>({
      url: `${SYSTEM_WECHAT_CONFIG_BASE_URL}/getSystemWechatConfig`,
      method: "post",
      data,
    });
  },
  addSystemWechatConfig(data: AddSystemWechatConfig) {
    return request<any, ApiResult>({
      url: `${SYSTEM_WECHAT_CONFIG_BASE_URL}/addSystemWechatConfig`,
      method: "post",
      data,
    });
  },
  updateSystemWechatConfig(data: UpdateSystemWechatConfig) {
    return request<any, ApiResult>({
      url: `${SYSTEM_WECHAT_CONFIG_BASE_URL}/updateSystemWechatConfig`,
      method: "post",
      data,
    });
  },
  deleteSystemWechatConfig(data: DeleteData) {
    return request<any, ApiResult>({
      url: `${SYSTEM_WECHAT_CONFIG_BASE_URL}/deleteSystemWechatConfig`,
      method: "post",
      data,
    });
  },
  multipleDeleteSystemWechatConfig(data: MultipleDeleteData) {
    return request<any, ApiResult>({
      url: `${SYSTEM_WECHAT_CONFIG_BASE_URL}/multipleDeleteSystemWechatConfig`,
      method: "post",
      data,
    });
  },
};

export default SystemWechatConfigAPI;
