import type { BaseGetDataList } from "@/api/laravel-fast-api/v1/api-type";
export interface RealAuthUser {
  id: number;
  user_id: number;
  is_real_auth: number;
  refuse_info: string;
}

export interface GetUserRealAuthApply extends BaseGetDataList {
  user_id: number;
}
