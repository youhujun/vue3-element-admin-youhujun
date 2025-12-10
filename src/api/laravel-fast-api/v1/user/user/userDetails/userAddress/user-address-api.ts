/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun 2900976495@qq.com
 * @Date: 2025-10-14 10:33:16
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-12-01 00:37:40
 * @FilePath: \src\api\laravel-fast-api\v1\user\user\userDetails\userAddress\user-address-api.ts
 * Copyright (C) 2025 youhujun. All rights reserved.
 */
import request from "@/utils/request";
import type { ApiResult } from "@/api/laravel-fast-api/v1/api-type";

import type {
  AddUserAddressFrom,
  SetDefaultUserAddress,
  DeleteUserAddress,
  GetUserAddress,
} from "@/api/laravel-fast-api/v1/user/user/userDetails/userAddress/user-address-type";

const USER_BASE_URL = "/api/v1/admin/user/address";

const UserAddressAPI = {
  //添加用户地址
  addUserAddress(data: AddUserAddressFrom) {
    return request<any, ApiResult>({
      url: `${USER_BASE_URL}/addUserAddress`,
      method: "post",
      data,
    });
  },
  //设置用户默认地址
  setDefaultUserAddress(data: SetDefaultUserAddress) {
    return request<any, ApiResult>({
      url: `${USER_BASE_URL}/setDefaultUserAddress`,
      method: "post",
      data,
    });
  },
  //删除用户地址
  deleteUserAddress(data: DeleteUserAddress) {
    return request<any, ApiResult>({
      url: `${USER_BASE_URL}/deleteUserAddress`,
      method: "post",
      data,
    });
  },
  //获取用户地址
  getUserAddress(data: GetUserAddress) {
    return request<any, ApiResult>({
      url: `${USER_BASE_URL}/getUserAddress`,
      method: "post",
      data,
    });
  },
};
export default UserAddressAPI;
