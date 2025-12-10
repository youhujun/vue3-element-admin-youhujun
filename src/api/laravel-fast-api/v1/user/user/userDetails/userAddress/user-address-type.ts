export interface AddressRegionItem {
  id: number;
  parent_id: number;
  deep: number;
  region_name: string;
  region_area: string;
  created_at: string;
  sort: number;
}
export interface UserAddressListItem {
  id: number;
  created_at: string;
  is_default: number;
  is_top: number;
  user_name: string;
  phone: string;
  country_id: number;
  province_id: number;
  region_id: number;
  city_id: number;
  towns_id?: number;
  village_id?: number;
  address_info: string;
  address_type: number;
  province_name: string;
  region_name: string;
  city_name: string;
  towns_name?: string;
  village_name?: string;
  province: AddressRegionItem;
  region: AddressRegionItem;
  city: AddressRegionItem;
  towns?: AddressRegionItem;
  village?: AddressRegionItem;
}

//添加用户地址
export interface AddUserAddressFrom {
  user_id: number | string;
  user_name?: string;
  phone?: string;
  is_default: number;
  address_type: number;
  regionArray: number[];
  address_info: string;
}
//设置用户地址
export interface SetDefaultUserAddress {
  user_id: number | string;
  user_address_id: number | string;
}

//删除用户地址
export interface DeleteUserAddress {
  user_address_id: number | string;
}

//获取用户地址
export interface GetUserAddress {
  user_id: number | string;
  currentPage: number | string;
  pageSize: number | string;
  sortType: number | string;
}
