const Router = require('koa-router')
const router = new Router()
const moment = require('moment')
const ModelDb = require('../db/user')
const getMd5Str = require('../utils/getmd5')

router
  .get('/api/user/list', async ctx => {
    let {page,size, sorter, ...obj} = ctx.query;
    const list = await ModelDb.query(obj, { page, size, sorter });
    const count = await ModelDb.count(obj);
    ctx.body = {
      list: list ? list : [],
      code: 0,
      count
    }
  })
  .get('/api/user/info', async ctx=>{
    const _id = ctx.cookies.get('userid');
    let user;
    if(_id) user = await ModelDb.queryId({_id});

    _id && user ? ctx.body = {
        data: user,
        code: 0
      }
    :
    ctx.body = {
      code: 1
    };
  })
  .post('/api/user/validate', async ctx => {
    const { user } = ctx.request.body;
    const users = await ModelDb.query({user});
    users && users[0] ? ctx.body = {
      code: 0,
      num: users.length
    }
    :
    ctx.body = {
      code: 1
    };
  })
  .post('/api/user/login', async ctx => {
    const { user, email, weburl, ip, city } = ctx.request.body;
    const users = await ModelDb.query({user});
    const userInfo = await ModelDb.query({ user, email });
    if(users[0] && userInfo[0]){
      ctx.cookies.set('userid', userInfo[0]['_id'],{maxAge: 60*60*24*10000000})
      ctx.body = {
        data: userInfo[0],
        code: 0
      }
      return
    }
    if(!users[0]){
      const createtime = moment().format();
      const data = await ModelDb.save({user, email, weburl, createtime, ip, city});
      ctx.cookies.set('userid', data['_id'],{maxAge: 60*60*24*10000000})
      ctx.body = {
        data: data,
        code: 0
      }
      return
    }
    ctx.body = {
      code: 1,
      msg: '用户名与邮箱号不匹配'
    }

  })
  .post('/api/user/logout', async ctx => {
    ctx.cookies.set('userid', '',{ maxAge: 0 })
    ctx.body = {
      code: 0
    }
  })
  
module.exports = router