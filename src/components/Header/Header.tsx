import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import myAvator from './header.jpg';
import './header.less';
import { linkSync } from 'fs';

interface Props{
  active: number
}
interface State{
}
class Header extends PureComponent<Props,State>{
  constructor(props: Props){
    super(props)
    this.state={
    }
  }
  componentDidMount(){
   
  }
  render(){
    const { active } = this.props;
    const links = [{
      label:'简历',
      path:'/cv'
    },{
      label:'点滴',
      path:'/'
    },{
      label:'留言',
      path:'/comments'
    }];
    return (
      <div className="Header">
        <div className="header-box fadein"><img src={myAvator} alt="我的头像" /></div>
        <div><p className="my-id">RedSpite</p></div>
        <div className="my-sort">
          {links.map((v,i)=>(
            <Link to={v.path} key={i} className={`${active===i? "active":""}`}>{v.label}</Link>
          ))}
        </div>
      </div>
    )
  }
}
export default Header;