<template>
  <div>
    <!-- 页面内容开始 -->
    <YhCard>
      <template #cardTitle>我的相册</template>
      <template #cardNotice>
        <el-tag size="small" type="danger" effect="plain">
          1.上传图片的相册,默认是当前显示相册的第一个 2.相册选项仅为当前显示的相册
          3.被删除的相册图片会转移到默认相册下
        </el-tag>
      </template>
      <template #cardButton>
        <div class="cardButton-box">
          <el-select
            v-model="where.sortType"
            placeholder="请选择排序方式"
            style="margin-right: 1rem"
            class="select"
            @change="handleSortChange()"
          >
            <el-option
              v-for="item in sortOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-button type="primary" @click="handleAddAlbum()">创建相册</el-button>
          <el-button type="primary" @click="handleUploadPicture()">上传图片</el-button>
        </div>
      </template>
      <template #cardContent>
        <div class="custom-node">
          <ShowAlbum :loading="loading">
            <template #albumLine>
              <AlbumLine v-for="(albumLine, key) in showAlbumList" :key="key">
                <template #albumItem>
                  <AlbumItem
                    v-for="(item, k) in albumLine"
                    :key="k"
                    :album-item="item"
                    @update:update-album="toUpdateAlbumItem"
                    @update:delete-album="toDeleteAlbumItem"
                  ></AlbumItem>
                </template>
              </AlbumLine>
            </template>
            <template #paginate>
              <div>
                <YhPaginate
                  v-model:current-page="currentPage"
                  v-model:page-size="pageSize"
                  v-model:total="total"
                  :page-sizes="[6, 12, 18, 24, 30, 36, 42]"
                />
              </div>
            </template>
          </ShowAlbum>
        </div>
      </template>
    </YhCard>
    <!-- 页面内容结束 -->
    <!-- 弹窗内容开始 -->
    <YhDialog
      v-model="dialogVisible"
      :dialog-width="dialogWidth"
      :dialog-title="dialogTitle"
      :dialog-type="dialogType"
    >
      <!-- 添加表单 -->
      <template #addForm>
        <CreateAlbumForm
          ref="createFormRef"
          @update:close-dialog="listenToCloseDialog"
        ></CreateAlbumForm>
      </template>
      <!-- 修改表单 -->
      <template #updateForm>
        <UpdateAlbumForm
          ref="updateFormRef"
          :props-update-form="propsUpdateForm"
          @update:close-dialog="listenToCloseDialog"
        ></UpdateAlbumForm>
      </template>
    </YhDialog>
    <!-- 弹窗内容结束 -->
    <!-- 查看图片开始 -->
    <ShowAlbumPicture @update:handle-reload-album="listenToReloadAlbum"></ShowAlbumPicture>
    <!-- 查看图片结束 -->
    <!-- 上传多图开始 -->
    <UploadMultiplePicture
      :upload-data="{ type: null, use_type: 20, file_type: '', save_path: 'picture' }"
      type="image"
    ></UploadMultiplePicture>
    <!-- 上传多图开始结束 -->
    <!-- 转移相册开始 -->
    <MoveAlbumDialog></MoveAlbumDialog>
    <!-- 转移相册结束 -->
  </div>
</template>
<script setup lang="ts">
// 公共级组件
import YhCard from "@/pages/laravel-fast-api/v1/components/element/Card/index.vue";
import YhDialog from "@/pages/laravel-fast-api/v1/components/element/Dialog/index.vue";
import YhPaginate from "@/pages/laravel-fast-api/v1/components/element/Paginate/index.vue";
import ShowAlbum from "@/pages/laravel-fast-api/v1/components/element/Album/ShowAlbum.vue";
import AlbumLine from "@/pages/laravel-fast-api/v1/components/element/Album/AlbumLine.vue";
import AlbumItem from "@/pages/laravel-fast-api/v1/components/element/Album/AlbumItem.vue";
import UploadMultiplePicture from "@/pages/laravel-fast-api/v1/components/element/Upload/UploadPicture/UploadMultiplePicture.vue";

//页面级组件
import CreateAlbumForm from "./components/CreateAlbumForm.vue";
import UpdateAlbumForm from "./components/UpdateAlbumForm.vue";
import ShowAlbumPicture from "./components/ShowAlbumPicture.vue";
import MoveAlbumDialog from "./components/MoveAlbumDialog.vue";
//api
import SystemAlbumAPI from "@/api/laravel-fast-api/v1/picture/album/album-api";
import type { AlbumListItem } from "@/api/laravel-fast-api/v1/picture/album/album-type";
import { group } from "@/utils/index";
//通信
import bus from "@/utils/eventBus";

//定义组件名称
defineOptions({
  name: "Name",
});

//bus监听上传图片完成
const handleToUploadMultiplePictureFinish = () => {
  //刷新相册
  getAlbum();
};
bus.on("uploadMultiplePictureFinish", handleToUploadMultiplePictureFinish);
//监听刷新相册和图片
const hanldeToRelaodAlbumPicture = () => {
  //刷新相册
  getAlbum();
};
//刷新相册和图片
bus.on("reloadAlbumPicture", hanldeToRelaodAlbumPicture);
//初始化加载样式
const loading = ref(true);
//是否开启弹窗
const dialogVisible = ref(false);
//弹窗标题
const dialogTitle = ref("");
//弹窗类型 10添加 20修改 30内容
const dialogType = ref(10);
//弹窗宽度
const dialogWidth = ref("65%");
//搜索查询条件
const where = ref({
  //相册类型
  album_type: null,
  //时间范围
  timeRange: [],
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
const dataList = ref<AlbumListItem[]>([]);

//相册排序选项
const sortOptions = [
  {
    value: 1,
    label: "排序从大到小",
  },
  {
    value: 2,
    label: "排序从小到大",
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
  getAlbum();
});

//处理后的显示相册列表
const showAlbumList = computed({
  get() {
    const array = group(dataList.value, 6);
    return array;
  },
  set(newValue) {
    dataList.value = newValue.flat();
  },
});

//修改表单
const propsUpdateForm = ref({
  id: 0,
  album_type: 10,
  album_name: "",
  album_description: "",
  sort: 100,
});

//更改排序规则
const handleSortChange = () => {
  //console.log('更改排序规则')
  getAlbum();
};

//后台添添加相册
const handleAddAlbum = () => {
  dialogVisible.value = true;
  dialogType.value = 10;
  dialogTitle.value = "创建相册";
};

//后台上传图片
const handleUploadPicture = () => {
  //console.log('上传图片')
  const param = {
    uploadAlbumId: 0,
    type: 10,
  };
  bus.emit("uploadMultiplePicture", param);
};

//监听关闭弹窗
const listenToCloseDialog = () => {
  //重新获取相册列表
  getAlbum();
  //初始化修改表单
  initPropsUpdateForm();
  //初始化查看详情
  //initPropsRowData()
  dialogVisible.value = false;
};

//初始化更新表单
const initPropsUpdateForm = () => {
  propsUpdateForm.value = {
    id: 0,
    album_type: 10,
    album_name: "",
    album_description: "",
    sort: 100,
  };
};

//页面加载
onMounted(() => {
  getAlbum();
});
//页面卸载
onUnmounted(() => {
  bus.off("uploadMultiplePictureFinish", handleToUploadMultiplePictureFinish);
  bus.off("reloadAlbumPicture", hanldeToRelaodAlbumPicture);
});
//获取相册
const getAlbum = async () => {
  loading.value = true;
  const result = await SystemAlbumAPI.getAlbum(where.value);
  const { data, meta } = result;
  dataList.value = data;
  where.value.total = meta.total;
  where.value.currentPage = meta.current_page;
  where.value.pageSize = meta.per_page;
  setTimeout(() => {
    loading.value = false;
  }, 500);
};

//监听修改相册
const toUpdateAlbumItem = (newValue: AlbumListItem) => {
  //console.log(newValue)
  Object.assign(propsUpdateForm.value, newValue);
  dialogVisible.value = true;
  dialogType.value = 20;
  dialogTitle.value = "修改相册";
};

//监听删除相册
const toDeleteAlbumItem = () => {
  getAlbum();
};

//监听刷新相册
const listenToReloadAlbum = () => {
  getAlbum();
};
</script>
<style lang="scss" scoped>
.cardButton-box {
  display: flex;
  flex-direction: row;
  justify-content: end;
}
.select,
.input {
  width: 200px;
}
</style>
