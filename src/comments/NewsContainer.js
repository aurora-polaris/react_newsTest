/**
 * Created by lenovo on 2017/9/1.
 */
//轮播图
import React,{Component} from 'react'

import {Carousel,Row,Col,Tabs} from 'antd'
import NewsBlock from './NewsBlock'
import carousel_1 from '../images/carousel_1.jpg'
import carousel_2 from '../images/carousel_2.jpg'
import carousel_3 from '../images/carousel_3.jpg'
import carousel_4 from '../images/carousel_4.jpg'
import NewsProduct from "./NewsProduct";
import NewsImage from "./NewsImage"

const TabPane=Tabs.TabPane
export default class NewsContainer extends Component{
    render(){
        return (
            <div className="container ">
                <Row >
                    <Col span={1}></Col>
                        <Col span={22}>
                               <div className="leftContainer " style={{width:'35%'}}>
                                   {/*轮播图*/}
                                   <Carousel autoplay >
                                       <div><img src={carousel_1} /></div>
                                       <div><img src={carousel_2} /></div>
                                       <div><img src={carousel_3} /></div>
                                       <div><img src={carousel_4} /></div>
                                   </Carousel>
                                   <NewsImage type="guoji" count={6} cardTitle="国际新闻" cardWidth="100%" imageWidth="112px"/>
                               </div>

                            {/*中间部分*/}
                            <Tabs  className="tabs_news " style={{width:'35%'}}>
                                <TabPane tab="头条新闻" key="1">
                                    <NewsBlock type="top" count={21}></NewsBlock>
                                </TabPane>
                                <TabPane tab="国际新闻" key="2">
                                    <NewsBlock type="guoji" count={21}></NewsBlock>
                                </TabPane>
                            </Tabs>
                          {/*右侧新闻*/}
                            <Tabs style={{width:'30%'}}>
                                <TabPane tab="React News 产品" key="1">
                                    <NewsProduct/>
                                </TabPane>
                            </Tabs>
                            {/*底部新闻图片*/}
                         <div>
                             <NewsImage type="guonei" count={8} cardTitle="国内新闻" cardWidth="100%" imageWidth="132px"/>
                             <NewsImage type="yule" count={16} cardTitle="娱乐新闻" cardWidth="100%" imageWidth="132px"/>
                         </div>

                        </Col>


                    <Col span={1}></Col>
                </Row>
            </div>

        )


    }
}