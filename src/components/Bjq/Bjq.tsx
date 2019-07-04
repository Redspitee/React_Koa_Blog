import React,{ PureComponent } from 'react';
import { Modal, Input, message, Popconfirm, Form } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import CommentList from './CommentList/CommentList';
import { sendComment, validate_user } from '../../api/api';
import './bjq.less';
// 异步自定义校验

interface Props  extends FormComponentProps {
  login: Function,
  userinfo: any,
  getComments: Function,
  logOut: Function,
  list: any,
  getMore: Function,
  size: number,
  count: number,
  delComment: Function
}
interface State{
  input: any,
  visible: boolean,
  user: any,
  email: any,
  weburl: any,
  replyId: string,
  replyEmail: string
  
}
class BjqApp extends PureComponent<Props,State>{
  constructor(props: Props){
    super(props)
    this.state={
      input: '',
      visible: false,
      user:'',
      email: '',
      weburl:'',
      replyId:'',
      replyEmail: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.showLogin = this.showLogin.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.logout = this.logout.bind(this);
    this.replyTo = this.replyTo.bind(this);
  }
  componentDidMount(){
  }
  logout(){
    this.props.logOut()
  }
  handleCancel(){
    this.setState({
      visible: false
    })
  }
  handleOk(){
    this.props.form.validateFields(['user', 'email', 'weburl'], {force: true}, (errors, values) => {
      if (!errors) {
        const {user, email, weburl} = values;
        this.props.login({user,email,weburl: weburl || ""}) 
        this.handleCancel()
      }
      console.log(errors, values)
    });
  }
  showLogin(){
    this.setState({
      visible: true
    })
  }
  handleChange(e:any){
    this.setState({
      input: e.target.value
    })
  }
  async handleSubmit(){
    if(this.state.input.length<3){
      message.error('多说一点');
      return
    }
    const {replyId, replyEmail} = this.state;
    const issuccess = await sendComment({content:this.state.input,replyId,replyEmail});
    if(!issuccess){ message.error('发表留言失败'); return};
    
    message.success('留言发表成功');
    this.setState({input:'',replyId: '',replyEmail: ''});
    this.props.getComments()
  }
  getInput(e: any , type: any){
    const val = e.target.value;
    if(type =='user'&& val.length > 15 ){
      return
    } 
    const obj:any = {
      [type]: val,
    }
    this.setState(obj)
  }
  getFocus(v:any){
    this.setState({
      input: `@${v.user_name}: `,
      replyId: v._id,
      replyEmail: v.user_email
    })
    const area =  this.refs["textarea"] as any;
    area.focus()
  }
  replyTo(v:any,_id:any){
    const user_name = v.userinfo.user;
    const user_email = v.userinfo.email;
    this.getFocus({user_name,_id,user_email})
  }
 
  render(){
    const { user,_id } = this.props.userinfo;
    const { visible } = this.state;
    const { TextArea } = Input;
    const { list, getMore, size, count, delComment } = this.props;
    const { getFieldDecorator  } = this.props.form;
   
    const notlogin = <div><i className="iconfont icon-moon"></i><span>谢谢你的留言, {user}~</span> <span onClick={this.logout} className="fr">退出</span> </div>
    const logined = <div><i className="iconfont icon-moon"></i><span>先登录吧！</span> <span onClick={this.showLogin} className="fr">登录</span></div>
    return (
      <div>
        <div className="Bjq"> 
          <div className="editor_div">
            <div className="editor_toolbar">
              {user?notlogin:logined}
            </div>
            <div className="editor_textarea">
              <TextArea onChange={this.handleChange} value={this.state.input} ref="textarea"></TextArea>
            </div>
          </div>
          {user?<Popconfirm title="是否要发表此条评论?" onConfirm={()=>{this.handleSubmit()}} okText="确定" cancelText="取消"><button >确 认</button></Popconfirm>:null}
          <Modal
          title="登 录"
          cancelText="取 消"
          okText="登 录"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          >
            <Form.Item hasFeedback  required >
             {getFieldDecorator('user', {
                validateTrigger: ['onBlur'],
                rules: [
                  {
                    type: "string",
                    required: true,
                    whitespace: true,
                    message: '请输入昵称'
                  },
                  {
                    validator: async (rule, value, callback) => {
                      const ispass = await validate_user({user: value})
                      !ispass ? callback(new Error('昵称已经被占用啦')) : callback();
                     }
                  }, {
                    min: 1,
                    max: 16,
                    message: '请输入1-16位昵称'
                  }
                ],
              })(<Input addonBefore="昵称(必填)" placeholder="xx" />)}

            </Form.Item>
            <Form.Item hasFeedback required > 
              {getFieldDecorator('email', {
                rules: [
                  {
                    whitespace: true,
                    required: true,
                    min: 1,
                    message: '邮箱格式不对',
                    type: 'email'
                  },
                ],
              })(<Input addonBefore="邮箱(必填)" placeholder="xx@xx.xx" />)}
              
            </Form.Item>
            <Form.Item hasFeedback>
              {getFieldDecorator('weburl', {
                rules: [
                  {
                    required: false,
                    min: 6,
                    message: '网址格式不对',
                    type: 'url'
                  },
                ],
              })(<Input addonBefore="网址(选填)" placeholder="http://xx.xx" />)}
            </Form.Item>
            {/* <Input addonBefore="昵称(必填)" defaultValue="" onChange={e=>this.getInput(e,'user')} />
            <Input addonBefore="电子邮箱" defaultValue="" onChange={e=>this.getInput(e,'email')}  />
            <Input addonBefore="个人网址" defaultValue="" onChange={e=>this.getInput(e,'weburl')}  /> */}
          </Modal>
        </div>
        <CommentList 
          list={list} 
          getMore={getMore} 
          size={size} 
          count={count} 
          replyTo={this.replyTo} 
          userid ={_id}
          delComment={delComment}
        />
      </div>
    )
  }
}
const Bjq:any = Form.create<Props>({
  name: 'dynamic_rule' 
})(BjqApp)
export default Bjq;