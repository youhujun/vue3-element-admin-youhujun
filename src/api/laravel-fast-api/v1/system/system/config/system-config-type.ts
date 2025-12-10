/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun 2900976495@qq.com
 * @Date: 2025-10-15 10:26:41
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-10-30 14:24:16
 * @FilePath: \src\api\laravel-fast-api\v1\system\system\config\system-config-type.ts
 * Copyright (C) 2025 youhujun. All rights reserved.
 */
import type { BaseGetDataList } from "@/api/laravel-fast-api/v1/api-type";

import { ItemType } from "@/api/laravel-fast-api/v1/system/system/config/system-config-enum";

export interface GetSystemConfig extends BaseGetDataList {
  item_type?: number;
}

export interface AddSystemConfig {
  item_type: ItemType;
  item_label: string;
  item_name: string;
  item_price: number;
  item_value: string;
  item_path: string;
  item_introduction: string;
  sort: number;
}

export interface UpdateSystemConfig extends AddSystemConfig {
  id: number;
}

export interface SystemConfigItem {
  id: number;
  item_type: number;
  item_label: string;
  item_value: string;
  item_introduction: string;
  created_at: string;
  updated_at: null | string;
  sort: number;
}
