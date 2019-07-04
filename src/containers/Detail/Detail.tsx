import React,{ PureComponent } from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import Gotop from 'react-go-top';
import moment from 'moment';
import { getdetail, cleardetail } from '../../reducer/artical.redux';
import Header from '../../components/Header/Header';
import Bottom from '../../components/Bottom/Bottom';

import './detail.less';

interface Props{
  detail: any,
  getdetail: Function,
  cleardetail: Function
}
interface State{
}
// @ts-ignore
@connect(
  state => (state as any).artical,
  { getdetail, cleardetail }
)
class Detail extends PureComponent<Props,State>{
  constructor(props: Props){
    super(props)
    this.state = {
    };
    this.getContent = this.getContent.bind(this);
  }
  async componentDidMount(){
    document && document.documentElement ? document.documentElement.scrollTop = 0 : null;
    const id = (this.props as any).location.search.split('=')[1];
    const { getdetail } = this.props;
    await getdetail(id);
  }
  async componentWillUnmount(){
    const { cleardetail } = this.props;
    await cleardetail()
  }
  getContent(){
    const { content } = this.props.detail;
    return { __html: content }
  }
  render(){
    const { detail } = this.props; 
    return (
      <div>
        <Header active={1} />
        <Gotop style={{backgroundColor: "#ddd"}}/>
        {detail.title ? 
        <div className="artical-detail">
          <h1>{detail.title}</h1>
          <div>{detail.desc}</div>
          <div dangerouslySetInnerHTML={this.getContent()}></div>
          {detail.createtime ? <div className="artical-detail-date">{moment(detail.createtime).format('YYYY.MM.DD')}</div> :""}
        </div>
        : <div className="center padd10"><Spin /></div>
        }
        <Bottom />

      </div>
    )
  }
}
export default Detail