<!--
 * @Descripttion: 
 * @version: v1
 * @Author: youhujun 2900976495@qq.com
 * @Date: 2025-10-05 17:03:30
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-11-30 23:16:44
 * @FilePath: \src\pages\laravel-fast-api\v1\user\user\editUser\index.vue
 * Copyright (C) 2025 youhujun. All rights reserved.
-->
<template>
  <div>
    <!-- 页面内容开始 -->
    <YhCard>
      <template #cardTitle>编辑用户详情</template>
      <template #cardNotice>
        <el-tag size="small" type="danger" effect="plain">编辑用户详情</el-tag>
      </template>
      <template #cardButton>
        <!-- <el-button v-has-role="['develop']" style="float:right;" type="primary" @click="handleAddTop()">添加顶级</el-button> -->
      </template>
      <template #cardContent>
        <div class="custom-node">
          <!-- 修改手机号 -->
          <el-row class="row-one">
            <el-col :span="2">
              <span class="level-title">用户手机号</span>
            </el-col>
            <el-col :span="4">
              <el-input v-model="phone" class="input" />
            </el-col>
            <el-col :span="3">
              <el-button
                style="margin-top: 5px"
                type="primary"
                size="small"
                plain
                @click="handleUpdateUserPhone"
              >
                修改用户手机号
              </el-button>
            </el-col>
          </el-row>
          <el-row class="row-one">
            <!-- 修改姓名 -->
            <el-col :span="2">
              <span class="level-title">用户姓名</span>
            </el-col>
            <el-col :span="4">
              <el-input v-model="real_name" class="input" />
            </el-col>
            <el-col :span="3">
              <el-button
                style="margin-top: 5px"
                type="primary"
                size="small"
                plain
                @click="handleUpdateUserRealName"
              >
                修改用户姓名
              </el-button>
            </el-col>
            <!-- 修改昵称 -->
            <el-col :span="2">
              <span class="level-title">用户昵称</span>
            </el-col>
            <el-col :span="4">
              <el-input v-model="nick_name" class="input" />
            </el-col>
            <el-col :span="3">
              <el-button
                style="margin-top: 5px"
                type="primary"
                size="small"
                plain
                @click="handleUpdateUserNickName"
              >
                修改用户昵称
              </el-button>
            </el-col>
          </el-row>
          <el-row class="row-one">
            <!-- 修改性别 -->
            <el-col :span="2">
              <span class="level-title">用户性别</span>
            </el-col>
            <el-col :span="4">
              <el-select v-model="sex" placeholder="请选择" class="select">
                <el-option label="男" :value="10"></el-option>
                <el-option label="女" :value="20"></el-option>
                <el-option label="未知" :value="0"></el-option>
              </el-select>
            </el-col>
            <el-col :span="3">
              <el-button
                style="margin-top: 5px"
                type="primary"
                size="small"
                plain
                @click="handleUpdateUserSex"
              >
                修改用户性别
              </el-button>
            </el-col>
            <!-- 修改出生日期 -->
            <el-col :span="2">
              <span class="level-title">出生日期(阳历)</span>
            </el-col>
            <el-col :span="4">
              <PastSelectDateTime
                v-model:past-time="solar_birthday_time"
                :value-format="'YYYY-MM-DD'"
              ></PastSelectDateTime>
            </el-col>
            <el-col :span="3">
              <el-button
                style="margin-top: 5px"
                type="primary"
                size="small"
                plain
                @click="handleUpdateUserBirthdayTime"
              >
                修改出生日期
              </el-button>
            </el-col>
          </el-row>
          <el-row class="row-one" style="margin-bottom: 50px">
            <!-- 用户级别 -->
            <el-col :span="2">
              <span class="level-title">用户级别</span>
            </el-col>
            <el-col :span="4">
              <SelectUserLevel v-model:select-user-level-list-item-id="level_id"></SelectUserLevel>
            </el-col>
            <el-col :span="3">
              <el-button
                style="margin-right: 1rem"
                type="primary"
                size="small"
                plain
                @click="handleChangeUserLevel"
              >
                更改用户级别
              </el-button>
            </el-col>
            <!-- 修改密码 -->
            <el-col :span="2">
              <span class="level-title">重置密码</span>
            </el-col>
            <el-col :span="4">
              <el-input v-model="password" placeholder="密码" type="password" class="input" />
              <div>默认abc123</div>
            </el-col>
            <el-col :span="3">
              <el-button
                style="margin-top: 5px"
                type="primary"
                size="small"
                plain
                @click="handleResetUserPassword"
              >
                重置用户密码
              </el-button>
            </el-col>
          </el-row>
        </div>
      </template>
    </YhCard>
    <!-- 页面内容结束 -->
  </div>
</template>
<script setup lang="ts">
// 公共级组件
import YhCard from "@/pages/laravel-fast-api/v1/components/element/Card/index.vue";
import SelectUserLevel from "@/pages/laravel-fast-api/v1/components/element/Level/UserLevel/SelectUserLevel.vue";
import PastSelectDateTime from "@/pages/laravel-fast-api/v1/components/element/Time/PastSelectDateTime.vue";
//系统
import { useRoute } from "vue-router";
//工具
import { decryptData } from "@/utils/crypt";
import { validPhone } from "@/utils/validate";
// qpi和type
import UserDeatilsAPI from "@/api/laravel-fast-api/v1/user/user/userDetails/userInfo/user-info-api";

const route = useRoute();
const row = decryptData(route.query.row as string);

//用户id
const user_id = ref(0);
//手机号
const phone = ref<string>("");
//真实姓名
const real_name = ref<string>("");
//昵称
const nick_name = ref<string>("");
//性别
const sex = ref<number | undefined>(0);
//出生日期
const solar_birthday_time = ref<string>("");
//级别id
const level_id = ref<number | undefined>(0);
//密码
const password = ref<string>("");

//页面加载
onMounted(() => {
  console.log("页面加载");

  //console.log(row)
  //console.log(row.phone)

  user_id.value = row.id;
  phone.value = row.phone ? row.phone : "";
  real_name.value = row.real_name ? row.real_name : "";
  nick_name.value = row.nick_name ? row.nick_name : "";
  sex.value = row.sex ? row.sex : 0;
  solar_birthday_time.value = row.solar_birthday_time ? row.solar_birthday_time : "";
  level_id.value = row.level_id ? row.level_id : 0;
});

//修改手机号
const handleUpdateUserPhone = async () => {
  if (!validPhone(phone.value)) {
    ElMessage.warning("手机号不正确");
    return;
  }
  const param = {
    user_id: user_id.value,
    phone: phone.value,
  };
  const result = await UserDeatilsAPI.updateUserPhone(param);
  ElMessage.success(result.msg);
};
//修改真实姓名
const handleUpdateUserRealName = async () => {
  if (!real_name.value) {
    ElMessage.warning("没有姓名");
    return;
  }
  const param = {
    user_id: user_id.value,
    real_name: real_name.value,
  };
  const result = await UserDeatilsAPI.updateUserRealName(param);
  ElMessage.success(result.msg);
};
//修改昵称
const handleUpdateUserNickName = async () => {
  if (!nick_name.value) {
    ElMessage.warning("没有昵称");
    return;
  }
  const param = {
    user_id: user_id.value,
    nick_name: nick_name.value,
  };
  const result = await UserDeatilsAPI.updateUserNickName(param);
  ElMessage.success(result.msg);
};
//修改性别
const handleUpdateUserSex = async () => {
  if (sex.value === null || sex.value === undefined) {
    ElMessage.warning("没有性别");
    return;
  }
  const param = {
    user_id: user_id.value,
    sex: sex.value as number,
  };
  const result = await UserDeatilsAPI.updateUserSex(param);
  ElMessage.success(result.msg);
};
//修改 用户生日
const handleUpdateUserBirthdayTime = async () => {
  if (!solar_birthday_time.value) {
    ElMessage.warning("没有生日");
    return;
  }
  const param = {
    user_id: user_id.value,
    solar_birthday_time: solar_birthday_time.value,
  };
  const result = await UserDeatilsAPI.updateUserBirthdayTime(param);
  ElMessage.success(result.msg);
};
//修改用户级别
const handleChangeUserLevel = async () => {
  if (!level_id.value) {
    ElMessage.warning("没有级别");
    return;
  }
  const param = {
    user_id: user_id.value,
    level_id: level_id.value as number,
  };
  const result = await UserDeatilsAPI.changeUserLevel(param);
  ElMessage.success(result.msg);
};
//修改用户密码
const handleResetUserPassword = async () => {
  if (!password.value) {
    ElMessage.warning("没有密码");
    return;
  }
  const param = {
    user_id: user_id.value,
    password: password.value,
  };
  const result = await UserDeatilsAPI.resetUserPassword(param);
  ElMessage.success(result.msg);
};
</script>
<style lang="scss" scoped>
.row-one {
  width: 100rem;
  height: 46px;
  margin-bottom: 1rem;
  line-height: 46px;
}
.input,
.select {
  width: 250px;
}
.level-title {
  display: inline-flex;
  height: 46px;
  font-size: 14px;
  font-weight: 700;
  line-height: 46px;
  color: #606266;
}
</style>
