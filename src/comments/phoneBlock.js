/**
 * Created by shanshan on 2017/9/5.
 */
import React,{Component,PropTypes} from 'react'
import {Card} from 'antd'
import axios from 'axios'
import {Link} from 'react-router'

export default class PhoneBlock extends Component{
    static propType={
        type:PropTypes.string.isRequired,
        count:PropTypes.number.isRequired
    }
    state={
        newsArr:[]
    }
    componentDidMount(){
        const {count,type}=this.props
        const url=`http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=${count}`
       //发送请求
        axios.get(url)
            .then(response=>{
                const newsArr=response.data
                //更新
                this.setState({newsArr})
            })
    }

    render(){
    const {newsArr}=this.state
        const newsList=newsArr.length
        ? newsArr.map((newsItem,index)=>(
                    <Card key={index} className="m_article list-item special_section clearfix">
                        <Link to={`/NewsDetail/${newsItem.uniquekey}`}>
                            <div className="m_article_img">
                                <img src={newsItem.thumbnail_pic_s} alt={newsItem.title} />
                            </div>
                            <div className="m_article_info">
                                <div className="m_article_title">
                                    <span>{newsItem.title}</span>
                                </div>
                                <div className="m_article_desc clearfix">
                                    <div className="m_article_desc_l">
                                        <span className="m_article_channel">{newsItem.realtype}</span>
                                        <span className="m_article_time">{newsItem.date}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </Card>
            )
            )
            : <h3 style={{textAlign:'center', paddingTop:'15px'}}>加载中请稍等……</h3>
        return (
            <div>
                {newsList}
            </div>
        )

    }
}