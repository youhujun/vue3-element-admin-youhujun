import request from "@/utils/request";
import type { ApiResult } from "@/api/laravel-fast-api/v1/api-type";
import type {
  RealAuthUser,
  GetUserRealAuthApply,
} from "@/api/laravel-fast-api/v1/user/user/realAuth/real-auuth-type";

const USER_REAL_AUTH_URL = "/api/v1/admin/user/real-auth";

const UserRealAuthAPI = {
  getUserRealAuthApply(data: GetUserRealAuthApply) {
    return request<any, ApiResult>({
      url: `${USER_REAL_AUTH_URL}/getUserRealAuthApply`,
      method: "post",
      data,
    });
  },
  realAuthUser(data: RealAuthUser) {
    return request<any, ApiResult>({
      url: `${USER_REAL_AUTH_URL}/realAuthUser`,
      method: "post",
      data,
    });
  },
};

export default UserRealAuthAPI;
