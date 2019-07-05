import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import Header from '../../components/Header/Header';
import Bottom from '../../components/Bottom/Bottom';
import './nomatch.less'
interface State{
}
interface Props{
}
class NoMatch extends PureComponent<Props, State>{
  constructor(props: Props){
    super(props)
  }
  render(){
    return <div>
      <Header active={3} />
      <Row gutter={16} className="rowStyle">
        <Col span={14}>
          <img width="100%" src={require('./none.svg')} alt="none"/>
        </Col>
        <Col span={10}>
          <div className="statusStyle">404</div>
          <div className="smallStyle">抱歉，你访问的页面不存在</div>
        </Col>
      </Row>
      <Bottom />
    </div>
  }
}

export default NoMatch