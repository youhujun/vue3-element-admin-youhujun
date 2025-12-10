/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun 2900976495@qq.com
 * @Date: 2025-10-15 14:10:02
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2025-10-15 14:45:54
 * @FilePath: \src\api\laravel-fast-api\v1\system\system\bank\bank-api.ts
 * Copyright (C) 2025 youhujun. All rights reserved.
 */
import request from "@/utils/request";

import type { ApiResult, DeleteById, MultipleSelectId } from "@/api/laravel-fast-api/v1/api-type";

import type {
  GetArticle,
  AddArticle,
  UpdateArticle,
} from "@/api/laravel-fast-api/v1/article/article-type";

const ARTICLE_BASE_URL = "/api/v1/admin/article";

const ArticleAPI = {
  getArticle(data: GetArticle) {
    return request<any, ApiResult>({
      url: `${ARTICLE_BASE_URL}/getArticle`,
      method: "post",
      data,
    });
  },
  addArticle(data: AddArticle) {
    return request<any, ApiResult>({
      url: `${ARTICLE_BASE_URL}/addArticle`,
      method: "post",
      data,
    });
  },
  updateArticle(data: UpdateArticle) {
    return request<any, ApiResult>({
      url: `${ARTICLE_BASE_URL}/updateArticle`,
      method: "post",
      data,
    });
  },

  deleteArticle(data: DeleteById) {
    return request<any, ApiResult>({
      url: `${ARTICLE_BASE_URL}/deleteArticle`,
      method: "post",
      data,
    });
  },
  multipleDeleteArticle(data: MultipleSelectId) {
    return request<any, ApiResult>({
      url: `${ARTICLE_BASE_URL}/multipleDeleteArticle`,
      method: "post",
      data,
    });
  },
  toTopArticle(data: DeleteById) {
    return request<any, ApiResult>({
      url: `${ARTICLE_BASE_URL}/toTopArticle`,
      method: "post",
      data,
    });
  },
  multipleToTopArticle(data: MultipleSelectId) {
    return request<any, ApiResult>({
      url: `${ARTICLE_BASE_URL}/multipleToTopArticle`,
      method: "post",
      data,
    });
  },
  multipleUnTopArticle(data: MultipleSelectId) {
    return request<any, ApiResult>({
      url: `${ARTICLE_BASE_URL}/multipleToUnpArticle`,
      method: "post",
      data,
    });
  },
};

export default ArticleAPI;
