/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun 2900976495@qq.com
 * @Date: 2025-10-15 14:10:02
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-11-22 11:27:50
 * @FilePath: \src\api\laravel-fast-api\v1\system\bank\bank-api.ts
 * Copyright (C) 2025 youhujun. All rights reserved.
 */
import request from "@/utils/request";

import type {
  ApiResult,
  BaseGetDataList,
  DeleteById,
  MultipleSelectId,
} from "@/api/laravel-fast-api/v1/api-type";

import type { AddBank, UpdateBank } from "@/api/laravel-fast-api/v1/system/bank/bank-type";

const SYSTEM_BANK_BASE_URL = "/api/v1/admin/bank";

const SystemBankAPI = {
  getBank(data: BaseGetDataList) {
    return request<any, ApiResult>({
      url: `${SYSTEM_BANK_BASE_URL}/getBank`,
      method: "post",
      data,
    });
  },
  addBank(data: AddBank) {
    return request<any, ApiResult>({
      url: `${SYSTEM_BANK_BASE_URL}/addBank`,
      method: "post",
      data,
    });
  },
  updateBank(data: UpdateBank) {
    return request<any, ApiResult>({
      url: `${SYSTEM_BANK_BASE_URL}/updateBank`,
      method: "post",
      data,
    });
  },

  deleteBank(data: DeleteById) {
    return request<any, ApiResult>({
      url: `${SYSTEM_BANK_BASE_URL}/deleteBank`,
      method: "post",
      data,
    });
  },
  multipleDeleteBank(data: MultipleSelectId) {
    return request<any, ApiResult>({
      url: `${SYSTEM_BANK_BASE_URL}/multipleDeleteBank`,
      method: "post",
      data,
    });
  },
};

export default SystemBankAPI;
