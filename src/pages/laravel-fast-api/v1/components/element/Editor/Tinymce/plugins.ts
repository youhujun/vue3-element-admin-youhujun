/*
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2022-01-06 14:38:43
 * @LastEditors: youhujun youhu8888@163.com
 * @LastEditTime: 2025-11-09 21:59:53
 */
// Any plugins you want to use has to be imported
// Detail plugins list see https://www.tinymce.com/docs/plugins/
// Custom builds see https://www.tinymce.com/download/custom-builds/
/*
advlist 高级列表
anchor 锚点
autolink 自动连接
autosave 自动存稿
code /编辑源码
codesample 代码示例
colorpicker
contextmenu
directionality 文字方向
emoticons 表情
fullscreen 全屏
hr 水平分割线
image 插入编辑图片
imagetools
insertdatetime 插入日期时间
link 超链接
lists 列表插件
media 插入编辑媒体
nonbreaking 插入不间断空格
noneditable
pagebreak 插入分页符
paste  粘贴插件
preview 预览
print 打印
save 保存
searchreplace 查找替换
spellchecker 拼写检查，暂未加入汉化，不建议使用
tabfocus 切入切出，按tab键切出编辑器，切入页面其他输入框中
table 表格
template 内容模板 (已经废弃和移除)
textcolor 文字颜色
textpattern 快速排版
visualblocks 显示元素范围
visualchars
wordcount
autoresize 编辑器高度自适应,注：plugins里引入此插件时，Init里设置的height将失效
*/

/**
 * 定义 TinyMCE 编辑器需要加载的插件列表
 * @type {string[]} 插件名称字符串数组
 */
const plugins: string[] = [
  "advlist",
  "anchor",
  "autolink",
  "autosave",
  "code",
  "codesample",
  "directionality",
  "emoticons",
  "fullscreen",
  "image",
  "insertdatetime",
  "link",
  "lists",
  "media",
  "nonbreaking",
  "pagebreak",
  "preview",
  "save",
  "searchreplace",
  "table",
  "visualblocks",
  "visualchars",
  "wordcount",
];

export default plugins;
