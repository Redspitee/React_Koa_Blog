# React+Redux+Ts+Antd+Webpack+Koa 构建个人博客

> ##### 技术选型：react + redux + antd + ts + webpack + koa
> ##### 实现效果：个人博客网页展示，兼容移动端

## 写在前面

- 身为一名前端er，博客是必须的，这也是写这个项目的初衷。
- 整个项目分为三个部分：博客前端页面、Koa服务端、博客后台系统。
- 该项目包含博客前端页面代码，以及Koa服务器代码。博客的后台系统后续逐渐开放。
- 一直在自己瞎写，功能还很少。欢迎各位给我提意见和建议~ :blush: 
- [点这里给我留言](https://redspite.com/comments) 
  
## 线上预览


  [https://www.redspite.com](https://www.redspite.com)


## 主要功能

 **博客前端** 
- [x] 个人简历展示
- [x] 文章列表分页
- [x] 文章详情
- [x] 访客登陆、登出
- [x] 留言添加、删除
- [x] 留言列表分页

**Koa服务端** 
- [x] 用户账号创建、登陆登出
- [x] 文章增删改查
- [x] 留言增删改查 
- [x] 留言关键字过滤
- [x] 留言被回复时发送邮件通知

**后台系统（代码未上传）**
- [x] 管理员登陆登出
- [x] 文章创建、删除、修改
- [x] 留言统计、留言关键字过滤
- [x] 访客统计

## 技术栈
- [x] react
- [x] redux
- [x] react-redux
- [x] react-router
- [x] redux-thunk
- [x] ant-design
- [x] typescript
- [x] webpack
- [x] Koa
- [x] MongoDB
- [x] Mongoose

## 本地预览

  **下载** 

    git clone https://github.com/Redspitee/React_Koa_Blog.git

  **博客前端运行** 

    yarn install  

    yarn start 

  **服务器运行** 

    cd server

    yarn install  

    node index

## 项目截图

![简历截图](https://images.gitee.com/uploads/images/2019/0629/155231_14daf218_675480.png "cv.png")

![文章截图](https://images.gitee.com/uploads/images/2019/0629/155251_3cf35005_675480.png "artical.png")

![留言截图](https://images.gitee.com/uploads/images/2019/0629/155312_2ceef6e1_675480.png "comment.png")

## 文件结构

```
BLOG
│  .babelrc
│  .gitignore
│  package-lock.json
│  package.json
│  README.en.md
│  README.md
│  tsconfig.json
│  yarn.lock
│  
├─config
│  │  env.js
│  │  paths.js
│  │  webpack.config.js
│  │  webpackDevServer.config.js
│  │  
│  └─jest
│          cssTransform.js
│          fileTransform.js
│                
├─public
│  │    favicon.ico
│  │    index.html
│  │    manifest.json
│  └─uploads
│      
├─scripts
│      build.js
│      start.js
│      test.js
│
├─server
│  ├─db
│  ├─routers
│  ├─utils
│  └─www
│      ├─static
│      │  ├─css
│      │  ├─js
│      │  └─media
│      └─uploads      
└─src
    │  bg.jpg
    │  declare_modules.d.ts
    │  font.less
    │  index.less
    │  index.tsx
    │  react-app-env.d.ts
    │  serviceWorker.ts
    │  
    ├─api
    │      api.js
    │      
    ├─components
    │  ├─Bjq
    │  │  │  bjq.less
    │  │  │  Bjq.tsx
    │  │  │  
    │  │  ├─CommentList
    │  │  │      commentlist.less
    │  │  │      CommentList.tsx
    │  │  │      
    │  │  └─img
    │  │          icons.png
    │  │          
    │  ├─Bottom
    │  │      bottom.less
    │  │      Bottom.tsx
    │  │      
    │  ├─Gotop
    │  │      gotop.less
    │  │      Gotop.tsx
    │  │      top.png
    │  │      
    │  ├─Header
    │  │      header.jpg
    │  │      header.less
    │  │      Header.tsx
    │  │      
    │  ├─List
    │  │      list.less
    │  │      List.tsx
    │  │      pic.jpg
    │  │      
    │  ├─Music
    │  │      bgm.mp3
    │  │      music.less
    │  │      music.png
    │  │      Music.tsx
    │  │      
    │  └─Toast
    │          toast.less
    │          Toast.tsx
    │          
    ├─containers
    │  ├─Comments
    │  │      Comments.tsx
    │  │      
    │  ├─Cv
    │  │      cv.less
    │  │      Cv.tsx
    │  │      
    │  ├─Detail
    │  │      content.txt
    │  │      detail.less
    │  │      Detail.tsx
    │  │      
    │  └─Home
    │          Home.tsx
    │          
    ├─reducer
    │      artical.redux.js
    │      comment.redux.js
    │      index.js
    │      user.redux.js
    │      
    └─routers
            routers.js
```
