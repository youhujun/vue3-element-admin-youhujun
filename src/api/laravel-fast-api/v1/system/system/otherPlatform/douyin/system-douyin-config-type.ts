import type { BaseGetDataList } from "@/api/laravel-fast-api/v1/api-type";

export interface GetSystemDouyinConfig extends BaseGetDataList {
  type?: number | null;
}

export interface AddSystemDouyinConfig {
  name: string;
  type: number;
  appid: string;
  appsecret: string;
  note: string;
  sort: number;
}

export interface UpdateSystemDouyinConfig extends AddSystemDouyinConfig {
  id: number;
}

export interface SystemDouyinConfigItem {
  id: number;
  name: string;
  type: number;
  appid: string;
  appsecret: string;
  note: string;
  created_at: string;
  sort: number;
}
