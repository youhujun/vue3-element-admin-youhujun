/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun youhu8888@163.com
 * @Date: 2025-10-19 20:34:35
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-12-04 12:02:01
 * @FilePath: \src\api\laravel-fast-api\v1\user\user\option\user-option-type.ts
 * Copyright (C) 2025 youhujun. All rights reserved.
 */
export interface GetDefaultUser {
  real_auth_status: null | number;
}

export interface FindUser {
  find: string | null;
  real_auth_status: number;
}
