import React from "react";
import { Row, Col } from "antd";
import { Tabs, Carousel } from "antd";
const { TabPane } = Tabs;
import PCNewsBlock from './pc_news_block'
import PCNewsImageBlock from './pc_news_image_block'
export default class PCNewsContainer extends React.Component {
  render(){
    const settings={
      dots:true,//是否显示面板指示点
      infinite:true,
      speed:500,
      slidesToShow:1,//从第几张图片开始
      autoplay:true
    }
    return(
      <div>
        <Row>
          <Col span={2}></Col>
          <Col span={20} className='container'>
            <div className='leftContainer'>
              <div className='carousel'>
                <Carousel {...settings}>
                  <div><img src='./src/images/carousel_1.jpg'/></div>
                  <div><img src='./src/images/carousel_2.jpg'/></div>
                  <div><img src='./src/images/carousel_3.jpg'/></div>
                  <div><img src='./src/images/carousel_4.jpg'/></div>
                </Carousel>
              </div>
              <div>
                <PCNewsImageBlock count={9} type='guoji' width='400px' cartTitle='国际新闻' imageWidth='112px' />
              </div>
            </div>
            <Tabs className='tabs_news'>
              <TabPane tab='头条' key='1'>
                <PCNewsBlock type='top'/>
              </TabPane>
              <TabPane tab='国际' key='2'>
                <PCNewsBlock type='guoji'/>
              </TabPane>
            </Tabs>
            <div>
              <PCNewsImageBlock count={9} type='yule' width='100%' cartTitle='娱乐新闻' imageWidth='112px' />
              <PCNewsImageBlock count={9} type='guonei' width='100%' cartTitle='国内新闻' imageWidth='112px' />
            </div>
          </Col>
          <Col span={2}></Col>
        </Row>
      </div>
    )
  }
}
