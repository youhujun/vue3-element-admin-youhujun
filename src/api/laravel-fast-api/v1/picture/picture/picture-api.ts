/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun youhu8888@163.com
 * @Date: 2025-10-19 20:34:35
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-11-12 02:11:44
 * @FilePath: \src\api\laravel-fast-api\v1\picture\picture\picture-api.ts
 * Copyright (C) 2025 youhujun. All rights reserved.
 */

import request from "@/utils/request";

import type { ApiResult } from "@/api/laravel-fast-api/v1/api-type";

import type {
  PictureId,
  MoveAlbum,
  UpdatePictureName,
  MuultipePicuteId,
  MoveMultipleAlbum,
} from "@/api/laravel-fast-api/v1/picture/picture/picture-type";

const PICTURE_BASE_URL = "/api/v1/admin/picture";

const PictureAPI = {
  deletePicture(data: PictureId) {
    return request<any, ApiResult>({
      url: `${PICTURE_BASE_URL}/deletePicture`,
      method: "post",
      data,
    });
  },
  moveAlbum(data: MoveAlbum) {
    return request<any, ApiResult>({
      url: `${PICTURE_BASE_URL}/moveAlbum`,
      method: "post",
      data,
    });
  },
  updatePictureName(data: UpdatePictureName) {
    return request<any, ApiResult>({
      url: `${PICTURE_BASE_URL}/updatePictureName`,
      method: "post",
      data,
    });
  },
  setCover(data: PictureId) {
    return request<any, ApiResult>({
      url: `${PICTURE_BASE_URL}/setCover`,
      method: "post",
      data,
    });
  },

  deleteMultiplePicture(data: MuultipePicuteId) {
    return request<any, ApiResult>({
      url: `${PICTURE_BASE_URL}/deleteMultiplePicture`,
      method: "post",
      data,
    });
  },
  moveMultipleAlbum(data: MoveMultipleAlbum) {
    return request<any, ApiResult>({
      url: `${PICTURE_BASE_URL}/moveMultipleAlbum`,
      method: "post",
      data,
    });
  },
};

export default PictureAPI;
