<!--
 * @Descripttion: 
 * @version: v1
 * @Author: youhujun youhu8888@163.com
 * @Date: 2025-11-03 10:20:17
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-12-10 02:43:05
 * @FilePath: d:\wwwroot\Open\Vue\vue3-element-admin-youhujun\src\pages\laravel-fast-api\v1\picture\album\albumList\components\ShowAlbumPicture.vue
 * Copyright (C) 2025 youhujun. All rights reserved.
-->
<template>
  <!-- 弹窗内容开始 -->
  <YhDialog
    v-model="dialogVisible"
    :dialog-width="dialogWidth"
    :dialog-title="dialogTitle"
    :dialog-type="dialogType"
  >
    <template #showContent>
      <div class="show-picture-container">
        <div class="show-picture-header">
          <div class="header">
            <el-divider content-position="left">操作</el-divider>
            <div class="header-box">
              <div class="header-left">
                <el-button type="primary" @click="handleToSelectAll()">全选</el-button>
                <el-button type="primary" @click="handleToUnSelect()">反选</el-button>
                <el-button type="info" @click="handleToNoSelect()">取消</el-button>
                <el-button type="danger" @click="handleDeleteMultiplePicture()">删除</el-button>
                <el-button type="warning" @click="handleMoveAlbum()">转移相册</el-button>
              </div>
              <div class="header-right">
                <el-tag size="large" style="margin-right: 1rem">图片排序</el-tag>
                <el-select
                  v-model="where.sortType"
                  class="select"
                  placeholder="请选择"
                  @change="handlePictureSortChange()"
                >
                  <el-option
                    v-for="item in sortOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
                <el-button style="margin-left: 1rem" type="primary" @click="handleUploadPicture()">
                  上传图片
                </el-button>
              </div>
            </div>
          </div>
        </div>
        <el-divider content-position="left">图片</el-divider>
        <div v-if="shouldShowList" class="picture-list-wrapper">
          <ShowPicture :loading="loading">
            <template #pictureLine>
              <PictureLine v-for="(pictureLine, key) in showPictureList" :key="key">
                <template #pictureItem>
                  <PictureItem
                    v-for="(item, k) in pictureLine"
                    :key="k"
                    :item-index="[key, k]"
                    :check-item="showCheckList[key][k]"
                    :picture-item="item"
                    :is-show-checked="true"
                    @update:handle-change-checked="listenChangeChecked"
                  />
                </template>
              </PictureLine>
            </template>
            <template #paginate>
              <YhPaginate
                v-model:current-page="currentPage"
                v-model:page-size="pageSize"
                v-model:total="total"
                :page-sizes="[6, 12, 18, 24, 30, 36, 42]"
              />
            </template>
          </ShowPicture>
        </div>
        <div v-else style="text-align: center">暂无数据</div>
      </div>
    </template>
  </YhDialog>
  <!-- 弹窗内容结束 -->
  <!-- 替换上传单图开始 -->
  <UploadSinglePicture
    :upload-data="{ type: null, use_type: 20, file_type: '', save_path: 'picture' }"
    type="image"
  ></UploadSinglePicture>
  <!-- 替换上传单图结束 -->
</template>
<script setup lang="ts">
//公共组件
import YhDialog from "@/pages/laravel-fast-api/v1/components/element/Dialog/index.vue";
import YhPaginate from "@/pages/laravel-fast-api/v1/components/element/Paginate/index.vue";
import ShowPicture from "@/pages/laravel-fast-api/v1/components/element/Album/Picture/ShowPicture.vue";
import PictureLine from "@/pages/laravel-fast-api/v1/components/element/Album/Picture/PictureLine.vue";
import PictureItem from "@/pages/laravel-fast-api/v1/components/element/Album/Picture/PictureItem.vue";
import UploadSinglePicture from "@/pages/laravel-fast-api/v1/components/element/Upload/UploadPicture/UplaodSinglePicture.vue";
//api和type
import type { AlbumListItem } from "@/api/laravel-fast-api/v1/picture/album/album-type";
import type {
  PictureListItem,
  PictureCheckListItem,
  CheckChangeData,
} from "@/api/laravel-fast-api/v1/picture/picture/picture-type";
import SystemAlbumAPI from "@/api/laravel-fast-api/v1/picture/album/album-api";
import PictureAPI from "@/api/laravel-fast-api/v1/picture/picture/picture-api";
import { group } from "@/utils/index";
//通信
import bus from "@/utils/eventBus";

defineOptions({
  name: "ShowAlbumPicture",
});
const emit = defineEmits(["update:handleReloadAlbum"]);

//初始化加载样式
const loading = ref(true);
//是否开启弹窗
const dialogVisible = ref(false);
//弹窗标题
const dialogTitle = ref("");
//弹窗类型 10添加 20修改 30内容
const dialogType = ref(30);
//弹窗宽度
const dialogWidth = ref("95%");

//搜索查询条件
const where = ref({
  //相册id
  albumId: 0,
  //排序方式
  sortType: 3,
  // 分页
  currentPage: 1,
  //每页条数
  pageSize: 12,
  //数据总数
  total: 0,
});

//原始数据列表容器
const dataList = ref<PictureListItem[]>([]);

// 计算属性：判断是否显示列表（当列表有数据时显示）
const shouldShowList = computed(() => {
  // 当dataList的长度大于0时，返回true（显示列表），否则返回false（隐藏列表）
  return dataList.value.length > 0;
});
//相册排序选项
const sortOptions = [
  {
    value: 0,
    label: "请选择",
  },
  {
    value: 1,
    label: "图片从大到小",
  },
  {
    value: 2,
    label: "图片从小到大",
  },
  {
    value: 3,
    label: "创建时间从早到晚",
  },
  {
    value: 4,
    label: "创建时间从晚到早",
  },
];

// 图片选中容器
const checkList = ref<PictureCheckListItem[]>([]);

//将分页处理定义为计算属性
//当前页
const currentPage = computed({
  get() {
    return where.value.currentPage;
  },
  set(newValue) {
    where.value.currentPage = newValue;
  },
});
//页面条数
const pageSize = computed({
  get() {
    return where.value.pageSize;
  },
  set(newValue) {
    where.value.pageSize = newValue;
  },
});
//计算总数
const total = computed({
  get() {
    return where.value.total;
  },
  set(newValue) {
    where.value.total = newValue;
  },
});

//侦听分页变化
watch([currentPage, pageSize], () => {
  loading.value = true;
  getAlbumPicture();
});

// 监听dialogVisible的变化
watch(dialogVisible, (newVal) => {
  // 当新值为true时，设置loading为true
  if (newVal) {
    loading.value = true;
  } else {
    where.value.currentPage = 1;
    where.value.pageSize = 12;
    where.value.sortType = 3;
    where.value.total = 0;
    where.value.albumId = 0;
    dataList.value = [];
  }
});

//处理后的显示图片列表
const showPictureList = computed({
  get() {
    const array = group(dataList.value, 6);
    return array;
  },
  set(newValue) {
    dataList.value = newValue.flat();
  },
});

//处理后的选中控制
const showCheckList = computed({
  get() {
    const array = group(checkList.value, 6);
    return array;
  },
  set(newValue) {
    checkList.value = newValue.flat();
  },
});

//组件加载
onMounted(() => {
  loading.value = true;
});

//事件监听函数
const handleToShowPicture = (albumItem: AlbumListItem) => {
  //console.log(albumItem)
  dialogVisible.value = true;
  dialogType.value = 30;
  dialogTitle.value = "查看图片";
  where.value.albumId = albumItem.id;
  getAlbumPicture();
};

//显示图片
bus.on("showPicture", handleToShowPicture);

//bus监听上传图片完成
const handleToUploadMultiplePictureFinish = () => {
  //刷新图片列表
  getAlbumPicture();
};
//上传多图完成
bus.on("uploadMultiplePictureFinish", handleToUploadMultiplePictureFinish);

//监听刷新相册和图片
const hanldeToRelaodAlbumPicture = () => {
  //刷新图片列表
  getAlbumPicture();
};
//刷新相册和图片
bus.on("reloadAlbumPicture", hanldeToRelaodAlbumPicture);

//监听替换上传完成
const handleToResetPictureFinish = () => {
  //刷新图片列表
  getAlbumPicture();
};

//替换上传完成
bus.on("uploadResetPictureFinish", handleToResetPictureFinish);

// 组件卸载时移除监听,防止内存泄漏
onUnmounted(() => {
  bus.off("showPicture", handleToShowPicture);
  bus.off("uploadMultiplePictureFinish", handleToUploadMultiplePictureFinish);
  bus.off("uploadResetPictureFinish", handleToResetPictureFinish);
  bus.off("reloadAlbumPicture", hanldeToRelaodAlbumPicture);
});

//全选
const handleToSelectAll = () => {
  //console.log('全选')
  // 遍历数组，直接修改每个项的checked为true
  checkList.value.forEach((item) => {
    item.checked = true;
  });
};

//反选
const handleToUnSelect = () => {
  //console.log('反选')
  checkList.value.forEach((item) => {
    item.checked = !item.checked;
  });
};

//取消
const handleToNoSelect = () => {
  //console.log('取消')
  // 遍历数组，直接修改每个项的checked为true
  checkList.value.forEach((item) => {
    item.checked = false;
  });
};

//批量删除
const handleDeleteMultiplePicture = async () => {
  //console.log('批量删除')
  //处理picture_id数据
  const pictureIdArray: number[] = [];
  checkList.value.forEach((item) => {
    if (item.checked) {
      pictureIdArray.push(item.picture_id);
    }
  });
  //检测
  if (pictureIdArray.length === 0) {
    ElMessage.warning("未选中任何图片");
    return false;
  }

  try {
    const result = await PictureAPI.deleteMultiplePicture({ pictureId: pictureIdArray });
    getAlbumPicture();
    emit("update:handleReloadAlbum");
    ElMessage.success(result.msg);
  } catch {
    ElMessage.error("删除失败");
  }
};

//转移相册
const handleMoveAlbum = () => {
  //console.log('批量转移')
  const pictureIdArray: number[] = [];
  checkList.value.forEach((item) => {
    if (item.checked) {
      pictureIdArray.push(item.picture_id);
    }
  });
  //检测
  if (pictureIdArray.length === 0) {
    ElMessage.warning("未选中任何图片");
    return false;
  }
  //原图的相册id
  const originAlbumId = where.value.albumId;
  const data = { pictureIdArray, originAlbumId, type: 20 };
  bus.emit("moveAlbumPicture", data);
};

//图片排序改变
const handlePictureSortChange = () => {
  getAlbumPicture();
};
//上传图片
const handleUploadPicture = () => {
  const param = {
    uploadAlbumId: where.value.albumId,
    type: 20,
  };
  bus.emit("uploadMultiplePicture", param);
};

//获取相册图片
const getAlbumPicture = async () => {
  loading.value = true;
  const result = await SystemAlbumAPI.getAlbumPicture(where.value);
  const { data, meta } = result;
  dataList.value = data;
  where.value.total = meta.total;
  where.value.currentPage = meta.current_page;
  where.value.pageSize = meta.per_page;
  //初始化选中状态
  initCheckList();
  setTimeout(() => {
    loading.value = false;
  }, 500);
};
//初始化自定义选中状态
const initCheckList = () => {
  checkList.value = (dataList.value || []).map((item) => ({
    picture_id: item.id,
    checked: false,
  }));
};

//监听选中
const listenChangeChecked = (param: CheckChangeData) => {
  //console.log(param)
  const { checkedItem, itemIndex } = param;
  // 计算目标索引
  const targetIndex = itemIndex[0] * 6 + itemIndex[1];
  // 直接更新 checkList（Vue3 中 ref 数组修改元素会触发响应式）
  checkList.value[targetIndex] = checkedItem;
};
</script>

<style lang="scss" scoped>
.show-picture-container {
  /* 新增：为遮罩层提供定位容器 */
  position: relative;
  width: 100%;
  height: auto;
  .show-picture-header {
    width: 100%;
    height: auto;
    .header {
      width: 100%;
      height: auto;
    }
  }
  /* 新增：图片列表容器样式 */
  .picture-list-wrapper {
    position: relative; /* 确保遮罩层相对此容器定位 */
    min-height: 200px; /* 防止内容过短时遮罩层异常 */
  }
}
.header-box {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .header-right {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
}
.show-picture-content {
  width: 100%;
  height: auto;
}
.select,
.input {
  width: 200px;
}
</style>
