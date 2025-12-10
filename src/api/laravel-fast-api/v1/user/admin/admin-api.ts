/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun youhu8888@163.com
 * @Date: 2025-10-19 20:34:35
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-12-04 22:41:54
 * @FilePath: \src\api\laravel-fast-api\v1\user\admin\admin-api.ts
 * Copyright (C) 2025 youhujun. All rights reserved.
 */
import request from "@/utils/request";
import type { ApiResult, DeleteById, MultipleSelectId } from "@/api/laravel-fast-api/v1/api-type";
import type {
  GetAdmin,
  AddAdmin,
  UpdateAdmin,
} from "@/api/laravel-fast-api/v1/user/admin/admin-type";

const ADDMIN_BASE_URL = "/api/v1/admin/admin/administrator";

const AdminAPI = {
  getAdmin(data: GetAdmin) {
    return request<any, ApiResult>({
      url: `${ADDMIN_BASE_URL}/getAdmin`,
      method: "post",
      data,
    });
  },
  addAdmin(data: AddAdmin) {
    return request<any, ApiResult>({
      url: `${ADDMIN_BASE_URL}/addAdmin`,
      method: "post",
      data,
    });
  },
  updateAdmin(data: UpdateAdmin) {
    return request<any, ApiResult>({
      url: `${ADDMIN_BASE_URL}/updateAdmin`,
      method: "post",
      data,
    });
  },
  disableAdmin(data: DeleteById) {
    return request<any, ApiResult>({
      url: `${ADDMIN_BASE_URL}/disableAdmin`,
      method: "post",
      data,
    });
  },
  multipleDisableAdmin(data: MultipleSelectId) {
    return request<any, ApiResult>({
      url: `${ADDMIN_BASE_URL}/multipleDisableAdmin`,
      method: "post",
      data,
    });
  },
  deleteAdmin(data: DeleteById) {
    return request<any, ApiResult>({
      url: `${ADDMIN_BASE_URL}/deleteAdmin`,
      method: "post",
      data,
    });
  },
  multipleDeleteAdmin(data: MultipleSelectId) {
    return request<any, ApiResult>({
      url: `${ADDMIN_BASE_URL}/multipleDeleteAdmin`,
      method: "post",
      data,
    });
  },
};

export default AdminAPI;
