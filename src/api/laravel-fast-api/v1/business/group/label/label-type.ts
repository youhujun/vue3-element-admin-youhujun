/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun youhu8888@163.com
 * @Date: 2025-10-19 17:02:31
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-11-25 12:23:37
 * @FilePath: \src\api\laravel-fast-api\v1\business\group\label\label-type.ts
 * Copyright (C) 2025 youhujun. All rights reserved.
 */
export interface TreeLabelItem {
  id: number;
  parent_id: number;
  deep: number;
  switch: number;
  label_name: string;
  label_code: null | string;
  note: null | string;
  created_at: string;
  sort: number;
  picture?: null | string;
  children?: TreeLabelItem[];
}

export interface AddLabel {
  id?: number;
  label_code: string | null;
  label_name: string;
  label_picture_id?: number | null;
  deep: number;
  parent_id: number;
  note: string;
  sort: number;
}

export interface UpdateLabel extends AddLabel {
  picture?: null | string;
}
