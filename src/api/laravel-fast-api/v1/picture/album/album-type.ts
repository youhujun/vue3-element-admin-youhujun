import type { BaseGetDataList } from "@/api/laravel-fast-api/v1/api-type";

export interface GetAlbum extends BaseGetDataList {
  album_type: number | null;
}

export interface AddAlbum {
  album_type: number;
  album_name: string;
  album_description: string;
  sort: number;
}

export interface UpdateAlbum extends AddAlbum {
  id: number;
}

export interface GetAlbumPicture extends BaseGetDataList {
  albumId: number;
}

export interface AlbumListItem {
  id: number;
  user_id?: number;
  admin_id?: number;
  cover_album_picture_id: number;
  revision: number;
  is_default: number;
  is_system: number;
  album_name: string;
  album_description: string;
  album_type: number;
  created_at: string;
  sort: number;
  picture_number: number;
  cover_album_picture: string;
}
