const Router = require('koa-router')
const router = new Router()
const moment = require('moment')
const ModelDb = require('../db/artical')
router
  .get('/api/info', async ctx => {
    const req = ctx.req;
    const ip = req.headers['x-forwarded-for'] || req.ip || req._remoteAddress || (req.connection && req.connection.remoteAddress) || undefined ;
    ctx.body = {
      code: 0,
      ip:ip
    }
  })
  .get('/api/artical/list', async ctx => {
    let {page,size} = ctx.query;
    const list = await ModelDb.queryList({},{page,size});
    const count = await ModelDb.count({});
    list ?  ctx.body = {
      list: list ? list : [],
      code: 0,
      count
    }
    : ctx.body = {code:1}
  })
  .get('/api/artical/content', async ctx => {
    const data = await ModelDb.query({_id:ctx.query._id});
    data ? ctx.body = {
      data: data[0],
      code: 0
    }
    :
    ctx.body = {
      data: null,
      code: 1
    };
  })
  .post('/api/artical/add', async ctx => {
    const {title,content,desc,pics,createtime} = ctx.request.body;
    const data = await ModelDb.save({title,content,desc,pics,createtime});
    data ? ctx.body = {
      list: data,
      code: 0,
      status: 'ok'
    } : ctx.body={
      code: 1,
      status: 'error'
    }
  })
  .post('/api/artical/delete', async ctx => {
    const {_id} = ctx.request.body;
    const artical = await ModelDb.query({_id});
    let alias = artical[0];
    alias.isDel = true;
    const data = await ModelDb.updata(_id,alias);
    data ? ctx.body = {
      list: data,
      code: 0,
      status: 'ok'
    } : ctx.body={
      code: 1,
      status: 'error'
    }
  })
  .post('/api/artical/update', async ctx => {
    const {_id,title,content,desc,pics,createtime} = ctx.request.body;
    const data = await ModelDb.updata(_id,{title,content,desc,pics,createtime});
    data ? ctx.body = {
      list: data,
      code: 0,
      status: 'ok'
    } : ctx.body={
      code: 1,
      status: 'error'
    }
  })
  
module.exports = router