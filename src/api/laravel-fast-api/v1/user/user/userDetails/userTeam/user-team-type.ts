export interface GetUserLowerTeam {
  user_id: number | string;
  lower_type: number;
  currentPage: number;
  pageSize: number;
  sortType: number;
}

export interface GetUserSource {
  source_id: number | string;
}
