/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun youhu8888@163.com
 * @Date: 2025-10-19 01:15:40
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-12-09 04:16:49
 * @FilePath: \src\store\index.ts
 * Copyright (C) 2025 youhujun. All rights reserved.
 */
import type { App } from "vue";
import { createPinia } from "pinia";

const store = createPinia();

// 全局注册 store
export function setupStore(app: App<Element>) {
  app.use(store);
}

export * from "./modules/app-store";
export * from "./modules/permission-store";
export * from "./modules/settings-store";
export * from "./modules/tags-view-store";
export * from "./modules/user-store";
export * from "./modules/dict-store";
export * from "./modules/category-store";
export * from "./modules/goods-calss-store";
export * from "./modules/label-store";
export * from "./modules/region-store";
export * from "./modules/audio-play-store";
export { store };
