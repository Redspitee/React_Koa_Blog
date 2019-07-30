import { logout_api, getinfo } from '../api/api';

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const SETINFO= "SETINFO";

const initState = {
  user: "",
  email: "",
  weburl: ""
}
// reducers
export function userinfo(state = initState, action){
  switch(action.type){
    case LOGIN:
      return {...action.payload}
    case SETINFO:
      return {...action.payload}
    case LOGOUT:
      return {...initState}
    default:
      return state
  }
}
// 登陆
export function login(info){
  return async dispatch =>{
    dispatch(GoLogin(info))
  }
}
// 退出登陆
export function logOut(){
  return async dispatch =>{
    await logout_api()
    dispatch({type: LOGOUT})
  }
}

// 获取个人信息 by cookie
export function getInfo(){
  return async dispatch =>{
    const info = await getinfo();
    info ? dispatch({type: SETINFO,payload: info}) : dispatch({type:''});
  }
}
function GoLogin(data){
  return {
    type: LOGIN,
    payload: data
  }
}



