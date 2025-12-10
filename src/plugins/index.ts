/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun youhu8888@163.com
 * @Date: 2025-10-19 01:15:40
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-12-08 11:25:49
 * @FilePath: \src\plugins\index.ts
 * Copyright (C) 2025 youhujun. All rights reserved.
 */
import type { App } from "vue";

import { setupDirective } from "@/directives";
import { setupI18n } from "@/lang";
import { setupRouter } from "@/router";
import { setupStore } from "@/store";
import { setupElIcons } from "./icons";
import { setupPermission } from "./permission";
import { InstallCodeMirror } from "codemirror-editor-vue3";
import { setupVxeTable } from "./vxeTable";

export default {
  install(app: App<Element>) {
    // 自定义指令(directive)
    setupDirective(app);
    // 路由(router)
    setupRouter(app);
    // 状态管理(store)
    setupStore(app);
    // 国际化
    setupI18n(app);
    // Element-plus图标
    setupElIcons(app);
    // 路由守卫
    setupPermission();
    // vxe-table
    setupVxeTable(app);
    // 注册 CodeMirror
    app.use(InstallCodeMirror);
  },
};
