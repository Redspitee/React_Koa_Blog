import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import Header from '../../components/Header/Header';
import Bottom from '../../components/Bottom/Bottom';
interface State{
}
interface Props{
}
class NoMatch extends PureComponent<Props, State>{
  constructor(props: Props){
    super(props)
  }
  render(){
    const statusStyle = {
      marginBottom: '24px',
      color: '#434e59',
      fontWeight: 600,
      fontSize: '72px',
      lineHeight: '72px'
    },
    smallStyle = {
      marginBottom: '16px',
      color: 'rgba(0,0,0,.45)',
      fontSize: '20px',
      lineHeight: '28px'
    },
    rowStyle = {
      alignItems: 'center',
      display: 'flex',
      padding: '10%'
    };
    return <div>
      <Header active={3} />
      <Row gutter={16} style={rowStyle}>
        <Col span={16}>
          <img src={require('./none.svg')} alt="none"/>
        </Col>
        <Col span={8}>
          <div style={statusStyle}>404</div>
          <div style={smallStyle}>抱歉，你访问的页面不存在</div>
        </Col>
      </Row>
      <Bottom />
    </div>
  }
}

export default NoMatch