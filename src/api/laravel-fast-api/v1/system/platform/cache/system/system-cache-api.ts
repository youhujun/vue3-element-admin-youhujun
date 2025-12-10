import request from "@/utils/request";

import type { ApiResult } from "@/api/laravel-fast-api/v1/api-type";

const CACHE_SYSTEM_BASE_URL = "/api/v1/admin/platform/cache";

const SystemCacheAPI = {
  cleanConfigCache() {
    return request<any, ApiResult>({
      url: `${CACHE_SYSTEM_BASE_URL}/cleanConfigCache`,
      method: "get",
    });
  },
  cleanSystemConfigCache() {
    return request<any, ApiResult>({
      url: `${CACHE_SYSTEM_BASE_URL}/cleanSystemConfigCache`,
      method: "get",
    });
  },
  cleanPermissionCache() {
    return request<any, ApiResult>({
      url: `${CACHE_SYSTEM_BASE_URL}/cleanPermissionCache`,
      method: "get",
    });
  },
  cleanRoleCache() {
    return request<any, ApiResult>({
      url: `${CACHE_SYSTEM_BASE_URL}/cleanRoleCache`,
      method: "get",
    });
  },
  cleanGoodsClassCache() {
    return request<any, ApiResult>({
      url: `${CACHE_SYSTEM_BASE_URL}/cleanGoodsClassCache`,
      method: "get",
    });
  },
  cleanCategoryCache() {
    return request<any, ApiResult>({
      url: `${CACHE_SYSTEM_BASE_URL}/cleanCategoryCache`,
      method: "get",
    });
  },
  cleanLabelCache() {
    return request<any, ApiResult>({
      url: `${CACHE_SYSTEM_BASE_URL}/cleanLabelCache`,
      method: "get",
    });
  },
  cleanRegionCache() {
    return request<any, ApiResult>({
      url: `${CACHE_SYSTEM_BASE_URL}/cleanRegionCache`,
      method: "get",
    });
  },
};

export default SystemCacheAPI;
