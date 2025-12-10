/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun youhu8888@163.com
 * @Date: 2025-10-19 20:34:35
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-12-05 16:37:19
 * @FilePath: \src\api\laravel-fast-api\v1\log\login\phone\user-login-log-type.ts
 * Copyright (C) 2025 youhujun. All rights reserved.
 */
import type { BaseGetDataList } from "@/api/laravel-fast-api/v1/api-type";

export interface GetUserLoginLog extends BaseGetDataList {
  user_id: number | null;
  status: number | null;
}

export interface UserLoginLogListItem {
  id: number;
  created_at: string;
  user_id: number;
  status: number;
  ip: string;
  instruction: string;
  source: string | number;
  phone: null | string;
  account_name: string;
  nick_name: string;
}
