/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun 2900976495@qq.com
 * @Date: 2025-10-15 15:22:13
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2025-10-15 15:32:51
 * @FilePath: \src\api\laravel-fast-api\v1\system\system\bank\option\bank-option-api.ts
 * Copyright (C) 2025 youhujun. All rights reserved.
 */
import request from "@/utils/request";

import type { ApiResult } from "@/api/laravel-fast-api/v1/api-type";

import type {
  GetDefaultUser,
  FindUser,
} from "@/api/laravel-fast-api/v1/user/user/option/user-option-type";

const USER_OPTION_BASE_URL = "/api/v1/admin/user/user-item";

const UserOptionAPI = {
  findUser(data: FindUser) {
    return request<any, ApiResult>({
      url: `${USER_OPTION_BASE_URL}/findUser`,
      method: "post",
      data,
    });
  },
  getDefaultUser(data: GetDefaultUser) {
    return request<any, ApiResult>({
      url: `${USER_OPTION_BASE_URL}/getDefaultUser`,
      method: "get",
      data,
    });
  },
};

export default UserOptionAPI;
