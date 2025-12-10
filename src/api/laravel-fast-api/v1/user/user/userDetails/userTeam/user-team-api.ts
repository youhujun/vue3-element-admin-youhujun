/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun 2900976495@qq.com
 * @Date: 2025-10-14 11:19:12
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-12-02 23:31:11
 * @FilePath: \src\api\laravel-fast-api\v1\user\user\userDetails\userTeam\user-team-api.ts
 * Copyright (C) 2025 youhujun. All rights reserved.
 */
import request from "@/utils/request";
import type { ApiResult } from "@/api/laravel-fast-api/v1/api-type";

import type {
  GetUserLowerTeam,
  GetUserSource,
} from "@/api/laravel-fast-api/v1/user/user/userDetails/userTeam/user-team-type";

const USER_BASE_URL = "/api/v1/admin/user/team";

const UserTeamAPI = {
  getUserLowerTeam(data: GetUserLowerTeam) {
    return request<any, ApiResult>({
      url: `${USER_BASE_URL}/getUserLowerTeam`,
      method: "post",
      data,
    });
  },

  getUserSource(data: GetUserSource) {
    return request<any, ApiResult>({
      url: `${USER_BASE_URL}/getUserSource`,
      method: "post",
      data,
    });
  },
};
export default UserTeamAPI;
