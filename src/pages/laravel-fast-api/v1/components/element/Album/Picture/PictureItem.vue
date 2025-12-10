<!--
 * @Descripttion: 
 * @version: v1
 * @Author: youhujun youhu8888@163.com
 * @Date: 2025-11-03 17:34:45
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-12-10 02:24:27
 * @FilePath: d:\wwwroot\Open\Vue\vue3-element-admin-youhujun\src\pages\laravel-fast-api\v1\components\element\Album\Picture\PictureItem.vue
 * Copyright (C) 2025 youhujun. All rights reserved.
-->
<template>
  <el-col :span="4">
    <div class="picture-box">
      <div class="picture-header">
        <div class="picture-show">
          <div v-if="isShowChecked" class="picture-select">
            <el-checkbox v-model="checked" @change="handleToCheck()" />
          </div>
          <el-image
            style="width: 100%; height: 100%"
            :src="pictureItem.picture"
            fit="fill"
            @click.stop="handleToClick()"
          />
        </div>
      </div>
      <div class="picture-footer">
        <div class="picture_name">
          <el-row>
            <el-col :span="22">
              <el-input
                v-model="pictureName"
                style="width: 100%; height: 1.5rem"
                @change="handlePictureNameBlurChange()"
              />
            </el-col>
            <el-col :span="2">
              <Edit style="width: 1.5rem; height: 1.5rem; color: gray" />
            </el-col>
          </el-row>
        </div>
        <div class="picture-switch">
          <div class="picture_info">
            <el-row type="flex" style="margin-bottom: 0.5rem; text-align: left">
              <el-col :span="8">上传时间:</el-col>
              <el-col :span="16">{{ pictureItem.created_at }}</el-col>
            </el-row>
            <el-row type="flex" style="text-align: left">
              <el-col :span="8">原图尺寸:</el-col>
              <el-col :span="16">{{ pictureItem.picture_spec }}</el-col>
            </el-row>
          </div>
          <div class="picture_action">
            <el-row :gutter="10" style="margin-bottom: 0.5rem">
              <el-col :span="12" :offset="0">
                <el-button
                  style="height: 1.5rem; line-height: 0.5rem"
                  type="primary"
                  size="small"
                  @click="handleResetUploadPicture()"
                >
                  <el-icon style="vertical-align: middle">
                    <Upload />
                  </el-icon>
                  <span style="vertical-align: middle">替换上传</span>
                </el-button>
              </el-col>
              <el-col :span="12" :offset="0">
                <el-button
                  style="height: 1.5rem; line-height: 0.5rem"
                  type="warning"
                  size="small"
                  @click="handleMoveAlbum()"
                >
                  <el-icon style="vertical-align: middle">
                    <Rank />
                  </el-icon>
                  <span style="vertical-align: middle">转移相册</span>
                </el-button>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="12" :offset="0">
                <el-button
                  style="height: 1.5rem; line-height: 0.5rem"
                  type="success"
                  size="small"
                  @click="handleSetCover()"
                >
                  <el-icon style="vertical-align: middle">
                    <PictureFilled />
                  </el-icon>
                  <span style="vertical-align: middle">设为封面</span>
                </el-button>
              </el-col>
              <el-col :span="12" :offset="0">
                <el-button
                  style="height: 1.5rem; line-height: 0.5rem"
                  type="danger"
                  size="small"
                  @click="handleDeletePicture()"
                >
                  <el-icon style="vertical-align: middle">
                    <Delete />
                  </el-icon>
                  <span style="vertical-align: middle">删除图片</span>
                </el-button>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>
  </el-col>
</template>
<script setup lang="ts">
//api和type
import {
  PictureListItem,
  PictureCheckListItem,
} from "@/api/laravel-fast-api/v1/picture/picture/picture-type";
import PictureAPI from "@/api/laravel-fast-api/v1/picture/picture/picture-api";
//通信
import bus from "@/utils/eventBus";

defineOptions({
  name: "PictureItem",
});

const emit = defineEmits(["update:handleChangeChecked"]);

//定义props
const props = withDefaults(
  defineProps<{
    pictureItem?: PictureListItem;
    isShowChecked?: boolean;
    checkItem?: PictureCheckListItem;
    itemIndex?: [number, number];
  }>(),
  {
    //图片对象
    pictureItem: () => ({
      id: 0,
      user_id: 0,
      album_id: 0,
      created_at: "2024-12-28 11:39:40",
      updated_at: null,
      picture_name: "avatar",
      picture_path: "/config/avatar/",
      picture_file: "avatar.gif",
      picture_size: 57,
      picture_spec: "658x494",
      picture: "https://api.zhuoyuexueba.com/storage/config/avatar//avatar.gif",
    }),
    //是否显示选中
    isShowChecked: false,
    //自定义选中元素
    checkItem: () => ({
      picture_id: 0,
      checked: false,
    }),
    //元素对应下标
    itemIndex: () => [0, 0],
  }
);

//是否选中
const checked = ref(false);
//图片名称容器
const pictureName = ref("");
//选中图片
const handleToCheck = () => {
  //console.log('选中图片')
  //定义要传递的数据
  const data = {
    checkedItem: {
      picture_id: props.checkItem.picture_id,
      checked: checked.value,
    },
    itemIndex: props.itemIndex,
  };
  emit("update:handleChangeChecked", data);
};
//点击图片容器
const handleToClick = () => {
  checked.value = !checked.value;
  //定义要传递的数据
  const data = {
    checkedItem: {
      picture_id: props.checkItem.picture_id,
      checked: checked.value,
    },
    itemIndex: props.itemIndex,
  };
  emit("update:handleChangeChecked", data);
};
//修改图片名城
const handlePictureNameBlurChange = async () => {
  //console.log('修改图片名称2')
  //console.log(pictureName.value)
  try {
    const result = await PictureAPI.updatePictureName({
      picture_id: props.pictureItem.id,
      picture_name: pictureName.value,
    });
    ElMessage.success(result.msg);
    bus.emit("reloadAlbumPicture", true);
  } catch {
    ElMessage.error("修改名称失败");
  }
};

//替换上传图片
const handleResetUploadPicture = () => {
  //console.log('替换上传图片')
  const data = {
    album_id: props.pictureItem.album_id as number,
    picture_id: props.pictureItem.id,
    //替换上传
    type: 20,
  };

  bus.emit("uploadResetPicture", data);
};

//转移相册
const handleMoveAlbum = () => {
  //console.log('转移相册')
  const data = {
    pictureId: props.pictureItem.id,
    originAlbumId: props.pictureItem.album_id as number,
    type: 10,
  };
  bus.emit("moveAlbumPicture", data);
};

//设为封面
const handleSetCover = async () => {
  //console.log('设为封面')
  try {
    const result = await PictureAPI.setCover({ picture_id: props.pictureItem.id });
    ElMessage.success(result.msg);
    bus.emit("reloadAlbumPicture", true);
  } catch {
    ElMessage.error("设置封面失败");
  }
};

//删除图片
const handleDeletePicture = async () => {
  //console.log('删除封面')
  try {
    const result = await PictureAPI.deletePicture({ picture_id: props.pictureItem.id });
    ElMessage.success(result.msg);
    bus.emit("reloadAlbumPicture", true);
  } catch {
    ElMessage.error("删除图片失败");
  }
};

// 监听 checkItem.checked 的变化，同步到 checked
watch(
  // 依赖：监听 props.checkItem.checked
  () => props.checkItem.checked,
  // 回调：当值变化时，更新 checked
  (newChecked) => {
    checked.value = newChecked;
  },
  // 可选：初始时立即执行一次，确保初始值同步
  { immediate: true }
);

onMounted(() => {
  pictureName.value = props.pictureItem.picture_name;
});
</script>

<style lang="scss" scoped>
.picture-box {
  width: 100%;
  height: 20rem;
  background: #ffffff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  .picture-header {
    width: 100%;
    height: 14rem;
    padding-top: 1rem;
    .picture-show {
      position: relative;
      width: 86%;
      height: 12rem;
      margin: auto auto;
      background: #ffffff;
      border: 1px solid #f2f6fc;
      .picture-select {
        position: absolute;
        top: -0.5rem;
        z-index: 10000;
        // 修改：::deep 改为 :deep(选择器)
        :deep(.el-checkbox__inner) {
          width: 1rem;
          height: 1rem;
        }
      }
    }
  }
  .picture-footer {
    width: 100%;
    height: 6rem;
    .picture_name {
      width: 86%;
      height: 1.2rem;
      margin: auto auto;
      margin-bottom: 0.8rem;
      // 修改：::deep 改为 :deep(选择器)
      :deep(.el-input__inner) {
        width: 100%;
        height: 1.2rem;
        padding: none;
        font-weight: bold;
        line-height: 1.2rem;
        border: none;
      }
    }
    .picture-switch {
      width: 86%;
      height: 4rem;
      margin: auto auto;
      .picture_info {
        display: block;
        font-size: 0.8rem;
        color: #909399;
        el-row {
          margin-bottom: 0.5rem;
        }
      }
      .picture_action {
        display: none;
      }
    }
  }
}
.picture-box:hover {
  background: #9dd6eb7e;
  .picture-switch {
    .picture_info {
      display: none;
    }
    .picture_action {
      display: block;
      text-align: center;
    }
  }
}
.show-picture-container {
  width: 100%;
  height: auto;
}
</style>
