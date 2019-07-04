import React,{ PureComponent } from 'react';
import './toast.less';

interface Props{
  msg: string
}
interface State{
}
class Toast extends PureComponent<Props,State>{
  constructor(props: Props){
    super(props)
  }
  render(){
    const { msg } = this.props;
    return(
      <div className={`Toast`} >
        <div className="toast-content">
          {/* <i className="iconfont icon-jinggao1"></i> */}
          {msg}
        </div>
      </div>
    )
  }
}
export default Toast;