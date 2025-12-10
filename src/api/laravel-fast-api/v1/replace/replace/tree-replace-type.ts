/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun youhu8888@163.com
 * @Date: 2025-10-24 11:06:16
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-11-14 17:24:44
 * @FilePath: \src\api\laravel-fast-api\v1\replace\replace\tree-replace-type.ts
 * Copyright (C) 2025 youhujun. All rights reserved.
 */
import type { BaseGetDataList } from "@/api/laravel-fast-api/v1/api-type";

//树形结构
export interface GetTreeReplace extends BaseGetDataList {
  type?: number;
}

export interface ReplaceItem {
  id: number;
  parent_id: number;
  deep: number;
  replace_name: string;
  sort: number;
  children?: ReplaceItem[];
}

export interface AddReplace {
  id: number;
  parent_id: number;
  deep: number;
  replace_name: string;
  sort: number;
}

export interface UpdateReplace {
  id: number;
  replace_name: string;
  sort: number;
}

export interface MoveReplace {
  id: number;
  parent_id: number;
  dropType: string;
  sort: number;
}
