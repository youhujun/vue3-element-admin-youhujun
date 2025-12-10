/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun youhu8888@163.com
 * @Date: 2025-11-09 02:37:29
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-11-09 16:59:14
 * @FilePath: \src\pages\laravel-fast-api\v1\components\element\Editor\Tinymce\toolbar.ts
 * Copyright (C) 2025 youhujun. All rights reserved.
 */
// Here is a list of the toolbar
// Detail list see https://www.tinymce.com/docs/advanced/editor-control-identifiers/#toolbarcontrols

/**
 * 定义 TinyMCE 编辑器的工具栏按钮布局
 * @type {string[]} 工具栏按钮组字符串数组，每个字符串代表一行工具栏
 */
const toolbar: string[] = [
  "searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent blockquote undo redo removeformat subscript superscript code codesample",
  " bullist numlist link image charmap preview anchor pagebreak insertdatetime media table emoticons forecolor backcolor fullscreen",
];

export default toolbar;
