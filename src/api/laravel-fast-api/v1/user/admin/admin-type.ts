import type { BaseGetDataList } from "@/api/laravel-fast-api/v1/api-type";

export interface GetAdmin extends BaseGetDataList {
  switch: number | null;
}

export interface AddAdmin {
  user_id: number;
  roleIdArray: number[];
  role: number[][];
  phone: string;
}

export interface UpdateAdmin {
  id: number;
  roleIdArray: number[];
  role: number[][];
  phone: string;
}

export interface AdminRoleListItem {
  id: number;
  role_name: string;
  logic_name: string;
}

export interface AdminListItem {
  id: number;
  user_id: number;
  switch: number | string;
  account_name: string;
  phone: string;
  created_at: string;
  nick_name: string;
  real_name: string;
  solar_birthday_at: string;
  chinese_birthday_at: string;
  sex: number;
  id_number: string;
  introduction: string;
  avatar: string;
  role: AdminRoleListItem[];
  role_id: number[][];
}
