/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun 2900976495@qq.com
 * @Date: 2025-10-15 14:10:02
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-11-25 07:21:09
 * @FilePath: \src\api\laravel-fast-api\v1\business\group\goodsClass\goods-class-api.ts
 * Copyright (C) 2025 youhujun. All rights reserved.
 */
import request from "@/utils/request";

import type { ApiResult, DeleteData } from "@/api/laravel-fast-api/v1/api-type";

import type {
  AddGoodsClass,
  UpdateGoodsClass,
  MoveGoodsClass,
  GetSingleGoodsClass,
} from "@/api/laravel-fast-api/v1/business/group/goodsClass/goods-class-type";

const BUSINESS_GROUP_GOODS_CLASS_BASE_URL = "/api/v1/admin/group/goods-class";

const GoodsClassAPI = {
  getTreeGoodsClass() {
    return request<any, ApiResult>({
      url: `${BUSINESS_GROUP_GOODS_CLASS_BASE_URL}/getTreeGoodsClass`,
      method: "get",
    });
  },
  addGoodsClass(data: AddGoodsClass) {
    return request<any, ApiResult>({
      url: `${BUSINESS_GROUP_GOODS_CLASS_BASE_URL}/addGoodsClass`,
      method: "post",
      data,
    });
  },
  updateGoodsClass(data: UpdateGoodsClass) {
    return request<any, ApiResult>({
      url: `${BUSINESS_GROUP_GOODS_CLASS_BASE_URL}/updateGoodsClass`,
      method: "post",
      data,
    });
  },
  moveGoodsClass(data: MoveGoodsClass) {
    return request<any, ApiResult>({
      url: `${BUSINESS_GROUP_GOODS_CLASS_BASE_URL}/moveGoodsClass`,
      method: "post",
      data,
    });
  },

  deleteGoodsClass(data: DeleteData) {
    return request<any, ApiResult>({
      url: `${BUSINESS_GROUP_GOODS_CLASS_BASE_URL}/deleteGoodsClass`,
      method: "post",
      data,
    });
  },
  GetSingleGoodsClass(data: GetSingleGoodsClass) {
    return request<any, ApiResult>({
      url: `${BUSINESS_GROUP_GOODS_CLASS_BASE_URL}/GetSingleGoodsClass`,
      method: "post",
      data,
    });
  },
};

export default GoodsClassAPI;
