
import React,{Component,PropTypes} from 'react'
import {Button,Card,Input,Form,notification} from 'antd'
import axios from 'axios'
const FormItem=Form.Item
class NewsComments extends Component{
    static propTypes={
        uniquekey:PropTypes.string.isRequired
    }
    state={
        comments:[]
    }
    //获取请求，请求中获取comments
    //初始化显示
    componentDidMount(){
        //获取评论数据
        const {uniquekey}=this.props
        this.showComments(uniquekey)
    }
    componentWillReceiveProps(newProps){
        this.showComments(newProps.uniquekey)
    }
    showComments(uniquekey){
        const url=`http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=${uniquekey}`
        axios.get(url)
            .then(response=>{
                const comments=response.data
                this.setState({comments})
            })
    }

    //评论
    handleSubmit=()=>{
        const userId=localStorage.getItem('userId')
        console.log(userId)
        if(!userId){
            alert('你还没有登录')
            return
        }
        const {uniquekey}=this.props
        //得到输入项的值
        const content=this.props.form.getFieldValue('content')
        const url=`http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=${userId}&uniquekey=${uniquekey}&commnet=${content}`
         axios.get(url)
             .then(response=>{
                 //更新评论列表
                 this.componentDidMount()
                 //提示组件
                 notification.success({
                     message:'评论提交成功'
                 })

                 //清除输入的数据
                 this.props.form.resetFields()
             })
    }


    //收藏文章
    handleClick=()=>{
        const userId=localStorage.getItem('userId')
        if(!userId){
            alert('请先登录')
            return
        }
        const {uniquekey}=this.props

        const url=`http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=${userId}&uniquekey=${uniquekey}`
        axios.get(url)
            .then(response =>{
               notification.success({
                    message:'评论提交成功'
                })
            })
    }



    render(){
        /*评论列表*/
        const commentList=this.state.comments.map((comment,index)=>(
            <Card key={index} title={comment.UserName} extra={`发布于${comment.datetime}`}>
               <p>{comment.Comments}</p>
            </Card>
        ))
const {getFieldDecorator}=this.props.form
        return (
            <div style={{padding:'10px'}}>

                {commentList}
                {/*提交的表单*/}
                <Form onSubmit={this.handleSubmit}>
                    <FormItem label="我要评论" style={{fontSize:'18px'}}>
                        {
                            getFieldDecorator('content')(
                                <Input type="textarea" placeholder="请输入你的评论"/>
                            )
                        }
                    </FormItem>
                    <Button type="primary" htmlType='submit'>提交</Button>
                    <Button type="primary" onClick={this.handleClick}>收藏</Button>
                </Form>
            </div>
        )
    }
}
export default Form.create()(NewsComments)