import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getlist, clearlist, setscrolltop} from '../../reducer/artical.redux';

import Gotop from 'react-go-top';
import Header from '../../components/Header/Header';
import List from '../../components/List/List';
import Bottom from '../../components/Bottom/Bottom';

interface State{
}
interface Props{
  artical: any,
  getlist: Function,
  clearlist: Function,
  setscrolltop: Function
}
// @ts-ignore
@connect(
  state=>state,
  { getlist, clearlist, setscrolltop }
)
class Home extends PureComponent<Props,State>{
  constructor(props: Props){
    super(props)
  }
  componentDidMount(){
    // 恢复页面滚动位置
    const { scrolltop } = this.props.artical;
    document && document.documentElement ? document.documentElement.scrollTop = scrolltop : null;
  }
  async componentWillUnmount(){
    // 存储页面滚动位置
    const top = document && document.documentElement ? document.documentElement.scrollTop : 0;
    await this.props.setscrolltop(top)
  }
  render(){
    const { artical, getlist, clearlist} = this.props;
    return (
      <div className="Home">
        <Header active={1} />
        <Gotop style={{backgroundColor: "#ddd"}}/>
        <List artical={artical} getlist={getlist} clearlist={clearlist} />
        <Bottom />
      </div>
    );
  }
}
export default Home;