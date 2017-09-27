# Reblog
使用 React 技术栈，基于 GitHub Issues 的轻量级博客系统，Demo ：[KSCO](https://blog-storage.b0.upaiyun.com)。

## 安装

1. 注册 GitHub OAuth 应用

   打开[注册页面](https://github.com/settings/applications/new)，填写相应选项，注册应用，下面给出了一个表单示例：

   | Key                        | Value                                  |
   | -------------------------- | -------------------------------------- |
   | Application name           | 博客名称，例如：Reblog                         |
   | Homepage URL               | 项目主页，例如：https://github.com/ksco/reblog |
   | Application description    | 随便写                                    |
   | Authorization callback URL | 博客地址，例如：https://example.com            |

   **成功创建之后，会得到一个 Client ID 和一个 Client Secret，后面会用到。**

2. 配置项目

   运行命令

   ```shell
   git clone https://github.com/ksco/reblog.git
   cd reblog
   mv src/constants/config.example.js src/constants/config.js
   ```

   编辑 `src/constants/config.js `文件

   ```javascript
   // 博客名称，会显示在页面上方
   export const BLOG_NAME = 'Reblog';
   // 博客的 Slogan，会显示在名称下方
   export const BLOG_SLOGAN = 'Balhblah';

   // GitHub 用户名
   export const USERNAME = 'octocat';
   // 要展示的 Repo 名称
   export const REPONAME = 'blog';

   // 刚刚拿到的 Client ID 和 Client Secret
   export const CLIENT_ID = 'xxx';
   export const CLIENT_SECRET = 'xxx';

   // 博客的地址，必须和之前的 Authorization callback URL 字段保持一致
   export const SITE_URL = 'http://www.example.com';

   // 每页显示的博客条数
   export const POSTS_PER_PAGE = 10;
   ```

3. 安装编译


   运行命令

   ```shell
   cd reblog
   npm install
   npm run build
   ```

   编译完成后，将 build 目录下的静态文件直接放到博客的根目录下就可以了。

   另外，静态文件的托管也可以考虑 [GitHub Pages](https://pages.github.com/)，不过国内的访问速度似乎比较慢。

## CORS

处于安全性的考虑，GitHub 的 OAuth [认证接口](https://github.com/login/oauth/access_token)不支持跨域访问，所以我写了一个简单的 node.js 脚本，并托管在了 [now.sh](https://zeit.co/now) 上，以实现 CORS 代理，脚本就在本项目中的 cors 目录下，你也可以自己启一个服务，并将 `src/constants/api.js` 文件下的 `ACCESS_URL` 变量替换掉即可。

## 关于安全

1. 将 Client Secret 放到客户端中似乎是一种较为危险的行为，但因为 Authorization callback URL 的存在，即使拿到了这个 ID，也做不了什么事情。如果你发现确实有安全性问题，请您给我发邮件。

   如果还是不放心，你当然可以把 Client Secret 隐藏到 上面提到的 CORS 代理中，这样就万无一失了。

2. 如果你不想别人在你的博客中使用 Redux DevTools，可以去除掉 `src/store.js` 中的 `window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||` 部分。

