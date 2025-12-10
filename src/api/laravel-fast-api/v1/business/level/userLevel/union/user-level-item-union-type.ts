export interface AddUserLevelItemUnion {
  sort: number;
  user_level_id: number;
  level_item_id: number;
  value: string | number;
  value_type: string | number;
}

export interface UpdateUserLevelItemUnion extends AddUserLevelItemUnion {
  id: number;
}
