export interface WithdrawConfigItem {
  id: number;
  item_name: string;
  item_value: string | number;
  value_type: string | number;
}

export interface UpdateWithdrawConfig {
  id: number;
  item_value: number | string;
}
