/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun 2900976495@qq.com
 * @Date: 2025-10-14 11:19:31
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2025-10-14 14:37:11
 * @FilePath: \src\api\laravel-fast-api\v1\user\user\userDetails\userIdCard\user-idcard-type.ts
 * Copyright (C) 2025 youhujun. All rights reserved.
 */
//修改身份证
export interface UpdateUserIdNumber {
  user_id: number;
  id_number: string;
}

//获取用户身份证
export interface GetUserIdCard {
  user_id: number;
}

//添加用户身份证
export interface SetUserIdCard {
  user_id: number;
  id_card_front_id: number;
  id_card_back_id: number;
  sort: number;
}

// 获取用户实名认证申请
export interface GetUserRealAuthApply {
  user_id: number;
  currentPage: number;
  pageSize: number;
  sortType: number;
}

//审核实名认证用户
export interface RealAuthUser {
  id: number;
  user_id: number;
  is_real_auth: number;
  refuse_info: string;
}
