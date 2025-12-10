/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun youhu8888@163.com
 * @Date: 2025-10-19 17:02:31
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-11-28 01:16:01
 * @FilePath: \src\api\laravel-fast-api\v1\business\platform\banner\info\banner-info-type.ts
 * Copyright (C) 2025 youhujun. All rights reserved.
 */
import type { BaseUpdate } from "@/api/laravel-fast-api/v1/api-type";

export interface UpdatePhoneBannerUrl extends BaseUpdate {
  redirect_url: string;
}

export interface UpdatePhoneBannerSort extends BaseUpdate {
  sort: number;
}

export interface UpdatePhoneBannerNote extends BaseUpdate {
  note: string;
}

export interface UpdatePhoneBannerPicture extends BaseUpdate {
  album_picture_id: number;
}
