/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun 2900976495@qq.com
 * @Date: 2025-10-15 15:22:13
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2025-10-15 15:32:51
 * @FilePath: \src\api\laravel-fast-api\v1\system\system\bank\option\bank-option-api.ts
 * Copyright (C) 2025 youhujun. All rights reserved.UserLevel
 */
import request from "@/utils/request";

import type { ApiResult, OptionFind } from "@/api/laravel-fast-api/v1/api-type";

const USER_LEVEL_OPTION_BASE_URL = "/api/v1/admin/level/user-level";

const UserLevelOptionAPI = {
  findUserLevel(data: OptionFind) {
    return request<any, ApiResult>({
      url: `${USER_LEVEL_OPTION_BASE_URL}/findUserLevel`,
      method: "post",
      data,
    });
  },
  defaultUserLevel() {
    return request<any, ApiResult>({
      url: `${USER_LEVEL_OPTION_BASE_URL}/defaultUserLevel`,
      method: "get",
    });
  },
};

export default UserLevelOptionAPI;
