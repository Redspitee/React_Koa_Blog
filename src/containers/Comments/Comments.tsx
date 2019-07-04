import React,{ PureComponent } from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';
import { login,getInfo,logOut } from '../../reducer/user.redux';
import { getlist } from '../../reducer/comment.redux';
import { delComments } from '../../api/api';

import Gotop from 'react-go-top';
import Bjq from '../../components/Bjq/Bjq';
import Header from '../../components/Header/Header';
import Bottom from '../../components/Bottom/Bottom';
import Music from '../../components/Music/Music';


interface Props{
  comment: any,
  getlist: Function,
  userinfo: any,
  login: Function,
  getInfo: Function,
  logOut: Function
}
interface State{
  msg: string,
  time: number,
  size: number
}
@connect(
  state=>state,
  {login,getInfo,logOut, getlist}
)
class Comments extends PureComponent<Props,State>{
  constructor(props: Props){
    super(props)
    this.state={
      msg: '',
      time: 0,
      size: 15,
    } 
    this.getMore = this.getMore.bind(this);
    this.delComment = this.delComment.bind(this);
    this.getComments = this.getComments.bind(this);
  }
  componentDidMount(){
    const { size } = this.state;
    const { list, count } = this.props.comment;
    count == 0 ? this.props.getInfo() : null;
    list.length == 0 ? this.props.getlist({ page: 0, size }) : null;
  }
 
 
  async delComment(fId: any, _id:any){
    const issuccess = await delComments(fId, _id);
    if(!issuccess) { message.error('删除失败'); return};
    message.success('删除成功');
    const { size } = this.state;
    this.props.getlist({ page: 0, size })
  }
  async getComments(){
    const { size } = this.state;
    await (this.props as any).getlist({page: 0, size});
  }
  async getMore(){
    const { size } = this.state;
    const { page } = (this.props as any).comment;
    await (this.props as any).getlist({page: page + 1, size});
  }
  showToast(msg: string, time: number){
    this.setState({
      msg: msg,
      time: time
    })
    setTimeout(()=>{
      this.setState({
        msg: ""
      })
    },time*1000)
  }
  render(){
    const { msg, size} = this.state;
    const { userinfo, login ,logOut} = this.props;
    const { comment } = this.props;
    return(
      <div>
        <Header active={2} />
        <Gotop style={{backgroundColor: "#ddd"}}/>
        <Music />
        <h1>留言板</h1>
        <Bjq 
          userinfo={userinfo} 
          login={login} 
          logOut={logOut} 
          list={comment.list} 
          size={size} 
          count={comment.count} 
          getMore={this.getMore} 
          getComments={this.getComments} 
          delComment={this.delComment}
        />
        {/* {msg ? <Toast msg={msg} /> : null} */}
        <Bottom />

      </div>
    )
  }
}
export default Comments;