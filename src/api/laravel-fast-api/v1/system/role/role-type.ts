/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun youhu8888@163.com
 * @Date: 2025-10-19 01:15:40
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-11-14 23:01:03
 * @FilePath: \src\api\laravel-fast-api\v1\system\role\role-type.ts
 * Copyright (C) 2025 youhujun. All rights reserved.
 */
export interface TreeRoleItem {
  id: number;
  parent_id: number;
  deep: number;
  switch: number;
  role_name: string;
  logic_name: string;
  sort: number;
  permission: number[];
  children?: TreeRoleItem[];
}

export interface AddRole {
  id: number;
  deep: number;
  parent_id: number;
  logic_name: string;
  role_name: string;
  sort: number;
}

export interface UpdateRole {
  id: number;
  logic_name: string;
  role_name: string;
  sort: number;
}

export interface MoveRole {
  id: number;
  parent_id: number;
  dropType: string;
  sort: number;
}

export interface ResetRolePermission {
  after_permission: number[];
  before_permission: number[];
  role_id: number;
}
