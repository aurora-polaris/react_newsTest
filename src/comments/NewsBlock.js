/**
 * Created by lenovo on 2017/9/2.
 */
//新闻的列表内容
import React,{Component,PropTypes} from 'react'
import {Card} from 'antd'
import axios from 'axios'
import {Link} from 'react-router'
export default class NewsBlock extends Component{
    static propTypes={
        type:PropTypes.string.isRequired,
        count:PropTypes.number.isRequired
    }
    state={
        newsArr:null
    }
    componentDidMount(){
        const {type,count}=this.props
        const url=`http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=${count}`
        //发送请求，得到新闻列表
            axios.get(url)
                .then(response=>{
                const newsArr=response.data.map(({uniquekey,title})=>({uniquekey,title}))
                this.setState({newsArr})
                })
    }

    render(){
        const {newsArr}=this.state
        const {type}=this.props

        const contentUI=!newsArr
        ? <h2>还没有新闻</h2>
        : (<ul>
                {
                    newsArr.map((news, index) => (
                    <li key={index}>
                    <Link to={`/NewsDetail/${news.uniquekey}/${type}`}>{news.title}</Link>
                    </li>
                    ))
                }
            </ul>)
        return (
            <Card className="topNewsList">
                {contentUI}
            </Card>

        )


    }
}