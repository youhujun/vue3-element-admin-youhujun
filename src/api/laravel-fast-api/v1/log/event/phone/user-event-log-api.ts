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

import type { GetUserEventLog } from "@/api/laravel-fast-api/v1/log/event/phone/user-event-log-type";

const USER_EVENT_LOG_BASE_URL = "/api/v1/admin/log";

const PhoneEventLogAPI = {
  getUserEventLog(data: GetUserEventLog) {
    return request<any, ApiResult>({
      url: `${USER_EVENT_LOG_BASE_URL}/getUserEventLog`,
      method: "post",
      data,
    });
  },
  deleteUserEventLog(data: DeleteById) {
    return request<any, ApiResult>({
      url: `${USER_EVENT_LOG_BASE_URL}/deleteUserEventLog`,
      method: "post",
      data,
    });
  },
  multipleDeleteUserEventLog(data: MultipleSelectId) {
    return request<any, ApiResult>({
      url: `${USER_EVENT_LOG_BASE_URL}/multipleDeleteUserEventLog`,
      method: "post",
      data,
    });
  },
};

export default PhoneEventLogAPI;
