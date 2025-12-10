/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun youhu8888@163.com
 * @Date: 2025-10-19 01:15:40
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-11-17 10:23:48
 * @FilePath: \src\api\laravel-fast-api\v1\system\system\voice\system-voice-api.ts
 * Copyright (C) 2025 youhujun. All rights reserved.
 */
import request from "@/utils/request";

import type {
  ApiResult,
  BaseGetDataList,
  MultipleSelectId,
  DeleteById,
} from "@/api/laravel-fast-api/v1/api-type";

import type {
  AddVoiceConfig,
  UpdateVoiceConfig,
} from "@/api/laravel-fast-api/v1/system/system/voice/system-voice-type";

const SYSTEM_VOICE_BASE_URL = "/api/v1/admin/system/voice";

const SystemVoiceAPI = {
  getVoiceConfig(data: BaseGetDataList) {
    return request<any, ApiResult>({
      url: `${SYSTEM_VOICE_BASE_URL}/getVoiceConfig`,
      method: "post",
      data,
    });
  },
  addVoiceConfig(data: AddVoiceConfig) {
    return request<any, ApiResult>({
      url: `${SYSTEM_VOICE_BASE_URL}/addVoiceConfig`,
      method: "post",
      data,
    });
  },
  updateVoiceConfig(data: UpdateVoiceConfig) {
    return request<any, ApiResult>({
      url: `${SYSTEM_VOICE_BASE_URL}/updateVoiceConfig`,
      method: "post",
      data,
    });
  },
  deleteVoiceConfig(data: DeleteById) {
    return request<any, ApiResult>({
      url: `${SYSTEM_VOICE_BASE_URL}/deleteVoiceConfig`,
      method: "post",
      data,
    });
  },
  multipleDeleteVoiceConfig(data: MultipleSelectId) {
    return request<any, ApiResult>({
      url: `${SYSTEM_VOICE_BASE_URL}/multipleDeleteVoiceConfig`,
      method: "post",
      data,
    });
  },
};

export default SystemVoiceAPI;
