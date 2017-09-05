import React,{Component} from 'react'
import axios from 'axios'
import {Row,Col,BackTop} from 'antd'
import NewsComments from './NewsComments'
import NewsImage from './NewsImage'
export default class NewsDetail extends Component{
    state = {
        news:{}
    }
    componentDidMount(){
        //发送ajax请求获取新闻详情
        const {uniquekey}=this.props.params
        this.showNews(uniquekey)
        /*const {uniquekey}=this.props.params
        const url=`http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${uniquekey}`
        axios.get(url)
            .then(response=>{
                const news=response.data
                this.setState({news})

                //关联当前新闻标题
                document.title=news.title
            })*/
    }
    componentWillReceiveProps(newProps){
       // console.log('componentWillReceiveProps()',newProps)
       this.showNews(newProps.params.uniquekey)
       /* const {uniquekey}=this.props.params
        const url= `http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${uniquekey}`
        axios.get(url)
            .then(response=>{
                const news=response.data
                this.setState({news})
            })*/
    }
    showNews(uniquekey){
        const url=`http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${uniquekey}`
        axios.get(url)
            .then(response=>{
                const news=response.data
                this.setState({news})


                //关联当前新闻标题
                document.title=news.title
            })
    }
    render(){
        const {news}=this.state
        let {uniquekey,type}=this.props.params
        //默认指定为top
        if(!type){
            type='top'
        }
        return (
            <div>
                <Row>
                    <Col span="1"></Col>
                    <Col span={16} className="container">
                        <div dangerouslySetInnerHTML={{__html:news.pagecontent}}></div>
                         <NewsComments uniquekey={uniquekey}/>
                    </Col>
                    <Col span="6">
                        {/*设置的type值在NewsBlock 中需要更改，在NewsImage 中也要更改*/}
                        <NewsImage type={type} count={40} cardWidth="100%" cardTitle="相关新闻" imageWidth="150px"></NewsImage>
                    </Col>
                    <Col span="1"></Col>
                </Row>
                <BackTop/>
            </div>

        )

    }
}