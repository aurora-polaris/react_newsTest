/**
 * Created by shanshan on 2017/9/5.
 */
import React,{Component} from 'react'
import {Tabs,Carousel} from 'antd'
import carousel_1 from '../images/carousel_1.jpg'
import carousel_2 from '../images/carousel_2.jpg'
import carousel_3 from '../images/carousel_3.jpg'
import carousel_4 from '../images/carousel_4.jpg'
import PhoneBlock from "./phoneBlock";
const TabPane=Tabs.TabPane

export default class  PhoneContainer extends Component{
    render(){
        return (

               <Tabs>
                   <TabPane tab="头条" key="top">
                       {/*轮播图*/}

                       <div style={{width:'100%'}}>
                           <Carousel autoplay >
                               <div><img src={carousel_1}/></div>
                               <div><img src={carousel_2}/></div>
                               <div><img src={carousel_3}/></div>
                               <div><img src={carousel_4}/></div>
                           </Carousel>

                       </div>
                       <PhoneBlock count={20} type="top"/>
                   </TabPane>
                   <TabPane tab="社会" key="2">
                       <PhoneBlock count={20} type="shehui"/>
                   </TabPane>
                   <TabPane tab="国内" key="3">
                       <PhoneBlock count={20} type="guonei"/>
                   </TabPane>
                   <TabPane tab="国际" key="4">
                       <PhoneBlock count={20} type="guoji"/>
                   </TabPane>
                   <TabPane tab="娱乐" key="5">
                       <PhoneBlock count={20} type="yule"/>
                   </TabPane>
               </Tabs>



        )

    }
}