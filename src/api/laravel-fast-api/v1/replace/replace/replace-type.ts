/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun youhu8888@163.com
 * @Date: 2025-10-24 11:06:16
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-11-19 11:57:33
 * @FilePath: \src\api\laravel-fast-api\v1\replace\replace\replace-type.ts
 * Copyright (C) 2025 youhujun. All rights reserved.
 */
import type { BaseGetDataList } from "@/api/laravel-fast-api/v1/api-type";

export interface GetReplace extends BaseGetDataList {
  type?: number;
}

export interface AddReplace {
  replace_name: string;
  replace_value: string;
  type: number;
  replace_path: string;
  replace_url: string;
  category_id: number[][];
  categoryArray: number[];
  time: string;
  note: string;
  sort: number;
}

export interface UpdateReplace extends AddReplace {
  id: number;
}

export interface ReplaceItem {
  id: number;
  replace_name: string;
  replace_value: string;
  type: number;
  replace_path: string;
  replace_url: string;
  note: string;
  category_id: number[][];
  categoryArray: number[];
  time: string;
  created_at: string;
  updated_at: null | string;
  sort: number;
}
