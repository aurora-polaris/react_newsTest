/**
 * Created by lenovo on 2017/9/1.
 */
import React,{Component} from 'react'
import NewsHeader from './NewsHeader'
import NewsFooter from './NewsFooter'
import '../commentCss/news.css'
export default class App extends Component{
    render(){
        return (
            <div>
                <NewsHeader/>
                {/*显示所有子路由*/}
                {this.props.children}
                <NewsFooter/>
            </div>
        )


    }
}