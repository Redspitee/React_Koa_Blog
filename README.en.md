# React+Redux+Ts+Antd+Webpack+Koa , build personal blog website.

> ##### Used frameworks：react + redux + antd + ts + webpack + koa
> ##### Achieving results：Personal blog page display, compatible with Mobile
### Translations
  [中文](README.md)
### Introduction
- As a front-end engineer, blogging is necessary, which is also the original intention of writing this project.
- The whole project is divided into three parts: blog front-end page, blog back-end system and KOA server.
- This project is for the front-end page code of the blog, the background system of the blog and the Koa server code to gradually open up.
- I've been writing on my own, with very few functions. I hope you can give me your opinions and suggestions.~ :blush: 
- [Click here to leave a message for me.](https://redspite.com/comments)   
### Online Preview
  [https://www.redspite.com](https://www.redspite.com)
### Project screenshots

![简历截图](https://images.gitee.com/uploads/images/2019/0629/155231_14daf218_675480.png "cv.png")

![文章截图](https://images.gitee.com/uploads/images/2019/0629/155251_3cf35005_675480.png "artical.png")

![留言截图](https://images.gitee.com/uploads/images/2019/0629/155312_2ceef6e1_675480.png "comment.png")

## Local Preview
Download
```
git clone Current address
```
Initialization
```
yarn install  

```
Run
```
yarn start 
```

### Major Function
#### Blog page
| Module | Existing functions                                  | Follow-up functions|
| ------------- | -----------------------------------------| --- |
| cv | Personal Resume Show                              | / |
| artical | Pagination of article lists; article details                   | Articles classification|
| comment | Visitors log in and log out; message adding and deleting; message list paging| / |
#### Background system (code not uploaded)
| Module | Functions                                     |
| ---- | -----------------------------------------|
| administrators | Administrator logs in and logs out                              |
| articals | Create, delete, modify articles                     |
| comments | Message statistics and keyword filtering |
| Visitor statistics | Visitor statistics |
#### Koa Server (code not uploaded)
| Module| Functions                                     |
| ---- | -----------------------------------------|
| user | User Account Creation, Log-in and Log-out, Privilege Settings         |
| artical | Addition, deletion and revision of articles                     |
| comments | Addition, deletion and modification of messages, Send an email notification when the message is answered |

### Directory Structure
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
│      favicon.ico
│      index.html
│      manifest.json
│      
├─scripts
│      build.js
│      start.js
│      test.js
│      
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
