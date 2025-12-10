export interface LevelItem {
  id: number;
  created_at: string;
  sort: number;
  type: number;
  item_name: string;
  item_code: string;
  description: string;
}

export interface AddLevelItem {
  sort: number;
  type: number;
  item_name: string;
  item_code: string;
  description: string;
}

export interface UpdateLevelItem extends AddLevelItem {
  id: number;
}
