<!--
 * @Descripttion: 
 * @version: v1
 * @Author: youhujun 2900976495@qq.com
 * @Date: 2025-10-12 14:44:30
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-12-01 16:46:33
 * @FilePath: \src\pages\laravel-fast-api\v1\user\user\userList\components\UserListItemDetails.vue
 * Copyright (C) 2025 youhujun. All rights reserved.
-->

<template>
  <div class="expanded">
    <div class="header">
      <el-row type="flex">
        <el-button type="primary" :icon="Avatar" size="small" @click="handleClick(1)">
          用户头像
        </el-button>
        <el-button type="primary" :icon="Document" size="small" @click="handleClick(2)">
          用户详情
        </el-button>
        <el-button type="primary" :icon="Picture" size="small" @click="handleClick(3)">
          用户二维码
        </el-button>
        <el-button type="primary" :icon="Location" size="small" @click="handleClick(4)">
          用户地址
        </el-button>
        <el-button type="primary" :icon="CreditCard" size="small" @click="handleClick(5)">
          用户银行卡
        </el-button>
        <el-button type="primary" :icon="Postcard" size="small" @click="handleClick(6)">
          用户身份证
        </el-button>
        <el-button type="primary" :icon="UserFilled" size="small" @click="handleClick(7)">
          用户团队
        </el-button>
        <el-button type="primary" :icon="Notebook" size="small" @click="handleClick(8)">
          账户日志
        </el-button>
        <el-button type="primary" :icon="ShoppingTrolley" size="small" @click="handleClick(9)">
          用户订单
        </el-button>
        <el-button type="primary" :icon="Reading" size="small" @click="handleClick(10)">
          用户文章
        </el-button>
      </el-row>
    </div>
    <div class="content">
      <div :class="{ show: showIndex == 1, hidden: showIndex != 1 }">
        <UplaodUserAvatar
          v-model:upload-picture-url="userAvatar"
          :upload-data="{ type: null, use_type: 20, file_type: '', save_path: 'picture' }"
          type="image"
          :user-id="rowData.id"
        />
      </div>
      <div :class="{ show: showIndex == 2, hidden: showIndex != 2 }">
        <UserInfo v-if="showComponent === 2" v-model:row-data="rowData" />
      </div>
      <div :class="{ show: showIndex == 3, hidden: showIndex != 3 }">
        <Qrcode v-if="showComponent === 3" v-model:row-data="rowData" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
//系统
import { useRouter } from "vue-router";
import {
  Avatar,
  Document,
  Location,
  CreditCard,
  Postcard,
  UserFilled,
  Picture,
  Notebook,
  ShoppingTrolley,
  Reading,
} from "@element-plus/icons-vue";
//工具
import { encryptData } from "@/utils/crypt";
//组件
import UplaodUserAvatar from "@/pages/laravel-fast-api/v1/components/element/Upload/Avatar/UploadUserAvatar.vue";
import UserInfo from "./ListItemDetails/UserInfo.vue";
import Qrcode from "./ListItemDetails/Qrcode.vue";

//api
import type { UserListItem } from "@/api/laravel-fast-api/v1/user/user/user-type";
//定义组件名称
defineOptions({
  name: "UserListItemDetails",
});
//初始化路由
const router = useRouter();
//控制显示的组件
const showComponent = ref(1);
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
// 计算用户头像地址，有值则返回，无值则返回空字符串
const userAvatar = computed({
  // 获取头像地址
  get() {
    return rowData.value?.avatar ?? "";
  },
  // 设置头像地址
  set(newAvatar) {
    // 确保rowData存在再设置
    if (rowData.value) {
      rowData.value.avatar = newAvatar;
    }
  },
});
//定义显示的下标
const showIndex = defineModel<number>("showIndex", {
  default: () => 1,
});
//点击按钮
const handleClick = (index: number) => {
  showIndex.value = index;
  showComponent.value = index;

  //用户地址跳转
  if (index === 4) {
    const encryptString = encryptData(rowData.value);
    router.push({
      name: "userAddress",
      query: { row: encryptString }, // 注意：query参数建议序列化，避免对象类型问题
    });
  }
  //用户银行卡
  if (index === 5) {
    const encryptString = encryptData(rowData.value);
    router.push({
      name: "userBank",
      query: { row: encryptString }, // 注意：query参数建议序列化，避免对象类型问题
    });
  }
  //用户身份证
  if (index === 6) {
    const encryptString = encryptData(rowData.value);
    router.push({
      name: "userIdCard",
      query: { row: encryptString }, // 注意：query参数建议序列化，避免对象类型问题
    });
  }
  //用户团队
  if (index === 7) {
    const encryptString = encryptData(rowData.value);
    router.push({
      name: "userTeam",
      query: { row: encryptString }, // 注意：query参数建议序列化，避免对象类型问题
    });
  }
  //用户日志
  if (index === 8) {
    const encryptString = encryptData(rowData.value);
    router.push({
      name: "userAccountLog",
      query: { row: encryptString }, // 注意：query参数建议序列化，避免对象类型问题
    });
  }
  //用户订单
  if (index === 9) {
    const encryptString = encryptData(rowData.value);
    router.push({
      name: "userOrder",
      query: { row: encryptString }, // 注意：query参数建议序列化，避免对象类型问题
    });
  }
  //用户文章
  if (index === 10) {
    const encryptString = encryptData(rowData.value);
    router.push({
      name: "userArticle",
      query: { row: encryptString }, // 注意：query参数建议序列化，避免对象类型问题
    });
  }
};
</script>
<style lang="scss" scoped>
.expanded {
  padding: 15px;
}
.header {
  margin-bottom: 1rem;
}
.show {
  display: block;
}
.hidden {
  display: none;
}
</style>
