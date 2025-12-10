/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun 2900976495@qq.com
 * @Date: 2025-10-15 15:22:13
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2025-10-15 15:32:51
 * @FilePath: \src\api\laravel-fast-api\v1\system\system\bank\option\bank-option-api.ts
 * Copyright (C) 2025 youhujun. All rights reserved.
 */
import request from "@/utils/request";

import type { ApiResult, OptionFind } from "@/api/laravel-fast-api/v1/api-type";

const SYSTEM_BANK_BASE_URL = "/api/v1/admin/bank";

const SystemBankOptionAPI = {
  findBank(data: OptionFind) {
    return request<any, ApiResult>({
      url: `${SYSTEM_BANK_BASE_URL}/findBank`,
      method: "post",
      data,
    });
  },
  defaultBank() {
    return request<any, ApiResult>({
      url: `${SYSTEM_BANK_BASE_URL}/defaultBank`,
      method: "get",
    });
  },
};

export default SystemBankOptionAPI;
