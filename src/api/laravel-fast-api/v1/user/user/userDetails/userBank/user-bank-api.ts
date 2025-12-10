/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun youhu8888@163.com
 * @Date: 2025-10-19 01:15:40
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-12-01 21:56:45
 * @FilePath: \src\api\laravel-fast-api\v1\user\user\userDetails\userBank\user-bank-api.ts
 * Copyright (C) 2025 youhujun. All rights reserved.
 */
import request from "@/utils/request";
import type { ApiResult } from "@/api/laravel-fast-api/v1/api-type";

import type {
  SetUserDefaultBank,
  DeleteUserBank,
  GetUserBank,
  AddUserBankForm,
} from "@/api/laravel-fast-api/v1/user/user/userDetails/userBank/user-bank-type";

const USER_BASE_URL = "/api/v1/admin/user/bank";

const UserBankAPI = {
  //设置用户默认银行卡
  setUserDefaultBank(data: SetUserDefaultBank) {
    return request<any, ApiResult>({
      url: `${USER_BASE_URL}/setUserDefaultBank`,
      method: "post",
      data,
    });
  },
  //设置用
  addUserBank(data: AddUserBankForm) {
    return request<any, ApiResult>({
      url: `${USER_BASE_URL}/addUserBank`,
      method: "post",
      data,
    });
  },
  //删除用户银行卡
  deleteUserBank(data: DeleteUserBank) {
    return request<any, ApiResult>({
      url: `${USER_BASE_URL}/deleteUserBank`,
      method: "post",
      data,
    });
  },
  //获取用户银行卡
  getUserBank(data: GetUserBank) {
    return request<any, ApiResult>({
      url: `${USER_BASE_URL}/getUserBank`,
      method: "post",
      data,
    });
  },
};
export default UserBankAPI;
