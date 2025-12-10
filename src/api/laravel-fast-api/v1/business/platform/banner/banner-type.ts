export interface PhoneBannerListItem {
  id: number;
  user_id?: number | null;
  album_picture_id: number;
  redirect_url: string;
  note: null | string;
  sort: number;
  created_at: string;
  updated_at?: null | string;
  picture?: string;
}

export interface AddPhoneBanner {
  album_picture_id: number;
  redirect_url: string;
  note: string;
  sort: number;
}

export interface UpdatePhoneBanner extends AddPhoneBanner {
  id: number;
  picture?: string | null;
}
