/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun 2900976495@qq.com
 * @Date: 2025-10-15 14:10:02
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-11-04 13:27:25
 * @FilePath: \src\api\laravel-fast-api\v1\picture\album\option\album-option-api.ts
 * Copyright (C) 2025 youhujun. All rights reserved.
 */
import request from "@/utils/request";

import type { ApiResult } from "@/api/laravel-fast-api/v1/api-type";

import type {
  FindAlbum,
  GetDefaultAlbum,
} from "@/api/laravel-fast-api/v1/picture/album/option/album-option-type";

const ALBUM_BASE_URL = "/api/v1/admin/picture";

const SystemAlbumOptionsAPI = {
  findAlbum(data: FindAlbum) {
    return request<any, ApiResult>({
      url: `${ALBUM_BASE_URL}/findAlbum`,
      method: "post",
      data,
    });
  },
  getDefaultAlbum(data: GetDefaultAlbum) {
    return request<any, ApiResult>({
      url: `${ALBUM_BASE_URL}/getDefaultAlbum`,
      method: "post",
      data,
    });
  },
};

export default SystemAlbumOptionsAPI;
