import request from "@/utils/request";
import type { ApiResult } from "@/api/laravel-fast-api/v1/api-type";
import type { LoginFormData } from "@/api/laravel-fast-api/v1/login/login.type";

const LOGIN_BASE_URL = "/api/v1/admin/login";

const LoginAPI = {
  login(data: LoginFormData) {
    return request<any, ApiResult>({
      url: `${LOGIN_BASE_URL}/login`,
      method: "post",
      data,
    });
  },
  logout() {
    return request({
      url: `${LOGIN_BASE_URL}/logout`,
      method: "get",
    });
  },
};

export default LoginAPI;
