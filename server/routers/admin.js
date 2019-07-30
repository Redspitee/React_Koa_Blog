

const filter = require('../utils/utils');

const Router = require('koa-router')
const moment = require('moment')
const router = new Router()
const ModelDb = require('../db/admin')
const getMd5Str = require('../utils/getmd5')
router
.get('/api/admin/list' , async ctx=>{
  const data = await ModelDb.query({});
  ctx.body = {
    status: 'ok',
    list: data,
  }
})
.get('/api/auth_routes', async ctx => {
  ctx.body = {
    status: 'ok',
    list: 'admin',
  }
})
.get('/api/currentUser', async ctx => {
  ctx.body={
    name: 'RedSpite',
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    userid: '00000001',
    email: '718352984@qq.com',
    signature: '海纳百川，有容乃大',
    title: '交互专家',
    group: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
    tags: [
      {
        key: '0',
        label: '很有想法的',
      },
      {
        key: '1',
        label: '专注设计',
      },
      {
        key: '2',
        label: '辣~',
      },
      {
        key: '3',
        label: '大长腿',
      },
      {
        key: '4',
        label: '川妹子',
      },
      {
        key: '5',
        label: '海纳百川',
      },
    ],
    notifyCount: 12,
    unreadCount: 11,
    country: 'China',
    geographic: {
      province: {
        label: '浙江省',
        key: '330000',
      },
      city: {
        label: '杭州市',
        key: '330100',
      },
    },
    address: '西湖区工专路 77 号',
    phone: '0752-268888888',
  }
})

// 注册
.post('/api/login/register', async ctx => {
  const {
    mail,
    mobile,
    password
  } = ctx.request.body;
  
  const data = await ModelDb.query({
    mail
  });
  if (data) {
    ctx.body = {
      status: 'error',
      currentAuthority: 'guest',
    }
  } else {
    const data = await ModelDb.save({
      mail,
      mobile,
      password: getMd5Str(password),
    });
    ctx.cookies.set('userid', data['_id'])
    ctx.body = {
      status: 'ok',
      currentAuthority: 'admin' 
    }
  }

})
// 登陆
.post('/api/login/account', async ctx => {
  const {
    mail,
    password
  } = ctx.request.body;
  let data = await ModelDb.query({
    mail,
    password: getMd5Str(password)
  })
  if (data) {
    ctx.cookies.set('userid', data[0]['_id'])
    ctx.body = {
      status: 'ok',
      type: 'account',
      currentAuthority: 'admin',
    }
  } else {
    ctx.body = {
      status: 'error',
      type: 'account',
      currentAuthority: 'guest',
    }
  }

})
module.exports = router