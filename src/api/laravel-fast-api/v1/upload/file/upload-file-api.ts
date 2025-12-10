/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun 2900976495@qq.com
 * @Date: 2025-09-29 21:03:24
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-10-28 14:19:33
 * @FilePath: \src\api\laravel-fast-api\v1\upload\file\upload-file-api.ts
 * Copyright (C) 2025 youhujun. All rights reserved.
 */
import request from "@/utils/request";

import type { ApiResult } from "@/api/laravel-fast-api/v1/api-type";

const UPLOAD_BASE_URL = "/api/v1/admin/file";

const UploadFileAPI = {
  uploadConfigFile(data: FormData) {
    return request<any, ApiResult>({
      url: `${UPLOAD_BASE_URL}/uploadConfigFile`,
      method: "post",
      withCredentials: false,
      data,
    });
  },
  uploadExcel(data: FormData) {
    return request<any, ApiResult>({
      url: `${UPLOAD_BASE_URL}/uploadExcel`,
      method: "post",
      withCredentials: false,
      data,
    });
  },
};

export default UploadFileAPI;
