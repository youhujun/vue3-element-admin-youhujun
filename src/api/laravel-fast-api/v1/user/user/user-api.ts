/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun 2900976495@qq.com
 * @Date: 2025-10-05 10:03:17
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2025-10-14 09:22:55
 * @FilePath: \src\api\laravel-fast-api\v1\user\user\user-api.ts
 * Copyright (C) 2025 youhujun. All rights reserved.
 */
import request from "@/utils/request";
import type { ApiResult, MultipleSelectId } from "@/api/laravel-fast-api/v1/api-type";

import type {
  UserListResult,
  UserListFrom,
  CreateUserFrom,
  SwitchUserForm,
  DeleteUserFrom,
} from "@/api/laravel-fast-api/v1/user/user/user-type";

const USER_BASE_URL = "/api/v1/admin/user";

const UserAPi = {
  //获取用户列表
  getUserList(data: UserListFrom) {
    return request<any, UserListResult>({
      url: `${USER_BASE_URL}/getUser`,
      method: "post",
      data,
    });
  },
  //添加用户
  create(data: CreateUserFrom) {
    return request<any, ApiResult>({
      url: `${USER_BASE_URL}/addUser`,
      method: "post",
      data,
    });
  },
  //禁用用户
  disable(data: SwitchUserForm) {
    return request<any, ApiResult>({
      url: `${USER_BASE_URL}/disableUser`,
      method: "post",
      data,
    });
  },
  //删除用户
  delete(data: DeleteUserFrom) {
    return request<any, ApiResult>({
      url: `${USER_BASE_URL}/deleteUser`,
      method: "post",
      data,
    });
  },
  //批量禁用
  multipleDisableUser(data: MultipleSelectId) {
    return request<any, ApiResult>({
      url: `${USER_BASE_URL}/multipleDisableUser`,
      method: "post",
      data,
    });
  },
  //批量删除
  multipleDeleteUser(data: MultipleSelectId) {
    return request<any, ApiResult>({
      url: `${USER_BASE_URL}/multipleDeleteUser`,
      method: "post",
      data,
    });
  },
};

export default UserAPi;
