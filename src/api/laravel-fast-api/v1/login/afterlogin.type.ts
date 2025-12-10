/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun 2900976495@qq.com
 * @Date: 2025-07-28 16:53:44
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-12-08 12:36:38
 * @FilePath: \src\api\laravel-fast-api\v1\login\afterlogin.type.ts
 * Copyright (C) 2025 youhujun. All rights reserved.
 */

/** 获取管理员信息响应 */

export interface AdminUserInfo {
  userId: string;
  user_id: number;
  admin_id: number;
  album_id: number;
  username: string;
  nickname: string;
  avatar: string;
  roles: string[];
  phone: string;
  perms: string[];
}

/* 提示音配置单个元素 */
export interface SystemVoiceConfigItem {
  id: number;
  voice_title: string;
  channle_name: string;
  channle_event: string;
  voice_save_type: number;
  voice_url: string;
  voice_path: string;
  voirce_file: string;
  note: string;
  created_at: string;
  sort: number;
  voice_use_url: string;
}
