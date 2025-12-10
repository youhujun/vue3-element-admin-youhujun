/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun youhu8888@163.com
 * @Date: 2025-10-19 17:02:31
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-11-27 10:19:00
 * @FilePath: \src\api\laravel-fast-api\v1\business\level\userLevel\user-level-api.ts
 * Copyright (C) 2025 youhujun. All rights reserved.
 */
import request from "@/utils/request";

import type {
  ApiResult,
  BaseGetDataList,
  DeleteById,
  MultipleSelectId,
} from "@/api/laravel-fast-api/v1/api-type";

import type {
  AddUserLevel,
  UpdateUserLevel,
} from "@/api/laravel-fast-api/v1/business/level/userLevel/user-level-type";

const USER_LEVEL_BASE_URL = "/api/v1/admin/level/user-level";

const UserLevelAPI = {
  getUserLevel(data: BaseGetDataList) {
    return request<any, ApiResult>({
      url: `${USER_LEVEL_BASE_URL}/getUserLevel`,
      method: "post",
      data,
    });
  },
  addUserLevel(data: AddUserLevel) {
    return request<any, ApiResult>({
      url: `${USER_LEVEL_BASE_URL}/addUserLevel`,
      method: "post",
      data,
    });
  },
  updateUserLevel(data: UpdateUserLevel) {
    return request<any, ApiResult>({
      url: `${USER_LEVEL_BASE_URL}/updateUserLevel`,
      method: "post",
      data,
    });
  },

  deleteUserLevel(data: DeleteById) {
    return request<any, ApiResult>({
      url: `${USER_LEVEL_BASE_URL}/deleteUserLevel`,
      method: "post",
      data,
    });
  },
  multipleDeleteUserLevel(data: MultipleSelectId) {
    return request<any, ApiResult>({
      url: `${USER_LEVEL_BASE_URL}/multipleDeleteUserLevel`,
      method: "post",
      data,
    });
  },
};

export default UserLevelAPI;
