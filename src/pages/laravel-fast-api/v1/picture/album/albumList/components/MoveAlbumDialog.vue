<template>
  <YhDialog
    v-model="dialogVisible"
    :dialog-width="dialogWidth"
    :dialog-title="dialogTitle"
    :dialog-type="dialogType"
  >
    <template #showContent>
      <!-- 选择相册 -->
      <SelectAlbum v-model:select-album-id="moveAlbumId"></SelectAlbum>
      <!-- 选择相册结束 -->
      <el-divider>
        <el-icon><star-filled /></el-icon>
      </el-divider>
      <div class="move-button">
        <el-button type="primary" @click="handleToMoveAlbum()">确定转移</el-button>
      </div>
    </template>
  </YhDialog>
</template>
<script setup lang="ts">
//公共组件
import YhDialog from "@/pages/laravel-fast-api/v1/components/element/Dialog/index.vue";
import SelectAlbum from "@/pages/laravel-fast-api/v1/components/element/Album/SelectAlbum.vue";
//api和type
import PictureAPI from "@/api/laravel-fast-api/v1/picture/picture/picture-api";
import type { MoveAlbumData } from "@/api/laravel-fast-api/v1/picture/picture/picture-type";
//通信
import bus from "@/utils/eventBus";
//转移相册
defineOptions({
  name: "MoveAlbumDialog",
});
//是否开启弹窗
const dialogVisible = ref(false);
//弹窗标题
const dialogTitle = ref("转移相册");
//弹窗类型 10添加 20修改 30内容
const dialogType = ref(30);
//弹窗宽度
const dialogWidth = ref("80%");
//转移前的相册id
const originAlbumId = ref(0);
//转移相册id
const moveAlbumId = ref(0);
//转移相册图片id容器
const pictureId = ref<number>(0);
const pictureIdArray = ref<number[]>([]);
//10单图转移 20多图转移
const moveType = ref(10);

//确定转移相册
const handleToMoveAlbum = () => {
  console.log(moveAlbumId.value);

  if (moveType.value === 10) {
    moveSinglePicture();
  }

  if (moveType.value === 20) {
    moveMultiplePicture();
  }
};

//移动单图
const moveSinglePicture = async () => {
  const param = { album_id: moveAlbumId.value, picture_id: pictureId.value };

  if (!moveAlbumId.value) {
    ElMessage.warning("没有选择相册");
    return false;
  }
  if (pictureId.value === 0) {
    ElMessage.warning("没有选择图片");
    return false;
  }
  if (moveAlbumId.value === originAlbumId.value) {
    ElMessage.warning("同一相册不需要转移");
    return false;
  }

  try {
    const result = await PictureAPI.moveAlbum(param);
    //关闭弹窗
    dialogVisible.value = false;
    bus.emit("reloadAlbumPicture", true);
    ElMessage.success(result.msg);
    initData();
  } catch {
    ElMessage.error("转移失败");
  }
};

//移动多图
const moveMultiplePicture = async () => {
  const param = { album_id: moveAlbumId.value, pictureId: pictureIdArray.value };

  if (!moveAlbumId.value) {
    ElMessage.warning("没有选择相册");
    return false;
  }
  if (pictureIdArray.value.length === 0) {
    ElMessage.warning("没有选择图片");
    return false;
  }
  if (moveAlbumId.value === originAlbumId.value) {
    ElMessage.warning("同一相册不需要转移");
    return false;
  }

  try {
    const result = await PictureAPI.moveMultipleAlbum(param);
    //关闭弹窗
    dialogVisible.value = false;
    bus.emit("reloadAlbumPicture", true);
    ElMessage.success(result.msg);
    initData();
  } catch {
    ElMessage.error("转移失败");
  }
};

//监听移动相册
const handleToMoveAlbumPicture = (param: MoveAlbumData) => {
  dialogVisible.value = true;
  dialogTitle.value = "转移相册";
  dialogType.value = 30;
  //console.log(param)
  originAlbumId.value = param.originAlbumId;
  moveType.value = param.type;
  //单图
  if (param.type === 10) {
    pictureId.value = param.pictureId as number;
  }
  //多图
  if (param.type === 20) {
    pictureIdArray.value = param.pictureIdArray as number[];
  }
};

bus.on("moveAlbumPicture", handleToMoveAlbumPicture);

//数据初始化
const initData = () => {
  originAlbumId.value = 0;
  moveAlbumId.value = 0;
  pictureId.value = 0;
  pictureIdArray.value = [];
  moveType.value = 10;
};

//组件卸载
onUnmounted(() => {
  bus.off("moveAlbumPicture", handleToMoveAlbumPicture);
});
</script>

<style lang="scss" scoped>
.move-button {
  width: 100%;
  text-align: center;
}
</style>
