/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun youhu8888@163.com
 * @Date: 2025-10-19 01:15:40
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-11-23 10:06:42
 * @FilePath: \src\api\laravel-fast-api\v1\system\system\otherPlatform\wechat\system-wechat-config-type.ts
 * Copyright (C) 2025 youhujun. All rights reserved.
 */
import type { BaseGetDataList } from "@/api/laravel-fast-api/v1/api-type";

export interface GetSystemWechatConfig extends BaseGetDataList {
  type?: number | null;
}

export interface AddSystemWechatConfig {
  name: string;
  type: number;
  appid: string;
  appsecret: string;
  auth_redirect_url: string;
  note: string;
  sort: number;
}

export interface UpdateSystemWechatConfig extends AddSystemWechatConfig {
  id: number;
}

export interface SystemWechatConfigItem {
  id: number;
  name: string;
  type: number;
  appid: string;
  appsecret: string;
  auth_redirect_url: string;
  note: string;
  created_at: string;
  sort: number;
}
