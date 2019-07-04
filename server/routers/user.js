const Router = require('koa-router')
const router = new Router()
const moment = require('moment')
const ModelDb = require('../db/user')
const getMd5Str = require('../utils/getmd5')

router
  .get('/api/user/list', async ctx => {
    const list = await ModelDb.query();
    ctx.body = {
      list: list ? list : [],
      code: 0
    }
  })
  .get('/api/user/info', async ctx=>{
    const _id = ctx.cookies.get('userid');
    const user = await ModelDb.query({_id});

    _id && user ? ctx.body = {
        data: user[0],
        code: 0
      }
    :
    ctx.body = {
      code: 1
    };
  })
  .post('/api/user/validate', async ctx => {
    const {user} = ctx.request.body;
    const users = await ModelDb.query({user});
    users && users.length>0 ? ctx.body = {
      code: 0,
      num: users.length
    }
    :
    ctx.body = {
      code: 1
    };
  })
  .post('/api/user/login', async ctx => {
    const _id = ctx.cookies.get('userid');
    if(_id){
      const user = await ModelDb.query({_id});
      ctx.body = {
        data: user[0],
        code: 0
      }
    }
    const {user,email,weburl, ip, city} = ctx.request.body;
    const createtime = moment().format();
    const data = await ModelDb.save({user, email, weburl, createtime, ip, city});
    ctx.cookies.set('userid', data['_id'],{maxAge: 60*60*24*10000000})
    ctx.body = {
      data: data,
      code: 0
    }
  })
  .post('/api/user/logout', async ctx => {
    ctx.cookies.set('userid', '',{maxAge:0})
    ctx.body = {
      code:0
    }
  })
  
module.exports = router