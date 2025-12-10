/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun 2900976495@qq.com
 * @Date: 2025-10-15 14:10:02
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-11-28 00:04:38
 * @FilePath: \src\api\laravel-fast-api\v1\business\platform\banner\info\banner-info-api.ts
 * Copyright (C) 2025 youhujun. All rights reserved.
 */
import request from "@/utils/request";

import type { ApiResult } from "@/api/laravel-fast-api/v1/api-type";

import type {
  UpdatePhoneBannerUrl,
  UpdatePhoneBannerSort,
  UpdatePhoneBannerNote,
  UpdatePhoneBannerPicture,
} from "@/api/laravel-fast-api/v1/business/platform/banner/info/banner-info-type";

const PHONE_BANK_INFO_BASE_URL = "/api/v1/admin/platform/banner/info";

const PhoneBannerInfoAPI = {
  updatePhoneBannerUrl(data: UpdatePhoneBannerUrl) {
    return request<any, ApiResult>({
      url: `${PHONE_BANK_INFO_BASE_URL}/updatePhoneBannerUrl`,
      method: "post",
      data,
    });
  },
  updatePhoneBannerSort(data: UpdatePhoneBannerSort) {
    return request<any, ApiResult>({
      url: `${PHONE_BANK_INFO_BASE_URL}/updatePhoneBannerSort`,
      method: "post",
      data,
    });
  },
  updatePhoneBannerBakInfo(data: UpdatePhoneBannerNote) {
    return request<any, ApiResult>({
      url: `${PHONE_BANK_INFO_BASE_URL}/updatePhoneBannerBakInfo`,
      method: "post",
      data,
    });
  },

  updatePhoneBannerPicture(data: UpdatePhoneBannerPicture) {
    return request<any, ApiResult>({
      url: `${PHONE_BANK_INFO_BASE_URL}/updatePhoneBannerPicture`,
      method: "post",
      data,
    });
  },
};

export default PhoneBannerInfoAPI;
