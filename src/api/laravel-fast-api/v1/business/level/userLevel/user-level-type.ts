/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun youhu8888@163.com
 * @Date: 2025-10-19 17:02:31
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-11-27 11:12:50
 * @FilePath: \src\api\laravel-fast-api\v1\business\level\userLevel\user-level-type.ts
 * Copyright (C) 2025 youhujun. All rights reserved.
 */
export interface LevelItem {
  user_level_item_unon_id: number;
  level_item_id: number;
  item_name: string;
  item_code: string;
  description: string;
  value_type: number | string;
  value: number | string;
}

export interface UserLevelListItem {
  id: number;
  sort: number;
  created_at: string;
  updated_at?: null | string;
  switch?: null | number;
  level_name: string;
  level_code: string;
  amount?: string | number;
  background_id?: number;
  note?: null | string;
  background?: string | null;
  level_item?: LevelItem[];
}

export interface AddUserLevel {
  sort: number;
  level_name: string;
  level_code: string;
  amount: string | number;
  background_id: number;
  note: string;
}

export interface UpdateUserLevel extends AddUserLevel {
  id: number;
  background?: string | null;
}
