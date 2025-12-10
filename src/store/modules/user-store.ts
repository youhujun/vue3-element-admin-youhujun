/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun youhu8888@163.com
 * @Date: 2025-10-19 01:15:40
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-12-08 11:40:20
 * @FilePath: \src\store\modules\user-store.ts
 * Copyright (C) 2025 youhujun. All rights reserved.
 */

import { store } from "@/store";

import { AuthToken } from "@/utils/token";
import LoginAPI from "@/api/laravel-fast-api/v1/login/login.api";
import AfterLoginAPI from "@/api/laravel-fast-api/v1/login/afterlogin.api";
import type { LoginFormData } from "@/api/laravel-fast-api/v1/login/login.type";
import type { AdminUserInfo } from "@/api/laravel-fast-api/v1/login/afterlogin.type";
import { usePermissionStoreHook } from "@/store/modules/permission-store";
import { useDictStoreHook } from "@/store/modules/dict-store";
import { useTagsViewStore } from "@/store";

export const useUserStore = defineStore("user", () => {
  const token = ref(AuthToken.getToken());
  // 用户信息
  const userInfo = ref<AdminUserInfo>({} as AdminUserInfo);
  const roles = ref<string[]>([]);
  // 记住我状态
  const rememberMe = ref(AuthToken.getRememberMe());
  function login(LoginFormData: LoginFormData) {
    return new Promise<void>((resolve, reject) => {
      LoginAPI.login(LoginFormData)
        .then((res) => {
          //console.log("login res", res);
          const { data } = res;
          token.value = data.token;
          AuthToken.setToken(data.token);
          AuthToken.toRememeberMe(data.token, true);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * 获取用户信息
   *
   * @returns {UserInfo} 用户信息
   */
  function getUserInfo() {
    return new Promise((resolve, reject) => {
      AfterLoginAPI.getAdminInfo()
        .then((result) => {
          // console.log("getAdminInfo result", result);
          if (!result) {
            reject("Verification failed, please Login again.");
            return;
          }
          const { data } = result;
          roles.value = data.roles;
          Object.assign(userInfo.value, { ...data });
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  // 监听roles变化的函数，当roles为空时自动重新获取用户信息
  function watchRoles() {
    return watch(
      roles,
      (newRoles) => {
        if (newRoles.length === 0 && isLoggedIn()) {
          //console.log("Roles is empty, trying to fetch user info again");
          // 重新获取用户信息（会更新roles）
          getUserInfo().catch((error) => {
            console.error("Failed to fetch user info when roles is empty:", error);
            // 可以在这里添加进一步处理，如强制登出
            // resetAllState();
          });
        }
      },
      { immediate: true } // 立即执行一次检查
    );
  }

  /**
   * 登出
   */
  function logout() {
    return new Promise<void>((resolve, reject) => {
      LoginAPI.logout()
        .then(() => {
          // 重置所有系统状态
          resetAllState();
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * 重置所有系统状态
   * 统一处理所有清理工作，包括用户凭证、路由、缓存等
   */
  function resetAllState() {
    // 1. 重置用户状态
    resetUserState();

    // 2. 重置其他模块状态
    // 重置路由
    usePermissionStoreHook().resetRouter();
    // 清除字典缓存
    useDictStoreHook().clearDictCache();
    // 清除标签视图
    useTagsViewStore().delAllViews();

    return Promise.resolve();
  }

  /**
   * 重置用户状态
   * 仅处理用户模块内的状态
   */
  function resetUserState() {
    // 清除用户凭证
    //AuthStorage.clearAuth();
    token.value = "";
    AuthToken.removeToken();
    // 重置用户信息
    userInfo.value = {} as AdminUserInfo;
  }

  function isLoggedIn() {
    return AuthToken.getToken();
  }
  return {
    token,
    roles,
    userInfo,
    watchRoles,
    rememberMe,
    isLoggedIn,
    getUserInfo,
    login,
    logout,
    resetAllState,
    resetUserState,
  };
});

/**
 * 在组件外部使用UserStore的钩子函数
 * @see https://pinia.vuejs.org/core-concepts/outside-component-usage.html
 */
export function useUserStoreHook() {
  return useUserStore(store);
}
