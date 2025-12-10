/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun youhu8888@163.com
 * @Date: 2025-10-19 01:15:40
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-11-22 10:29:25
 * @FilePath: \src\api\laravel-fast-api\v1\system\bank\bank-type.ts
 * Copyright (C) 2025 youhujun. All rights reserved.
 */
export interface AddBank {
  bank_code: string;
  bank_name: string;
  is_default: number | string;
  sort: number | string;
}

export interface UpdateBank extends AddBank {
  id: number;
}

export interface BankItem {
  id: number;
  created_at: string;
  bank_name: string;
  bank_code: null | string;
  is_default: number;
  sort: number;
}
