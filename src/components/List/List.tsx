import React,{ PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { getlist, clearlist } from '../../reducer/artical.redux';
import { Link } from 'react-router-dom';
import { Skeleton, Button } from 'antd';

import './list.less';

interface Props{
  artical: any,
  getlist: Function,
  clearlist: Function
}
interface State{
  size: number
}
// @ts-ignore
@connect(
  state=>state,
  { getlist, clearlist }
)
class List extends PureComponent<Props,State>{
  constructor(props: Props){
    super(props)
    this.state={
      size: 15
    }
    this.getMore = this.getMore.bind(this);
  }
  async componentDidMount(){
    const { size } = this.state;
    const { getlist } = this.props;
    const { page, count } = this.props.artical;
    count == 0 ? await getlist({page, size}) : null;
  }
  async getMore(){
    const { size } = this.state;
    const { getlist } = this.props;
    const { page } = this.props.artical;
    const nextpage = page + 1;
    await getlist({page: nextpage, size});
  }
  render(){
    const { artical} = this.props;
    const { list, count } = artical;
    const loadmore = <div style={{textAlign:'center'}}>
      <Button onClick={this.getMore}>加载更多</Button>
    </div> ;

    const listhtml = <div>
      { 
        list.map((v: any) => (
        <div className="artical" key={v._id}>
          <div className="dotts"></div>
          <Link className="date" to={`/detail?id=${v._id}`}>
              <span className="trig"></span>
              <span className="dates">{moment(v.createtime).format('YYYY.MM.DD')}</span>
          </Link>
          <div className="art-container">
            <div className="line"></div>
            <div className="art-content">
              <p className="art-title">
                  <Link to={`/detail?id=${v._id}`}>{v.title}</Link>
              </p>
              {
                v.pics && v.pics.length>0 ?  
                <div className="art-img">
                  <img src={v.pics[0]} alt="文章配图" />
                </div>
                :
                null
              }
              <div className="art-detail">
                  <p>{v.desc}</p>
              </div>
            </div>
          </div>
        </div>
        ))
      }
      { 
        list.length < count  ? loadmore : null
      }
      
    </div>;
    const none =  <Skeleton active />;
    return(
      <div className="Artical-box">
        {list.length === 0 ? none : listhtml}
      </div>
    )
  }
}
export default List