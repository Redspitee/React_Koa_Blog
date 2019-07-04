import React,{ PureComponent } from 'react';
import { Link } from'react-router-dom';
import { Skeleton,Comment, Avatar, Tooltip, Divider, Button, Popconfirm } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import './commentlist.less';

const randomColor  = require('randomcolor');

interface Props{
  list: any,
  size: number,
  count: number,
  getMore: Function,
  replyTo: Function,
  delComment: Function,
  userid: string
}
class CommentList extends PureComponent<Props,{}>{
  constructor(props: Props){
    super(props)
    this.state={}
    this.getMore = this.getMore.bind(this)
    this.delComment = this.delComment.bind(this)
  }
  componentDidMount(){
    moment.locale('zh-cn')
  }
  replyTo = (v:any,_id: any)=>{
    this.props.replyTo(v,_id)
  }
  getMore(){
    this.props.getMore()
  }
  delComment(fId:any, _id:any){
    this.props.delComment(fId,_id)
  }
  render(){
    const { list,count,userid } = this.props;
    const none =  <Skeleton avatar title active />;

    const actions = (v:any, fId:any)=>{
      let arr = [<span onClick={()=>this.replyTo(v, fId)}>回复</span>];
      let del = (
      <Popconfirm title="是否要删除此条评论?" onConfirm={()=>this.delComment(fId,v._id)} okText="确定" cancelText="取消">
        <span className="del">删除</span>
      </Popconfirm>)
      v.userinfo._id === userid ? arr.push(del) : null;
      return arr;
    }

    const comment = (v: any, children: any, fId: any) => (
      <Comment
        author={v.userinfo.user}
        actions={actions(v, fId)}
        avatar={(
        !v.userinfo.weburl ? 
        <Avatar style={{backgroundColor: randomColor(), cursor: 'default'}}>
          {v.userinfo.user.substr(0,1).toUpperCase()}
        </Avatar>
        :
        <a href={!v.userinfo.weburl.split('http')[1] ? 'http://'+ v.userinfo.weburl : v.userinfo.weburl} target="_blank" rel="noopener" title={v.userinfo.weburl}>
          <Avatar style={{backgroundColor: randomColor()}}>
            {v.userinfo.user.substr(0,1).toUpperCase()}
          </Avatar>
        </a>
      )}
      content={(
        <div className="content-box" dangerouslySetInnerHTML={{__html: v.content}} />
      )}
      datetime={(
        <Tooltip title={moment(v.createtime).format('YYYY-MM-DD HH:mm:ss')}>
          <span>{moment(v.createtime).fromNow()}</span>
        </Tooltip>
      )}
      >{children?children.map((v:any)=>(<div key={v._id}>{comment(v,v.children, fId)}</div>)):null}</Comment>
    )
    const listhtml = (
    <div>
      {list.map((v: any,index: number)=>(
        <div key={v._id}>
          <div><small>{count-index}楼</small></div>
          {comment(v,v.children,v._id)}
         <Divider />
        </div>
      ))}
      { list.length <count ? <div style={{textAlign:'center'}}>
          <Button onClick={this.getMore}>加载更多</Button>
        </div> : null
      }
    </div>);

    return (
      <div className="CommentList">
        { list.length > 0 ? listhtml : none }
      </div>
    )
  }
}

export default CommentList;