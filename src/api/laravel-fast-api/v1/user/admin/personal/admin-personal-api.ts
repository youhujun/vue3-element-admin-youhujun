import request from "@/utils/request";
import type { ApiResult } from "@/api/laravel-fast-api/v1/api-type";
import type {
  UpdatePhone,
  UpdatePassword,
} from "@/api/laravel-fast-api/v1/user/admin/personal/admin-personal-type";

const ADDMIN_BASE_URL = "/api/v1/admin/admin/personal";

const AdminPersonalAPI = {
  updateAvatar() {
    return request<any, ApiResult>({
      url: `${ADDMIN_BASE_URL}/updateAvatar`,
      method: "post",
    });
  },
  updatePhone(data: UpdatePhone) {
    return request<any, ApiResult>({
      url: `${ADDMIN_BASE_URL}/updatePhone`,
      method: "post",
      data,
    });
  },
  updatePassword(data: UpdatePassword) {
    return request<any, ApiResult>({
      url: `${ADDMIN_BASE_URL}/updatePassword`,
      method: "post",
      data,
    });
  },
};

export default AdminPersonalAPI;
