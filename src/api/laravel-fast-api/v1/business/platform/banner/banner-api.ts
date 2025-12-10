/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun 2900976495@qq.com
 * @Date: 2025-10-15 14:10:02
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-11-28 01:40:40
 * @FilePath: \src\api\laravel-fast-api\v1\business\platform\banner\banner-api.ts
 * Copyright (C) 2025 youhujun. All rights reserved.
 */
import request from "@/utils/request";

import type {
  ApiResult,
  BaseGetDataList,
  DeleteData,
  MultipleSelectId,
} from "@/api/laravel-fast-api/v1/api-type";

import type {
  AddPhoneBanner,
  UpdatePhoneBanner,
} from "@/api/laravel-fast-api/v1/business/platform/banner/banner-type";

const PHONE_BANNER_BASE_URL = "/api/v1/admin/platform/banner";

const PhoneBannerAPI = {
  getPhoneBanner(data: BaseGetDataList) {
    return request<any, ApiResult>({
      url: `${PHONE_BANNER_BASE_URL}/getPhoneBanner`,
      method: "post",
      data,
    });
  },
  addPhoneBanner(data: AddPhoneBanner) {
    return request<any, ApiResult>({
      url: `${PHONE_BANNER_BASE_URL}/addPhoneBanner`,
      method: "post",
      data,
    });
  },
  updatePhoneBanner(data: UpdatePhoneBanner) {
    return request<any, ApiResult>({
      url: `${PHONE_BANNER_BASE_URL}/updatePhoneBanner`,
      method: "post",
      data,
    });
  },

  deletePhoneBanner(data: DeleteData) {
    return request<any, ApiResult>({
      url: `${PHONE_BANNER_BASE_URL}/deletePhoneBanner`,
      method: "post",
      data,
    });
  },
  multipleDeletePhoneBanner(data: MultipleSelectId) {
    return request<any, ApiResult>({
      url: `${PHONE_BANNER_BASE_URL}/multipleDeletePhoneBanner`,
      method: "post",
      data,
    });
  },
};

export default PhoneBannerAPI;
