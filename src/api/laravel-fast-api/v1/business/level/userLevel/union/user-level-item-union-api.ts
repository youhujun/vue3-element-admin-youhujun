/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun youhu8888@163.com
 * @Date: 2025-10-19 17:02:31
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-11-27 18:27:52
 * @FilePath: \src\api\laravel-fast-api\v1\business\level\userLevel\union\user-level-item-union-api.ts
 * Copyright (C) 2025 youhujun. All rights reserved.
 */
import request from "@/utils/request";

import type { ApiResult, DeleteById } from "@/api/laravel-fast-api/v1/api-type";

import type {
  AddUserLevelItemUnion,
  UpdateUserLevelItemUnion,
} from "@/api/laravel-fast-api/v1/business/level/userLevel/union/user-level-item-union-type";

const USER_LEVEL_ITEM_UNION_BASE_URL = "/api/v1/admin/level/user-level";

const UserLevelItemUnionAPI = {
  addUserLevelItemUnion(data: AddUserLevelItemUnion) {
    return request<any, ApiResult>({
      url: `${USER_LEVEL_ITEM_UNION_BASE_URL}/addUserLevelItemUnion`,
      method: "post",
      data,
    });
  },
  updateUserLevelItemUnion(data: UpdateUserLevelItemUnion) {
    return request<any, ApiResult>({
      url: `${USER_LEVEL_ITEM_UNION_BASE_URL}/updateUserLevelItemUnion`,
      method: "post",
      data,
    });
  },
  deleteUserLevelItemUnion(data: DeleteById) {
    return request<any, ApiResult>({
      url: `${USER_LEVEL_ITEM_UNION_BASE_URL}/deleteUserLevelItemUnion`,
      method: "post",
      data,
    });
  },
};

export default UserLevelItemUnionAPI;
