/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun 2900976495@qq.com
 * @Date: 2025-08-18 12:59:41
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-11-15 11:12:31
 * @FilePath: \src\api\laravel-fast-api\v1\system\menu\menu-api.ts
 * Copyright (C) 2025 youhujun. All rights reserved.
 */
import request from "@/utils/request";
import type { ApiResult, DeleteById, MoveTree } from "@/api/laravel-fast-api/v1/api-type";
import type { MenuForm } from "@/api/laravel-fast-api/v1/system/menu/menu.type";

const MENU_BASE_URL = "/api/v1/admin/permission";

const MenuAPI = {
  getTreeMenu() {
    return request<any, ApiResult>({
      url: `${MENU_BASE_URL}/getTreeMenu`,
      method: "get",
    });
  },

  /** 获取菜单下拉数据源 */
  getChildrenOptions(onlyParent?: boolean) {
    return request<any, ApiResult>({
      url: `${MENU_BASE_URL}getChildrenOptions`,
      method: "get",
      params: { onlyParent },
    });
  },

  /** 获取菜单表单数据 */
  getSingleMenuForm(id: string) {
    return request<any, ApiResult>({
      url: `${MENU_BASE_URL}/${id}/getSingleMenuForm`,
      method: "get",
    });
  },
  /** 新增菜单 */
  addMenu(data: MenuForm) {
    return request({ url: `${MENU_BASE_URL}/addMenu`, method: "post", data });
  },
  /** 修改菜单 */
  updateMenu(data: MenuForm) {
    return request({ url: `${MENU_BASE_URL}/updateMenu`, method: "post", data });
  },
  /** 删除菜单 */
  deleteMenu(data: DeleteById) {
    return request({ url: `${MENU_BASE_URL}/deleteMenu`, method: "post", data });
  },
  /** 移动菜单 */
  moveMenu(data: MoveTree) {
    return request({ url: `${MENU_BASE_URL}/moveMenu`, method: "post", data });
  },
};

export default MenuAPI;
