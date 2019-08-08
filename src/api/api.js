import axios from 'axios';
import jsonp from 'jsonp';

axios.interceptors.request.use(config => {
  config = {
    ...config,
    withCredentials: true,
    baseURL: '',
  }
  return config
})
axios.interceptors.response.use(response => {
  return response
})
// 验证用户名是否可用
export async function validate_user({
  user
}) {
  return new Promise((resolve, reject) => {
    axios.post('/api/user/validate', {
        user,
        ip: window.userip,
        city: window.usercity
      })
      .then(res => {
        // code: 0 数据库已有同名账号
        res.data.code === 0 ? resolve(false) : resolve(true)
      })
      .catch(err => {
        resolve(false)
      })
  })
}
// 获取用户ip
export function get_ip() {
  jsonp('http://pv.sohu.com/cityjson?ie=utf-8', null, (err, data) => {
    if (err) {
      console.error(err);
    } else {
      return data
    }
  })
}
// 登陆
export async function login_api({
  user,
  email,
  weburl
}) {
  return new Promise((resolve, reject) => {
    axios.post('/api/user/login', {
        user,
        email,
        weburl,
        ip: window.userip,
        city: window.usercity
      })
      .then(res => {
        res.data.code === 0 ? resolve(res.data) : resolve(res.data)
      })
      .catch(err => {
        resolve(false)
      })
  })
}
// 退出登陆
export function logout_api() {
  return new Promise((resolve, reject) => {
    axios.post('/api/user/logout')
      .then(res => {
        res.data.code === 0 ? resolve(true) : resolve(false)
      })
      .catch(err => {
        resolve(false)
      })
  })
}
// 添加文章
export function add_artical({
  content,
  title,
  createtime,
  desc
}) {
  return new Promise((resolve, reject) => {
    axios.post('/api/artical/add', {
        content,
        title,
        createtime,
        desc
      })
      .then(res => {
        res.data.code === 0 ? resolve(res.data.data) : resolve(false)
      })
      .catch(err => {
        resolve(false)
      })
  })
}
// 文章列表
export function list_artical({
  page = 0,
  size
}) {
  return new Promise((resolve, reject) => {
    axios.get('/api/artical/list', {
        params: {
          page,
          size
        }
      })
      .then(res => {
        const {
          list,
          count,
          code
        } = res.data;
        code === 0 ? resolve({
          list,
          count
        }) : resolve({
          list: [],
          count: 0
        })
      })
      .catch(err => {
        resolve(false)
      })
  });
}
// 文章详情
export function getcontent_artical(_id) {
  return new Promise((resolve, reject) => {
    axios.get('/api/artical/content', {
        params: {
          _id
        }
      })
      .then(res => {
        res.data.code === 0 ? resolve(res.data.data) : resolve({})
      })
      .catch(err => {
        reject({})
      })
  });
}
// 验证cookie获取个人信息
export function getinfo() {
  return new Promise((resolve, reject) => {
    axios.get('/api/user/info', {
        params: {
          ip: window.userip,
          city: window.usercity
        }
      })
      .then(res => {
        res.data.code === 0 ? resolve(res.data.data) : resolve(false)
      })
      .catch(err => {
        resolve(false)
      })
  })

}

// 留言
export function sendComment({
  content,
  replyId
}) {
  return new Promise((resolve, reject) => {
    axios.post('/api/comment/add', {
        content,
        replyId,
        ip: window.userip,
        city: window.usercity
      })
      .then(res => {
        res.data.code === 0 ? resolve(true) : resolve(false)
      })
      .catch(err => {
        resolve(false)
      })
  });
}

// 留言列表
export function getComments({
  page,
  size
}) {
  return new Promise((resolve, reject) => {
    axios.get('/api/comment/list', {
        params: {
          page,
          size
        }
      })
      .then(res => {
        const {
          list,
          count,
          code
        } = res.data;
        code === 0 ? resolve({
          list,
          count
        }) : resolve({
          list: [],
          count: 0
        })
      })
      .catch(err => {
        resolve({
          list: [],
          count: 0
        })
      })
  });
}
// 删除留言
export function delComments(fId, id) {
  return new Promise((resolve, reject) => {
    axios.post('/api/comment/delete', {
        fId,
        id
      })
      .then(res => {
        const {
          code
        } = res.data;
        code === 0 ? resolve(true) : resolve(false)
      })
      .catch(err => {
        resolve(false)
      })
  });
}