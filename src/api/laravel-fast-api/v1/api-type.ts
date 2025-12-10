/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun 2900976495@qq.com
 * @Date: 2025-10-05 10:03:17
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-11-22 17:19:41
 * @FilePath: \src\api\laravel-fast-api\v1\api-type.ts
 * Copyright (C) 2025 youhujun. All rights reserved.
 */

/**
 * 所有接口返回的通用数据格式
 */
export interface ApiResult<T = any> {
  code: number;
  msg: string;
  data?: T | null;
  meta?: T | null;
  download?: T | null;
}

export interface DownloadResult extends ApiResult {
  download: string | null;
}

/**
 * 基础的查询数据列表
 */
export interface BaseGetDataList {
  currentPage: number;
  pageSize: number;
  sortType: number;
  timeRange?: string[];
  find?: string | null;
  findSelectIndex?: number;
  isExport?: number;
  exportType?: number;
}

export interface OptionFind {
  find?: string | null | number;
}

/**
 * 所有接口 通用的多选数据格式
 */
export interface MultipleSelectId {
  selectId: number[];
}

/**
 * 通过id删除
 */
export interface DeleteById {
  id: number;
}
//删除数据
export interface DeleteData {
  id: number;
  is_delete?: number;
}

//批量删除数据
export interface MultipleDeleteData {
  selectId: number[];
  is_delete?: number;
}

//移动树形结构的数据
export interface MoveTreeData {
  id: number;
  parent_id: number;
  dropType: string;
  sort: number;
}

export interface BaseUpdate {
  id: number;
}

export interface MoveTree {
  id: number;
  parent_id: number;
  dropType: string;
  sort: number;
}
