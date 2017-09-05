/**
 * Created by shanshan on 2017/9/5.
 */
import React,{Component} from 'react'
import NewsComments from './NewsComments'
import {BackTop} from 'antd'
import axios from 'axios'

export default class PhoneDetail extends Component{
    state={
        news:''
    }
    componentDidMount(){
        const {uniquekey}=this.props.params
        const url=`http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${uniquekey}`
      //发送请求
        axios.get(url)
            .then(response=>{
                const news=response.data
                //更新
                this.setState({news})

                //关联标题
                document.title=news.title
            })
    }
    render(){
        const {news}=this.state
        return (
            <div style={{padding:'10px'}}>
                <div className="mobileDetailsContainer" dangerouslySetInnerHTML={{__html: news.pagecontent}}></div>
                <NewsComments uniquekey={this.props.params.uniquekey}/>
               <BackTop/>
            </div>
        )

    }
}