/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun 2900976495@qq.com
 * @Date: 2025-10-15 13:51:30
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2025-10-15 13:56:02
 * @FilePath: \src\api\laravel-fast-api\v1\system\system\region\region-type.ts
 * Copyright (C) 2025 youhujun. All rights reserved.
 */
export interface TreeRegionItem {
  id: number;
  region_name: string;
  parent_id: number;
  deep: number;
  region_area: string;
  created_at: string;
  sort: number;
  children: TreeRegionItem[];
}

export interface RegionItem {
  id: number;
  region_name: string;
  parent_id: number;
  deep: number;
  region_area: string;
  created_at: string;
  sort: number;
}

export interface AddRegion {
  id?: number;
  deep: number;
  parent_id: number;
  region_name: string;
  sort: number;
}

export interface UpdateRegion extends AddRegion {
  id: number;
}

export interface MoveRegion {
  id: number;
  parent_id: number;
  dropType: string;
  sort: number;
}
