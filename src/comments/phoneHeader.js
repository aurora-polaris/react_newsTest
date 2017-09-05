/**
 * Created by shanshan on 2017/9/5.
 */
import React,{Component} from 'react'
import logo from '../images/logo.png'
import {Link} from 'react-router'
import {Icon,Modal,Tabs,Form,Input,message,Button} from 'antd'
import axios from 'axios'

const TabPane=Tabs.TabPane
const FormItem=Form.Item
class PhoneHeader extends Component{
    state={
        username:null,
        modalVisible:false,
    }
    //保存数据
    componentDidMount=()=>{
        const username=localStorage.getItem('username')
        //更新
        if(username){
            this.setState({username})
        }
    }
    setModalVisible=(modalVisible)=>{
        //更新状态
        this.setState({modalVisible})}

    //登录注册
    handelSubmit=(isLogin,event)=>{
    //取消默认行为
        event.preventDefault()

        const {username, password, r_userName, r_password, r_confirmPassword} = this.props.form.getFieldsValue()
       // const url=`http://newsapi.gugujiankong.com/Handler.ashx?action=${action}&username=${username}&password=${password}&r_userName=${r_userName}&r_password=${r_password}&r_confirmPassword=${r_confirmPassword}`
        let url = 'http://newsapi.gugujiankong.com/Handler.ashx?'
        if(isLogin) {
            url += `action=login&username=${username}&password=${password}`
        } else {
            url += `action=register&r_userName=${r_userName}&r_password=${r_password}&r_confirmPassword=${r_confirmPassword}`
        }
      //  const action = isLogin ? 'register' : 'login'
        axios.get(url)
            .then(response=>{
                const result=response.data
                if(isLogin){
                    if(!result){
                        message.error('登录失败')
                    }
                    else{
                        message.success("登录成功")

                        const username=result.NickUserName
                        const userId=result.UserId
                        //更新
                        this.setState({username})
                        //保存
                        localStorage.setItem('username',username)
                        localStorage.setItem('userId',userId)

                    }
                }
                else{
                    message.success('注册成功')
                }
            })



        //更新
        this.setState({modalVisible:false})
    }
    logout=()=>{
        //更新状态
        this.setState({username:null})
        //清空
        localStorage.removeItem('username')
        localStorage.removeItem('userId')
    }
    render(){
        const {username,modalVisible}=this.state
        const {getFieldDecorator}=this.props.form
        const userItem=username
            //设置登录注册切换
            ? <Link  to={`/UserCenter`}>
                <Icon type="inbox"/>
            </Link>
            : <Icon type="setting" onClick={this.setModalVisible.bind(this,true)}/>
        return (
            <div id="mobileheader">
               <header>
                   <div>
                       <Link to="/">
                           <img src={logo} alt="logo"/>
                           <span>PhoneNews</span>
                           {/*<Button type="primary" onClick={this.logout} className="delete">退出</Button>*/}
                       </Link>
                       {userItem}
                   </div>

               </header>
                <Modal  title="用户中心" visible={modalVisible}
                         onOk={this.setModalVisible.bind(this,false)} onCancel={this.setModalVisible.bind(this,false)}>
                    <Tabs  type="card" onChange={()=>this.props.form.resetFields()}>
                        <TabPane tab="登录" key="1">
                            <Form onSubmit={this.handelSubmit.bind(this,true)}>
                                <FormItem label="用户名">
                                    {getFieldDecorator('username')(
                                        <Input placeholder="请输入用户名"/>
                                    )}
                                </FormItem>
                                <FormItem label="密码">
                                    {getFieldDecorator('password')(
                                        <Input type="password" placeholder="请输入密码"/>
                                    )}
                                </FormItem>
                                <Button type='primary' htmlType="submit">登陆</Button>
                            </Form>
                        </TabPane>
                        <TabPane tab="注册" key="2">
                            <Form onSubmit={this.handelSubmit.bind(this,false)}>
                                <FormItem label="用户名">
                                    {getFieldDecorator('r_userName')(
                                        <Input placeholder="请输入用户名"/>
                                    )}
                                </FormItem>
                                <FormItem label="密码">
                                    {getFieldDecorator('r_password')(
                                        <Input type="password" placeholder="请输入密码"/>
                                    )}
                                </FormItem>
                                <FormItem label="确认密码">
                                    {getFieldDecorator('r_confirmPassword')(
                                        <Input type="r_password" placeholder="请再次输入密码"/>
                                    )}
                                </FormItem>
                                <Button type='primary' htmlType="submit">注册</Button>
                            </Form>
                        </TabPane>
                    </Tabs>
                </Modal>
            </div>
        )

    }
}
export default Form.create()(PhoneHeader)


