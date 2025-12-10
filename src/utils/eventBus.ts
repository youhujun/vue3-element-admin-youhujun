/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun youhu8888@163.com
 * @Date: 2025-11-03 11:06:59
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-11-28 00:36:30
 * @FilePath: \src\utils\eventBus.ts
 * Copyright (C) 2025 youhujun. All rights reserved.
 */
import mitt, { type Emitter, type EventType } from "mitt";
//查看相册使用
import type { AlbumListItem } from "@/api/laravel-fast-api/v1/picture/album/album-type";
import type {
  BusUploadMultiplePicture,
  MoveAlbumData,
  UploadResetPicture,
} from "@/api/laravel-fast-api/v1/picture/picture/picture-type";

// 定义事件类型映射接口（泛型的具体实现）
// 键：事件名称；值：该事件触发时传递的参数类型（无参数用 void）
interface Events {
  //showPicture 事件，参数类型为 AlbumListItem
  showPicture: AlbumListItem;
  //上传多图事件
  uploadMultiplePicture: BusUploadMultiplePicture;
  //多图上传完成
  uploadMultiplePictureFinish: boolean;
  //移动相册
  moveAlbumPicture: MoveAlbumData;
  //刷新相册和图片
  reloadAlbumPicture: boolean;
  //替换上传
  uploadResetPicture: UploadResetPicture;
  //替换上传完成
  uploadResetPictureFinish: boolean;
  //单图上传完成
  uploadSinglePictureFinish: boolean;
  // 重新加载用户级别列表
  reloadUserLevelList: boolean;
  // 重新加载轮播图列表
  reloadPhoneBannerList: boolean;
  // 索引签名：满足 Record<EventType, unknown> 约束
  // 允许其他 string 类型的事件名，值为 unknown 类型
  [key: EventType]: unknown;
}
// 创建带类型约束的事件总线（通过泛型 mitt<Events> 绑定类型）
const bus: Emitter<Events> = mitt<Events>();

export default bus;
