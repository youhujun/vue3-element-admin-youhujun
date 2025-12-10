/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun 2900976495@qq.com
 * @Date: 2025-08-03 12:29:25
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2025-10-15 08:53:24
 * @FilePath: \src\api\laravel-fast-api\v1\login\afterlogin.api.ts
 * Copyright (C) 2025 youhujun. All rights reserved.
 */

import request from "@/utils/request";

import type { ApiResult } from "@/api/laravel-fast-api/v1/api-type";

const AFTER_LOGIN_BASE_URL = "/api/v1/admin/after-login";

const AfterLoginAPI = {
  getAdminInfo() {
    return request<any, ApiResult>({
      url: `${AFTER_LOGIN_BASE_URL}/getAdminInfo`,
      method: "get",
    });
  },
  getTreePermission() {
    return request<any, ApiResult>({
      url: `${AFTER_LOGIN_BASE_URL}/getTreePermission`,
      method: "get",
    });
  },
  getAllSystemVoiceConfig() {
    return request<any, ApiResult>({
      url: `${AFTER_LOGIN_BASE_URL}/getAllSystemVoiceConfig`,
      method: "get",
    });
  },
};

export default AfterLoginAPI;
