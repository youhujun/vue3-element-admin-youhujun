/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun youhu8888@163.com
 * @Date: 2025-10-19 20:34:35
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-11-12 23:54:15
 * @FilePath: \src\api\laravel-fast-api\v1\article\article-type.ts
 * Copyright (C) 2025 youhujun. All rights reserved.
 */
import type { BaseGetDataList } from "@/api/laravel-fast-api/v1/api-type";

export interface GetArticle extends BaseGetDataList {
  timeRangePublish?: string[];
  timeRangeCreate?: string[];
  categoryArray?: number[];
  labelArray?: number[];
  find?: string;
  is_top?: number | null;
  status?: number | null;
}

export interface AddArticle {
  type: number;
  title: string;
  category_id: number[][];
  categoryArray: number[];
  label_id: number[][];
  labelArray: number[];
  is_top: number;
  content: string;
  published_time: string;
  sort: number;
}

export interface UpdateArticle extends AddArticle {
  id: number;
}

interface categoryItem {
  category_id: number;
  category_name: string;
  category_label: string;
}

interface labelItem {
  label_id: number;
  label_name: string;
  label_label: string;
}

export interface ArticleListItem {
  id: number;
  admin_id: number;
  user_id: number;
  title: string;
  status: number;
  type: number;
  is_top: number;
  check_status: number;
  published_at: string;
  checked_at: null | string;
  created_at: string;
  updated_at: null | string;
  category_id: number[][];
  label_id: number[][];
  sort: number;
  admin_account_name: string;
  admin_phone: null | string;
  admin_nick_name: string;
  category: categoryItem[];
  label: labelItem[];
  content: string;
}
