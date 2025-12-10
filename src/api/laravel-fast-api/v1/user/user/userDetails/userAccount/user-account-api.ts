/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun 2900976495@qq.com
 * @Date: 2025-10-14 11:19:12
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-12-03 17:47:11
 * @FilePath: \src\api\laravel-fast-api\v1\user\user\userDetails\userAccount\user-account-api.ts
 * Copyright (C) 2025 youhujun. All rights reserved.
 */
import request from "@/utils/request";
import type { ApiResult } from "@/api/laravel-fast-api/v1/api-type";

import type {
  SetUserAccount,
  GetUserAccountLog,
  getUserAccountInfo,
} from "@/api/laravel-fast-api/v1/user/user/userDetails/userAccount/user-account-type";

const USER_BASE_URL = "/api/v1/admin/user/account";

const UserAccountAPI = {
  setUserAccount(data: SetUserAccount) {
    return request<any, ApiResult>({
      url: `${USER_BASE_URL}/setUserAccount`,
      method: "post",
      data,
    });
  },
  getUserAccountLog(data: GetUserAccountLog) {
    return request<any, ApiResult>({
      url: `${USER_BASE_URL}/getUserAccountLog`,
      method: "post",
      data,
    });
  },
  getUserAccountInfo(data: getUserAccountInfo) {
    return request<any, ApiResult>({
      url: `${USER_BASE_URL}/getUserAccountInfo`,
      method: "post",
      data,
    });
  },
};
export default UserAccountAPI;
