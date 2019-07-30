const Router = require('koa-router')
const router = new Router()
const ArticalDb = require('../db/artical')
const CommentDb = require('../db/comment')
const UserDb = require('../db/user')
const moment = require('moment')

router
  .get('/api/all/countall', async ctx => {
    // try{
      const articalCount = await ArticalDb.count({});
      const lastArtical = await ArticalDb.queryList({},{page:0,size:1});

      const commentCount = await CommentDb.count({})
      const commentAllCount = await CommentDb.countAll({})
      const userCount = await UserDb.count({})
      // 今日、本月注册人数
      const nowtime = moment().startOf('day').format();
      const monthtime = moment().startOf('month').format();
      const todayUser = await UserDb.count({
        createtime: {
          "$gte": nowtime
        }
      })
      const monthUser = await UserDb.count({
        createtime: {
          "$gte": monthtime
        }
      })

      ctx.body = {
        code: 0,
        artical: {
          count: articalCount,
          last: lastArtical
        },
        comment: {
          count: commentCount,
          all: commentAllCount
        },
        user: {
          count: userCount,
          todayUser,
          monthUser
        }
      }
    // }catch(err){
    //   ctx.body = {
    //     code: 1
    //   }
    // }
    
  })

module.exports = router;
