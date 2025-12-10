/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun 2900976495@qq.com
 * @Date: 2025-10-15 15:22:13
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-12-05 13:50:00
 * @FilePath: \src\api\laravel-fast-api\v1\user\admin\option\admin-option-api.ts
 * Copyright (C) 2025 youhujun. All rights reserved.
 */
import request from "@/utils/request";

import type { ApiResult, OptionFind } from "@/api/laravel-fast-api/v1/api-type";

const ADMIN_OPTION_BASE_URL = "/api/v1/admin/admin/administrator";

const AdminOptionAPI = {
  findAdmin(data: OptionFind) {
    return request<any, ApiResult>({
      url: `${ADMIN_OPTION_BASE_URL}/findAdmin`,
      method: "post",
      data,
    });
  },
  getDefaultAdmin() {
    return request<any, ApiResult>({
      url: `${ADMIN_OPTION_BASE_URL}/getDefaultAdmin`,
      method: "get",
    });
  },
};

export default AdminOptionAPI;
