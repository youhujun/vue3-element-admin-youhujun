/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun 2900976495@qq.com
 * @Date: 2025-10-15 14:10:02
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2025-10-15 14:45:54
 * @FilePath: \src\api\laravel-fast-api\v1\system\system\bank\bank-api.ts
 * Copyright (C) 2025 youhujun. All rights reserved.
 */
import request from "@/utils/request";

import type { ApiResult, DeleteById, MultipleSelectId } from "@/api/laravel-fast-api/v1/api-type";

import type { GetAdminLoginLog } from "@/api/laravel-fast-api/v1/log/login/admin/admin-login-log-type";

const ADMIN_LOGIN_LOG_BASE_URL = "/api/v1/admin/log";

const AdminLoginLogAPI = {
  getAdminLoginLog(data: GetAdminLoginLog) {
    return request<any, ApiResult>({
      url: `${ADMIN_LOGIN_LOG_BASE_URL}/getAdminLoginLog`,
      method: "post",
      data,
    });
  },
  deleteAdminLoginLog(data: DeleteById) {
    return request<any, ApiResult>({
      url: `${ADMIN_LOGIN_LOG_BASE_URL}/deleteAdminLoginLog`,
      method: "post",
      data,
    });
  },
  multipleDeleteAdminLoginLog(data: MultipleSelectId) {
    return request<any, ApiResult>({
      url: `${ADMIN_LOGIN_LOG_BASE_URL}/multipleDeleteAdminLoginLog`,
      method: "post",
      data,
    });
  },
};

export default AdminLoginLogAPI;
