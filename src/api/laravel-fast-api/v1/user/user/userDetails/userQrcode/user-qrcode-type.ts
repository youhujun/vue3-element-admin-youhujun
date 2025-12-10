/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun 2900976495@qq.com
 * @Date: 2025-10-14 13:03:11
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-12-01 15:19:17
 * @FilePath: \src\api\laravel-fast-api\v1\user\user\userDetails\userQrcode\user-qrcode-type.ts
 * Copyright (C) 2025 youhujun. All rights reserved.
 */
export interface GetUserQrcode {
  user_id: number;
}

export interface UserQrcodeItem {
  id: number;
  user_id: number;
  album_id: number;
  created_at: string;
  updated_at?: null | string;
  picture_name: string;
  picture_path: string;
  picture_file: string;
  picture_size: number;
  picture_spec: string;
  picture: string;
}
