/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun 2900976495@qq.com
 * @Date: 2025-10-14 11:19:12
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-12-01 16:05:40
 * @FilePath: \src\api\laravel-fast-api\v1\user\user\userDetails\userQrcode\user-qrcode-api.ts
 * Copyright (C) 2025 youhujun. All rights reserved.
 */
import request from "@/utils/request";
import type { ApiResult } from "@/api/laravel-fast-api/v1/api-type";

import type { GetUserQrcode } from "@/api/laravel-fast-api/v1/user/user/userDetails/userQrcode/user-qrcode-type";

const USER_BASE_URL = "/api/v1/admin/user/details";

const UserQrcodeAPI = {
  getUserQrcode(data: GetUserQrcode) {
    return request<any, ApiResult>({
      url: `${USER_BASE_URL}/getUserQrcode`,
      method: "post",
      data,
    });
  },
  makeUserQrcode(data: GetUserQrcode) {
    return request<any, ApiResult>({
      url: `${USER_BASE_URL}/makeUserQrcode`,
      method: "post",
      data,
    });
  },
};
export default UserQrcodeAPI;
