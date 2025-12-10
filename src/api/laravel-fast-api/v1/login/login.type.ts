/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun 2900976495@qq.com
 * @Date: 2025-07-27 18:33:32
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2025-08-17 17:19:51
 * @FilePath: \src\api\laravel-fast-api\v1\login\login.type.ts
 * Copyright (C) 2025 youhujun. All rights reserved.
 */
//import { type LoginFormData, type LoginResult } from "@/api/laravel-fast-api/v1/login/login.type";

/** 登录表单数据 */
export interface LoginFormData {
  /** 用户名 */
  username: string;
  /** 密码 */
  password: string;
  /** 记住我 */
  rememberMe: boolean;
}
