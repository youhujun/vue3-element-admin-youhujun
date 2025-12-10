<!--
 * @Descripttion: 
 * @version: v1
 * @Author: youhujun youhu8888@163.com
 * @Date: 2025-10-19 01:15:40
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-12-08 17:09:44
 * @FilePath: \src\views\profile\index.vue
 * Copyright (C) 2025 youhujun. All rights reserved.
-->
<template>
  <div>
    <div style="width: 100%; height: 1rem" />
    <el-row :gutter="10">
      <!-- 左侧 -->
      <el-col :span="8">
        <el-card shadow="always" style="margin-left: 1rem">
          <div class="avatar-box">
            <UplaodUserAvatar
              v-model:upload-picture-url="userAvatar"
              :upload-data="{ type: null, use_type: 10, file_type: '', save_path: 'picture' }"
              type="image"
              :user-id="userId"
              :album-id="albumId"
              :size="100"
            />
          </div>
          <div class="avatar-box">
            <el-button type="primary" @click="handleToUpdateAvatar">确定修改</el-button>
          </div>
        </el-card>
      </el-col>
      <!-- 左侧 结束-->
      <el-col :span="16">
        <el-card shadow="always" style="margin-right: 1rem">
          <el-row :gutter="10" style="margin-bottom: 1rem">
            <el-col :span="8">
              <el-input v-model="phone" placeholder="手机号" clearable></el-input>
            </el-col>
            <el-col :span="2">
              <el-button type="primary" @click="handleToUpdatePhone">修改</el-button>
            </el-col>
          </el-row>
          <el-row :gutter="10" style="margin-bottom: 1rem">
            <el-col :span="8">
              <el-input
                v-model="password"
                placeholder="新密码"
                type="password"
                clearable
              ></el-input>
            </el-col>
          </el-row>
          <el-row :gutter="10" style="margin-bottom: 1rem">
            <el-col :span="8">
              <el-input
                v-model="repass"
                placeholder="确认新密码"
                type="password"
                clearable
              ></el-input>
            </el-col>
            <el-col :span="2">
              <el-button type="primary" @click="handleToUpdatePassword">修改</el-button>
            </el-col>
          </el-row>
        </el-card>
        <el-card shadow="always" style="margin-right: 1rem">
          <el-row :gutter="10" style="margin-bottom: 1rem">
            <el-tag type="info">角色</el-tag>
          </el-row>
          <div v-if="role.length">
            <el-row
              v-for="(item, key) in role"
              :key="key"
              :gutter="10"
              :span="2"
              style="margin-bottom: 1rem"
            >
              <el-tag type="primary">{{ item }}</el-tag>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts">
import UplaodUserAvatar from "@/pages/laravel-fast-api/v1/components/element/Upload/Avatar/UploadUserAvatar.vue";
import { useUserStore } from "@/store";
//api hetype
import AdminPersonalAPI from "@/api/laravel-fast-api/v1/user/admin/personal/admin-personal-api";
defineOptions({
  name: "AdminProfile",
});

//store
const userStore = useUserStore();
//置换用户信息
const userInfo = userStore.userInfo;
//定义用户头像
const userAvatar = ref("");
//管理员用户id
const userId = ref(0);
//相册id
const albumId = ref(0);
//手机号
const phone = ref("");
//定义角色
const role = ref<string[]>([]);
//密码
const password = ref("");
const repass = ref("");

//修改头像
const handleToUpdateAvatar = async () => {
  const result = await AdminPersonalAPI.updateAvatar();
  userStore.getUserInfo();
  ElMessage.success(result.msg);
};

//点击修改手机号
const handleToUpdatePhone = async () => {
  if (!phone.value) {
    ElMessage.warning("未填写手机号");
    return;
  }
  const param = {
    phone: phone.value,
  };
  const result = await AdminPersonalAPI.updatePhone(param);

  ElMessage.success(result.msg);
};

//定义修改密码
const handleToUpdatePassword = async () => {
  if (!password.value) {
    ElMessage.warning("未填写密码");
    return;
  }
  if (!repass.value) {
    ElMessage.warning("未填写确认密码");
    return;
  }
  if (repass.value !== password.value) {
    ElMessage.warning("密码不一致");
    return;
  }
  const param = {
    password: password.value,
    repass: repass.value,
  };
  const result = await AdminPersonalAPI.updatePassword(param);

  ElMessage.success(result.msg);
  password.value = "";
  repass.value = "";
};

onMounted(() => {
  userAvatar.value = userInfo.avatar ? userInfo.avatar : "";
  userId.value = userInfo.user_id ? userInfo.user_id : 0;
  albumId.value = userInfo.album_id ? userInfo.album_id : 1;
  phone.value = userInfo.phone ? userInfo.phone : "";
  role.value = userStore.roles;
});
</script>

<style lang="scss" scoped>
.avatar-box {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  height: auto;
}
</style>
