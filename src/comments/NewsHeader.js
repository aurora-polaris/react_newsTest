/**
 * Created by lenovo on 2017/9/1.
 */
import React,{Component} from 'react'
import {Row,Col,Menu,Icon,Button,Modal,Tabs,Form,Input,message} from 'antd'
import logo from '../images/logo.png'
import {Link} from 'react-router'
import axios from 'axios'


/*
* 布局菜单栏 ，共24列
* Row（行）、Col（列）、Menu（菜单项）、<Icon type="appstore"/>（图标），span（定义占几列）
* mode（定义方向）、selectedKeys（当前选中的菜单项key数组）、onClick（点击 MenuItem 调用此函数）
* key（item 的唯一标志）、Modal（对话框）、Form（表单）、message(信息)
*引入标题图片，设置css样式调整图片的大小 占3列
* 菜单栏 占19列
   * 设置菜单的图标
   * 水平排列
   * 默认选中的菜单
* 登陆注册
* */


//菜单项组件
const MenuItem=Menu.Item
//页签项组件
const TabPane=Tabs.TabPane
//表单项
const FormItem=Form.Item

 class NewsHeader extends Component{
    state={
        selectedKey:'top',
        username:null,
        modalShow:false  //用于登陆注册时弹出来的对话框
    }
    //判断
    showModal=(isShow)=>{
        //更新状态
        this.setState({modalShow:isShow})
    }
    changed=({key})=>{
        //判断如果点击登陆注册的时候才弹出对话框
        if(key==='login'){
            this.setState({modalShow:true})
        }
        this.setState({selectedKey:key})
    }
    //处理提交登陆注册的请求
    handleSubmit=(isLogin)=>{
        //获取一组输入控件的值，如果没有输入，则全部获取
        const {username, password, r_userName, r_password, r_confirmPassword} = this.props.form.getFieldsValue()
        /*const value=this.props.form.getFieldsValue()*/
        // 准备url
        let url = 'http://newsapi.gugujiankong.com/Handler.ashx?'
        if(isLogin) {
            url += `action=login&username=${username}&password=${password}`
        } else {
            url += `action=register&r_userName=${r_userName}&r_password=${r_password}&r_confirmPassword=${r_confirmPassword}`
        }
        //发送请求
        axios.get(url)
            .then(response=>{
                //清除输入的数据
                this.props.form.resetFields()
                const result=response.data
                if(isLogin){
                    if(!isLogin){
                        message.error('登陆失败')
                    }else {
                        //提示成功（message 组件）
                        message.success('登陆成功')
                        //读取返回的username/userID
                        const username=result.NickUserName
                        const userId=result.UserId
                        //console.log(userId)
                        //更新状态
                        this.setState({username})
                        //保存username/userId
                        localStorage.setItem('username',username)
                        localStorage.setItem('userId',userId)
                    }
                }else {
                    //提示成功（message 组件）
                    message.success('注册成功')
                }
            })
        //关闭modal,点击注册就会关闭
        this.setState({modalShow:false})
    }
    //读取保存到local 中的username 值,localStorage 保存在本地
    componentDidMount(){
        const username=localStorage.getItem('userId')
        //判断
        if(username){
            //更新状态
            this.setState({username})
        }
    }
    logout=()=>{
        //更新状态
        this.setState({username:null})
        //清空
        localStorage.removeItem('username')
        localStorage.removeItem('userId')
    }
    render(){
        console.log(localStorage.getItem('userId'))
        const { getFieldDecorator } = this.props.form
        const {selectedKey,username,modalShow}=this.state
        //使用三目运算符判断两种状态（登陆和未登录）
        const userShow=username
        ? (
                <MenuItem key="logout" className="log">
                    {/*&nbsp 空格*/}
                    <Button type="primary">{username}</Button>&nbsp;&nbsp;
                    <Link to="/UserCenter "><Button type="dashed">个人中心</Button></Link>&nbsp;&nbsp;
                    <Button onClick={this.logout}>退出</Button>
                </MenuItem>
            )
            :(
                <MenuItem key="login" className="log">
                    <Icon type="appstore"/>登陆/注册
                </MenuItem>
            )
        return (
            <header>
                <Row>
                    <Col span={1}></Col>
                    {/*标题图片*/}
                    <Col span={3}>
                        <a href="#/" className="logo">
                            <img src={logo} alt="logo"/>
                            <span>导航</span>
                        </a>
                    </Col>
                    <Col span={19}>
                        <Menu mode="horizontal"  selectedKeys={[selectedKey]} onClick={this.changed} >
                            <MenuItem key="top" >
                                <Icon type="appstore"/>头条
                            </MenuItem>
                            <MenuItem key="shehui">
                                <Icon type="appstore"/>社会
                            </MenuItem>
                            <MenuItem key="guonei">
                                <Icon type="appstore"/>国内
                            </MenuItem>
                            <MenuItem key="guoji">
                                <Icon type="appstore"/>国际
                            </MenuItem>
                            <MenuItem key="yule">
                                <Icon type="appstore"/>娱乐
                            </MenuItem>
                            <MenuItem key="tiyu">
                                <Icon type="appstore"/>体育
                            </MenuItem>
                            <MenuItem key="keji">
                                <Icon type="appstore"/>科技
                            </MenuItem>
                            <MenuItem key="shishang">
                                <Icon type="appstore"/>时尚
                            </MenuItem>
                           {userShow}
                        </Menu>

                        {/*visible 对话框是否可见
                        onOk 点击确定回调
                        onCancel 点击遮罩层或右上角的×或取消按钮的回调*/}

                        <Modal title="用户中心"
                           visible={modalShow}
                           onOk={this.showModal.bind(this,false)}
                           onCancel={()=>this.showModal(false)} >
                            {/*定义对话框内的标签页 tabs*/}
                            {/*
                             onChange={ this.props.form.resetFields()}  如果直接这样写，解析代码的时候就会被调用，而不是在onchange中调用
                             一种解决方式是使用箭头函数，另一种是在外部调用
                             onChange={this.handleChange}
                             为什么要写这个：注册的时候，登陆的用户名和密码不会被清除*/}
                            <Tabs type="card" onChange={()=>this.props.form.resetFields()}>
                                <TabPane tab="登陆" key="1">
                                    {/*定义对话框内的表单*/}
                                    {/*与注册界面使用同一个函数调用，但是又想区分开，使用bind()*/}
                                    <Form onSubmit={this.handleSubmit.bind(this,true)}>
                                        <FormItem label="用户名">
                                            {/*方便后面的到input的值，得到表单项的包装器，自动将input值放入属性中*/}
                                            {getFieldDecorator('username')(
                                                <Input type="text" placeholder="请输入用户名"/>
                                            )}

                                    </FormItem>
                                        <FormItem label="密码">
                                            {getFieldDecorator('password')(
                                                <Input type="password" placeholder="请输入密码"/>
                                            )}
                                        </FormItem>
                                        {/*htmlType 设置button 原生的值*/}
                                            <Button type='primary' htmlType="submit">登陆</Button>
                                    </Form>
                                </TabPane>
                                <TabPane tab="注册" key="2">
                                    <Form onSubmit={this.handleSubmit.bind(this,false)}>
                                        <FormItem label="用户名">
                                            {/*方便后面的到input的值，得到表单项的包装器，自动将input值放入属性中*/}
                                            {getFieldDecorator('r_userName')(
                                                <Input type="text" placeholder="请输入用户名"/>
                                            )}

                                        </FormItem>
                                        <FormItem label="密码">
                                            {getFieldDecorator('r_password')(
                                                <Input type="password" placeholder="请输入密码"/>
                                            )}
                                        </FormItem>
                                        <FormItem label="确认密码">
                                            {getFieldDecorator('r_confirmPassWord')(
                                                <Input type="password" placeholder="请输入密码"/>
                                            )}
                                        </FormItem>

                                            <Button type='primary' htmlType="submit">注册</Button>

                                    </Form>
                                </TabPane>
                            </Tabs>
                        </Modal>
                    </Col>
                    <Col span={1}></Col>
                </Row>
            </header>
        )


    }
}
//对NewsHeader 组件进行包装产生一个新的组件类，向NewsHeader中传入一个属性：form,这种方式是因为表单项的写入
export default Form.create()(NewsHeader)