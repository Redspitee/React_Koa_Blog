
const sendEmail = require('../utils/email');
const filter = require('../utils/utils');
const Router = require('koa-router')
const moment = require('moment')
const router = new Router()
const ModelDb = require('../db/comment')
const userModelDb = require('../db/user')

router
  // 后台自己统计，展示全部评论，无论是否已删
  .get('/api/comment/alllist', async ctx => {
    let {page,size, sorter, ...obj} = ctx.query;
    const list = await ModelDb.queryAll(obj, { page, size, sorter });
    const count = await ModelDb.countAll({});
    list ?  ctx.body = {
      list: list ? list : [],
      code: 0,
      count
    }
    : ctx.body = {code:1}
  })
  // 一般情况下，返回未删除评论 
  .get('/api/comment/list', async ctx => {
    let {page,size, sorter, ...obj} = ctx.query;
    const list = await ModelDb.query(obj, { page, size, sorter });
    const count = await ModelDb.count({});
    list ?  ctx.body = {
      list: list ? list : [],
      code: 0,
      count
    }
    : ctx.body = {code:1}
  })
  .post('/api/comment/add', async ctx => {
    const _id = ctx.cookies.get('userid');
    let {content,replyId, ip, city } = ctx.request.body;
    let ispass = filter(content);
    if(!ispass) {
      ctx.body = {
        code:1,
        msg:'关键词过滤'
      }
      return
    }
    const createtime = moment().format();
    const userinfo = await userModelDb.queryId({ _id});
    const toSaveObj = {userinfo: userinfo, ip, content, createtime, city};
    // 如果是回复别人，自动给replyId用户发送邮件
    if(replyId) {
      const { email } = await userModelDb.queryId({ _id: replyId});
      email ? sendEmail(email, toSaveObj) : null;
    }

    let data =  replyId ? await ModelDb.update(replyId,{ ...toSaveObj, isDel:false}) : await ModelDb.save(toSaveObj);
    ctx.body = {
      list: data,
      code: 0
    }
  })
  .post('/api/comment/delete', async ctx => {
    const _id = ctx.cookies.get('userid');
    const { fId,id } = ctx.request.body;
    if(_id && id){
      await ModelDb.delete(fId,id)
      ctx.body = {
        code: 0
      }
      return
    }
    ctx.body={
      code: 1
    }
   
  })
  
module.exports = router