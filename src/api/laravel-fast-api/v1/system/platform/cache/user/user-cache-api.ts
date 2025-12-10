import request from "@/utils/request";

import type { ApiResult } from "@/api/laravel-fast-api/v1/api-type";

const CACHE_SYSTEM_BASE_URL = "/api/v1/admin/platform/cache";

const UserCacheAPI = {
  cleanLoginUserInfoCache() {
    return request<any, ApiResult>({
      url: `${CACHE_SYSTEM_BASE_URL}/cleanLoginUserInfoCache`,
      method: "get",
    });
  },
};

export default UserCacheAPI;
