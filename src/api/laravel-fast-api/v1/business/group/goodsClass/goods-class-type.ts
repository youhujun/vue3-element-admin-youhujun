/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun youhu8888@163.com
 * @Date: 2025-10-19 17:02:31
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-11-25 12:27:37
 * @FilePath: \src\api\laravel-fast-api\v1\business\group\goodsClass\goods-class-type.ts
 * Copyright (C) 2025 youhujun. All rights reserved.
 */
export interface TreeGoodsClassItem {
  id: number;
  parent_id: number;
  deep: number;
  switch: number;
  rate: number;
  goods_class_name: string;
  goods_class_code: null | string;
  goods_class_picture_id?: null | number;
  is_certificate: number;
  certificate_number: number;
  note: null | string;
  created_at: string;
  sort: number;
  children?: TreeGoodsClassItem[];
  picture?: string;
}

export interface AddGoodsClass {
  id?: number;
  certificate_number: number;
  goods_class_code: string | null;
  goods_class_name: string;
  goods_class_picture_id?: number | null;
  deep: number;
  is_certificate: number;
  parent_id: number;
  rate: number;
  note: string;
  sort: number;
}

export interface UpdateGoodsClass extends AddGoodsClass {
  picture?: string | null | undefined;
}

export interface MoveGoodsClass {
  id: number;
  parent_id: number;
  dropType: string;
  sort: number;
}

export interface MoveGoodsClass {
  id: number;
  parent_id: number;
  dropType: string;
  sort: number;
}

export interface GetSingleGoodsClass {
  goods_class_id: number;
}
