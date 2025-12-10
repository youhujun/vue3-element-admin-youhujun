export interface TreeCategoryItem {
  id: number;
  parent_id: number;
  deep: number;
  switch: number;
  rate: number;
  category_name: string;
  category_code: null | string;
  category_picture_id: number;
  note: null | string;
  created_at: string;
  sort: number;
  children?: TreeCategoryItem[];
  picture?: string;
}

export interface AddCategory {
  id?: number;
  category_code: string | null;
  category_name: string;
  category_picture_id?: number | null;
  deep: number;
  parent_id: number;
  rate: number;
  note: string;
  sort: number;
}

export interface UpdateCategory extends AddCategory {
  picture?: string;
}
