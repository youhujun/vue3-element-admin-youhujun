/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun youhu8888@163.com
 * @Date: 2025-10-19 20:34:35
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-11-12 14:11:16
 * @FilePath: \src\api\laravel-fast-api\v1\picture\picture\picture-type.ts
 * Copyright (C) 2025 youhujun. All rights reserved.
 */
export interface PictureId {
  picture_id: number;
}

export interface MoveAlbum extends PictureId {
  album_id: number;
}

export interface UpdatePictureName extends PictureId {
  picture_name: string;
}
export interface MuultipePicuteId {
  pictureId: number[];
}

export interface MoveMultipleAlbum extends MuultipePicuteId {
  album_id: number;
}

export interface PictureListItem {
  id: number;
  user_id: number;
  album_id?: number;
  created_at: string;
  updated_at: null | string;
  picture_name: string;
  picture_path: string;
  picture_file: string;
  picture_size: number;
  picture_spec: string;
  picture: string;
}

//上传多图
export interface BusUploadMultiplePicture {
  uploadAlbumId: number;
  //10相册 20图片
  type: number;
}

//图片选中元素
export interface PictureCheckListItem {
  picture_id: number;
  checked: boolean;
}

//选中通知
export interface CheckChangeData {
  checkedItem: {
    picture_id: number; // 复用PictureCheckListItem中picture_id的类型
    checked: boolean; // 对应checked.value的boolean类型
  };
  itemIndex: [number, number]; // 对应props.itemIndex的元组类型
}

//转移相册
export interface MoveAlbumData {
  pictureId?: number;
  pictureIdArray?: number[];
  originAlbumId: number;
  //10单图转移 20多图转移
  type: number;
}

//替换上传
export interface UploadResetPicture {
  album_id: number;
  picture_id: number;
  //10单图上传 20替换上传
  type: number;
}
