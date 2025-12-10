/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun youhu8888@163.com
 * @Date: 2025-10-19 20:34:35
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-11-04 15:15:47
 * @FilePath: \src\api\laravel-fast-api\v1\picture\album\option\album-option-type.ts
 * Copyright (C) 2025 youhujun. All rights reserved.
 */
export interface FindAlbum {
  find?: string | null;
  album_type: number;
}

export interface GetDefaultAlbum {
  album_type: number;
}
