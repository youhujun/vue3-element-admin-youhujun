<!--
 * @Descripttion: 
 * @version: v1
 * @Author: youhujun youhu8888@163.com
 * @Date: 2025-10-31 11:00:42
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-12-10 12:14:01
 * @FilePath: d:\wwwroot\Open\Vue\vue3-element-admin-youhujun\src\pages\laravel-fast-api\v1\components\element\Album\AlbumItem.vue
 * Copyright (C) 2025 youhujun. All rights reserved.
-->

<template>
  <el-col :span="4">
    <div class="album-item">
      <div class="item-header" @click="handleShowPicture()">
        <div class="header-cover">
          <CameraFilled
            v-if="albumItem.cover_album_picture_id === 1 || albumItem.cover_album_picture == null"
            style="font-size: 3rem"
            class="camera-icon"
          />
          <el-image
            v-if="albumItem.cover_album_picture_id !== 1 && albumItem.cover_album_picture"
            style="width: 100%; height: 100%"
            :src="albumItem.cover_album_picture"
            fit="fill"
          />
        </div>
      </div>
      <div class="item-footer">
        <div class="album-name" @click="handleShowPicture()">
          <span>{{ albumItem.album_name }}</span>
          <span v-if="albumItem.album_type === 10 && albumItem.admin_id !== 0">
            <i class="el-icon-user-solid" />
          </span>
          <span v-if="albumItem.album_type === 20 && albumItem.user_id !== 0">
            <i class="el-icon-user" />
          </span>
        </div>
        <div class="album-number">共 {{ albumItem.picture_number }} 张</div>
        <div class="action-box">
          <el-button class="mini-button" @click="handleUpdateAlbum()">
            <div class="button-show">
              <Edit style="width: 1em; height: 1em; margin-right: 3px" />
              编辑
            </div>
          </el-button>
          <el-button
            v-if="albumItem.album_type !== 0 && albumItem.is_system !== 1"
            class="mini-button"
            @click="handleRemoveAlbum()"
          >
            <Delete style="width: 1em; height: 1em; margin-right: 3px" />
            删除
          </el-button>
        </div>
      </div>
    </div>
  </el-col>
</template>
<script setup lang="ts">
import type { AlbumListItem } from "@/api/laravel-fast-api/v1/picture/album/album-type";
//api
import SystemAlbumAPI from "@/api/laravel-fast-api/v1/picture/album/album-api";
//通信
import bus from "@/utils/eventBus";

defineOptions({
  name: "AlbumItem",
});
const emit = defineEmits(["update:updateAlbum", "update:deleteAlbum"]);
//定义传入属性
const props = withDefaults(
  defineProps<{
    albumItem?: AlbumListItem;
  }>(),
  {
    // 为 albumItem 设置默认对象
    albumItem: () => ({
      id: 0,
      user_id: 0,
      admin_id: 0,
      cover_album_picture_id: 0,
      revision: 0,
      is_default: 0,
      is_system: 0,
      album_name: "相册名称",
      album_description: "相册描述",
      album_type: 0,
      created_at: "2024-07-26 19:18:42",
      sort: 100,
      picture_number: 0,
      cover_album_picture: "",
    }),
  }
);

//监听单个相册对象
watch(
  () => props.albumItem,
  () => {
    //console.log(newValue)
  }
);

//查看相册图片
const handleShowPicture = () => {
  //console.log('查看图片')
  bus.emit("showPicture", props.albumItem);
};

//更新相册
const handleUpdateAlbum = () => {
  //console.log('更新相册')
  //console.log(props.albumItem)
  emit("update:updateAlbum", props.albumItem);
};

//删除相册
const handleRemoveAlbum = () => {
  //console.log('删除相册')

  const param = { id: props.albumItem.id };

  ElMessageBox.confirm("确认删除吗?", "确认删除", {
    // confirmButtonText: 'Re-Login',
    confirmButtonText: "删除",
    // cancelButtonText: 'Cancel',
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      try {
        const result = await SystemAlbumAPI.deleteAlbum(param);
        ElMessage.success(result.msg);
        emit("update:deleteAlbum", true);
      } catch {
        //const err = error as Error;
        //ElMessage.error(`提交失败：${err.message || '未知错误'}`);
      }
    })
    .catch(() => {
      return;
    });
};
</script>

<style lang="scss" scoped>
.album-item {
  width: 100%;
  height: 20rem;
  background: #ffffff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.album-item:hover {
  background: #f2f8fcbd;
}
.item-header {
  width: 100%;
  height: 14rem;
  padding-top: 1rem;
}
.header-cover {
  width: 86%;
  height: 12rem;
  margin: auto auto;
  line-height: 14rem;
  text-align: center;
  background: #ffffff;
  border: 1px solid #f2f6fc;
}
.camera-icon {
  color: dimgrey;
}
.header-cover:hover {
  color: #409eff;
}

.header-cover:hover .camera-icon {
  color: #409eff;
}
.item-footer {
  width: 100%;
  height: 6rem;
}
.album-name {
  display: flex;
  justify-content: space-between;
  width: 86%;
  height: 1rem;
  margin: auto auto;
  margin-bottom: 1rem;
  font-size: 1rem;
  color: #409eff;
}
.album-number {
  width: 86%;
  height: 0.8rem;
  margin: auto auto;
  margin-bottom: 1rem;
  font-size: 0.8rem;
}
.action-box {
  display: flex;
  width: 86%;
  margin: auto auto;
  text-align: center;
}
.mini-button {
  display: none;
  width: 47%;
  height: 1.5rem;
  padding: 0;
  letter-spacing: 0.5rem;
}
.mini-button:hover {
  background: #ffffff;
}
.album-item:hover .mini-button {
  display: block;
}
</style>
