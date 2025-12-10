<!--
 * @Descripttion: 
 * @version: v1
 * @Author: youhujun 2900976495@qq.com
 * @Date: 2025-10-12 14:44:30
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-12-10 02:03:50
 * @FilePath: d:\wwwroot\Open\Vue\vue3-element-admin-youhujun\src\pages\laravel-fast-api\v1\business\platform\banner\components\PhoneBannerListItemDetails.vue
 * Copyright (C) 2025 youhujun. All rights reserved.
-->

<template>
  <div class="expanded">
    <div class="header">
      <el-row type="flex">
        <el-button type="primary" size="small" @click="handleClick(1)">
          <el-icon style="vertical-align: middle">
            <Document />
          </el-icon>
          轮播图片
        </el-button>
        <el-button type="primary" size="small" @click="handleClick(2)">
          <el-icon style="vertical-align: middle">
            <Document />
          </el-icon>
          详情信息
        </el-button>
      </el-row>
    </div>
    <div class="content">
      <!-- 简单的处理开始 -->
      <div :class="{ show: showIndex == 1, hidden: showIndex != 1 }">
        <el-row class="row-one">
          <el-image style="width: 375px" :src="rowData.picture" fit="fill" />
        </el-row>
        <el-row class="row-one">
          <UploadSinglePicture
            v-model:upload-picture-id="albumPictureId"
            v-model:upload-picture-url="uploadPicutreUrl"
            :upload-data="{ type: null, use_type: 20, file_type: '', save_path: 'picture' }"
            type="image"
            show-content="重新上传"
            :is-show-button="true"
          />
        </el-row>
        <el-row v-if="uploadPicutreUrl">
          <el-image style="width: 375px" :src="uploadPicutreUrl" fit="fill" />
        </el-row>
        <el-row :gutter="10">
          <el-button
            style="margin-left: 0.2rem"
            type="success"
            @click="handleUpdatePhoneBannerPicture()"
          >
            确定修改
          </el-button>
        </el-row>
      </div>
      <!-- 简单的处理结束 -->
      <div :class="{ show: showIndex == 2, hidden: showIndex != 2 }">
        <el-tag type="primary" plain>{{ rowData.redirect_url }}</el-tag>
        <el-row style="margin-bottom: 1rem">
          <el-tag type="info" size="large" style="margin-right: 1rem">跳转链接</el-tag>
          <el-input
            v-model="redirectUrl"
            placeholder="请输入跳转链接"
            clearable
            class="yh-input"
          ></el-input>
          <el-button style="margin-left: 1rem" type="primary" @click="handleUpdatePhoneBannerUrl()">
            确定修改
          </el-button>
        </el-row>
        <el-tag type="primary" plain>{{ rowData.sort }}</el-tag>
        <el-row style="margin-bottom: 1rem">
          <el-tag type="info" size="large" style="margin-right: 1rem">排序</el-tag>
          <el-input v-model="sort" placeholder="请输入排序" clearable class="yh-input"></el-input>
          <el-button
            style="margin-left: 1rem"
            type="primary"
            @click="handleUpdatePhoneBannerSort()"
          >
            确定修改
          </el-button>
        </el-row>
        <el-tag type="primary" plain>{{ rowData.note }}</el-tag>
        <el-row style="margin-bottom: 1rem">
          <el-tag type="info" size="large" style="margin-right: 1rem">备注</el-tag>
          <el-input
            v-model="note"
            placeholder="请输入备注"
            clearable
            class="yh-input"
            type="textarea"
            :rows="3"
          ></el-input>
          <el-button
            style="margin-left: 1rem"
            type="primary"
            @click="handleUpdatePhoneBannerNote()"
          >
            确定修改
          </el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
//系统
import { Document } from "@element-plus/icons-vue";
// 公共组件
import UploadSinglePicture from "@/pages/laravel-fast-api/v1/components/element/Upload/UploadPicture/UplaodSinglePicture.vue";
//api
import PhoneBannerInfoAPI from "@/api/laravel-fast-api/v1/business/platform/banner/info/banner-info-api";
import type { PhoneBannerListItem } from "@/api/laravel-fast-api/v1/business/platform/banner/banner-type";

import bus from "@/utils/eventBus";

//定义组件名称
defineOptions({
  name: "PhoneBannerListItemDetails",
});

//控制显示的组件
const showComponent = ref(1);
//定义行数据
const rowData = defineModel<PhoneBannerListItem>("rowData", {
  default: () => ({
    id: 0,
    user_id: 0,
    album_picture_id: 0,
    redirect_url: "",
    note: "",
    sort: 100,
    created_at: "",
    updated_at: "",
    picture: "",
  }),
});
//定义显示的下标
const showIndex = defineModel<number>("showIndex", {
  default: () => 1,
});
//定义图片id
const albumPictureId = ref(0);
//定义上传图片的rurl
const uploadPicutreUrl = ref<string>("");
//定义跳转链接
const redirectUrl = ref("");
//定义排序
const sort = ref<number | null>(null);
//定义备注
const note = ref("");
//点击按钮
const handleClick = (index: number) => {
  showIndex.value = index;
  showComponent.value = index;
};

//修改图片
const handleUpdatePhoneBannerPicture = async () => {
  if (!albumPictureId.value) {
    ElMessage.warning("没有上传图片");
    return;
  }
  const param = {
    id: rowData.value.id,
    album_picture_id: albumPictureId.value,
  };
  const result = await PhoneBannerInfoAPI.updatePhoneBannerPicture(param);
  uploadPicutreUrl.value = "";
  ElMessage.success(result.msg);

  bus.emit("reloadPhoneBannerList", true);
};
//修改跳转链接
const handleUpdatePhoneBannerUrl = async () => {
  if (!redirectUrl.value) {
    ElMessage.warning("没有跳转链接");
    return;
  }
  const param = {
    id: rowData.value.id,
    redirect_url: redirectUrl.value,
  };
  const result = await PhoneBannerInfoAPI.updatePhoneBannerUrl(param);
  redirectUrl.value = "";
  ElMessage.success(result.msg);

  bus.emit("reloadPhoneBannerList", true);
};
// 修改排序
const handleUpdatePhoneBannerSort = async () => {
  if (!sort.value) {
    ElMessage.warning("没有排序");
    return;
  }
  const param = {
    id: rowData.value.id,
    sort: sort.value,
  };
  const result = await PhoneBannerInfoAPI.updatePhoneBannerSort(param);
  sort.value = null;
  ElMessage.success(result.msg);

  bus.emit("reloadPhoneBannerList", true);
};
// 修改备注
const handleUpdatePhoneBannerNote = async () => {
  if (!note.value) {
    ElMessage.warning("没有备注");
    return;
  }
  const param = {
    id: rowData.value.id,
    note: note.value,
  };
  const result = await PhoneBannerInfoAPI.updatePhoneBannerBakInfo(param);
  note.value = "";
  ElMessage.success(result.msg);

  bus.emit("reloadPhoneBannerList", true);
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
.yh-input {
  width: 300px;
}
</style>
