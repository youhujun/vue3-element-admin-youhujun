/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun youhu8888@163.com
 * @Date: 2025-10-19 17:02:31
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-11-26 10:07:21
 * @FilePath: \src\api\laravel-fast-api\v1\business\level\item\level-item-api.ts
 * Copyright (C) 2025 youhujun. All rights reserved.
 */
import request from "@/utils/request";

import type {
  ApiResult,
  BaseGetDataList,
  DeleteById,
  MultipleSelectId,
} from "@/api/laravel-fast-api/v1/api-type";

import type {
  AddLevelItem,
  UpdateLevelItem,
} from "@/api/laravel-fast-api/v1/business/level/item/level-item-type";

const LEVEL_ITEM_BASE_URL = "/api/v1/admin/level/level-item";

const LevelItemAPI = {
  getLevelItem(data: BaseGetDataList) {
    return request<any, ApiResult>({
      url: `${LEVEL_ITEM_BASE_URL}/getLevelItem`,
      method: "post",
      data,
    });
  },
  addLevelItem(data: AddLevelItem) {
    return request<any, ApiResult>({
      url: `${LEVEL_ITEM_BASE_URL}/addLevelItem`,
      method: "post",
      data,
    });
  },
  updateLevelItem(data: UpdateLevelItem) {
    return request<any, ApiResult>({
      url: `${LEVEL_ITEM_BASE_URL}/updateLevelItem`,
      method: "post",
      data,
    });
  },

  deleteLevelItem(data: DeleteById) {
    return request<any, ApiResult>({
      url: `${LEVEL_ITEM_BASE_URL}/deleteLevelItem`,
      method: "post",
      data,
    });
  },
  multipleDeleteLevelItem(data: MultipleSelectId) {
    return request<any, ApiResult>({
      url: `${LEVEL_ITEM_BASE_URL}/multipleDeleteLevelItem`,
      method: "post",
      data,
    });
  },
};

export default LevelItemAPI;
