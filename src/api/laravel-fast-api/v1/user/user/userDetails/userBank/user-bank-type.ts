/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun youhu8888@163.com
 * @Date: 2025-10-19 01:15:40
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-12-01 21:12:36
 * @FilePath: \src\api\laravel-fast-api\v1\user\user\userDetails\userBank\user-bank-type.ts
 * Copyright (C) 2025 youhujun. All rights reserved.
 */
//设置用户默认银行卡
export interface SetUserDefaultBank {
  id: number;
  user_id: number;
}
//删除用户银行卡
export interface DeleteUserBank {
  id: number;
}

//获取用户银行卡
export interface GetUserBank {
  user_id: number;
}

//添加用户银行卡
export interface AddUserBankForm {
  user_id: number;
  bank_id: number;
  bank_number: string;
  bank_account: string;
  bank_address: string;
  bank_front_id: number;
  bank_back_id: number;
  is_default: number;
  sort: number;
}

export interface BankPictureItem {
  id: number;
  user_id: number;
  album_id: number;
  created_at: string;
  updated_at?: null | string;
  picture_name: string;
  picture_path: string;
  picture_file: string;
  picture_size: number;
  picture_spec: string;
  picture: string;
}

export interface UserBankItem {
  id: number;
  user_id: number;
  created_at: string;
  updated_at?: null | string;
  is_default: number;
  sort: number;
  bank_id: number;
  bank_number: string;
  bank_account: string;
  bank_address: string;
  bank_front_id: number;
  bank_back_id: number;
  bank: {
    id: number;
    created_at: string;
    bank_name: string;
    bank_code: string;
    is_default: number;
    sort: number;
  };
  bank_name: string;
  bank_front: BankPictureItem;
  bank_front_pciture: string;
  bank_back: BankPictureItem;
  bank_back_pciture: string;
}
