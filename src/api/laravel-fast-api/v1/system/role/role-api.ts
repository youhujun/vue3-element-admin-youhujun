import request from "@/utils/request";

import type { ApiResult, DeleteData } from "@/api/laravel-fast-api/v1/api-type";

import type {
  AddRole,
  UpdateRole,
  MoveRole,
  ResetRolePermission,
} from "@/api/laravel-fast-api/v1/system/role/role-type";

const SYSTEM_ROLE_BASE_URL = "/api/v1/admin/role";

const SystemRoleAPI = {
  getTreeRole() {
    return request<any, ApiResult>({
      url: `${SYSTEM_ROLE_BASE_URL}/getTreeRole`,
      method: "get",
    });
  },
  addRole(data: AddRole) {
    return request<any, ApiResult>({
      url: `${SYSTEM_ROLE_BASE_URL}/addRole`,
      method: "post",
      data,
    });
  },
  updateRole(data: UpdateRole) {
    return request<any, ApiResult>({
      url: `${SYSTEM_ROLE_BASE_URL}/updateRole`,
      method: "post",
      data,
    });
  },
  moveRole(data: MoveRole) {
    return request<any, ApiResult>({
      url: `${SYSTEM_ROLE_BASE_URL}/moveRole`,
      method: "post",
      data,
    });
  },
  resetRolePermission(data: ResetRolePermission) {
    return request<any, ApiResult>({
      url: `${SYSTEM_ROLE_BASE_URL}/resetRolePermission`,
      method: "post",
      data,
    });
  },
  deleteRole(data: DeleteData) {
    return request<any, ApiResult>({
      url: `${SYSTEM_ROLE_BASE_URL}/deleteRole`,
      method: "post",
      data,
    });
  },
};

export default SystemRoleAPI;
