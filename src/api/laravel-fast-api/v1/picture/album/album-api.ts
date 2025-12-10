/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun 2900976495@qq.com
 * @Date: 2025-10-15 14:10:02
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2025-10-15 14:45:54
 * @FilePath: \src\api\laravel-fast-api\v1\system\system\bank\bank-api.ts
 * Copyright (C) 2025 youhujun. All rights reserved.
 */
import request from "@/utils/request";

import type { ApiResult, DeleteById } from "@/api/laravel-fast-api/v1/api-type";

import type {
  GetAlbum,
  AddAlbum,
  UpdateAlbum,
  GetAlbumPicture,
} from "@/api/laravel-fast-api/v1/picture/album/album-type";

const ALBUM_BASE_URL = "/api/v1/admin/picture";

const SystemAlbumAPI = {
  getAlbum(data: GetAlbum) {
    return request<any, ApiResult>({
      url: `${ALBUM_BASE_URL}/getAlbum`,
      method: "post",
      data,
    });
  },
  addAlbum(data: AddAlbum) {
    return request<any, ApiResult>({
      url: `${ALBUM_BASE_URL}/addAlbum`,
      method: "post",
      data,
    });
  },
  updateAlbum(data: UpdateAlbum) {
    return request<any, ApiResult>({
      url: `${ALBUM_BASE_URL}/updateAlbum`,
      method: "post",
      data,
    });
  },

  deleteAlbum(data: DeleteById) {
    return request<any, ApiResult>({
      url: `${ALBUM_BASE_URL}/deleteAlbum`,
      method: "post",
      data,
    });
  },
  getAlbumPicture(data: GetAlbumPicture) {
    return request<any, ApiResult>({
      url: `${ALBUM_BASE_URL}/getAlbumPicture`,
      method: "post",
      data,
    });
  },
};

export default SystemAlbumAPI;
