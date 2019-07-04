const Koa = require('koa');
const app = new Koa();

const compose = require('koa-compose');
const bodyParser = require('koa-bodyparser');
const cors =  require('koa2-cors');

// 静态文件夹 www
const path = require('path');
const static = require('koa-static');
const staticPath = static( path.join(__dirname, './www'));
const middlewares = compose([bodyParser(), staticPath]);
// 路由
const artical = require('./routers/artical')
const comment = require('./routers/comment')
const user = require('./routers/user')
const admin = require('./routers/admin')
const upload = require('./routers/upload')

app
   .use(staticPath)
   .use(middlewares)
   .use(cors())
   .use(artical.routes())
   .use(artical.allowedMethods())
   .use(comment.routes())
   .use(comment.allowedMethods())
   .use(user.routes())
   .use(user.allowedMethods())
   .use(admin.routes())
   .use(admin.allowedMethods())
   .use(upload.routes())
   .use(upload.allowedMethods())

app.listen(8082, ()=>{
  console.log('koa Server 已运行在 8082 端口')
})