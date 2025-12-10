<!--
 * @Descripttion: 
 * @version: v1
 * @Author: youhujun youhu8888@163.com
 * @Date: 2025-11-04 12:53:58
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-12-10 12:43:24
 * @FilePath: d:\wwwroot\Open\Vue\vue3-element-admin-youhujun\src\pages\laravel-fast-api\v1\components\element\Album\SelectAlbum.vue
 * Copyright (C) 2025 youhujun. All rights reserved.
-->
<template>
  <div class="select-album-box">
    <el-row :gutter="10">
      <el-col :span="12" style="text-align: center">
        <el-tag type="primary" size="large">相册类型</el-tag>
        <el-select
          v-model="where.album_type"
          clearable
          placeholder="相册类型"
          :disabled="albumTypeDisabled"
          :empty-values="[null, undefined]"
          :value-on-clear="null"
          style="width: 240px"
          :validate-event="false"
          @change="handleChangeAlbumType"
        >
          <el-option
            v-for="item in albumTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="12" style="text-align: center">
        <el-tag type="primary" size="large">请选择相册</el-tag>
        <el-select
          v-model="selectAlbumId"
          clearable
          placeholder="选择的相册"
          :empty-values="[null, undefined]"
          :value-on-clear="null"
          filterable
          remote
          :loading="loading"
          :remote-method="remoteMethod"
          :validate-event="false"
          style="width: 240px"
          @clear="handleClearSelect"
        >
          <el-option
            v-for="item in albumListOptions"
            :key="item.id"
            :label="item.album_name"
            :value="item.id"
          ></el-option>
          <template #loading>
            <el-icon class="is-loading">
              <svg class="circular" viewBox="0 0 20 20">
                <g
                  class="path2 loading-path"
                  stroke-width="0"
                  style="stroke: none; animation: none"
                >
                  <circle r="3.375" class="dot1" rx="0" ry="0" />
                  <circle r="3.375" class="dot2" rx="0" ry="0" />
                  <circle r="3.375" class="dot4" rx="0" ry="0" />
                  <circle r="3.375" class="dot3" rx="0" ry="0" />
                </g>
              </svg>
            </el-icon>
          </template>
        </el-select>
      </el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts">
//api和type
import SystemAlbumOptionsAPI from "@/api/laravel-fast-api/v1/picture/album/option/album-option-api";
import type { FindAlbum } from "@/api/laravel-fast-api/v1/picture/album/option/album-option-type";
import type { AlbumListItem } from "@/api/laravel-fast-api/v1/picture/album/album-type";

defineOptions({
  name: "SelectAlbum",
});

//选择的相册id
const selectAlbumId = defineModel<number>("selectAlbumId", {
  default: 0,
});

//定义props
const { albumTypeDisabled = false } = defineProps<{
  albumTypeDisabled?: boolean;
}>();

//加载效果
const loading = ref(false);

//相册类型选项
const albumTypeOptions = [
  {
    value: 0,
    label: "系统相册",
  },
  {
    value: 10,
    label: "管理员",
  },
  {
    value: 20,
    label: "用户",
  },
];

const initAlbumObject = {
  id: 0,
  user_id: 0,
  admin_id: 0,
  cover_album_picture_id: 0,
  revision: 0,
  is_default: 0,
  is_system: 0,
  album_name: "请选择相册",
  album_description: "无相册",
  album_type: 0,
  created_at: "暂无",
  sort: 100,
  picture_number: 0,
  cover_album_picture: "暂无",
};
//相册选项
const albumListOptions = ref<AlbumListItem[]>([initAlbumObject]);

//条件
const where = ref<FindAlbum>({
  //相册类型
  album_type: 10,
  //查找内容
  find: null,
});

//获取默认相册
const getDefaultAlbum = async () => {
  // 明确 API 返回结果中 data 的类型为 AlbumListItem[]
  const result = await SystemAlbumOptionsAPI.getDefaultAlbum(where.value);
  const { data } = result as { data: AlbumListItem[] }; // 断言 data 类型

  // 明确 newOptions 为 AlbumListItem[] 类型
  const newOptions: AlbumListItem[] = data.length > 0 ? data : [initAlbumObject];
  albumListOptions.value = newOptions;
  // 等待DOM更新后再检查匹配性（关键修改）
  await nextTick();

  // 此时 item 会被自动推断为 AlbumListItem 类型
  const isExist = newOptions.some((item) => item.id === selectAlbumId.value);
  if (!isExist) {
    selectAlbumId.value = newOptions[0].id;
  }
};

//查找相册
const findAlbum = async () => {
  const result = await SystemAlbumOptionsAPI.findAlbum(where.value);
  const { data } = result as { data: AlbumListItem[] }; // 断言 data 类型
  const newOptions: AlbumListItem[] = data.length > 0 ? data : [initAlbumObject];
  albumListOptions.value = newOptions;
  // 等待DOM更新后再检查匹配性（关键修改）
  await nextTick();
  const isExist = newOptions.some((item) => item.id === selectAlbumId.value);
  if (!isExist) {
    selectAlbumId.value = newOptions[0].id;
  }
};

//远程搜索
const remoteMethod = (query: string) => {
  loading.value = true;
  if (query) {
    where.value.find = query;
    findAlbum();
  } else {
    getDefaultAlbum();
  }

  setTimeout(() => {
    loading.value = false;
  }, 500);
};
//初始化
const initSelect = () => {
  loading.value = false;
  where.value.find = null;
  where.value.album_type = 10;
};

//更改相册类型
const handleChangeAlbumType = () => {
  //console.log('更改相册类型')
  getDefaultAlbum();
};
// 处理清空选择
const handleClearSelect = () => {
  // 清空后重置为当前选项列表的第一个值
  selectAlbumId.value = albumListOptions.value[0].id;
};
//组件加载
onMounted(() => {
  //获取默认相册
  getDefaultAlbum();
});

//组件卸载
onUnmounted(() => [initSelect()]);
</script>

<style lang="scss" scoped>
.select-album-box {
  width: 100;
  height: auto;
}
.el-select-dropdown__loading {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  font-size: 20px;
}

.circular {
  display: inline;
  width: 30px;
  height: 30px;
  animation: loading-rotate 2s linear infinite;
}
.path {
  stroke: var(--el-color-primary);
  stroke-width: 2;
  stroke-linecap: round;
  stroke-dasharray: 90, 150;
  stroke-dashoffset: 0;
  animation: loading-dash 1.5s ease-in-out infinite;
}
.loading-path .dot1 {
  opacity: 0.3;
  fill: var(--el-color-primary);
  transform: translate(3.75px, 3.75px);
  animation: custom-spin-move 1s infinite linear alternate;
}
.loading-path .dot2 {
  opacity: 0.3;
  fill: var(--el-color-primary);
  transform: translate(calc(100% - 3.75px), 3.75px);
  animation: custom-spin-move 1s infinite linear alternate;
  animation-delay: 0.4s;
}
.loading-path .dot3 {
  opacity: 0.3;
  fill: var(--el-color-primary);
  transform: translate(3.75px, calc(100% - 3.75px));
  animation: custom-spin-move 1s infinite linear alternate;
  animation-delay: 1.2s;
}
.loading-path .dot4 {
  opacity: 0.3;
  fill: var(--el-color-primary);
  transform: translate(calc(100% - 3.75px), calc(100% - 3.75px));
  animation: custom-spin-move 1s infinite linear alternate;
  animation-delay: 0.8s;
}
@keyframes loading-rotate {
  to {
    transform: rotate(360deg);
  }
}
@keyframes loading-dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -40px;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -120px;
  }
}
@keyframes custom-spin-move {
  to {
    opacity: 1;
  }
}
</style>
