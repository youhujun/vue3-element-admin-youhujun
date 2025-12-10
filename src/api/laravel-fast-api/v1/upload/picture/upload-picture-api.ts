/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun 2900976495@qq.com
 * @Date: 2025-10-14 08:58:32
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-11-12 02:18:02
 * @FilePath: \src\api\laravel-fast-api\v1\upload\picture\upload-picture-api.ts
 * Copyright (C) 2025 youhujun. All rights reserved.
 */
import request from "@/utils/request";

import type { ApiResult } from "@/api/laravel-fast-api/v1/api-type";

const UPLOAD_PICTURE_BASE_URL = "/api/v1/admin/file";

const UploadPictureAPI = {
  uploadUserAvatar(data: FormData) {
    return request<any, ApiResult>({
      url: `${UPLOAD_PICTURE_BASE_URL}/uploadUserAvatar`,
      method: "post",
      data,
    });
  },
  uploadResetPicture(data: FormData) {
    return request<any, ApiResult>({
      url: `${UPLOAD_PICTURE_BASE_URL}/uploadResetPicture`,
      method: "post",
      data,
    });
  },
  uploadSinglePicture(data: FormData) {
    return request<any, ApiResult>({
      url: `${UPLOAD_PICTURE_BASE_URL}/uploadSinglePicture`,
      method: "post",
      data,
    });
  },
  uploadMultiplePicture(data: FormData) {
    return request<any, ApiResult>({
      url: `${UPLOAD_PICTURE_BASE_URL}/uploadMultiplePicture`,
      method: "post",
      data,
    });
  },
};

export default UploadPictureAPI;
