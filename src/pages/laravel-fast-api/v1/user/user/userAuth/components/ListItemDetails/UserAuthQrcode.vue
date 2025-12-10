<!--
 * @Descripttion: 
 * @version: v1
 * @Author: youhujun youhu8888@163.com
 * @Date: 2025-12-05 17:42:11
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-12-05 17:47:28
 * @FilePath: \src\pages\laravel-fast-api\v1\user\user\userAuth\components\ListItemDetails\Qrcode.vue
 * Copyright (C) 2025 youhujun. All rights reserved.
-->
<template>
  <div>
    <div v-show="qrcodeUrl">
      <el-tag type="primary" style="margin-bottom: 1rem">用户二维码</el-tag>
      <br />
      <el-image
        v-show="qrcodeUrl"
        style="width: 200px; height: 200px"
        :src="qrcodeUrl"
        fit="cover"
      ></el-image>
      <br />
      <el-button type="primary" @click="handleToMakeUserQrcode()">重新生成二维码</el-button>
    </div>

    <div v-show="!qrcodeUrl">
      <el-tag type="info" style="margin-bottom: 1rem">二维码获取失败</el-tag>
      <br />
      <el-button type="primary" @click="handleToMakeUserQrcode()">重新生成二维码</el-button>
    </div>
  </div>
</template>
<script setup lang="ts">
//api
import type { UserListItem } from "@/api/laravel-fast-api/v1/user/user/user-type";
import UserQrcodeAPI from "@/api/laravel-fast-api/v1/user/user/userDetails/userQrcode/user-qrcode-api";

//定义组件名称
defineOptions({
  name: "UserAuthQrcode",
});

//定义行数据
const rowData = defineModel<UserListItem>("rowData", {
  default: () => ({
    id: 0,
    userId: "",
    created_at: "",
    switch: 1,
    level_id: 1,
    parent_id: 0,
    account_name: "",
    invite_code: "",
    phone: "",
    real_auth_status: 0,
    source_id: 0,
    amount: "0",
    coin: "0",
    score: "0",
    nick_name: "",
    real_name: "",
    solar_birthday_at: "",
    chinese_birthday_at: "",
    sex: 0,
    id_number: "",
    introduction: "",
    avatar: "",
    user_level: "",
    role: [],
  }),
});

//定义二维码地址
const qrcodeUrl = ref<string>("");

//获取用户二维码
const getUserQrcode = async () => {
  const param = {
    user_id: rowData.value.id,
  };
  const result = await UserQrcodeAPI.getUserQrcode(param);

  qrcodeUrl.value = result.data?.picture ? result.data?.picture : "";
};

//重新生成二维码
const handleToMakeUserQrcode = async () => {
  const param = {
    user_id: rowData.value.id,
  };
  const result = await UserQrcodeAPI.makeUserQrcode(param);
  ElMessage.success(result.msg);
  getUserQrcode();
};

//组件加载
onMounted(() => {
  //console.log(rowData.value)
  nextTick(() => {
    getUserQrcode();
  });
});

//组件卸载
onUnmounted(() => {
  qrcodeUrl.value = "";
});
</script>
<style lang="scss" scoped></style>
