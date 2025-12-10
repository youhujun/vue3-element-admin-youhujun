/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun youhu8888@163.com
 * @Date: 2025-10-19 01:15:40
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-12-03 17:01:48
 * @FilePath: \src\api\laravel-fast-api\v1\user\user\userDetails\userAccount\user-account-type.ts
 * Copyright (C) 2025 youhujun. All rights reserved.
 */
export interface SetUserAccount {
  user_id: number;
  account_type: number;
  action_type: number;
  amount: number;
}

export interface getUserAccountInfo {
  user_id: number;
}

export interface GetUserAccountLog {
  user_id: number;
  account_type: number;
  action_type: number;
  currentPage: number;
  pageSize: number;
  sortType: number;
  timeRange: string[];
}

export interface UserAccountLogItem {
  id: number;
  user_id: number;
  amount: number | string;
  before_amount: number | string;
  change_type: number;
  change_value: string | number;
  note: string;
  created_at: string;
  updated_at?: null | string;
  sort: number;
}
