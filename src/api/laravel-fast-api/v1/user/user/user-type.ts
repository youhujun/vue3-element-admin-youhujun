export interface UserListResult<T = any> {
  code: number;
  msg: string;
  data: T | [];
  meta: UserResultMeta;
  applyNumber: number;
}

export interface UserResultMeta {
  current_page: number;
  per_page: number;
  last_page: number;
  total: number;
  path: string;
  to: number;
  total_pages: number;
  from: number;
  links: [];
}

export interface UserListFrom {
  find?: string;
  findSelectIndex?: number;
  currentPage?: number;
  pageSize?: number;
  sortType?: string | number;
  timeRange?: never[];
  isExport?: boolean | number | string;
  exportType?: boolean | number | string;
  switch?: boolean | number | string | null;
  real_auth_status?: boolean | number | string;
  total?: number;
}

//添加用户表单
export interface CreateUserFrom {
  source_user_id: number;
  phone: string;
  password: string;
  nick_name: string;
  sex: number;
}

export interface SwitchUserForm {
  id: number | string;
  switch?: number;
}

export interface DeleteUserFrom {
  id: number | string;
  is_delete?: number;
}

export interface UserListItem {
  id: number;
  userId: string;
  created_at: string;
  switch: number | string;
  level_id: number;
  parent_id: number | null;
  account_name: string | null;
  invite_code: string | null;
  phone: string | null;
  real_auth_status: number | string;
  source_user_id: number | string | null;
  amount: string;
  coin: string;
  score: string;
  nick_name: string;
  real_name: string;
  solar_birthday_at: string | null;
  chinese_birthday_at: string | null;
  sex: number | string;
  id_number: string | null;
  introduction: string | null;
  avatar: string | null | undefined;
  user_level: string | null;
  role: UserListItemRole[];
}

export interface UserListItemRole {
  id: number;
  parent_id: number;
  created_at: string;
  updated_at: string | null;
  role_name: string;
  logic_name: string;
  deep: number;
  sort: number;
  switch: number;
}
