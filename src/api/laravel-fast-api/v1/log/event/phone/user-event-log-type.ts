/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun youhu8888@163.com
 * @Date: 2025-10-19 20:34:35
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-12-05 16:18:59
 * @FilePath: \src\api\laravel-fast-api\v1\log\event\phone\user-event-log-type.ts
 * Copyright (C) 2025 youhujun. All rights reserved.
 */
import type { BaseGetDataList } from "@/api/laravel-fast-api/v1/api-type";

export interface GetUserEventLog extends BaseGetDataList {
  user_id: number | null;
  eventType: number | null;
}

export interface UserEventLogListItem {
  id: number;
  created_at: string;
  event_type: number;
  event_code: string;
  event_route_action: string;
  event_name: string;
  note: string;
  user_id: number;
  phone: null | string;
  account_name: string;
  nick_name: string;
}
