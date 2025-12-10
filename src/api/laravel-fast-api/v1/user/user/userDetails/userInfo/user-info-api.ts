import request from "@/utils/request";

import type { ApiResult } from "@/api/laravel-fast-api/v1/api-type";

import type {
  UpdateUserNickName,
  UpdateUserPhone,
  UpdateUserBirthdayTime,
  ResetUserPassword,
  UpdateUserSex,
  ChangeUserLevel,
  UpdateUserRealName,
} from "@/api/laravel-fast-api/v1/user/user/userDetails/userInfo/user-info-type";

const USER_BASE_URL = "/api/v1/admin/user/details";

const UserDeatilsAPI = {
  //更新用户昵称
  updateUserNickName(data: UpdateUserNickName) {
    return request<any, ApiResult>({
      url: `${USER_BASE_URL}/updateUserNickName`,
      method: "post",
      data,
    });
  },
  //更新用户手机号
  updateUserPhone(data: UpdateUserPhone) {
    return request<any, ApiResult>({
      url: `${USER_BASE_URL}/updateUserPhone`,
      method: "post",
      data,
    });
  },
  //更新用户生日
  updateUserBirthdayTime(data: UpdateUserBirthdayTime) {
    return request<any, ApiResult>({
      url: `${USER_BASE_URL}/updateUserBirthdayTime`,
      method: "post",
      data,
    });
  },
  //更新用户手机号
  resetUserPassword(data: ResetUserPassword) {
    return request<any, ApiResult>({
      url: `${USER_BASE_URL}/resetUserPassword`,
      method: "post",
      data,
    });
  },
  //更新用户性别
  updateUserSex(data: UpdateUserSex) {
    return request<any, ApiResult>({
      url: `${USER_BASE_URL}/updateUserSex`,
      method: "post",
      data,
    });
  },
  //更新用户级别
  changeUserLevel(data: ChangeUserLevel) {
    return request<any, ApiResult>({
      url: `${USER_BASE_URL}/changeUserLevel`,
      method: "post",
      data,
    });
  },
  //更新用户真实姓名
  updateUserRealName(data: UpdateUserRealName) {
    return request<any, ApiResult>({
      url: `${USER_BASE_URL}/updateUserRealName`,
      method: "post",
      data,
    });
  },
};

export default UserDeatilsAPI;
