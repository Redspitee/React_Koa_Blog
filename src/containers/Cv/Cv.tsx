import React,{ PureComponent } from 'react';
import Gotop from 'react-go-top';
import Header from '../../components/Header/Header';
import Bottom from '../../components/Bottom/Bottom';
import './cv.less';

class Cv extends PureComponent{
  componentDidMount(){
    document && document.documentElement ? document.documentElement.scrollTop = 0 : null;
  }
  render(){
    return(
      <div className="Cv">
        <Header active={0} />
        <Gotop style={{backgroundColor: "#ddd"}}/>
        <main className="page">
          <section>
            <h1 className="f-s-18 f-w-900 m-b-20">联系方式</h1>
            <div className="boxes default m-b-20">
              <div className="box bg-gray-lightest p-t-0 p-b-0">
                <div className="row">
                  <div className="col-4 p-t-10 p-b-10">● 手机：18030842838</div>
                  <div className="col-4 p-t-10 p-b-10 border">● Email：718352984@qq.com</div>
                  <div className="col-4 p-t-10 p-b-10 border">● 网站：www.redspite.com</div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h1 className="f-s-18 f-w-900 m-b-20">个人信息</h1>
            <div className="boxes default m-b-20">
              <div className="box bg-gray-lightest p-t-0 p-b-0">
                <div className="row">
                  <div className="col-4 p-t-10 p-b-10">● 张小月 | 女 | 1993</div>
                  <div className="col-4 p-t-10 p-b-10 border">● 西南科技大学 | 电气工程 | 本科</div>
                  <div className="col-4 p-t-10 p-b-10 border">● 前端开发 | 3 年工作经验</div>
                </div>
              </div>
              <div className="box bg-gray-lightest">
                ● Github：
                <a href="https://github.com/Redspitee" target="_blank">https://github.com/Redspitee</a>
              </div>
              <div className="box bg-gray-lightest">
                ● Gitee：
                <a href="https://gitee.com/redspite" target="_blank">https://gitee.com/redspite</a>
              </div>
              <div className="box bg-gray-lightest">
                ● 技术博客：
                <a href="https://www.redspite.com" target="_blank">https://www.redspite.com</a>
              </div>
            </div>
          </section>

          <section>
            <h1 className="f-s-18 f-w-900 m-b-20">技术优势</h1>
            <div className="boxes default m-b-20">
              <div className="box bg-gray-lightest">
                ● 熟练使用 Vue React Cordova 微信小程序 框架
              </div>
              <div className="box bg-gray-lightest">
                ● 熟练掌握 CSS3 ES6 webpack TCP/HTTP 模块化开发 ...
              </div>
              <div className="box bg-gray-lightest">
                ● 熟练掌握 移动端HTML5开发 hybrid开发 跨浏览器、跨终端开发
              </div>
              <div className="box bg-gray-lightest">
                ● 可以写点NodeJs 
              </div>
              <div className="box bg-gray-lightest">
                ● 独立解决问题、百折不挠、细节控 
              </div>
            </div>
          </section>

          <section>
            <h1 className="f-s-18 f-w-900 m-b-20">开源项目</h1>
            <div className="boxes default m-b-20">
              <div className="box bg-gray-lightest">
                ● 
                <a href="https://github.com/Redspitee/blog" target="_blank"> 个人博客（使用React+Redux+Ts+Antd+Koa构建）</a>
              </div>
              <div className="box bg-gray-lightest">
                ● 
                <a href="https://github.com/Redspitee/react-go-top" target="_blank"> react-go-top（基于react的回到顶部插件,发布在npm的插件包）</a>
              </div>
              <div className="box bg-gray-lightest">
                ● 
                <a href="https://github.com/Redspitee/Cv" target="_blank"> 早期博客（纯静态页面，页面放置于虚拟机）</a>
              </div>
              
            </div>
          </section>
          <section>
            <h1 className="f-s-18 f-w-900 m-b-20">工作经历</h1>
            <div className="boxes default m-b-20">
              <div className="box bg-gray-lightest">
                ● 成都深珀数据公司 （ 2016 年 10 月 ~ 至今 ）
              </div>
              <div className="box bg-gray-lightest">
                <p className="m-t-0"><b>项目从0到1</b></p>
                <p>混合式开发APP、微信小程序开发、后台管理系统开发</p>
              </div>
            </div>

            <div className="boxes default m-b-20">
              <div className="box bg-gray-lightest">
                ● 成都清风竞技公司 （ 2016 年 3 月 ~ 2016 年 10 月 ）
              </div>
              <div className="box bg-gray-lightest">
                <p className="m-t-0"><b>官网页面更新与维护</b> </p>
                <p>负责官网页面制作。PSD切图后构建页面框架，利用JS\JQ\CSS3书写前端功能，让页面更充实丰富,并将代码上传到代码托管平台 。</p>
              </div>
            </div>
            ......
          </section>
        </main>
        <Bottom />
      </div>
    )
  }
}
export default Cv