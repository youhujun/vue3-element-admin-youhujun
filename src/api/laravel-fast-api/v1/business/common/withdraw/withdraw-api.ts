/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun youhu8888@163.com
 * @Date: 2025-11-28 15:57:09
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-11-28 21:52:01
 * @FilePath: \src\api\laravel-fast-api\v1\business\common\withdraw\withdraw-api.ts
 * Copyright (C) 2025 youhujun. All rights reserved.
 */
import request from "@/utils/request";

import type { ApiResult } from "@/api/laravel-fast-api/v1/api-type";
import type { UpdateWithdrawConfig } from "@/api/laravel-fast-api/v1/business/common/withdraw/withdraw-type";

const BUSINESS_SYSTEM_WITHDRAW_CONFIG_BASE_URL = "/api/v1/admin/system/withdraw";

const SystemWithdrawConfigAPI = {
  getWithdrawConfig() {
    return request<any, ApiResult>({
      url: `${BUSINESS_SYSTEM_WITHDRAW_CONFIG_BASE_URL}/getWithdrawConfig`,
      method: "get",
    });
  },

  updateWithdrawConfig(data: UpdateWithdrawConfig) {
    return request<any, ApiResult>({
      url: `${BUSINESS_SYSTEM_WITHDRAW_CONFIG_BASE_URL}/updateWithdrawConfig`,
      method: "post",
      data,
    });
  },
};

export default SystemWithdrawConfigAPI;
