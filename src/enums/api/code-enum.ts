/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun 2900976495@qq.com
 * @Date: 2025-07-27 14:54:11
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2025-08-17 13:42:06
 * @FilePath: \src\enums\api\result.enum.ts
 * Copyright (C) 2025 youhujun. All rights reserved.
 */
/**
 * 响应码枚举
 */
export const enum ResultEnum {
  /**
   * 成功
   */
  SUCCESS = 0,
  /**
   * 错误
   */
  ERROR = "B0001",

  /**
   * 访问令牌无效或过期
   */
  ACCESS_TOKEN_INVALID = "A0230",

  /**
   * 刷新令牌无效或过期
   */
  REFRESH_TOKEN_INVALID = "A0231",
}
