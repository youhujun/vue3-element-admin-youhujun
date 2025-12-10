/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun 2900976495@qq.com
 * @Date: 2025-07-27 14:54:11
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2025-08-15 09:40:26
 * @FilePath: d:\wwwroot\Vue\VUE3\Vue3-Elementplus-Admin\src\directive\index.ts
 * Copyright (C) 2025 youhujun. All rights reserved.
 */
import type { App } from "vue";

import { hasPerm, hasRole } from "./permission";

// 全局注册 directive
export function setupDirective(app: App<Element>) {
  // 使 v-hasPerm 在所有组件中都可用
  app.directive("hasPerm", hasPerm);
  app.directive("hasRole", hasRole);
}
