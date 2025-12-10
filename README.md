<div align="center">
  <img alt="vue3-element-admin-youhujun" width="80" height="80" src="./src/assets/logo.png">
  <h1>vue3-element-admin-youhujun</h1>

  <img src="https://img.shields.io/badge/Vue-3.5.21-brightgreen.svg"/>
  <img src="https://img.shields.io/badge/Vite-7.1.5-green.svg"/>
  <img src="https://img.shields.io/badge/Element Plus-2.11.2-blue.svg"/>
  <img src="https://img.shields.io/badge/license-MIT-green.svg"/>
</div>

![](https://foruda.gitee.com/images/1708618984641188532/a7cca095_716974.png "rainbow.png")


<div align="center">
   <a target="_blank" href="https://www.youhu.club/">📑 阅读文档</a>|  <a target="_blank" href="https://www.youhujun.com/">🌐 参考博客</a> 
</div>


## 项目简介

[vue3-element-admin-youhujun](https://gitcode.com/youhujun/vue3-element-admin-youhujun) 基于 Vue3、Vite7、TypeScript 和 Element-Plus 搭建的极简开箱即用企业级后台管理前端模板。 配套 Laravel 后端 [laravel-fast-api-youhujun](https://gitcode.com/youhujun/laravel-fast-api-youhujun) 和 uniapp [uniapp-youhujun](https://gitcode.com/youhujun/uniapp-youhujun) 手机端开发模板  供开发者快速开发。


## 项目特色

- **简洁易用**：基于有来 [vue3-element-admin](https://gitcode.com/youlai/vue3-element-admin) 重构的 Vue3 版本，易上手。
- **组件完善：** 封装了选择地区，时间，用户，管理员，级别，上传，相册以及tinymce的富文本编辑器组件。
- **权限管理：** 支持动态路由、按钮权限、角色权限和数据权限等多种权限管理方式。
- **基础设施：** 提供国际化、多布局、暗黑模式、全屏、水印、接口文档和代码生成器等功能。
- **持续更新**：项目持续开源更新，实时更新工具和依赖。
- **larave提供api**：该版本是专门为PHP的Laravel开发者提供的前端解决方案

## 项目功能

```
|--系统设置
|--个人中心
|--|--菜单管理(树形)
|--|--平台配置
|--|--|--缓存配置
|--|--系统配置
|--|--|--参数配置
|--|--|--提示配置
|--|--|--三方平台配置
|--|--角色管理(权限分配)
|--|--地区管理(树形)
|--|--银行管理

|--业务设置
|--|--通用设置
|--|--|--结合设置
|--|--分类管理
|--|--|--产品分类(树形)
|--|--|--文章分类(树形)
|--|--|--标签管理(树形)
|--|--级别管理
|--|--|--级别条件
|--|--|--用户级别
|--|--业务平台
|--|--|--首页轮播

|--用户管理
|--|--管理员管理
|--|--用户管理
|--|--|--用户列表
|--|--|--等待认证

|--文章管理
|--|--公告管理
|--|--系统文章

|--图片空间
|--|--我的相册

|--日志管理
|--|--登录日志
|--|--|--手机登录
|--|--|--后台登录
|--|--事件日志
|--|--|--手机事件
|--|--|--后台事件

```

## 项目文档

[点击此处](https://www.youhu.club/)

## 项目截图
⚡**文档截图**
![](https://visit.youhujun.com/vue3-element-admin-youhujun/doc_01.png)

<br/>

![](https://visit.youhujun.com/vue3-element-admin-youhujun/doc_02.png)

🖥️ **后台登录**

![](https://visit.youhujun.com/vue3-element-admin-youhujun/01-login.png)

⚡**接口文档**

![](https://visit.youhujun.com/vue3-element-admin-youhujun/02-api.png)



## 项目源码

| 项目 | Gitee   | Github    | GitCode|
| ---- | ----| ---- | ---- |
| vue3-element-admin ✅| [vue3-element-admin-youhujun](https://gitee.com/youhujun/vue3-element-admin-youhujun) | [vue3-element-admin-youhujun](https://github.com/youhujun/vue3-element-admin-youhujun) | [vue3-element-admin-youhujun](https://gitcode.com/youhujun/vue3-element-admin-youhujun) |
| PHP-Laravel 后端 | [laravel-fast-api-youhujun](https://gitee.com/youhujun/laravel-fast-api-youhujun)       | [laravel-fast-api-youhujun](https://gitee.com/youhujun/laravel-fast-api-youhujun) |[laravel-fast-api-youhujun](https://gitee.com/youhujun/laravel-fast-api-youhujun)|



## 项目启动

- **环境准备**

| 环境类型 | 版本要求 | 备注 |
|---------|---------|------|
| **Node.js** | `^20.19.0` 或 `>=22.12.0` | 推荐使用 LTS 版本（主版本为偶数） |
| **包管理器** | `pnpm >= 8.0.0` | 项目使用 pnpm 作为包管理器 |
| **开发工具** | [Visual Studio Code](https://code.visualstudio.com/Download) | 推荐安装 Vue、TypeScript 相关插件 |


- **快速开始**

```bash
# 克隆代码
git clone git@gitcode.com:youhujun/vue3-element-admin-youhujun.git

# 切换目录
cd vue3-element-admin-youhujun

# 准备环境配置
# 环境变量中涉及到敏感信息,因此放置示例文件到项目中.环境配置文件本身不应该在仓库中
cp .env.development.example .env.development

cp .env.production.example  .env.production

# 安装 pnpm
npm install pnpm -g

# 设置镜像源(可忽略)
pnpm config set registry https://registry.npmmirror.com

# 安装依赖
pnpm install

# 启动运行
pnpm run dev
```


## 项目部署

执行 `pnpm run build` 命令后，项目将被打包并生成 `dist` 目录。接下来，将 `dist` 目录下的文件上传到服务器 `/usr/share/nginx/html` 目录下，并配置 Nginx 进行反向代理。

```bash
pnpm run build
```

以下是 Nginx 的配置示例：

```nginx
server {
    listen      80;
    server_name localhost;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }

    # 反向代理配置
    location /prod-api/ {
        # 请将 dev12.laravel.com 替换为您的后端 API 地址，并注意保留后面的斜杠 /
        proxy_pass http://dev12.laravel.com/;
    }
}
```


## 本地Mock

项目同时支持在线和本地 Mock 接口，默认使用线上接口，如需替换为 Mock 接口，修改文件 `.env.development` 的 `VITE_MOCK_DEV_SERVER` 为  `true` **即可**。


## 注意事项

- **自动导入插件自动生成默认关闭**

  模板项目的组件类型声明已自动生成。如果添加和使用新的组件，请按照图示方法开启自动生成。在自动生成完成后，记得将其设置为 `false`，避免重复执行引发冲突。

  ![](https://foruda.gitee.com/images/1687755823137387608/412ea803_716974.png)

- **项目启动浏览器访问空白**

  请升级浏览器尝试，低版本浏览器内核可能不支持某些新的 JavaScript 语法，比如可选链操作符 `?.`。

- **项目同步仓库更新升级**

  项目同步仓库更新升级之后，建议 `pnpm install` 安装更新依赖之后启动 。

- **项目组件、函数和引用爆红**

	重启 VSCode 尝试



## 提交规范

执行 `pnpm run commit` 唤起 git commit 交互，根据提示完成信息的输入和选择。

![](https://foruda.gitee.com/images/1687755823165218215/c1705416_716974.png)


## 声明:

这份开源使用声明适用于使用和分发的开源软件。请仔细阅读以下条款，如果您不同意这些条款，请不要使用或分发该软件。
- 1.本软件是免费开源软件，授权给任何个人和组织使用、复制、修改、合并、发布、分发和销售。

- 2.您可以自由使用本软件用于个人和商业用途，无需支付任何费用。

- 3.您可以通过任何渠道获取和分发本软件的全部或部分代码。

- 4.您可以对本软件进行修改和衍生，但必须在代码中注明原作者和版权信息。

- 5.如果您修改了本软件或者基于本软件进行开发，您需要在您的修改或开发的产品中包含一份本软件的开源使用声明，并在适当的位置注明原作者和版权信息。

- 6.您在使用本软件时，应承担使用风险，并自行负责软件的适用性和安全性。

- 7.原作者不对本软件的任何使用方式负任何责任，包括但不限于直接或间接的损失或损害。

- 8.本软件不附带任何担保或保证，无论明示或暗示，包括但不限于适销性、特定用途适用性和非侵权性。

- 9.本软件可能包含第三方的开源组件或库，这些组件或库受其各自的许可证限制。在使用本软件时，您也需要遵守这些许可证限制。

- 10.您不得使用本软件进行非法活动、侵犯他人权益或违反相应法律法规，如发现相关违规行为，原作者有权终止您使用本软件的权利。

- 11.原作者保留随时修改本开源使用声明的权利，修改后的声明将在原作者的官方网站或代码仓库上公布

  感谢您使用本软件!如果您对软件有任何问题或建议，请与原作者联系。





