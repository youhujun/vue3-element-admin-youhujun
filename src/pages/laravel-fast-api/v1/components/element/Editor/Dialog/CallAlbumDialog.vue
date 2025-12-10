<!--
 * @Descripttion: 
 * @version: v1
 * @Author: youhujun youhu8888@163.com
 * @Date: 2025-11-03 10:20:17
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-12-10 02:02:51
 * @FilePath: d:\wwwroot\Open\Vue\vue3-element-admin-youhujun\src\pages\laravel-fast-api\v1\components\element\Editor\Dialog\CallAlbumDialog.vue
 * Copyright (C) 2025 youhujun. All rights reserved.
-->
<template>
  <!-- 弹窗内容开始 -->
  <YhDialog
    v-model="callAlbumDialogVisible"
    :dialog-width="dialogWidth"
    :dialog-title="dialogTitle"
    :dialog-type="dialogType"
  >
    <template #showContent>
      <div class="show-picture-container">
        <!-- 选择相册 -->
        <SelectAlbum v-model:select-album-id="albumId" :album-type-disabled="true"></SelectAlbum>
        <!-- 选择相册结束 -->
        <div class="show-picture-header">
          <div class="header">
            <el-divider content-position="left">操作</el-divider>
            <div class="header-box">
              <div class="header-left">
                <el-button type="primary" @click="handleToSelectAll()">全选</el-button>
                <el-button type="primary" @click="handleToUnSelect()">反选</el-button>
                <el-button type="info" @click="handleToNoSelect()">取消</el-button>
              </div>
              <div class="header-right">
                <el-tag size="large" style="margin-right: 1rem">图片排序</el-tag>
                <el-select
                  v-model="where.sortType"
                  class="select"
                  placeholder="请选择"
                  :validate-event="false"
                  @change="handlePictureSortChange()"
                >
                  <el-option
                    v-for="item in sortOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
                <el-button style="margin-left: 1rem" type="primary" @click="handleToConfirm()">
                  确定
                </el-button>
              </div>
            </div>
          </div>
        </div>
        <el-divider content-position="left">图片</el-divider>
        <div v-if="shouldShowList">
          <ShowPicture :loading="loading">
            <template #pictureLine>
              <PictureLine v-for="(pictureLine, key) in showPictureList" :key="key">
                <template #pictureItem>
                  <PictureItemSelect
                    v-for="(item, k) in pictureLine"
                    :key="item.id"
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
</template>
<script setup lang="ts">
//公共组件
import YhDialog from "@/pages/laravel-fast-api/v1/components/element/Dialog/index.vue";
import YhPaginate from "@/pages/laravel-fast-api/v1/components/element/Paginate/index.vue";
import ShowPicture from "@/pages/laravel-fast-api/v1/components/element/Album/Picture/ShowPicture.vue";
import PictureLine from "@/pages/laravel-fast-api/v1/components/element/Album/Picture/PictureLine.vue";
import PictureItemSelect from "@/pages/laravel-fast-api/v1/components/element/Album/Picture/PictureItemSelect.vue";
import SelectAlbum from "@/pages/laravel-fast-api/v1/components/element/Album/SelectAlbum.vue";

//api和type
import type {
  PictureListItem,
  PictureCheckListItem,
  CheckChangeData,
} from "@/api/laravel-fast-api/v1/picture/picture/picture-type";
import SystemAlbumAPI from "@/api/laravel-fast-api/v1/picture/album/album-api";

import { group } from "@/utils/index";

defineOptions({
  name: "CallAlbumDialog",
});
//定义选择图片编辑完成
const emit = defineEmits(["update:selectPcitureWithEditor"]);

//定义调用相册弹框
const callAlbumDialogVisible = defineModel<boolean>("callAlbumDialogVisible", {
  default: false,
});

//初始化加载样式
const loading = ref(true);
//弹窗标题
const dialogTitle = ref("选择图片");
//弹窗类型 10添加 20修改 30内容
const dialogType = ref(30);
//弹窗宽度
const dialogWidth = ref("95%");

//定义相册id
const albumId = ref(0);

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
//相册排序选项
const sortOptions = [
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
// 逐个单击选择图片容器
const clickCheckList = ref<PictureListItem[]>([]);

// 计算属性：判断是否显示列表（当列表有数据时显示）
const shouldShowList = computed(() => {
  // 当dataList的长度大于0时，返回true（显示列表），否则返回false（隐藏列表）
  return dataList.value.length > 0;
});

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

//监听相册id变化
watch(albumId, (newValue) => {
  if (newValue) {
    where.value.albumId = newValue;
    getAlbumPicture();
  }
});

//初始化数据
const initData = () => {
  loading.value = true;
  albumId.value = 0;
  where.value.currentPage = 1;
  where.value.pageSize = 12;
  where.value.sortType = 3;
  where.value.total = 0;
  dataList.value = [];
  checkList.value = [];
  clickCheckList.value = [];
};

// 监听callAlbumDialogVisible的变化
watch(
  callAlbumDialogVisible,
  (newVal) => {
    // 当新值为true时，设置loading为true
    if (newVal) {
      initData();
    } else {
      initData();
      //console.log('弹窗关闭')
    }
  },
  { deep: true }
);

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
  initData();
});

// 组件卸载时移除监听,防止内存泄漏
onUnmounted(() => {
  //onsole.log('组件卸载')
  initData();
});

//全选
const handleToSelectAll = () => {
  //console.log('全选')
  clickCheckList.value = [];
  // 遍历数组，直接修改每个项的checked为true
  checkList.value.forEach((item, index) => {
    item.checked = true;
    //同时将选中的元素添加到选中图片容器中
    clickCheckList.value.push(dataList.value[index]);
  });
};

//反选
const handleToUnSelect = () => {
  //console.log('反选')
  clickCheckList.value = [];
  checkList.value.forEach((item, index) => {
    item.checked = !item.checked;
    if (item.checked) {
      //同时将选中的元素添加到选中图片容器中
      clickCheckList.value.push(dataList.value[index]);
    }
  });
};

//取消
const handleToNoSelect = () => {
  //console.log('取消')
  // 遍历数组，直接修改每个项的checked为true
  checkList.value.forEach((item) => {
    item.checked = false;
  });
  // 清空已选列表
  clickCheckList.value = [];
};

//图片排序改变
const handlePictureSortChange = () => {
  getAlbumPicture();
};
//确定选择的图片
const handleToConfirm = () => {
  //console.log('确定选择的图片')
  //console.log(clickCheckList.value)
  //最终以clickCheckList.value为准
  emit("update:selectPcitureWithEditor", clickCheckList.value);

  //关闭弹窗
  callAlbumDialogVisible.value = false;
};

//获取相册图片
const getAlbumPicture = async () => {
  loading.value = true;
  //确保有相册id再调用图片
  if (where.value.albumId) {
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
  }
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
  //console.log('点击选择')
  //console.log(param)
  //console.log('对应的图片')
  //console.log(dataList.value[targetIndex])
  //console.log(checkList)
  clickCheckList.value.push(dataList.value[targetIndex]);
};
</script>

<style lang="scss" scoped>
.show-picture-container {
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
