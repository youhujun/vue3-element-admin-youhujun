import request from "@/utils/request";

import type { DownloadResult } from "@/api/laravel-fast-api/v1/api-type";

const SYSTEM_DOWNLOAD_BASE_URL = "/api/v1/admin/file";

const DownloadAPI = {
  downloadBank() {
    return request<any, DownloadResult>({
      url: `${SYSTEM_DOWNLOAD_BASE_URL}/downloadBank`,
      method: "post",
    });
  },
};

export default DownloadAPI;
