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

import type { ApiResult, DeleteById, MultipleSelectId } from "@/api/laravel-fast-api/v1/api-type";

import type { GetAdminEventLog } from "@/api/laravel-fast-api/v1/log/event/admin/admin-event-log-type";

const ADMIN_EVENT_LOG_BASE_URL = "/api/v1/admin/log";

const PhoneEventLogAPI = {
  getAdminEventLog(data: GetAdminEventLog) {
    return request<any, ApiResult>({
      url: `${ADMIN_EVENT_LOG_BASE_URL}/getAdminEventLog`,
      method: "post",
      data,
    });
  },
  deleteAdminEventLog(data: DeleteById) {
    return request<any, ApiResult>({
      url: `${ADMIN_EVENT_LOG_BASE_URL}/deleteAdminEventLog`,
      method: "post",
      data,
    });
  },
  multipleDeleteAdminEventLog(data: MultipleSelectId) {
    return request<any, ApiResult>({
      url: `${ADMIN_EVENT_LOG_BASE_URL}/multipleDeleteAdminEventLog`,
      method: "post",
      data,
    });
  },
};

export default PhoneEventLogAPI;
