/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun 2900976495@qq.com
 * @Date: 2025-10-14 11:19:12
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-12-02 11:31:03
 * @FilePath: \src\api\laravel-fast-api\v1\user\user\userDetails\userIdCard\user-idcard-api.ts
 * Copyright (C) 2025 youhujun. All rights reserved.
 */
import request from "@/utils/request";
import type { ApiResult } from "@/api/laravel-fast-api/v1/api-type";

import type {
  UpdateUserIdNumber,
  GetUserIdCard,
  SetUserIdCard,
} from "@/api/laravel-fast-api/v1/user/user/userDetails/userIdCard/user-idcard-type";

const USER_BASE_URL = "/api/v1/admin/user/real-auth";

const UserIdCardAPI = {
  updateUserIdNumber(data: UpdateUserIdNumber) {
    return request<any, ApiResult>({
      url: `${USER_BASE_URL}/updateUserIdNumber`,
      method: "post",
      data,
    });
  },

  getUserIdCard(data: GetUserIdCard) {
    return request<any, ApiResult>({
      url: `${USER_BASE_URL}/getUserIdCard`,
      method: "post",
      data,
    });
  },

  setUserIdCard(data: SetUserIdCard) {
    return request<any, ApiResult>({
      url: `${USER_BASE_URL}/setUserIdCard`,
      method: "post",
      data,
    });
  },
};
export default UserIdCardAPI;
