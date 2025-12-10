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

import type { GetUserLoginLog } from "@/api/laravel-fast-api/v1/log/login/phone/user-login-log-type";

const USER_LOGIN_LOG_BASE_URL = "/api/v1/admin/log";

const PhoneLoginLogAPI = {
  getUserLoginLog(data: GetUserLoginLog) {
    return request<any, ApiResult>({
      url: `${USER_LOGIN_LOG_BASE_URL}/getUserLoginLog`,
      method: "post",
      data,
    });
  },
  deleteUserLoginLog(data: DeleteById) {
    return request<any, ApiResult>({
      url: `${USER_LOGIN_LOG_BASE_URL}/deleteUserLoginLog`,
      method: "post",
      data,
    });
  },
  multipleDeleteUserLoginLog(data: MultipleSelectId) {
    return request<any, ApiResult>({
      url: `${USER_LOGIN_LOG_BASE_URL}/multipleDeleteUserLoginLog`,
      method: "post",
      data,
    });
  },
};

export default PhoneLoginLogAPI;
