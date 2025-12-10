//更新用户昵称
export interface UpdateUserNickName {
  user_id: number | string;
  nick_name: string;
}
//更新用户手机号
export interface UpdateUserPhone {
  user_id: number | string;
  phone: string;
}

//更新用户生日
export interface UpdateUserBirthdayTime {
  user_id: number | string;
  solar_birthday_time: string;
}

//更新用户密码
export interface ResetUserPassword {
  user_id: number | string;
  password: string;
}

//更新用户性别
export interface UpdateUserSex {
  user_id: number | string;
  sex: number | string;
}

//更改用户性别
export interface ChangeUserLevel {
  user_id: number | string;
  level_id: number | string;
}

//更改用户性别
export interface UpdateUserRealName {
  user_id: number | string;
  real_name: number | string;
}
