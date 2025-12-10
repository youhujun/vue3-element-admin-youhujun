/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun 2900976495@qq.com
 * @Date: 2025-08-17 11:57:11
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2025-08-17 13:38:49
 * @FilePath: \src\utils\token.ts
 * Copyright (C) 2025 youhujun. All rights reserved.
 */
import Cookies from "js-cookie";

const TokenKey = "Admin-Token";
const RememberMe = "Remember";

export const AuthToken = {
  getToken() {
    return Cookies.get(TokenKey);
  },

  setToken(token: string) {
    return Cookies.set(TokenKey, token);
  },
  removeToken() {
    return Cookies.remove(TokenKey);
  },
  toRememeberMe(token: string, remember: boolean) {
    if (remember) {
      return Cookies.set(RememberMe, token);
    }
  },
  getRememberMe() {
    return Cookies.get(RememberMe);
  },
};
